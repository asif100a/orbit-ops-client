import React from "react";

export default function ContactUs() {
  return (
    <div>
      <ContactHero />
      <ContactOptions />
      {/* Main two-column layout */}
      <div className="px-[5%] pb-16 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
        <ContactInfoPanel />
        <ContactForm />
      </div>
      <FAQ />
    </div>
  );
}
