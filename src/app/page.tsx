import IntroScreen from "@/components/home/IntroScreen";
import Hero from "@/components/home/Hero";
import AboutMe from "@/components/home/AboutMe";
import Education from "@/components/home/Education";
import CodingProfiles from "@/components/home/CodingProfiles";
import ProjectsGallery from "@/components/home/ProjectsGallery";
import SkillsConstellation from "@/components/home/SkillsConstellation";
import Achievements from "@/components/home/Achievements";
import Certificates from "@/components/home/Certificates";
import Playground from "@/components/home/Playground";
import TerminalContact from "@/components/home/TerminalContact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <IntroScreen />
      <Hero />
      <AboutMe />
      <Education />
      <CodingProfiles />
      <ProjectsGallery />
      <SkillsConstellation />
      <Achievements />
      <Certificates />
      <Playground />
      <TerminalContact />
    </div>
  );
}
