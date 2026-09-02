"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
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
import {
  useResendOTPMutation,
  useVerifyForgotOTPMutation,
  useVerifyOTPMutation,
} from "@/store/api/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { OTPType } from "@/types/redux.types";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 180;

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const otpType = searchParams.get("otpType");

  const [verifyOTP, { isLoading: isVerifyOtpLoading }] = useVerifyOTPMutation();
  const [verifyForgotOTP, { isLoading: isVerifyForgotOtpLoading }] =
    useVerifyForgotOTPMutation();
  const [resendOTP, { isLoading: isResendLoading }] = useResendOTPMutation();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    setErrorMessage(null);

    if (otp.length !== OTP_LENGTH) {
      setErrorMessage("Please enter the full 6-digit code.");
      return;
    }

    try {
      const response =
        otpType === "forgot-password"
          ? await verifyForgotOTP({ otp }).unwrap()
          : await verifyOTP({ otp }).unwrap();

      if (response.success || response.data?.success) {
        toast.success("OTP verified successfully");
        if (otpType === "forgot-password") {
          router.push("/reset-password");
        } else {
          router.push("/");
        }
      }
    } catch (err: any) {
      console.error("Error verifying otp: ", err);
      const { message } = getErrorMessage(err);
      toast.error(message);
      setErrorMessage(message ?? "That code didn't work. Please try again.");
    }
  }

  async function handleResend(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (cooldown > 0 || isResendLoading) return;
    if (!email) return setErrorMessage("No email found!");
    if (!otpType) return setErrorMessage("No otp type found!");

    setErrorMessage(null);
    try {
      const response = await resendOTP({
        email,
        otpType: otpType as any,
      }).unwrap();
      if (response.success || response.data?.success) {
        setOtp("");
        startCooldown();
        toast.success("A new OTP has been sent to your email");
      }
    } catch (err: any) {
      const { message } = getErrorMessage(err);
      toast.error(message);
      setErrorMessage("Couldn't resend the code. Please try again.");
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
            {/* Only the OTP input + Verify button live inside the form now */}
            <form className="space-y-7" onSubmit={handleVerify} noValidate>
              {errorMessage ? (
                <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {errorMessage}
                </div>
              ) : null}
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="otp-code" className="text-white">
                    Verification code
                  </FieldLabel>
                  <InputOTP
                    maxLength={OTP_LENGTH}
                    id="otp-code"
                    value={otp}
                    onChange={(value) => {
                      setOtp(value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    pattern={REGEXP_ONLY_DIGITS}
                    disabled={isVerifyOtpLoading}
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
                </Field>
                <Field>
                  <Button
                    type="submit"
                    className="w-full border border-white"
                    disabled={
                      isVerifyOtpLoading ||
                      isVerifyForgotOtpLoading ||
                      otp.length !== OTP_LENGTH
                    }
                  >
                    {isVerifyOtpLoading || isVerifyForgotOtpLoading
                      ? "Verifying..."
                      : "Verify code"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>

            {/* Resend lives outside the form entirely — it can never submit it */}
            <div className="mt-4 space-y-3">
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={handleResend}
                disabled={cooldown > 0 || isResendLoading}
              >
                {isResendLoading
                  ? "Sending..."
                  : cooldown > 0
                    ? `Resend code in ${cooldown}s`
                    : "Resend code"}
              </Button>
              <FieldDescription className="text-center">
                Didn&apos;t receive a code?{" "}
                <a href="/forgot-password">Try another email</a>
              </FieldDescription>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthShell>
  );
}
