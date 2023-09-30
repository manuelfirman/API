import { BaseRouter } from "shared/router/router";
import { UserController } from "./user.controller";
import { UserMiddleware } from "./user.middleware";

export class UserRoutes extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(UserController, UserMiddleware, "user");
  }
  
  routes(path: string): void {
    // GET ALL
    this.router.get(
      `/${path}/`,
      (req, res) => this.controller.getAllController(req, res)
    );

    // GET BY ID
    this.router.get(
      `/${path}/:id`,
      (req, res) => this.controller.getByIdController(req, res)
    );

    // CREATE - POST
    this.router.post(
      `/${path}/`,
      (req, res, next) => this.middleware.validatePost(req, res, next),
      (req, res) => this.controller.postController(req, res)
    );

    // UPDATE - PUT
    this.router.put(
      `/${path}/:id`,
      (req, res, next) => this.middleware.validatePut(req, res, next),
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