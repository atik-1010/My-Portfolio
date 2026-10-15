import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { CompetitiveProgramming } from '@/components/sections/CompetitiveProgramming';
import { Leadership } from '@/components/sections/Leadership';
import { Achievements } from '@/components/sections/Achievements';
import { GitHubActivity } from '@/components/sections/GitHubActivity';
import { Resume } from '@/components/sections/Resume';
import { Contact } from '@/components/sections/Contact';

/**
 * Home page — statically rendered, with the GitHub and Codeforces sections
 * revalidated every 6 hours so live figures stay current without any
 * client-side fetching.
 */
export const revalidate = 21600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <CompetitiveProgramming />
      <Leadership />
      <Achievements />
      <GitHubActivity />
      <Resume />
      <Contact />
    </>
  );
}
