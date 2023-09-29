import { BaseMiddlewareMongo } from "../../shared/middlewares/middleware.mongo";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

export class ProductMiddlewares extends BaseMiddlewareMongo<IProduct> {
  constructor(){
    super(Product);
  }
}