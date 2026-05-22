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

export default function ResetPassword() {
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
            <form className="space-y-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="password" className="text-white">
                    New password
                  </FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a new password"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password" className="text-white">
                    Confirm password
                  </FieldLabel>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Repeat your password"
                    required
                  />
                </Field>
                <Field>
                  <Button type="submit" className="w-full border border-white">
                    Update password
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
