"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import toast from "react-hot-toast";
import { Building2, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyCompanyOtpMutation } from "@/store/api/companyApi";

const OTP_LENGTH = 6;

export default function CompanyOtpVerify() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");
  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verifyCompanyOtp, { isLoading }] = useVerifyCompanyOtpMutation();

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!companyId) {
      setErrorMessage("This verification link is missing the company id.");
      return;
    }

    if (otp.length !== OTP_LENGTH) {
      setErrorMessage("Please enter the full 6-digit code.");
      return;
    }

    try {
      await verifyCompanyOtp({ companyId, otp }).unwrap();
      toast.success("Company verified successfully");
      router.push("/billing/subscribe");
    } catch (error) {
      const message =
        typeof error === "object" && error && "data" in error
          ? (error.data as { message?: string })?.message
          : undefined;
      const nextError = message ?? "That code did not work. Please try again.";
      setErrorMessage(nextError);
      toast.error(nextError);
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="rounded-2xl border border-white/[0.07] bg-[#0d0d18]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-9">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="mb-2 text-sm text-[#8B89A8]">Company verification</p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Verify your workspace
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#8B89A8]">
              Enter the six-digit code sent to {email || "your company email"}.
            </p>
          </div>
        </div>

        <form className="space-y-7" onSubmit={handleVerify} noValidate>
          {errorMessage ? (
            <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          ) : null}

          <div className="space-y-3">
            <label htmlFor="company-otp" className="text-sm font-medium text-white">
              Verification code
            </label>
            <InputOTP
              id="company-otp"
              maxLength={OTP_LENGTH}
              value={otp}
              onChange={(value) => {
                setOtp(value);
                if (errorMessage) setErrorMessage(null);
              }}
              pattern={REGEXP_ONLY_DIGITS}
              disabled={isLoading}
              containerClassName="justify-start"
            >
              <InputOTPGroup>
                {Array.from({ length: OTP_LENGTH }, (_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="h-14 w-12 rounded-xl border-white/10 bg-[#0f1221] text-lg font-semibold text-white sm:w-14"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            type="submit"
            className="h-11 w-full bg-violet-600 text-white hover:bg-violet-500"
            disabled={isLoading || otp.length !== OTP_LENGTH}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify company"
            )}
          </Button>
        </form>
      </section>

      <aside className="rounded-2xl border border-white/[0.07] bg-[#0d0d18]/80 p-6">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <h2 className="text-base font-semibold text-white">One final check</h2>
        <p className="mt-2 text-sm leading-6 text-[#8B89A8]">
          Verification confirms ownership of the company contact before you
          choose a subscription plan.
        </p>
      </aside>
    </div>
  );
}
