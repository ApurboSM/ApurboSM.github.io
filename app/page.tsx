import { Hero } from '@/components/sections/hero';
import { Experience } from '@/components/sections/experience';
import { SelectedWork } from '@/components/sections/selected-work';
import { EngineeringProcess } from '@/components/sections/engineering-process';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { TechNetwork } from '@/components/sections/tech-network';
import { Activities } from '@/components/sections/activities';
import { GithubActivity } from '@/components/sections/github-activity';
import { Education } from '@/components/sections/education';
import { Contact } from '@/components/sections/contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <SelectedWork />
      <EngineeringProcess />
      <About />
      <Skills />
      <TechNetwork />
      <Activities />
      <GithubActivity />
      <Education />
      <Contact />
    </>
  );
}
