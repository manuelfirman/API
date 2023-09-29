import mongoose from "mongoose";
import { BaseSchema } from "../../shared/models/baseSchema";
import { IProduct } from "./product.interface";

export class ProductSchema extends BaseSchema<IProduct> {
  constructor(){
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
      price: { 
        type: Number, 
        required: true 
      },
      category: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
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

export const Product: mongoose.Model<IProduct> = mongoose.model<IProduct>("Product", new ProductSchema().schema);