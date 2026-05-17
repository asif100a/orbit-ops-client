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
import { useRouter } from "next/navigation";

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPassword() {
  const [formValues, setFormValues] = useState<ForgotPasswordFormValues>({
    email: "",
  });

  const router = useRouter()

  function handleChange(field: keyof ForgotPasswordFormValues, value: string) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("forgot password form data: ", formValues);
    router.push('/otp-verify')
  }

  return (
    <div className="flex items-center justify-center my-16 md:my-32">
      <ForgotPasswordForm
        className="w-full min-w-2xs max-w-md"
        values={formValues}
        onValueChange={handleChange}
        onFormSubmit={handleSubmit}
      />
    </div>
  );
}

type ForgotPasswordFormProps = React.ComponentProps<"div"> & {
  values: ForgotPasswordFormValues;
  onValueChange: (
    field: keyof ForgotPasswordFormValues,
    value: string
  ) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ForgotPasswordForm({
  className,
  values,
  onValueChange,
  onFormSubmit,
  ...props
}: ForgotPasswordFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Forgot password</CardTitle>
          <CardDescription>
            Enter your email and we&apos;ll send you a verification code
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
                <Button type="submit">Send verification code</Button>
                <FieldDescription className="text-center">
                  Remembered your password?{" "}
                  <Link href="/sign-in">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
