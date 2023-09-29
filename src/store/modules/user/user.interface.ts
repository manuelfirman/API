import { IAuth } from "store/modules/auth/auth.interface";
import { IBaseEntity } from "store/shared/models/baseSchema";

export interface IUser extends IAuth, IBaseEntity {
  username: string;
  role: string;
  image: object[];
  verified?: boolean;
  code?: string;
}