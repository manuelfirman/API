import { httpError } from "../shared/utils/errorHandler.util";
import { PhotoServices } from "./photo.services";
import { Request, Response } from "express";

export class PhotoController extends PhotoServices {
  constructor(){
    super();
  }

  async getAllController(req: Request, res: Response) {
    try {
      const result = await this.getAllService();
      
      res.status(200).json({
          status: "success",
          response: result
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
          response: result
      });

    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }


  async postController(req: Request, res: Response) {
    const body = req.body;
    try {
      const result = await this.postService(body);
      
      res.status(200).json({
          status: "success",
          response: result
      });

    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }

  async putController(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body;

    try {
      const result = await this.putService(id, body);

      res.status(200).json({
        status: "success",
        response: result
    });
    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }

  async deleteController(req: Request, res: Response){
    const { id } = req.params;

    try {
      const result = await this.deleteService(id);

      res.status(200).json({
        status: "success",
        response: result
      });
    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }
}