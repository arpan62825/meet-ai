"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { OctagonAlert } from "lucide-react";

import { useForm } from "react-hook-form";
import { useActionState } from "react";
import Form from "next/react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Alert, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <div className=" flex flex-col gap-6">
      <Card className="bg-muted overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form>paragraph 1</form>
          <div>
            <img src="/logo.svg" alt="logo" className="size-24" />
            <Form action={action} className="space-y-6 max-w-md">
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  // Re-hydrate the input if validation fails
                  defaultValue={state.inputs?.name as string}
                  aria-invalid={!!state.errors?.name}
                />
                {state.errors?.name && (
                  <FieldError>{state.errors.name[0]}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={state.inputs?.email as string}
                  aria-invalid={!!state.errors?.email}
                />
                {state.errors?.email && (
                  <FieldError>{state.errors.email[0]}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  defaultValue={state.inputs?.password as string}
                  aria-invalid={!!state.errors?.password}
                />
                {state.errors?.password && (
                  <FieldError>{state.errors.password[0]}</FieldError>
                )}
              </Field>

              {/* isPending automatically tracks the Server Action's network request */}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing up..." : "Sign Up"}
              </Button>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
