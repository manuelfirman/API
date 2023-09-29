import { BaseMiddlewareMongo } from "store/shared/middlewares/middleware.mongo";
import { IUser } from "store/user/user.interface";
import { User } from "store/user/user.model";

export class AuthMiddleware extends BaseMiddlewareMongo<IUser> {
  constructor() {
    super(User);
  }

  checkRole(role: string) {
    
  }
}