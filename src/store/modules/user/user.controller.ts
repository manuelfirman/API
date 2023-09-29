import { httpError } from "shared/utils/errorHandler.util";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { IUser } from "./user.interface";
import { User } from "./user.model";

export class UserController extends UserService {
  constructor() {
    super();
  }

  async getAllController(req: Request, res: Response) {
    try {
      const result = await this.getAllService();
      res.status(200).json({
        status: "success",
        response: result,
      });

    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }

  async getByIdController(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await this.getByIdService(id);

      res.status(200).json({
        status: "success",
        response: result,
      });

    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }

  async postController(req: Request, res: Response) {
    const { email, password, username, role } = req.body;
    const user: IUser = new User({
      email,
      password,
      username,
      role,
      verified: true,
      code: "",
    });

    try {
      const result = await this.postService(user);
      
      res.status(200).json({
        status: "success",
        response: result,
      });

    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }

  async putController(req: Request, res: Response) {
    const { id } = req.params;
    const { email, username, role } = req.body;
    try {
      const updatedUser: Partial<IUser> = {};

      if(email) updatedUser.email = email;
      if(username) updatedUser.username = username;
      if(role) updatedUser.role = role;
      
      const result = await this.putService(id, updatedUser);
      res.status(200).json({
        status: "success",
        response: result,
      });

    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }

  async deleteController(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await this.deleteService(id);

      res.status(200).json({
        status: "success",
        response: result,
      });

    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }
}