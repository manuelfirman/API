import { BaseServiceMongo } from "../../shared/services/servicesMongo";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";

export class CategoryService extends BaseServiceMongo<ICategory> {
  constructor() {
    super(Category);
  }
}