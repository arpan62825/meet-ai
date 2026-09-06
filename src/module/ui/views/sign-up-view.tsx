"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export const SignUpView = () => {
  const [isPending, setIsPending] = useState(false);

  const handleSignup = async (formData: FormData) => {
    setIsPending(true);

    const { data, error } = await authClient.signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (error) {
      setIsPending(false);
      console.log(error);
      return;
    }
    console.log(data);

    setIsPending(false);
  };

  return (
    <div className="flex flex-col gap-6 max-h-screen">
      <Card className="bg-muted overflow-hidden p-0 max-h-1/3">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div>
            <form
              action={handleSignup}
              className="flex flex-col gap-6 p-6 md:p-8"
            >
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-balance text-muted-foreground">
                  Create a new account
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="name">User Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="User Name"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                />
              </Field>

              <Button type="submit" className="w-full " disabled={isPending}>
                {isPending ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
            <div className="mb-6">
              <p className="text-center text-muted-foreground">
                Already have an account?{" "}
                <a href="/auth/sign-in" className="underline">
                  Sign In
                </a>
              </p>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center w-full h-full bg-muted">
            <Image
              width={200}
              height={200}
              src="/logo.svg"
              alt="logo"
              className="p-6 dark:brightness-[0.2] dark:grayscale"
            />
            <p className="mt-4 text-5xl font-extrabold">Meet.AI</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
