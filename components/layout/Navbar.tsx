"use client";
import Link from "next/link";
import Logo from "../modules/Logo";

const NAV_LINKS = [
  { label: "Home", link: "/" },
  { label: "Features", link: "/features" },
  { label: "Pricing", link: "/pricing" },
  { label: "Blog", link: "/blog" },
  { label: "About Us", link: "/about-us" },
  { label: "Contact Us", link: "/contact-us" },
];

function handleScroll(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-[68px] bg-[#070810]/85 backdrop-blur-xl border-b border-white/[0.07]">
      {/* Logo */}
      <Link href={"/"}>
        <Logo />
      </Link>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.link}
            className="text-sm text-[#8B89A8] hover:text-white transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-3">
        <Link href={"/sign-in"}>
          <button className="px-4 py-2 border border-white/[0.07] rounded-lg text-sm text-[#8B89A8] hover:text-white hover:border-white/20 transition-all bg-transparent">
            Sign In
          </button>
        </Link>
        <Link href={"/sign-up"}>
          <button className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-medium transition-all hover:-translate-y-px">
            Start Free Trial
          </button>
        </Link>
      </div>
    </nav>
  );
}
