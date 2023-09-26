import express, { Router } from "express";
import { ProductRoutes } from "../../product/product.routes";
import { CategoryRoutes } from "../../category/category.routes";
import { ImageRoutes } from "../../image/image.routes";

export class RoutesApp {
  public router: express.Application;
  constructor() {

  }

  public routes(): Router[] {
    return [
      new ImageRoutes().router,
      new CategoryRoutes().router,
      new ProductRoutes().router
      // Agregar routers de otros modulos al array
    ];
  }
}