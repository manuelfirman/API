import { BaseRouter } from "../../../shared/router/router";
import { AuthController } from "./auth.controller";
import { AuthMiddleware } from "./auth.middleware";

export class AuthRoutes extends BaseRouter<AuthController, AuthMiddleware> {
  constructor(){
    super(AuthController, AuthMiddleware, "auth");
  }

  routes(path: string): void {
    // LOGIN
    this.router.post(
      `/${path}/login`,
      (req, res, next) => this.middleware.validateLogin(req, res, next),
      (req, res) => this.controller.loginController(req, res)
    );

    // REGISTER
    this.router.post(
      `/${path}/register`,
      (req, res, next) => this.middleware.validateRegister(req, res, next),
      (req, res) => this.controller.registerController(req, res)
    );

    // VERIFY USER
    this.router.get(
      `/${path}/verify/:code`,
      (req, res) => this.controller.verifyUserController(req, res)
    );

    // FORGOT PASSWORD
    this.router.post(
      `/${path}/forgot-password`,
      (req, res, next) => this.middleware.validateForgotPassword(req, res, next),
      (req, res) => this.controller.forgotPasswordController(req, res)
    );

    // RESET PASSWORD
    this.router.post(
      `/${path}/reset-password/:code`,
      (req, res, next) => this.middleware.validateResetPassword(req, res, next),
      (req, res) => this.controller.resetPasswordController(req, res)
    );
  }
}