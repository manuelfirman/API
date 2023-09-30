import { NextFunction, Request, Response } from "express";
import { BaseMiddlewareMongo } from "../../shared/middlewares/middleware.mongo";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";
import { httpError } from "../../../shared/utils/errorHandler";
import { CategoryValidator } from "./category.valid";
import { ZodError } from "zod";
export class CategoryMiddleware extends BaseMiddlewareMongo<ICategory> {
  constructor() {
    super(Category);
  }

  validatePost(req: Request, res: Response, next: NextFunction): void | Response {
    try {
      const categorySchema = new CategoryValidator().categorySchema;
      categorySchema.parse(req.body);
      next();
    } catch (error) {
      if(error instanceof ZodError){
        return res.status(400).json(
          error.issues.map((issue) => ({ message: issue.message }))
          );
      }
      
      httpError.internal(res, 500, error as Error);
    }
  }

  validatePut(req: Request, res: Response, next: NextFunction): void | Response {
    try {
      const categoryUpdateSchema = new CategoryValidator().categoryUpdateSchema;
      categoryUpdateSchema.parse(req.body);
      next();
    } catch (error) {
      if(error instanceof ZodError){
        return res.status(400).json(
          error.issues.map((issue) => ({ message: issue.message }))
          );
      }
      
      httpError.internal(res, 500, error as Error);
    }
  }
}