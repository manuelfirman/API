import { BaseServiceMongo } from "../../shared/services/servicesMongo";
import { IUser } from "../../modules/user/user.interface";
import { User } from "../../modules/user/user.model";

export class AuthService extends BaseServiceMongo<IUser> {
  constructor() {
    super(User);
  }

  async getByEmailService(email: string): Promise<IUser | null> {
    return this.model.findOne({ email });
  }

  async getByCodeService(code: string): Promise<IUser | null> {
    return this.model.findOne({ code });
  }

}