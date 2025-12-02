import z from "zod";
export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(500, "Category name must be under 500 characters"),
  url: z.string("Please upload an image"),
  publicId: z.string("Please upload an image"),
  original_filename: z.string("Please upload an image"),
  bytes: z.number("Please upload an image"),
});
