import express, { Router } from "express";
import { TestRoutes } from "../../moduloTest/test.routes";
import { PhotoRoutes } from "../../photo/photo.routes";

export class RoutesApp {
  public router: express.Application;
  constructor() {}

  public routes(): Router[] {
    return [
      new TestRoutes().router,
      new PhotoRoutes().router
      // Agregar routers de otros modulos al array
    ];
  }
}