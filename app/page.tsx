import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ComedySection from "@/components/ComedySection";
import CareerRunnerGame from "@/components/CareerRunnerGame";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AchievementsProvider from "@/components/AchievementsProvider";
import AchievementsHud from "@/components/AchievementsHud";

export default function Home() {
  return (
    <AchievementsProvider>
      <main>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <ComedySection />
        <CareerRunnerGame />
        <ContactSection />
        <Footer />
        <AchievementsHud />
      </main>
    </AchievementsProvider>
  );
}
