import { z } from "zod";

export class UserValidator {
  postValidatorSchema = z.object({
    email: z.string()
    .nonempty("Email is required")
    .email("Email is invalid"),
    password: z.string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 3 characters long")
    .max(30, "Password must be at most 30 characters long"),
    username: z.string()
    .nonempty("Username is required")
    .min(6, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long"),
    role: z.string()
    .nonempty("Role is required")
    .min(6, "Role must be at least 3 characters long")
    .max(30, "Role must be at most 30 characters long"),
  });

  putValidatorSchema = z.object({
    email: z.string().email("Email is invalid"),
    password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(30, "Password must be at most 30 characters long"),
    username: z.string()
    .min(6, "Username must be at least 6 characters long")
    .max(30, "Username must be at most 30 characters long"),
    role: z.string()
    .min(6, "Role must be at least 6 characters long")
    .max(30, "Role must be at most 30 characters long"),
  });
}