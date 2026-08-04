import SignIn from "./_page/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to access our platform and enjoy our services.",
}

export default function Page() {
  return <SignIn />;
}
