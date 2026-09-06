"use client";

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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

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

  const [registerUser, { isLoading }] = useRegisterMutation();

  const passwordValue = watch("password");

  const onSubmit = async (data: SignUpFormValues) => {
    setStatusMessage(null);
    setErrorMessage(null);

    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: "USER",
      companyId: null,
      departmentId: null,
      teamId: null,
    };

    try {
      const res = await registerUser(payload).unwrap();
      if (res.success) {
        setStatusMessage(res?.message || "Registration successful!");
        router.push(`/otp-verify?email=${data.email}&otpType=register`);
      }
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.error ||
        "Failed to create account. Please try again.";
      setErrorMessage(
        typeof msg === "string" ? msg : "Failed to create account.",
      );
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit(onSubmit)(event);
  };

  const isFormLoading = isLoading || isSubmitting;

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

            {errorMessage ? (
              <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {errorMessage}
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
                  disabled={isFormLoading}
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {errors.name ? (
                  <p className="mt-2 text-sm text-red-300">
                    {errors.name.message}
                  </p>
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
                <FieldLabel htmlFor="password" className="text-white">
                  Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="***********"
                    className={cn(
                      "text-white pr-10",
                      errors.password && "border-red-400",
                    )}
                    aria-invalid={!!errors.password}
                    disabled={isFormLoading}
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character (@$!%*?&)",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={isFormLoading}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B89A8] hover:text-white disabled:opacity-50"
                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                <FieldLabel htmlFor="confirm-password" className="text-white">
                  Confirm password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="***********"
                    className={cn(
                      "text-white pr-10",
                      errors.confirmPassword && "border-red-400",
                    )}
                    aria-invalid={!!errors.confirmPassword}
                    disabled={isFormLoading}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === passwordValue || "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    disabled={isFormLoading}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B89A8] hover:text-white disabled:opacity-50"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
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
                  disabled={isFormLoading}
                >
                  {isFormLoading ? "Creating account..." : "Create account"}
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