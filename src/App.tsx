import { useState } from 'react';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useSoundEffects } from './hooks/useSoundEffects';
import { SystemLoading } from './components/layout/SystemLoading';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Legacy } from './components/sections/Legacy';
import { EngineeringUniverse } from './components/sections/EngineeringUniverse';
import { AiEngineering } from './components/sections/AiEngineering';
import { ThinkChallenge } from './components/sections/ThinkChallenge';
import { InnovationWall } from './components/sections/InnovationWall';
import { StudentShowcase } from './components/sections/StudentShowcase';
import { Future2035 } from './components/sections/Future2035';
import { IdentityGenerator } from './components/sections/IdentityGenerator';
import { EventSection } from './components/sections/EventSection';
import { RegistrationCta } from './components/sections/RegistrationCta';
import { Gallery } from './components/sections/Gallery';

const SECTION_IDS = [
  'hero',
  'legacy',
  'engineering',
  'ai-engineering',
  'challenge',
  'innovation',
  'showcase',
  'future',
  'identity',
  'event',
  'register',
  'gallery',
];

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { activeSection, scrollProgress } = useScrollSpy(SECTION_IDS, 120);
  const { isMuted, toggleMute, playClick, playSuccess } = useSoundEffects();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 75;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05080D] text-[#F5F7FA] font-body selection:bg-[#00D9FF] selection:text-[#05080D]">
      {/* System Initialization Boot Screen */}
      {isLoading && <SystemLoading onComplete={() => setIsLoading(false)} />}

      {/* Persistent Global HUD Navigation */}
      <Navbar
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onPlayClick={playClick}
      />

      {/* Main Experience Flow */}
      <main>
        {/* Section 1: Hero */}
        <div id="hero">
          <Hero
            onEnterExperience={() => handleScrollTo('identity')}
            onExploreLegacy={() => handleScrollTo('legacy')}
            onPlayClick={playClick}
          />
        </div>

        {/* Section 2: Visvesvaraya Foundation & Legacy */}
        <Legacy onPlayClick={playClick} />

        {/* Section 3: What Does An Engineer Build? (8 Domains) */}
        <EngineeringUniverse onPlayClick={playClick} />

        {/* Section 4: Engineering × AI Architecture & Pipeline */}
        <AiEngineering onPlayClick={playClick} />

        {/* Section 5: Engineer Thinking Challenge (Interactive Mini-Game) */}
        <ThinkChallenge onPlayClick={playClick} onPlaySuccess={playSuccess} />

        {/* Section 6: From Idea to Impact (Innovation Lifecycle) */}
        <InnovationWall onPlayClick={playClick} />

        {/* Section 7: Student Innovation Showcase */}
        <StudentShowcase onPlayClick={playClick} />

        {/* Section 8: Engineers of Tomorrow (2035 Projections) */}
        <Future2035 onPlayClick={playClick} />

        {/* Section 9: Engineer Identity Generator (Digital Pass) */}
        <IdentityGenerator onPlayClick={playClick} onPlaySuccess={playSuccess} />

        {/* Section 10: Event Logistics & Speakers */}
        <EventSection onPlayClick={playClick} />

        {/* Section 11: Delegate Registration CTA */}
        <RegistrationCta onPlayClick={playClick} onPlaySuccess={playSuccess} />

        {/* Section 12: Visual Archive & Prototype Gallery */}
        <Gallery onPlayClick={playClick} />
      </main>

      {/* Technical HUD Footer */}
      <Footer />
    </div>
  );
}

export default App;
