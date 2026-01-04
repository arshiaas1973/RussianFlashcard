import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser);
app.use(cors({
    allowedHeaders: ["X-API-Key"],
    methods: ["POST","GET","PUT","DELETE"],
    origin: [process.env.FRONTEND_ORIGIN ?? "http://localhost:5173"],
}));

