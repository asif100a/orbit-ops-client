'use client';

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
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = (data: SignUpFormValues) => {
    startTransition(() => {
      setStatusMessage(
        "Sign-up form is ready for your auth workflow. Connect Redux or RTK Query here later."
      );
      console.info("Sign-up submitted", data);
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit(onSubmit)(event);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-white">Sign up for OrbitOps</CardTitle>
          <CardDescription>
            Create your account and start managing projects, clients, and
            billing in one hub.
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
                <FieldLabel htmlFor="name" className="text-white">
                  Full name
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  className={cn("text-white", errors.name && "border-red-400")}
                  aria-invalid={!!errors.name}
                  disabled={isPending || isSubmitting}
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {errors.name ? (
                  <p className="mt-2 text-sm text-red-300">{errors.name.message}</p>
                ) : null}
              </Field>

              <Field>
                <FieldLabel htmlFor="email" className="text-white">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
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
                  <p className="mt-2 text-sm text-red-300">{errors.email.message}</p>
                ) : null}
              </Field>

              <Field>
                <FieldLabel htmlFor="password" className="text-white">
                  Password
                </FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="***********"
                  className={cn("text-white", errors.password && "border-red-400")}
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
                  <p className="mt-2 text-sm text-red-300">{errors.password.message}</p>
                ) : null}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirm-password" className="text-white">
                  Confirm password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="***********"
                  className={cn("text-white", errors.confirmPassword && "border-red-400")}
                  aria-invalid={!!errors.confirmPassword}
                  disabled={isPending || isSubmitting}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === passwordValue || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword ? (
                  <p className="mt-2 text-sm text-red-300">
                    {errors.confirmPassword.message}
                  </p>
                ) : null}
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="w-full border border-white"
                  disabled={isPending || isSubmitting}
                >
                  {isPending || isSubmitting ? "Creating account..." : "Create account"}
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  Continue with Google
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link href="/sign-in" className="underline hover:text-white">
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;