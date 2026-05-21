import AuthShell from "@/components/auth/AuthShell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function ForgotPassword() {
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
        <Card>
          <CardHeader>
            <CardTitle>Forgot your password?</CardTitle>
            <CardDescription>
              Enter the email address associated with your account, and we&apos;ll send a recovery link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" type="email" placeholder="jane@example.com" required />
                </Field>
                <Field>
                  <Button type="submit" className="w-full">
                    Send recovery link
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
  )
}
