import z from "zod";

export const sellerFormSchema = z.object({
  aadhar: z
    .string()
    .length(12, "Aadhar number must be exactly 12 digits")
    .regex(/^\d{12}$/, "Must contain only digits"),
  pancard: z.string().length(10, "PAN number must be 10 characters long"),
  // .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  gst: z
    .string()
    .length(15, "GST number must be 15 characters long")
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Invalid GST format"
    )
    .optional()
    .or(z.literal("")),
});
