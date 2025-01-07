import express, { NextFunction, Request, Response, Router } from "express";

type RouteSetup = (router: Router) => void;
type Middleware = (req: Request, res: Response, next: NextFunction) => void;

class BaseRouter {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public setRoutes(routeSetup: RouteSetup): void {
    routeSetup(this.router);
  }

  public getRoutes() {
    return this.router;
  }

  public use(middlewares: Middleware[]) {
    middlewares.forEach((middleware) => this.router.use(middleware));
  }
}

export default BaseRouter;
