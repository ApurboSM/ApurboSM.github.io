import { Hero } from '@/components/sections/hero';
import { SelectedWork } from '@/components/sections/selected-work';
import { EngineeringProcess } from '@/components/sections/engineering-process';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { TechNetwork } from '@/components/sections/tech-network';
import { Experience } from '@/components/sections/experience';
import { GithubActivity } from '@/components/sections/github-activity';
import { Contact } from '@/components/sections/contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <EngineeringProcess />
      <About />
      <Skills />
      <TechNetwork />
      <Experience />
      <GithubActivity />
      <Contact />
    </>
  );
}
