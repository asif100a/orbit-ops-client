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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

type SignInFormValues = {
  email: string;
  password: string;
};

export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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

  const [login, { isLoading }] = useLoginMutation();

  const isFormLoading = isLoading || isSubmitting;

  const onSubmit = async (data: SignInFormValues) => {
    setErrorMessage(null);

    try {
      const res = await login(data).unwrap();
      if (res.success) {
        toast.success(res?.message || "Signed in successfully");
        router.push("/");
      }
    } catch (err: any) {
      const { message } = getErrorMessage(err);
      toast.error(message);
      setErrorMessage(
        typeof message === "string" ? message : "Failed to sign in.",
      );
    }
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
          <form className="space-y-6" onSubmit={handleFormSubmit} noValidate>
            {errorMessage ? (
              <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {errorMessage}
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
                  disabled={isFormLoading}
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
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="***********"
                    className={cn(
                      "text-white pr-10",
                      errors.password && "border-red-400",
                    )}
                    aria-invalid={!!errors.password}
                    disabled={isFormLoading}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={isFormLoading}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B89A8] hover:text-white disabled:opacity-50"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
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
                  disabled={isFormLoading}
                >
                  {isFormLoading ? "Signing in..." : "Sign in"}
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
