import { BaseServiceMongo } from "store/shared/services/servicesMongo";
import { IUser } from "./user.interface";
import { User } from "./user.model";

export class UserService extends BaseServiceMongo<IUser> {
  constructor(){
    super(User);
  }
}