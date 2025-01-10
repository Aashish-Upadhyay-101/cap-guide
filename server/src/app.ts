import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

import { httpContextMiddleware } from "./middlewares/httpContext";
import AuthRouter from "./modules/auth/auth.router";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app: Express = express();

// middlewares
app.use(express.json());
app.use(httpContextMiddleware);

// routers
const authRouter = new AuthRouter();

app.use("/api/v1/auth", authRouter.getRoutes());

// global error handler
app.use(globalErrorHandler);

export default app;
