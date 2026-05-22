"use client";

import { useState } from "react";
import { SectionTag } from "../home/helpers";

const FAQ_ITEMS = [
  {
    q: "How long does onboarding take?",
    a: "Most agencies are fully set up within 48 hours. We provide a guided onboarding checklist, a dedicated setup call for Agency plan customers, and a 14-day free trial so you can explore risk-free.",
  },
  {
    q: "Can I migrate data from other tools?",
    a: "Yes. We have import tools for Trello, Asana, ClickUp, and Monday.com. Our support team also offers manual migration assistance for Enterprise customers.",
  },
  {
    q: "Do you offer a free trial?",
    a: "The Starter plan is free forever. Agency and Enterprise plans come with a 14-day free trial — no credit card required. You'll have access to all features during the trial period.",
  },
  {
    q: "Is my data secure?",
    a: "OrbitOps is SOC 2 Type II certified, GDPR compliant, and all data is encrypted at rest and in transit. We run on AWS with 99.9% uptime SLA. Security documentation available on request.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards via Stripe, as well as ACH bank transfers for annual Enterprise plans. Invoicing available for plans over $500/month.",
  },
  {
    q: "Can I get a custom enterprise plan?",
    a: "Absolutely. Contact sales@orbitops.io or book a demo. We build custom plans around team size, feature needs, SLA requirements, and integration complexity. Most enterprise deals close within 5 business days.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#0d0f1e] border-t border-white/[0.07] px-[5%] py-16">
      <SectionTag>FAQ</SectionTag>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
        Frequently asked questions
      </h2>
      <p className="text-[0.875rem] text-[#8B89A8] mb-9">
        Quick answers before you reach out — saves us both time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {FAQ_ITEMS.map((item, i) => (
          <div
            key={i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className={`bg-[#131629] border rounded-xl p-5 cursor-pointer transition-all duration-200 ${
              openIndex === i
                ? "border-violet-500/30"
                : "border-white/[0.07] hover:border-violet-500/20"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="font-semibold text-white text-[0.88rem] leading-snug">
                {item.q}
              </span>
              <span className="text-violet-400 text-lg flex-shrink-0 mt-0.5 leading-none select-none">
                {openIndex === i ? "−" : "+"}
              </span>
            </div>
            {openIndex === i && (
              <p className="text-[0.8rem] text-[#8B89A8] leading-relaxed mt-3">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
