import fileUpload from "express-fileupload";
import { BaseRouter } from "../../shared/router/router";
import { ImageController } from "./image.controller";
import { ImageMiddlewares as ImageMiddlewares } from "./image.middlewares";

export class ImageRoutes extends BaseRouter<ImageController, ImageMiddlewares> {
  constructor(){
    super(ImageController, ImageMiddlewares, "image");

    this.router.use(fileUpload())
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      (req, res, next) => this.middleware.testMidd(req, res, next),
      (req, res) => this.controller.postController(req, res)
    );
    
    // UPDATE - PUT
    this.router.put(
      `/${path}/:id`,
      (req, res, next) => this.middleware.testMidd(req, res, next),
      (req, res) => this.controller.putController(req, res)
    )
    
    // DELETE
    this.router.delete(
      `/${path}/:id`,
      (req, res, next) => this.middleware.testMidd(req, res, next),
      (req, res) => this.controller.deleteController(req, res)
    )
  }
}