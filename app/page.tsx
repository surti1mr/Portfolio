import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ComedySection from "@/components/ComedySection";
import StackJumpGame from "@/components/StackJumpGame";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ExperienceSection />
      <ProjectsSection />
      <ComedySection />
      <StackJumpGame />
      <ContactSection />
      <Footer />
    </main>
  );
}
