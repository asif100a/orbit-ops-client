import ContactForm from "@/components/modules/website/contactUs/ContactForm";
import ContactHero from "@/components/modules/website/contactUs/ContactHero";
import ContactInfoPanel from "@/components/modules/website/contactUs/ContactInfoPanel";
import ContactOptions from "@/components/modules/website/contactUs/ContactOptions";
import FAQ from "@/components/modules/website/contactUs/FAQ";
import React from "react";

export default function ContactUs() {
  return (
    <div>
      <ContactHero />
      <ContactOptions />
      {/* Main two-column layout */}
      <div className="bg-[#0d0f1e] px-[5%] pb-16 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
        <ContactInfoPanel />
        <ContactForm />
      </div>
      <FAQ />
    </div>
  );
}
