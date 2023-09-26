import express, { Router } from "express";
import { TestRoutes } from "../../moduloTest/test.routes";
import { ImageRoutes } from "../../image/image.routes";

export class RoutesApp {
  public router: express.Application;
  constructor() {

  }

  public routes(): Router[] {
    return [
      new TestRoutes().router,
      new ImageRoutes().router
      // Agregar routers de otros modulos al array
    ];
  }
}