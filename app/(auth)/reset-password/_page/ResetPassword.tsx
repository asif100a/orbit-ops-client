"use client";

import { cn } from "@/lib/utils";
import AuthShell from "@/components/modules/auth/AuthShell";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    mode: "onBlur",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const passwordValue = watch("password");
  const isFormLoading = isLoading || isSubmitting;

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setErrorMessage(null);

    try {
      const res = await resetPassword({ newPassword: data.password }).unwrap();
      if (res.success) {
        toast.success(res?.message || "Password updated successfully");
        router.push("/");
      }
    } catch (err: any) {
      const { message } = getErrorMessage(err);
      setErrorMessage(message || "Failed to reset password.");
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit(onSubmit)(event);
  };

  return (
    <AuthShell
      title="Set a new password"
      description="Choose a strong password to restore access to your OrbitOps workspace."
      aside={
        <>
          <div className="rounded-3xl border border-white/8 bg-[#0f1221]/80 p-5">
            <p className="text-sm font-medium text-white">Strong protection</p>
            <p className="mt-2 text-sm text-[#8B89A8]">
              Make sure your password is unique and easy to remember.
            </p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-[#0f1221]/80 p-5">
            <p className="text-sm font-medium text-white">Account recovery</p>
            <p className="mt-2 text-sm text-[#8B89A8]">
              You can sign in again once your new password is confirmed.
            </p>
          </div>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle className="text-white">Reset your password</CardTitle>
            <CardDescription>
              Enter a new password and confirm it below to complete the reset
              process.
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
                  <FieldLabel htmlFor="password" className="text-white">
                    New password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a new password"
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
                  <FieldLabel htmlFor="confirm-password" className="text-white">
                    Confirm password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repeat your password"
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
                    {isFormLoading ? "Updating..." : "Update password"}
                  </Button>
                  <FieldDescription className="text-center">
                    Remembered your password? <a href="/sign-in">Sign in</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthShell>
  );
}
