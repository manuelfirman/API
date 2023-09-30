import { BaseMiddlewareMongo } from "../../shared/middlewares/middleware.mongo";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { NextFunction, Request, Response } from "express-serve-static-core";
import { httpError } from "../../../shared/utils/errorHandler";
import { ZodError } from "zod";
import { UserValidator } from "./user.valid";

export class UserMiddleware extends BaseMiddlewareMongo<IUser> {
  constructor(){
    super(User);
  }

  validatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const postValidatorSchema = new UserValidator().postValidatorSchema;
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

  validatePut(req: Request, res: Response, next: NextFunction) {
    try {
      const putValidatorSchema = new UserValidator().putValidatorSchema;
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