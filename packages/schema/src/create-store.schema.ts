// src/schemas/storeCreation.schema.ts
import { z } from "zod";

// Step 1: KYC Validation
export const kycSchema = z.object({
  pancard: z
    .string()
    .min(10, "PAN must be 10 characters")
    .max(10, "PAN must be 10 characters")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  aadhar: z
    .string()
    .min(12, "Aadhar must be 12 digits")
    .max(12, "Aadhar must be 12 digits")
    .regex(/^[0-9]{12}$/, "Invalid Aadhar format"),
  gst: z
    .string()
    .min(15, "GST must be at least 15 characters")
    .optional(),
});

// Step 2: Store Details Validation
export const storeDetailsSchema = z.object({
  shop_name: z.string().min(2, "Shop name must be at least 2 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  home_delivery: z.boolean().optional().or(z.literal(false)),
  delivery_charge: z
    .number()
    .min(0, "Delivery charge must be positive")
    .optional()
    .or(z.literal(0)),
  handling_charge: z
    .number()
    .min(0, "Handling charge must be positive")
    .optional()
    .or(z.literal(0)),
  free_delivery_after: z
    .number()
    .min(0, "Free delivery amount must be positive")
    .optional()
    .or(z.literal(0)),
});

// Step 3: Address Validation
export const addressSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  contact: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid phone number")
    .length(10, "Phone number must be 10 digits"),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(100),
  city: z.string().min(2, "City is required").max(100),
  state: z.string().min(2, "State is required").max(100),
  pincode: z
    .string()
    .regex(/^[1-9][0-9]{5}$/, "Invalid pincode")
    .length(6, "Pincode must be 6 digits"),
  lat: z.number(),
  long: z.number(),
  district: z.string().min(2, "District is required").max(100),
  landmark: z.string().max(50).optional(),
});

// Step 4: Bank Details Validation
export const bankDetailsSchema = z.object({
  name: z.string().min(2, "Account holder name is required"),
  account_number: z
    .string()
    .min(9, "Account number must be at least 9 digits")
    .max(18, "Account number cannot exceed 18 digits")
    .regex(/^[0-9]+$/, "Account number must contain only digits"),
  ifsc_code: z
    .string()
    .length(11, "IFSC code must be 11 characters")
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format"),
  bank_name: z.string().min(2, "Bank name is required"),
  branch: z.string().min(2, "Branch name is required"),
});

// Complete Store Creation Schema (for final submission)
export const completeStoreCreationSchema = z.object({
  kycDetails: kycSchema,
  storeDetails: storeDetailsSchema,
  addressDetails: addressSchema,
  bankDetails: bankDetailsSchema,
});

export type KycDetailsType = z.infer<typeof kycSchema>;
export type StoreDetailsType = z.infer<typeof storeDetailsSchema>;
export type AddressDetailsType = z.infer<typeof addressSchema>;
export type BankDetailsType = z.infer<typeof bankDetailsSchema>;
export type CompleteStoreCreationType = z.infer<
  typeof completeStoreCreationSchema
>;
