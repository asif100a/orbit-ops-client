"use client";

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
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

type SignInFormValues = {
  email: string;
  password: string;
};

export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    startTransition(() => {
      setStatusMessage(
        `Sign-in form is ready for your auth workflow. Connect Redux or RTK Query here later.`,
      );
      console.info("Sign-in submitted", data);
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit(onSubmit)(event);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-white">Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password to access your secure OrbitOps
            workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            {statusMessage ? (
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                {statusMessage}
              </div>
            ) : null}

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className="text-white">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  className={cn("text-white", errors.email && "border-red-400")}
                  aria-invalid={!!errors.email}
                  disabled={isPending || isSubmitting}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email ? (
                  <p className="mt-2 text-sm text-red-300">
                    {errors.email.message}
                  </p>
                ) : null}
              </Field>

              <Field>
                <div className="flex items-center gap-3">
                  <FieldLabel htmlFor="password" className="text-white">
                    Password
                  </FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm text-violet-300 underline-offset-4 transition hover:text-violet-200"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="***********"
                  className={cn(
                    "text-white",
                    errors.password && "border-red-400",
                  )}
                  aria-invalid={!!errors.password}
                  disabled={isPending || isSubmitting}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password ? (
                  <p className="mt-2 text-sm text-red-300">
                    {errors.password.message}
                  </p>
                ) : null}
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="w-full border border-white"
                  disabled={isPending || isSubmitting}
                >
                  {isPending || isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  Continue with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/sign-up" className="underline hover:text-white">
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
