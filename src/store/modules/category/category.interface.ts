import { IBaseEntity } from "store/shared/models/baseSchema";

export interface ICategory extends IBaseEntity {
  name: string;
  description: string;
  images: object[];
}