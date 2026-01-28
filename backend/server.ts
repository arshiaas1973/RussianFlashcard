import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import type { Request, Response } from "electron";
import { PrismaClient, type Translation } from "./generated/prisma/client.ts";
import multer from "multer";

dotenv.config({ path: '../.env' });

const app = express();
const port = process.env.SERVER_PORT || 8000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    allowedHeaders: ["X-API-Key"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    origin: [process.env.FRONTEND_ORIGIN ?? "http://localhost:5173"],
}));

app.use((req,res,next)=>{
    const apiKey = req.header("X-API-Key");
    if(apiKey !== process.env.NEXT_API_KEY){
        return res.status(401).json({
            status: "failed",
            message: "Unauthorized",
        });
    }
    next();
});

app.get("/api/v1/flashcards/random", async (req, res) => {
    const prisma = new PrismaClient();
    const count = await prisma.flashcard.count();
    const skip = Math.floor(Math.random() * count);
    const result = await prisma.flashcard.findMany({
        take: 1,
        skip: skip,
        include: {
            translations:{
                select:{
                    translation:{
                        select:{
                            id: true,
                            word: true,
                            language: true,
                        }
                    }
                }
            }
        }
    });
    await res.status(200).json({
        status: "success",
        result,
    });
});

app.post("/api/v1/flashcards", multer().none(), async (req, res) => {
    const {
        word = "",
        description = "",
        translations = null,
    }: {
        translations: string | null,
        word: string,
        description: string,
    } = await req.body;

    if (word == "" || (translations?.length ?? 0) <= 0) {
        return await res.status(400).json({
            status: "failed",
            message: "Bad request parameters",
        });
    }

    const t: Translation[] = JSON.parse(translations as string);

    const prisma = new PrismaClient();
    const flashcard = await prisma.flashcard.create({
        data: {
            word,
            description,
        },
    });

    const translationPromises = t.map(async (t) => {
        const translation = await prisma.translation.create({
            data: {
                language: t.language,
                word: t.word,
            },
        });

        await prisma.translationsOnFlashcards.create({
            data: {
                flashcardId: flashcard.id,
                translationId: translation.id,
            },
        });
    });

    await Promise.all(translationPromises);

    await prisma.$disconnect();
    return await res.status(200).json({
        status: "success",
        result: "Flashcard added successfully",
    });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})