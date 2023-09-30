import express, { Router } from "express";
import { TestRoutes } from "../../moduloTest/test.routes";

export class RoutesAppSocialMedia {
  public router: express.Application;
  constructor() {

  }

  public routes(): Router[] {
    return [
      new TestRoutes().router
    ];
  }
}