import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";

export class ImageMiddlewares {
  constructor() {
    
  }

  testMidd(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    next();
  }
}