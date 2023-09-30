import express, { Router } from "express";
import { ProductRoutes } from "../../modules/product/product.routes";
import { CategoryRoutes } from "../../modules/category/category.routes";
import { AuthRoutes } from "../../modules/auth/auth.routes";
import { UserRoutes } from "../../modules/user/user.routes";

export class RoutesAppStore {
  public router: express.Application;
  constructor() {

  }

  public routes(): Router[] {
    return [
      new AuthRoutes().router,
      new UserRoutes().router,
      new CategoryRoutes().router,
      new ProductRoutes().router,
    ];
  }
}