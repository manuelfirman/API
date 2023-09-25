import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";

export class PhotoMiddlewares {
  constructor() {
    
  }

  testMidd(req: Request, res: Response, next: NextFunction) {
    console.log("Middleware test Photo");
    next();
  }
}