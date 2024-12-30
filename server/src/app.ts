import express, { Express } from "express";

import dotenv from "dotenv";
dotenv.config();

import logger from "./config/logger";

const app: Express = express();

// middlewares

// routers

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

export default app;
