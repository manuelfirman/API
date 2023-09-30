
import { Request, Response } from "express";
import { cloudinary } from "../../../shared/utils/cloudinary";
import { httpError } from "../../../shared/utils/errorHandler";
import { Category } from "./category.model";
import { CategoryService } from "./category.service";
import fs from "fs";
import { ICategory } from "./category.interface";

export class CategoryController extends CategoryService {
  constructor(){
    super();
  }

  async getAllController(req: Request, res: Response): Promise<void> {
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

  async getByIdController(req: Request, res: Response): Promise<void> {
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


  async postController(req: Request, res: Response): Promise<void> {
    const { name, description } = req.body;
    try{
      const tempFilePaths = Array.isArray(req.files?.image)
        ? req.files?.image.map((file) => file.tempFilePath)
        : [req.files?.image.tempFilePath];

        console.log(tempFilePaths);
      if(!tempFilePaths) {
        return httpError.response(res, 400, "No files were uploaded.");
      }

      const images = [];
      
      for(const tempFilePath of tempFilePaths) {
        const upload = await cloudinary.uploadImage(tempFilePath as string);
        
        images.push({
          public_id: upload.public_id,
          url: upload.url
        });
        
        await fs.unlink(tempFilePath as string, (error) => ( (error) ? console.log(error) : null));
      }

      const newCategory: ICategory = new Category ({
        name,
        description,
        images: images
      });

      const result = await this.postService(newCategory);

      res.status(200).json({
          status: "success",
          response: result
      });

    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }

  async putController(req: Request, res: Response): Promise<void> {
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

  async addImageController(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const category = await this.getByIdService(id);
      if(!category)
        return httpError.response(res, 404, "Category not found");
      
      const tempFilePaths = Array.isArray(req.files?.image)
        ? req.files?.image.map((file) => file.tempFilePath)
        : [req.files?.image.tempFilePath];

      if(!tempFilePaths) 
        return httpError.response(res, 400, "No files were uploaded.");

      const images = [];
      for(const tempFilePath of tempFilePaths) {
        const upload = await cloudinary.uploadImage(tempFilePath as string);
        
        images.push({
          public_id: upload.public_id,
          url: upload.url
        });
        
        await fs.unlink(tempFilePath as string, (error) => ( (error) ? console.log(error) : null));
      }

      category.images = [...category.images, ...images];

      const result = await this.putService(id, category);

      res.status(200).json({
          status: "success",
          response: result
      });

    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }

  async deleteImageController(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { public_id } = req.body;
    try {
      const category = await this.getByIdService(id);
      if(!category) 
        return httpError.response(res, 404, "Category not found");

      const image = category.images.find((image) => image.public_id === public_id);
      if(!image) return httpError.response(res, 404, "Image not found");

      await cloudinary.deleteImage(image.public_id);
      category.images = category.images.filter((image) => image.public_id !== public_id);

      const result = await this.putService(id, category);

      res.status(200).json({
          status: "success",
          response: result
      });
    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }

  async deleteController(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const category = await this.getByIdService(id);
      if(!category) 
        return httpError.response(res, 404, "Category not found");

      for(const image of category.images) {
        await cloudinary.deleteImage(image.public_id);
      }

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