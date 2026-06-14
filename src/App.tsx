import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectVault from './components/ProjectVault';
import Timeline from './components/Timeline';
import Services from './components/Services';
import Achievements from './components/Achievements';
import PhilosophyAndIndustries from './components/PhilosophyAndIndustries';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Unified scroll section tracking utilizing high-performance IntersectionObserver
  useEffect(() => {
    if (loading) return;

    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'services', 'contact'];
    
    // sweet spot: trigger when section covers middle 40% of page
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1,
    };

    const activeObservers = sections.map((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return null;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        });
      }, observerOptions);

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      activeObservers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, [loading]);

  return (
    <>
      {/* Cinematic entry preloader */}
      <Preloader onComplete={() => setLoading(false)} />

      <AnimatePresence mode="wait">
        {!loading && (
          <div className="relative min-h-screen bg-[#050505] text-[#FFFFFF] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#050505] overflow-x-hidden">
            
            {/* Liquid customizable custom cursor */}
            <CustomCursor />

            {/* Floating glassmorphic navigation bar */}
            <Navbar activeSection={activeSection} />

            {/* Scrolling experience layout */}
            <main className="relative z-10">
              
              {/* Home / Hero and dynamic particle canvas */}
              <Hero />
              
              {/* About / Genesis narrative and visual overlays */}
              <About />
              
              {/* Skills / Capabalities interactive progress lines */}
              <Skills />
              
              {/* Projects / Framer-portfolio and analytics stats */}
              <Projects />

              {/* Project Vault — floating universe of experiments & builds */}
              <ProjectVault />
              
              {/* Experience Timeline */}
              <Timeline />
              
              {/* Services cards with gold border glow */}
              <Services />
              
              {/* High-value achievements summary */}
              <Achievements />
              
              {/* Project Philosophy & Industries Served */}
              <PhilosophyAndIndustries />
              
              {/* Contact direct transmission fields */}
              <Contact />

            </main>

            {/* Minimal luxury footer and trademarks */}
            <Footer />

            {/* Floating WhatsApp Quick Action Button */}
            <a
              href="https://wa.me/917908861804?text=Hello%20Shibam,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noreferrer"
              className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 rounded-full flex items-center justify-center text-neutral-950 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.55)] hover:scale-110 transition-all duration-300 cursor-none interactive-cursor group"
              aria-label="Chat on WhatsApp"
            >
              <svg className="w-7 h-7 fill-neutral-950 group-hover:rotate-6 transition-transform duration-300" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.022-.08-.124-.22-.364-.34-.24-.12-1.418-.7-1.638-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-.992-.367-1.89-1.167-.698-.622-1.17-1.39-1.305-1.63-.137-.24-.015-.37.106-.49.11-.107.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.195-.476-.39-.412-.54-.42-.14-.008-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.57.18 1.09.15 1.5.09.46-.07 1.418-.58 1.618-1.14.2-.56.2-1.04.14-1.14-.06-.1-.2-.16-.44-.28zM12 2C6.477 2 2 6.477 2 12c0 1.84.497 3.57 1.36 5.07L2 22l5.07-1.36C8.57 21.503 10.3 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.65 0-3.19-.44-4.52-1.21l-.32-.19-2.99.8.81-2.93-.21-.34C4.01 14.81 3.5 13.46 3.5 12c0-4.69 3.81-8.5 8.5-8.5s8.5 3.81 8.5 8.5-3.81 8.5-8.5 8.5z"/>
              </svg>
            </a>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}
