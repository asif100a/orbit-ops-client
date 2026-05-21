"use client";

import { useCallback, useEffect, useState } from "react";
import Logo from "../modules/Logo";

export type NavigationSection = {
  title: string;
  href: string;
};

// -----------------------
const NAV_LINKS = ["Features", "Pricing", "Integrations", "Blog", "Docs"];

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  return (
    <header className="bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-17 bg-[#070810]/85 backdrop-blur-xl border-b border-white/[0.07]">
        {/* Logo */}
        <Logo />

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm text-[#8B89A8] hover:text-white transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-white/[0.07] rounded-lg text-sm text-[#8B89A8] hover:text-white hover:border-white/20 transition-all bg-transparent">
            Sign In
          </button>
          <button className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-medium transition-all hover:-translate-y-px">
            Start Free Trial
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
