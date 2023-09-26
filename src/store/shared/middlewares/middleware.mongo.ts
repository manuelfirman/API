import { Document, Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

export abstract class BaseMiddlewareMongo<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>){
    this.model = model;
  }

  testMidd(req: Request, res: Response, next: NextFunction): void {
    console.log("Test middleware Mongo");
    next();
  }
}