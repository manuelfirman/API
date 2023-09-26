import mongoose from "mongoose";
import { BaseSchema } from "../shared/models/baseSchema";
import { ICategory } from "./category.interface";

export class CategorySchema extends BaseSchema<ICategory> {
  constructor() {
    super();
    this.schema.add({
      name: { 
        type: String, 
        required: true 
      },
      description: { 
        type: String, 
        required: true 
      },
      images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
    });
  }
}

export const Category: mongoose.Model<ICategory> = mongoose.model<ICategory>("Category", new CategorySchema().schema);