import { Document, Model } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { httpError } from "../../../shared/utils/errorHandler.util";
import { JWTHandler } from "../../../shared/utils/jwtHandler";
import { User } from "../../modules/user/user.model";
import { CustomRequest } from "@types";


export abstract class BaseMiddlewareMongo<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>){
    this.model = model;
  }

  public testMidd(req: Request, res: Response, next: NextFunction): void {
    console.log("Test middleware Mongo");
    next();
  }

  public authMiddleware(req: CustomRequest, res: Response, next: NextFunction): void {
    const auth = req.headers.authorization;
    if(!auth)
      return httpError.response(res, 401, "No token provided");

    const token = auth.split("").pop() as string;
    const jwtHandler = new JWTHandler();
    const dataToken = jwtHandler.verifyToken(token);

    if(!dataToken) 
      return httpError.response(res, 401, "Invalid token");
    
    const userId = dataToken as { userId: string};
    const user = User.findById(userId).select("-password");
    if(!user)
      return httpError.response(res, 401, "Invalid token");

    req.user = user;

    next();
  }

  public checkFiles(req: Request, res: Response, next: NextFunction): void | Response {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    
    next();
  }

  public checkFilesExtension(req: Request, res: Response, next: NextFunction): void | Response {
    const files = Array.isArray(req.files) ? req.files : [req.files];
    for (const key in files) {
      const file = files[key];

      if (!file || !file.name) {
        continue;
      }

      const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".jfif"];
      const fileExtension = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();
  
      if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).send(`Tipo de archivo no permitido: ${file.name}`);
      }

      const maxFileSize = 10 * 1024 * 1024; // 10 MB
      if (file.size > maxFileSize) {
        return res.status(400).send(`El archivo ${file.name} es demasiado grande.`);
      }
    }

    next();
  }
}