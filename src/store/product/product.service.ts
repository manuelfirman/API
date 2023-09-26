import { BaseServiceMongo } from "../shared/services/servicesMongo";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

export class ProductServices extends BaseServiceMongo<IProduct> {
    constructor(){
      super(Product);
    }
}