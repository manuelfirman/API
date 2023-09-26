// import { Request, Response } from "express";
// import { NextFunction } from "express-serve-static-core";
import { BaseMiddlewareMongo } from "../shared/middlewares/middleware.mongo";
import { IImage } from "./image.interface";
import { Image } from "./image.model";

export class ImageMiddlewares extends BaseMiddlewareMongo<IImage>{
  constructor() {
    super(Image);
  }


}