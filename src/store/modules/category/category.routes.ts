// import { BaseRouter } from "shared/router/router";
import { BaseRouter } from "../../../shared/router/router";
import { CategoryController } from "./category.controller";
import { CategoryMiddleware } from "./category.middleware";

export class CategoryRoutes extends BaseRouter<CategoryController, CategoryMiddleware> {
  constructor() {
    super(CategoryController, CategoryMiddleware, "category");
  }

  routes(path: string): void {
/**
 * @swagger
 * tags:
 *   - name: "Category"
 *     description: "Category endpoints"
 * 

 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *        - description
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of the category
 *        name:
 *          type: string
 *          description: The name of the category
 *        description:
 *          type: string
 *          description: The description of the category
 *        images:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              public_id:
 *                type: string
 *              url:
 *                type: string
 *      example:
 *        _id: "65132ba95f26224733bbabdb"
 *        name: "Name"
 *        description: "description of the category"
 *        images:
 *          - public_id: "12345"
 *            url: "http://www.url.com/12345.jpg"
 */

    
    /**
     * @swagger
     * /api/store/category:
     *  get:
     *    summary: Get all categories
     *    tags:
     *     - Category
     *    responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: "#/components/schemas/Category"
     *      500:
     *       description: Internal Server Error
     */
    this.router.get(
      `/${path}`,
      (req, res) => this.controller.getAllController(req, res)
    );

    /**
     * @swagger
     * /api/store/category/{categoryId}:
     *  get:
     *    summary: Get category by Id
     *    tags: [Category]
     *    parameters:
     *    - in: path
     *      name: categoryId
     *      required: true
     *      description: ID of the category to get
     *      schema: 
     *        type: string
     *    responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: "#/components/schemas/Category"
     *      404:
     *        description: Category not found
     *      500:
     *        description: Internal Server Error
     */
    this.router.get(
      `/${path}/:id`,
      (req, res) => this.controller.getByIdController(req, res)
    );

    
    /**
     * @swagger
     * /api/store/category:
     *  post:
     *    summary: Create a new category
     *    tags: [Category]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: "#/components/schemas/Category"
     *    responses:
     *      200:
     *        description: Category created successfully
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/Category"
     *      404:
     *        description: Category not found
     *      500:
     *        description: Internal Server Error
     */
    this.router.post(
      `/${path}`,
      (req, res, next) => this.middleware.validatePost(req, res, next),
      (req, res, next) => this.middleware.checkFiles(req, res, next),
      (req, res, next) => this.middleware.checkFilesExtension(req, res, next),
      (req, res) => this.controller.postController(req, res)
    );

        /**
     * @swagger
     * /api/store/category:
     *  put:
     *    summary: Update a category
     *    tags: [Category]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: "#/components/schemas/Category"
     *    responses:
     *      200:
     *        description: Category created successfully
     *        content:
     *          application/json:
     *            schema:
     *              $ref: "#/components/schemas/Category"
     *      404:
     *        description: Category not found
     *      500:
     *        description: Internal Server Error
     */
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