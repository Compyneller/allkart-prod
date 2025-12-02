import z from "zod";
export const addressSchema = z.object({
  name: z
    .string()
    .min(2, "Shop name must be at least 2 characters")
    .max(50, "Name must be under 50 characters"),
  contact: z
    .string("Please enter correct contact number")
    .min(10, "Please enter correct contact number")
    .max(13, "Please enter correct contact number"),
  address: z
    .string("Please enter address")
    .max(100, "Address must be under 100 characters"),
  city: z
    .string("Please enter address")
    .max(100, "Address must be under 100 characters"),
  state: z
    .string("Please enter address")
    .max(100, "Address must be under 100 characters"),
  district: z
    .string("Please enter address")
    .max(100, "Address must be under 100 characters"),
  pincode: z
    .string("Please enter pin-code")
    .max(6, "Please enter valid pin code"),
  lat: z.number(),
  long: z.number(),
  landmark: z
    .string()
    .min(2, "Shop name must be at least 2 characters")
    .max(50, "Landmark must be under 50 characters")
    .optional()
    .or(z.literal("")),
});
