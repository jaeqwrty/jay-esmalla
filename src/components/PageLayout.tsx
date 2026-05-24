import { type ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SynthwaveGrid from "@/components/SynthwaveGrid";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background relative scanlines flex flex-col">
      <div className="fixed inset-0 pointer-events-none">
        <SynthwaveGrid />
      </div>

      <Navbar />

      <main className="relative z-[1] flex-1">{children}</main>

      <Footer />
    </div>
  );
};

export default PageLayout;
