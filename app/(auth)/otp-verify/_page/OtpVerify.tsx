import AuthShell from "@/components/auth/AuthShell";
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

export default function OtpVerify() {
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
            <form className="space-y-7">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="otp-code">Verification code</FieldLabel>
                  <div className="grid grid-cols-6 gap-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        className="h-14 rounded-xl border-white/10 bg-[#0f1221] text-center text-lg font-semibold tracking-[0.35em] text-white"
                      />
                    ))}
                  </div>
                </Field>
                <Field>
                  <Button type="submit" className="w-full border border-white">
                    Verify code
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    Resend code
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
