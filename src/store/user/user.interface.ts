import { IBaseEntity } from "store/shared/models/baseSchema";

export interface IUser extends IBaseEntity {
  username: string;
  email: string;
  password: string;
  role: string;
  image: object[];
}