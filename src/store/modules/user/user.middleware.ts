import { BaseMiddlewareMongo } from "store/shared/middlewares/middleware.mongo";
import { IUser } from "./user.interface";
import { User } from "./user.model";

export class UserMiddleware extends BaseMiddlewareMongo<IUser> {
  constructor(){
    super(User);
  }
}