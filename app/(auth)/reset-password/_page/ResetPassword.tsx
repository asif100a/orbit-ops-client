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

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const [formValues, setFormValues] = useState<ResetPasswordFormValues>({
    password: "",
    confirmPassword: "",
  });

  function handleChange(field: keyof ResetPasswordFormValues, value: string) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("reset password form data: ", formValues);
  }

  return (
    <div className="flex items-center justify-center my-16 md:my-32">
      <ResetPasswordForm
        className="w-full min-w-2xs max-w-md"
        values={formValues}
        onValueChange={handleChange}
        onFormSubmit={handleSubmit}
      />
    </div>
  );
}

type ResetPasswordFormProps = React.ComponentProps<"div"> & {
  values: ResetPasswordFormValues;
  onValueChange: (field: keyof ResetPasswordFormValues, value: string) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ResetPasswordForm({
  className,
  values,
  onValueChange,
  onFormSubmit,
  ...props
}: ResetPasswordFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>
            Choose a new password for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onFormSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">New password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={(event) =>
                    onValueChange("password", event.target.value)
                  }
                  placeholder="*******"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm password
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={(event) =>
                    onValueChange("confirmPassword", event.target.value)
                  }
                  placeholder="*******"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Reset password</Button>
                <FieldDescription className="text-center">
                  Back to <Link href="/sign-in">sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
