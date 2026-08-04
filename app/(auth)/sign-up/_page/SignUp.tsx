import AuthShell from "@/components/modules/auth/AuthShell";
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
import Link from "next/link";

export default function SignUp() {
  return (
    <AuthShell
      title="Create your OrbitOps account"
      description="Start your agency workflow with a secure account and connect your team in minutes."
      aside={
        <>
          <div className="rounded-3xl border border-white/8 bg-[#0f1221]/80 p-5">
            <p className="text-sm font-medium text-white">Team-ready setup</p>
            <p className="mt-2 text-sm text-[#8B89A8]">
              Invite collaborators and configure access from day one.
            </p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-[#0f1221]/80 p-5">
            <p className="text-sm font-medium text-white">Secure onboarding</p>
            <p className="mt-2 text-sm text-[#8B89A8]">
              Protect your agency with strong passwords and built-in recovery.
            </p>
          </div>
        </>
      }
    >
      <div className="flex flex-col gap-6">
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle className="text-white">Sign up for OrbitOps</CardTitle>
            <CardDescription>
              Create your account and start managing projects, clients, and billing in one hub.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name" className="text-white">Full name</FieldLabel>
                  <Input id="name" type="text" placeholder="Jane Doe" required className="text-white" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email" className="text-white">Email</FieldLabel>
                  <Input id="email" type="email" placeholder="jane@example.com" required className="text-white" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
                  <Input id="password" type="password" placeholder="***********" required className="text-white" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password" className="text-white">Confirm password</FieldLabel>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="***********"
                    required
                    className="text-white"
                  />
                </Field>
                <Field>
                  <Button type="submit" className="w-full border border-white">
                    Create account
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    Continue with Google
                  </Button>
                  <FieldDescription className="text-center">
                    Already have an account? <Link href="/sign-in" className="underline hover:text-white">Sign in</Link>
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
