"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const signInSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
  inputs?: {
    email?: string;
  };
};

export async function signIn(
  prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {

  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };


  const validated = signInSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      inputs: { email: rawData.email },
    };
  }

  const result = await auth.api.signInEmail({
    body: {
      email: validated.data.email,
      password: validated.data.password,
    },
    headers: await headers(),
  });

  if (!result) {
    return {
      message: "Invalid email or password",
      inputs: { email: rawData.email },
    };
  }

  redirect("/");
}
