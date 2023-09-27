import { ProductServices } from "../product/product.service";
import { Request, Response } from "express";
import { httpError } from "../../shared/utils/errorHandler.util";
import { cloudinary } from "../../shared/utils/cloudinary";
import fs from "fs";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";
import { CategoryService } from "../category/category.service";


export class ProductController extends ProductServices {
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
    const { name, description, price, category } = req.body;

    try {
      const tempFilePaths = Array.isArray(req.files?.image)
        ? req.files?.image.map((file) => file.tempFilePath)
        : [req.files?.image.tempFilePath];

      if(!tempFilePaths) {
        return httpError.response(res, 400, "No files were uploaded.");
      }

      const categoryService = new CategoryService();
      const existCategory = await categoryService.getByIdService(category);

      if(!existCategory) {
        return httpError.response(res, 400, "Category not found");
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

      const newProduct: IProduct = new Product({
        name,
        description,
        price,
        category,
        images: images
      });

      const result = await this.postService(newProduct);
      
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
    const { name, description, price, category } = req.body;

    try {
      const categoryService = new CategoryService();
      const existCategory = await categoryService.getByIdService(category);

      if(!existCategory) {
        return httpError.response(res, 400, "Category not found");
      }

      const product: IProduct = new Product({
        name,
        description,
        price,
        category
      });
      const result = await this.putService(id, product);

      res.status(200).json({
        status: "success",
        response: result
      });
    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }

  async addImageToProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const product = await this.getByIdService(id);
      if(product === null) return httpError.response(res, 404, "Product not found");

      const tempFilePaths = Array.isArray(req.files?.image)
        ? req.files?.image.map((file) => file.tempFilePath)
        : [req.files?.image.tempFilePath];

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

      product.images = [...product.images, ...images];
      
      const result = await this.putService(id, product);
      
      res.status(200).json({
          status: "success",
          response: result
      });

    } catch (error) {
      httpError.internal(res, 500, error as Error);
    }
  }

  async deleteProductImage(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { public_id } = req.body;
    try {
      const product = await this.getByIdService(id);
      if(product === null) return httpError.response(res, 404, "Product not found");

      const image = product.images.find((image) => image.public_id === public_id);
      if(!image) return httpError.response(res, 404, "Image not found");

      await cloudinary.deleteImage(image.public_id);
      product.images = product.images.filter((image) => image.public_id !== public_id);

      const result = await this.putService(id, product);
      
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
      const product = await this.getByIdService(id);
      if(product === null) return httpError.response(res, 404, "Product not found");

      for(const image of product.images) {
        await cloudinary.deleteImage(image.public_id);
        console.log(image.public_id);
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