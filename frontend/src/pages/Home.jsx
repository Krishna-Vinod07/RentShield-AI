
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import DashboardPreview from "../components/DashboardPreview";
import FloatingParticles from "../components/FloatingParticles";
import GridBackground from "../components/GridBackground";
import HowItWorks from "../components/HowItWorks";
import AIAssistant from "../components/AIAssistant";
import UploadSection from "../components/UploadSection";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <>
    
        <GridBackground />
      <FloatingParticles />

      <Navbar />

      <Hero />

      <Features />
        <HowItWorks />
        <UploadSection />
      <DashboardPreview />
      <AIAssistant/>
      <Footer />
    </>
  );
}