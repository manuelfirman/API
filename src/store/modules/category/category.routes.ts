// import { BaseRouter } from "shared/router/router";
import { BaseRouter } from "../../../shared/router/router";
import { CategoryController } from "./category.controller";
import { CategoryMiddleware } from "./category.middleware";

export class CategoryRoutes extends BaseRouter<CategoryController, CategoryMiddleware> {
  constructor() {
    super(CategoryController, CategoryMiddleware, "category");
  }

  routes(path: string): void {
    // GET ALL
    this.router.get(
      `/${path}`,
      (req, res) => this.controller.getAllController(req, res)
    );

    // GET BY ID
    this.router.get(
      `/${path}/:id`,
      (req, res) => this.controller.getByIdController(req, res)
    );

    // CREATE - POST
    this.router.post(
      `/${path}`,
      (req, res, next) => this.middleware.validatePost(req, res, next),
      (req, res, next) => this.middleware.checkFiles(req, res, next),
      (req, res, next) => this.middleware.checkFilesExtension(req, res, next),
      (req, res) => this.controller.postController(req, res)
    );

    // UPDATE - PUT
    this.router.put(
      `/${path}/:id`,
      (req, res, next) => this.middleware.validatePut(req, res, next),
      (req, res) => this.controller.putController(req, res)
    );

    // PUT - ADD IMAGE
    this.router.put(
      `/${path}/addimages/:id`,
      (req, res, next) => this.middleware.checkFiles(req, res, next),
      (req, res, next) => this.middleware.checkFilesExtension(req, res, next),
      (req, res) => this.controller.addImageController(req, res)
    );

    // PUT - DELETE IMAGE
    this.router.put(
      `/${path}/images/:id`,
      (req, res) => this.controller.deleteImageController(req, res)
    );

    // DELETE
    this.router.delete(
      `/${path}/:id`,
      (req, res) => this.controller.deleteController(req, res)
    );
  }
}