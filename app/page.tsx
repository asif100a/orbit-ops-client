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
    <div className="overflow-x-hidden">
      <Hero />
      <DashboardPreview />
      <div id="featuresSection">
        <Features />
      </div>
      <Roles />
      <AISection />
      <div id="integrationsSection">
        <Integrations />
      </div>
      <div id="pricingSection">
        <Pricing />
      </div>
      <Testimonials />
      <CTA />
    </div>
  );
}
