"use client";

import React, { type FormEvent, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type SignInFormValues = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [formValues, setFormValues] = useState<SignInFormValues>({
    email: "",
    password: "",
  });

  function handleChange(field: keyof SignInFormValues, value: string) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("sign in form data: ", formValues);
  }

  return (
    <div className="flex items-center justify-center my-16 md:my-32">
      <LoginForm
        className="w-full min-w-2xs max-w-md"
        values={formValues}
        onValueChange={handleChange}
        onFormSubmit={handleSubmit}
      />
    </div>
  );
}

export function LoginForm({
  className,
  values,
  onValueChange,
  onFormSubmit,
  ...props
}: React.ComponentProps<"div"> & {
  values: SignInFormValues;
  onValueChange: (field: keyof SignInFormValues, value: string) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your email and password to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onFormSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={(event) =>
                    onValueChange("email", event.target.value)
                  }
                  placeholder="m@example.com"
                  autoComplete="email"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={(event) =>
                    onValueChange("password", event.target.value)
                  }
                  placeholder="*******"
                  autoComplete="current-password"
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Sign in</Button>
                <Button variant="outline" type="button">
                  Sign in with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
