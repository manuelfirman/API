import { z } from "zod";

export class ProductValidator {
  postValidatorSchema = z.object({
    name: z.string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),
    description: z.string()
    .nonempty("Name is required")
    .min(3, "Description must be at least 3 characters long")
    .max(200, "Description must be at most 200 characters long"),
    price: z.number().nonnegative("Number must be positive"),
    category: z.string().nonempty("Category is required"),
  });

  putValidatorSchema = z.object({
    name: z.string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),
    description: z.string()
    .min(3, "Description must be at least 3 characters long")
    .max(200, "Description must be at most 200 characters long"),
    price: z.number().nonnegative("Number must be positive"),
    category: z.string(),
  });
}