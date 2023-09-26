import express, { Router } from "express";
import { ImageRoutes } from "../../image/image.routes";

export class RoutesApp {
  public router: express.Application;
  constructor() {

  }

  public routes(): Router[] {
    return [
      new ImageRoutes().router
      // Agregar routers de otros modulos al array
    ];
  }
}