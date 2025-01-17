import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

import { httpContextMiddleware } from "./middlewares/httpContext";
import AuthRouter from "./modules/auth/auth.router";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { UserDTO } from "./modules/user/user.dto";
import WorkspaceRouter from "./modules/workspace/workspace.router";

const app: Express = express();

declare global {
  namespace Express {
    interface Request {
      user?: UserDTO;
    }
  }
}

// middlewares
app.use(express.json());
app.use(httpContextMiddleware);

// routers
const authRouter = new AuthRouter();
const workspaceRouter = new WorkspaceRouter();

app.use("/api/v1/auth", authRouter.getRoutes());
app.use("/api/v1/workspace", workspaceRouter.getRoutes());

// global error handler
app.use(globalErrorHandler);

export default app;
