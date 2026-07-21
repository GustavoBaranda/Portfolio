import HeroBio from "@/components/about/HeroBio";
import ExperienceSection from "@/components/about/ExperienceSection";
import EducationSection from "@/components/about/EducationSection";

export default function AboutPage() {
  return (
    <main className="pb-6 pt-0 md:py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        <HeroBio />
        <ExperienceSection />
        <EducationSection />
      </div>
    </main>
  );
}