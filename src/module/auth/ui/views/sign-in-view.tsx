"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";

import { Marker, MarkerContent } from "@/components/ui/marker";

export const SignInView = () => {
  const [isPending, setIsPending] = useState(false);

  const handleSignin = async (formData: FormData) => {
    setIsPending(true);
    const { data, error } = await authClient.signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      callbackURL: "/",
    });

    if (error) {
      console.log(error);
      setIsPending(false);
      return;
    }

    console.log(data);

    setIsPending(false);
  };

  const handleSigninWithGitHub = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  const handleSigninWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex flex-col gap-6 max-h-screen">
      <Card className="bg-muted overflow-hidden p-0 max-h-1/3">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="flex flex-col">
            <form
              action={handleSignin}
              className="flex flex-col gap-6 p-6 md:p-8"
            >
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Sign in to your account
                </p>
              </div>

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

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <Marker variant="separator" className=" w-3/4 mx-auto -mt-2 mb-5">
              <MarkerContent>Or</MarkerContent>
            </Marker>
            <div className="flex justify-center items-center gap-12 mb-6">
              <Button variant={"outline"} onClick={handleSigninWithGitHub}>
                <IoLogoGithub className="size-5" />
                GitHub
              </Button>
              <Button variant={"outline"} onClick={handleSigninWithGoogle}>
                <FcGoogle className="size-5" />
                Google
              </Button>
            </div>
            <div className="mb-6">
              <p className="text-center text-muted-foreground">
                Don&apos;t have an account?{" "}
                <a href="/auth/sign-up" className="primary-green underline">
                  Sign Up
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
