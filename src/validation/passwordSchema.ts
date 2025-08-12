import z from "zod";

export const passwordSchema = z
  .string("Password is required")
  .min(1, "Password is required")
  .min(5, "Password must contain at least 5 characters")
  .max(32, "Password must be less than 32 characters");

export const passwordMatchSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "Passwords do not match",
      });
    }
  });
