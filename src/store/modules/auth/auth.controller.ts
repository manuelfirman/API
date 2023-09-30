import { httpError } from "../../../shared/utils/errorHandler";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { Crypt } from "../../../shared/utils/cryptHandler";
import { User } from "../../modules/user/user.model";
import { IUser } from "../../modules/user/user.interface";
import { v4 as uuid } from "uuid";

export class AuthController extends AuthService {
  constructor() {
    super();
  }

  async loginController(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const user = await this.getByEmailService(email);
      if (!user)
        return httpError.response(res, 400, "Email or password is incorrect");

      const checkPassword = Crypt.comparePassword(password, user.password);
      
      if(!checkPassword)
        return httpError.response(res, 400, "Email or password is incorrect");
      

      res.status(200).json({
        status: "Login successfully",
        response: user,
      });

    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }

  async registerController(req: Request, res: Response): Promise<void> {
    const { email, password, username } = req.body;

    try {
      const checkUser = await this.getByEmailService(email);
      if (checkUser) 
        return httpError.response(res, 400, "Email already exists");
      
      const user: IUser = new User({
        email,
        password: await Crypt.hashPassword(password),
        username,
        verified: false,
        code: uuid(),
      });

      const result = await this.postService(user);

      res.status(200).json({
        status: "Register successfully",
        response: result,
      });

    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
    
  }

  async verifyUserController(req: Request, res: Response) {
    const { id, code } = req.params;
    try {
      const user = await this.getByIdService(id);
      if(!user)
        return httpError.response(res, 400, "User not found");

      if(user.code !== code)
        return httpError.response(res, 400, "Code is incorrect");

      user.verified = true;
      user.code = "";

      const result = await this.saveService(user);

      res.status(200).json({
        status: "Verify successfully",
        response: result,
      });

    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }

  async forgotPasswordController(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const user = await this.getByEmailService(email);
      if(!user)
        return httpError.response(res, 400, "User not found");

      if(!user.verified)
        return httpError.response(res, 400, "User not verified");

      // !! SEND EMAIL HERE !!

      user.code = uuid();
      const result = await this.saveService(user);

      res.status(200).json({
        status: "Code sent",
        response: {
          code: result.code,
        },
      });

    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }

  async resetPasswordController(req: Request, res: Response) {
    const { id, code } = req.params;
    const { password } = req.body;
    try {
      const user = await this.getByIdService(id);
      if(!user)
        return httpError.response(res, 400, "User not found");

      if(user.code !== code)
        return httpError.response(res, 400, "Code is incorrect");

      user.password = await Crypt.hashPassword(password);
      user.code = "";

      const result = await this.saveService(user);
      
      res.status(200).json({
        status: "Reset password successfully",
        response: result,
      });

    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }

}