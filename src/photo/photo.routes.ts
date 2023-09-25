import { BaseRouter } from "../shared/router/router";
import { PhotoController } from "./photo.controller";
import { PhotoMiddlewares } from "./photo.middlewares";

export class PhotoRoutes extends BaseRouter<PhotoController, PhotoMiddlewares> {
  constructor(){
    super(PhotoController, PhotoMiddlewares, "photo");
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