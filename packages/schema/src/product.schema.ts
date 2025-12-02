// In your schema file (@repo/schema)
import { z } from "zod";

const imageSchema = z.object({
  url: z.string(),
  publicId: z.string(),
  bytes: z.number().optional(),
  original_filename: z.string().optional(),
});

export const variantSchema = z.object({
  selling_price: z.number().positive("Selling price must be positive"),
  mrp: z.number().positive("MRP must be positive"),
  unit: z.string().min(1, "Please select unit"),
  unit_value: z.string().min(1, "Please enter unit value"),
  stock: z.number().min(0, "Stock cannot be negative"),
  sku: z.string().min(1, "Please enter SKU"),
  prod_img: z.array(imageSchema).min(1, "At least one image is required"),
});

// Form schema (what the form uses)
export const productFormSchema = z.object({
  title: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be under 100 characters"),
  description: z
    .string()
    .min(2, "Product description must be at least 2 characters")
    .max(500, "Product description must be under 500 characters"),
  categoryId: z.string().min(1, "Please select category"),
  store: z.string().min(1, "Please select store"),
  // Variant fields (used for building variants, not submitted directly)
  unit: z.string().optional(),
  sku: z.string().optional(),
  unit_value: z.string().optional(),
  selling_price: z.string().optional(),
  mrp: z.string().optional(),
  stocks: z.string().optional(),
});

// Submission schema (what gets sent to API)
export const productSubmissionSchema = z.object({
  title: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be under 100 characters"),
  description: z
    .string()
    .min(2, "Product description must be at least 2 characters")
    .max(500, "Product description must be under 500 characters"),
  categoryId: z.string().min(1, "Please select category"),
  storeId: z.string().min(1, "Please select store"),
  variants: z.array(variantSchema).min(1, "At least one variant is required"),
});

export const productEditSchema = z.object({
  title: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be under 100 characters"),
  description: z
    .string()
    .min(2, "Product description must be at least 2 characters")
    .max(500, "Product description must be under 500 characters"),
  categoryId: z.string().min(1, "Please select category"),
  storeId: z.number().min(1, "Please select store"),
});

export type ProductFormInput = z.infer<typeof productFormSchema>;
export type ProductSubmission = z.infer<typeof productSubmissionSchema>;
export type ProductEditType = z.infer<typeof productEditSchema>;
