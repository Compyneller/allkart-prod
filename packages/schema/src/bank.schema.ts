import z from 'zod'
export const bankSchema = z.object({
    name: z.string().min(2, "Account holder name must be at least 2 characters"),
    account_number: z.string().min(2, "Account number must be at least 2 characters"),
    ifsc_code: z.string().min(2, "IFSC code must be at least 2 characters").uppercase(),
    branch: z.string().min(2, "Branch must be at least 2 characters"),
    bank_name: z.string().min(2, "Bank name must be at least 2 characters"),

})


export type BankSchemaTypes = z.infer<typeof bankSchema>