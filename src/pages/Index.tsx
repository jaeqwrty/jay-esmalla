import { useEffect } from "react";
import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import PageLayout from "@/components/PageLayout";

const Index = () => {
  useEffect(() => {
    document.title = "Jay Esmalla | Flutter & React Developer";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Portfolio of Jay Esmalla — Flutter mobile developer, React/TypeScript engineer, and 3rd-year AI CS student at UMTC. 3+ shipped projects."
      );
  }, []);

  return (
    <PageLayout>
      <HeroSection />
      <AboutSection />
    </PageLayout>
  );
};

export default Index;
