import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import DestinationsSection from "@/components/DestinationsSection";
import CulturalSection from "@/components/CulturalSection";
import InteractiveMaps from "@/components/InteractiveMaps";
import Footer from "@/components/Footer";
// import AIChatbot from "@/components/AIChatbot";
import { ToastDemo } from "@/components/ToastDemo";

export default function Home() {
  return (
    <main className="min-h-screen">
      
      
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DestinationsSection />
      <CulturalSection />
      <InteractiveMaps />
      
      <Footer />
      {/* <AIChatbot /> */}
    </main>
  );
}
