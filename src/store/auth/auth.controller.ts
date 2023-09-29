import { httpError } from "shared/utils/errorHandler.util";
import { IAuth } from "./auth.interface";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

export class AuthController extends AuthService {
  constructor() {
    super();
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await this.getByEmailService(email);
      if (!user) {
        return httpError.response(res, 400, "Email or password is incorrect");
      }

      // const checkPassword = 



      if (user.password !== password) {
        return httpError.response(res, 400, "Email or password is incorrect");
      }

      return res.status(200).json({
        status: "Login successfully",
        response: user,
      });
    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }
}