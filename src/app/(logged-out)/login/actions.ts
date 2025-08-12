"use server";

import { signIn } from "@/auth";
import { loginFormSchema } from "@/validation/loginFormSchema";
import z from "zod";

export async function loginWithCredentials({
  credentials,
  token,
}: {
  credentials: z.infer<typeof loginFormSchema>;
  token?: string;
}) {
  const loginValidation = loginFormSchema.safeParse(credentials);

  if (!loginValidation.success) {
    return {
      error: true,
      message: loginValidation.error?.issues[0]?.message ?? "An error occurred",
    };
  }

  try {
    await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });

    return {
      success: true,
    };
  } catch (e) {
    return {
      error: true,
      message: "Incorrect email or password",
    };
  }
}
