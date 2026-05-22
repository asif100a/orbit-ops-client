import { cn } from "@/lib/utils"
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
import AuthShell from "@/components/modules/auth/AuthShell";

export default function SignIn() {
  return (
    <AuthShell
      title="Welcome back to OrbitOps"
      description="Sign in to access the command center for your agency and keep every project, client, and campaign aligned."
      aside={
        <>
          <div className="rounded-3xl border border-white/8 bg-[#0f1221]/80 p-5">
            <p className="text-sm font-medium text-white">Faster approvals</p>
            <p className="mt-2 text-sm text-[#8B89A8]">
              Move projects forward with secure access and shared visibility.
            </p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-[#0f1221]/80 p-5">
            <p className="text-sm font-medium text-white">Agency-ready security</p>
            <p className="mt-2 text-sm text-[#8B89A8]">
              Multi-layer protection and sign-in options for every team member.
            </p>
          </div>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  )
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-white">Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password to access your secure OrbitOps workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className="text-white">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="text-white"
                />
              </Field>
              <Field>
                <div className="flex items-center gap-3">
                  <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
                  <a
                    href="/forgot-password"
                    className="ml-auto text-sm text-violet-300 underline-offset-4 transition hover:text-violet-200"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required className="text-white" placeholder="***********" />
              </Field>
              <Field>
                <Button type="submit" className="w-full border border-white">
                  Sign in
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  Continue with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{' '}
                  <a href="/sign-up">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
