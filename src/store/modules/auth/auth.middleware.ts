import { NextFunction, Request, Response } from "express";
import { BaseMiddlewareMongo } from "../../shared/middlewares/middleware.mongo";
import { IUser } from "../../modules/user/user.interface";
import { User } from "../../modules/user/user.model";
import { AuthValidator } from "./auth.valid";
import { ZodError } from "zod";
import { httpError } from "../../../shared/utils/errorHandler";

export class AuthMiddleware extends BaseMiddlewareMongo<IUser> {
  constructor() {
    super(User);
  }

  validateLogin(req: Request, res: Response, next: NextFunction): void | Response {
    try {
      const loginSchema = new AuthValidator().loginSchema;
      loginSchema.parse(req.body);
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

  validateRegister(req: Request, res: Response, next: NextFunction): void | Response {
    try {
      const registerSchema = new AuthValidator().registerSchema;
      registerSchema.parse(req.body);
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

  validateForgotPassword(req: Request, res: Response, next: NextFunction): void | Response {
    try {
      const forgotPasswordSchema = new AuthValidator().forgotPasswordSchema;
      forgotPasswordSchema.parse(req.body);
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

  validateResetPassword(req: Request, res: Response, next: NextFunction): void | Response {
    try {
      const resetPasswordSchema = new AuthValidator().resetPasswordSchema;
      resetPasswordSchema.parse(req.body);
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