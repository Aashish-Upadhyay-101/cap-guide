import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

import { httpContextMiddleware } from "./middlewares/httpContext";
import AuthRouter from "./modules/auth/auth.router";

const app: Express = express();

// middlewares
app.use(httpContextMiddleware);

// routers
const authRouter = new AuthRouter();

app.use(authRouter.getRoutes());

app.get("/", (req, res) => {
  res.status(401).json({ message: "hello world" });
});

export default app;
