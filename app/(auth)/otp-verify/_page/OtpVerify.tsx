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

type OtpVerifyFormValues = {
  code: string;
};

export default function OtpVerify() {
  const [formValues, setFormValues] = useState<OtpVerifyFormValues>({
    code: "",
  });

  function handleChange(field: keyof OtpVerifyFormValues, value: string) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value.replace(/\D/g, "").slice(0, 6),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("otp verify form data: ", formValues);
  }

  return (
    <div className="flex items-center justify-center my-16 md:my-32">
      <OtpVerifyForm
        className="w-full min-w-2xs max-w-md"
        values={formValues}
        onValueChange={handleChange}
        onFormSubmit={handleSubmit}
      />
    </div>
  );
}

type OtpVerifyFormProps = React.ComponentProps<"div"> & {
  values: OtpVerifyFormValues;
  onValueChange: (field: keyof OtpVerifyFormValues, value: string) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function OtpVerifyForm({
  className,
  values,
  onValueChange,
  onFormSubmit,
  ...props
}: OtpVerifyFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Verify your code</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onFormSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="code">Verification code</FieldLabel>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  inputMode="numeric"
                  value={values.code}
                  onChange={(event) =>
                    onValueChange("code", event.target.value)
                  }
                  placeholder="123456"
                  autoComplete="one-time-code"
                  maxLength={6}
                  pattern="\d{6}"
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Verify code</Button>
                <Button variant="outline" type="button">
                  Resend code
                </Button>
                <FieldDescription className="text-center">
                  Entered the wrong email?{" "}
                  <Link href="/forgot-password">Start again</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
