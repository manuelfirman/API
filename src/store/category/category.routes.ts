// import { BaseRouter } from "shared/router/router";
import { BaseRouter } from "../../shared/router/router";
import { CategoryController } from "./category.controller";
import { CategoryMiddleware } from "./category.middleware";
import fileUpload from "express-fileupload";

export class CategoryRoutes extends BaseRouter<CategoryController, CategoryMiddleware> {
  constructor() {
    super(CategoryController, CategoryMiddleware, "category");
    // this.router.use(fileUpload());
  }

  routes(path: string): void {
    // GET ALL
    this.router.get(
      `/${path}`,
      (req, res, next) => this.middleware.testMidd(req, res, next),
      (req, res) => this.controller.getAllController(req, res)
    );

    // GET BY ID
    this.router.get(
      `/${path}/:id`,
      (req, res, next) => this.middleware.testMidd(req, res, next),
      (req, res) => this.controller.getByIdController(req, res)
    );

    // CREATE - POST
    this.router.post(
      `/${path}`,
      (req, res, next) => this.middleware.checkFiles(req, res, next),
      (req, res, next) => this.middleware.checkFilesExtension(req, res, next),
      (req, res) => this.controller.postController(req, res)
    );

    // UPDATE - PUT
    this.router.put(
      `/${path}/:id`,
      (req, res, next) => this.middleware.testMidd(req, res, next),
      (req, res) => this.controller.putController(req, res)
    );

    // DELETE
    this.router.delete(
      `/${path}/:id`,
      (req, res, next) => this.middleware.testMidd(req, res, next),
      (req, res) => this.controller.deleteController(req, res)
    );
  }
}