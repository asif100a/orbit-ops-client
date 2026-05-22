import AboutCTA from "@/components/modules/website/aboutUs/AboutCTA";
import AboutHero from "@/components/modules/website/aboutUs/AboutHero";
import Mission from "@/components/modules/website/aboutUs/Mission";
import Team from "@/components/modules/website/aboutUs/Team";
import Timeline from "@/components/modules/website/aboutUs/Timeline";
import Values from "@/components/modules/website/aboutUs/Values";
import React from "react";

export default function AboutUs() {
  return (
    <div>
      <AboutHero />
      <Mission />
      <Values />
      <Team />
      <Timeline />
      <AboutCTA />
    </div>
  );
}
