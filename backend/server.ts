import express from "express";
import
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import type { Request, Response } from "electron";
import { PrismaClient, type Translation } from "./generated/prisma/client";

dotenv.config();

const app = express();
app.use(bodyParser);
app.use(cors({
    allowedHeaders: ["X-API-Key"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    origin: [process.env.FRONTEND_ORIGIN ?? "http://localhost:5173"],
}));

app.get("/api/v1/flashcards/random", async (req, res) => {
    const prisma = new PrismaClient();
    const count = await prisma.flashcard.count();
    const skip = Math.floor(Math.random() * count);
    const result = await prisma.flashcard.findMany({
        take: 5,
        skip: skip,
    });
    await res.status(200).json({
        status: "success",
        result,
    });
});

app.post("/api/v1/flashcards/", async (req, res) => {
    const {
        word = "",
        description = "",
        translations = null,
    }: {
        translations: Translation[] | null,
        word: string,
        description: string,
    } = await req.body;

    if (word == "" || description == "" || (translations?.length ?? 0) <= 0) {
        return await res.status(400).json({
            status: "failed",
            message: "Bad request parameters",
        });
    }

    const prisma = new PrismaClient();
    const flashcards = await prisma.flashcard.create({
        data: {
            word,
            description,
            translations: {
                create: translations as Translation[],
            },
        },
    });
    if (!!!flashcards) {
        await prisma.$disconnect();
        return await res.status(409).json({
            status: "failed",
            result: "Failed to add flashcard",
        })
    }
    await prisma.$disconnect();
    return await res.status(200).json({
        status: "success",
        result: "Flashcard added successfully",
    });
});

