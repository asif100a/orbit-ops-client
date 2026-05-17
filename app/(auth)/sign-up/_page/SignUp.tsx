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

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const [formValues, setFormValues] = useState<SignUpFormValues>({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(field: keyof SignUpFormValues, value: string) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("form data: ", formValues);
  }

  return (
    <div className="flex items-center justify-center my-16 md:my-32">
      <SignUpForm
        className="w-full min-w-2xs max-w-md"
        values={formValues}
        onValueChange={handleChange}
        onFormSubmit={handleSubmit}
      />
    </div>
  );
}

type SignUpFormProps = React.ComponentProps<"div"> & {
  values: SignUpFormValues;
  onValueChange: (field: keyof SignUpFormValues, value: string) => void;
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function SignUpForm({
  className,
  values,
  onValueChange,
  onFormSubmit,
  ...props
}: SignUpFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onFormSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={(event) =>
                    onValueChange("name", event.target.value)
                  }
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                />
              </Field>
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
                <FieldLabel htmlFor="password">Password</FieldLabel>
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
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Sign Up</Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/sign-in">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
