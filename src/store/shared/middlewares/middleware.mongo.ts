import { Document, Model } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { httpError } from "shared/utils/errorHandler.util";


export abstract class BaseMiddlewareMongo<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>){
    this.model = model;
  }

  public testMidd(req: Request, res: Response, next: NextFunction): void {
    console.log("Test middleware Mongo");
    next();
  }

  public checkFiles(req: Request, res: Response, next: NextFunction) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    console.log("Files Checked");
    
    next();
  }

  public checkFilesExtension(req: Request, res: Response, next: NextFunction) {
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
    console.log("Files Extension Checked");
    next();
  }
}