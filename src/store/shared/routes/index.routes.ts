import express, { Router } from "express";
import { ProductRoutes } from "../../modules/product/product.routes";
import { CategoryRoutes } from "../../modules/category/category.routes";

export class RoutesApp {
  public router: express.Application;
  constructor() {

  }

  public routes(): Router[] {
    return [
      new CategoryRoutes().router,
      new ProductRoutes().router
      // Agregar routers de otros modulos al array
    ];
  }
}