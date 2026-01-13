"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import BranchesSection from "@/components/BranchesSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f1fbff]">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <BranchesSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
