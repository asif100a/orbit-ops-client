import AISection from "@/components/modules/website/home/AISection";
import CTA from "@/components/modules/website/home/CTA";
import DashboardPreview from "@/components/modules/website/home/DashboardPreview";
import Features from "@/components/modules/website/home/Features";
import Hero from "@/components/modules/website/home/Hero";
import Integrations from "@/components/modules/website/home/Integrations";
import Pricing from "@/components/modules/website/home/Pricing";
import Roles from "@/components/modules/website/home/Roles";
import Testimonials from "@/components/modules/website/home/Testimonials";

export default function Home() {
  return (
    <div className="bg-[#070810] text-[#F0EEF8] font-sans overflow-x-hidden">
      <Hero />
      <DashboardPreview />
      <Features />
      <Roles />
      <AISection />
      <Integrations />
      <Pricing />
      <Testimonials />
      <CTA />
    </div>
  );
}
