import { NextFunction, Request, Response } from "express";
import { BaseMiddleware } from "../shared/middlewares/middleware.postgres";
import { TestEntity } from "./test.entity";

export class TestMiddlewares extends BaseMiddleware<TestEntity> {
  constructor(){
    super(TestEntity);
  }

  async testMidd(req: Request, res: Response, next: NextFunction){
    console.log("Test Middleware Postgres");
    next();
  }

  // Agregar middlewares especificos necesarios 
}