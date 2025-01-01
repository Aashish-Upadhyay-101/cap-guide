import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

import { httpContextMiddleware } from "./middlewares/httpContext";

const app: Express = express();

// middlewares
app.use(httpContextMiddleware);

// routers

app.get("/", (req, res) => {
  res.status(401).json({ message: "hello world" });
});

export default app;
