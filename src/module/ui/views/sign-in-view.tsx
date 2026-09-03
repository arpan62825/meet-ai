"use client";

import { useActionState } from "react";

import { OctagonAlert } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Alert, AlertTitle } from "@/components/ui/alert";

import { signIn, type SignInState } from "@/module/ui/actions/auth";

const initialState: SignInState = {};

export const SignInView = () => {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <div className="flex flex-col gap-6">
      <Card className="bg-muted overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form action={formAction} className="flex flex-col gap-6 p-6 md:p-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-balance text-muted-foreground">
                Sign in to your account
              </p>
            </div>
            {state?.message && (
              <Alert variant="destructive">
                <OctagonAlert className="size-4" />
                <AlertTitle>{state.message}</AlertTitle>
              </Alert>
            )}

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                defaultValue={state?.inputs?.email}
                aria-invalid={!!state?.errors?.email}
              />
              {state?.errors?.email && (
                <FieldError>{state.errors.email[0]}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                aria-invalid={!!state?.errors?.password}
              />
              {state?.errors?.password && (
                <FieldError>{state.errors.password[0]}</FieldError>
              )}
            </Field>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="/logo.svg"
              alt="logo"
              className="absolute inset-0 size-full object-contain p-8 dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
