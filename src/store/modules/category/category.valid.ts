import { z } from "zod";

export class CategoryValidator {
  categorySchema = z.object({
    name: z.string().nonempty("Name is required"),
    description: z.string().nonempty("Name is required"),
  });

  categoryUpdateSchema = z.object({
    name: z.string(),
    description: z.string(),
  });
}