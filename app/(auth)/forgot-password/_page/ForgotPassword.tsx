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
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPassword() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const isFormLoading = isLoading || isSubmitting;

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setErrorMessage(null);

    try {
      const res = await forgotPassword({ email: data.email }).unwrap();
      if (res.success) {
        toast.success(res?.message || "Recovery code sent to your email");
        router.push(
          `/otp-verify?email=${encodeURIComponent(data.email)}&otpType=forgot-password`,
        );
      }
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.error ||
        "Failed to send recovery email. Please try again.";
      setErrorMessage(typeof msg === "string" ? msg : "Failed to send recovery email.");
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit(onSubmit)(event);
  };

  return (
    <AuthShell
      title="Reset your password"
      description="Send a recovery link to your email so you can sign in again safely."
      aside={
        <>
          <div className="rounded-3xl border border-white/8 bg-[#0f1221]/80 p-5">
            <p className="text-sm font-medium text-white">Quick recovery</p>
            <p className="mt-2 text-sm text-[#8B89A8]">
              We&apos;ll email a link that gets you back into OrbitOps fast.
            </p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-[#0f1221]/80 p-5">
            <p className="text-sm font-medium text-white">Strong protection</p>
            <p className="mt-2 text-sm text-[#8B89A8]">
              Password resets are protected and time-limited for safety.
            </p>
          </div>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle className="text-white">Forgot your password?</CardTitle>
            <CardDescription>
              Enter the email address associated with your account, and
              we&apos;ll send a recovery link.
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
                  <Button
                    type="submit"
                    className="w-full border border-white"
                    disabled={isFormLoading}
                  >
                    {isFormLoading ? "Sending..." : "Send the email"}
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