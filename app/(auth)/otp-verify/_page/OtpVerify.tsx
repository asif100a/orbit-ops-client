"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyOTPMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const router = useRouter();

  const [verifyOTP, { isLoading: isVerifyOtpLoading }] = useVerifyOTPMutation();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start the cooldown timer on mount, and clean it up on unmount.
  useEffect(() => {
    startCooldown();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startCooldown() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCooldown(RESEND_COOLDOWN_SECONDS);
    intervalRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function handleVerify(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (otp.length !== OTP_LENGTH) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setIsVerifying(true);
    try {
      const response = await verifyOTP({ otp }).unwrap();
      if (response.success) {
        toast.success("OTP verified successfully");
        router.push("/");
      }
    } catch (err: any) {
      console.error("Error verifying otp: ", err);

      const {message} = getErrorMessage(err);

      setError(message ?? "That code didn't work. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleResend() {
    if (cooldown > 0 || isResending) return;

    setIsResending(true);
    setError(null);
    try {
      // Replace with your real resend call, e.g.:
      // await resendOtp();
      await new Promise((resolve) => setTimeout(resolve, 600));
      setOtp("");
      startCooldown();
    } catch (err) {
      setError("Couldn't resend the code. Please try again.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <AuthShell
      title="Verify your identity"
      description="Enter the code sent to your email to continue securely."
      aside={
        <>
          <div className="rounded-3xl border border-white/8 bg-[#0f1221]/80 p-5">
            <p className="text-sm font-medium text-white">One-time code</p>
            <p className="mt-2 text-sm text-[#8B89A8]">
              Your verification code is valid for 10 minutes.
            </p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-[#0f1221]/80 p-5">
            <p className="text-sm font-medium text-white">Secure session</p>
            <p className="mt-2 text-sm text-[#8B89A8]">
              This step helps keep your agency workspace protected.
            </p>
          </div>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle className="text-white">
              Enter verification code
            </CardTitle>
            <CardDescription>
              Check your inbox and type the 6-digit code from the email you
              received.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-7" onSubmit={handleVerify}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="otp-code">Verification code</FieldLabel>
                  <InputOTP
                    maxLength={OTP_LENGTH}
                    id="otp-code"
                    value={otp}
                    onChange={(value) => {
                      setOtp(value);
                      if (error) setError(null);
                    }}
                    pattern={REGEXP_ONLY_DIGITS}
                    disabled={isVerifying}
                    containerClassName="justify-between"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className="h-14 w-14 rounded-xl border-white/10 bg-[#0f1221] text-lg font-semibold text-white"
                      />
                      <InputOTPSlot
                        index={1}
                        className="h-14 w-14 rounded-xl border-white/10 bg-[#0f1221] text-lg font-semibold text-white"
                      />
                      <InputOTPSlot
                        index={2}
                        className="h-14 w-14 rounded-xl border-white/10 bg-[#0f1221] text-lg font-semibold text-white"
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={3}
                        className="h-14 w-14 rounded-xl border-white/10 bg-[#0f1221] text-lg font-semibold text-white"
                      />
                      <InputOTPSlot
                        index={4}
                        className="h-14 w-14 rounded-xl border-white/10 bg-[#0f1221] text-lg font-semibold text-white"
                      />
                      <InputOTPSlot
                        index={5}
                        className="h-14 w-14 rounded-xl border-white/10 bg-[#0f1221] text-lg font-semibold text-white"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                  {error && (
                    <p className="mt-2 text-sm text-red-400">{error}</p>
                  )}
                </Field>
                <Field>
                  <Button
                    type="submit"
                    className="w-full border border-white"
                    disabled={isVerifying || otp.length !== OTP_LENGTH}
                  >
                    {isVerifying ? "Verifying..." : "Verify code"}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={handleResend}
                    disabled={cooldown > 0 || isResending}
                  >
                    {isResending
                      ? "Sending..."
                      : cooldown > 0
                        ? `Resend code in ${cooldown}s`
                        : "Resend code"}
                  </Button>
                  <FieldDescription className="text-center">
                    Didn&apos;t receive a code?{" "}
                    <a href="/forgot-password">Try another email</a>
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
