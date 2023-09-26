import { BaseMiddlewareMongo } from "../shared/middlewares/middleware.mongo";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";

export class CategoryMiddleware extends BaseMiddlewareMongo<ICategory> {
  constructor() {
    super(Category);
  }
}