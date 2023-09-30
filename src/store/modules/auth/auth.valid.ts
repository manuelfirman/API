import { z } from "zod";

export class AuthValidator {
  loginSchema = z.object({
    email: z.string()
    .nonempty("Email is required")
    .email("Email is invalid"),
    password: z.string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(30, "Password must be at most 30 characters long"),
  });

  registerSchema = z.object({
    email: z.string()
    .nonempty("Email is required")
    .email("Email is invalid"),
    password: z.string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(30, "Password must be at most 30 characters long"),
    username: z.string()
    .nonempty("Username is required")
    .min(6, "Username must be at least 6 characters long")
    .max(30, "Username must be at most 30 characters long"),
  });

  forgotPasswordSchema = z.object({
    email: z.string()
    .nonempty("Email is required")
    .email("Email is invalid"),
  });

  resetPasswordSchema = z.object({
    password: z.string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(30, "Password must be at most 30 characters long"),
  });
}