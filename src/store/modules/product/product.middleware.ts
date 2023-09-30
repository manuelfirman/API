import { NextFunction, Request, Response } from "express";
import { BaseMiddlewareMongo } from "../../shared/middlewares/middleware.mongo";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";
import { ProductValidator } from "./product.valid";
import { ZodError } from "zod";
import { httpError } from "../../../shared/utils/errorHandler";

export class ProductMiddlewares extends BaseMiddlewareMongo<IProduct> {
  constructor(){
    super(Product);
  }

  validatePost(req: Request, res: Response, next: NextFunction): void | Response {
    try {
      const postValidatorSchema = new ProductValidator().postValidatorSchema;
      postValidatorSchema.parse(req.body);
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
      const putValidatorSchema = new ProductValidator().postValidatorSchema;
      putValidatorSchema.parse(req.body);
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