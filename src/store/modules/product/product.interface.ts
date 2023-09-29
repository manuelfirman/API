import { IBaseEntity } from "store/shared/models/baseSchema";
import { ObjectId } from "mongoose";

export interface IProduct extends IBaseEntity {
  name: string;
  description: string;
  price: number;
  category: ObjectId;
  images: {
    public_id: string;
    url: string;
  }[];
}