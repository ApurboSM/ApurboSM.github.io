import { Hero } from '@/components/sections/hero';
import { Experience } from '@/components/sections/experience';
import { WhatIBuild } from '@/components/sections/what-i-build';
import { SelectedWork } from '@/components/sections/selected-work';
import { EngineeringProcess } from '@/components/sections/engineering-process';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Activities } from '@/components/sections/activities';
import { GithubActivity } from '@/components/sections/github-activity';
import { Education } from '@/components/sections/education';
import { Contact } from '@/components/sections/contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <WhatIBuild />
      <SelectedWork />
      <EngineeringProcess />
      <About />
      <Skills />
      <Activities />
      <GithubActivity />
      <Education />
      <Contact />
    </>
  );
}
