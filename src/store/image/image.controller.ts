
import { cloudinary } from "../../shared/utils/cloudinary";
import { httpError } from "../../shared/utils/errorHandler.util";
import { Image } from "./image.model";
import fs from 'fs';
import { ImageServices } from "./image.services";
import { Request, Response } from "express";

export class ImageController extends ImageServices {
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
    const { name, description } = req.body;
    try {

      if (!req.files || Object.keys(req.files).length === 0) {
        return httpError.response(res, 400, "No files were uploaded.");
      }

        const tempFilePath = (Array.isArray(req.files.image) ? req.files.image[0].tempFilePath : req.files.image.tempFilePath); 
  
        const upload = await cloudinary.uploadImage(tempFilePath);
      
        const file = new Image ({
          name,
          description,
          image: {
            public_id: upload.public_id,
            url: upload.url
          } 
        });

        const result = await this.postService(file);

        await fs.unlink(tempFilePath, (error) => ( (error) ? console.log(error) : null));
        
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