import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Moon } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: '#home' },
    { label: 'About', id: '#about' },
    { label: 'Skills', id: '#skills' },
    { label: 'Projects', id: '#projects' },
    { label: 'Experience', id: '#experience' },
    { label: 'Services', id: '#services' },
    { label: 'Contact', id: '#contact' },
  ];

  // Track scroll position for scroll progress bar & background blur triggering
  useEffect(() => {
    const handleScroll = () => {
      // Background trigger
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      // Offset for floating navbar
      const navbarOffset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Line at very top */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-neutral-900 z-50">
        <div 
          className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-200 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Bar */}
      <header 
        className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto ${
          isScrolled ? 'top-4' : 'top-6'
        }`}
      >
        <div 
          className={`flex items-center justify-between py-3 px-6 sm:px-8 rounded-full transition-all duration-500 ${
            isScrolled 
              ? 'bg-neutral-950/70 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-amber-500/5' 
              : 'bg-neutral-950/45 backdrop-blur-lg border border-white/[0.04]'
          }`}
        >
          {/* Brand/Monogram */}
          <button 
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2 group cursor-none interactive-cursor"
          >
            <div className="w-9 h-9 border border-amber-500/20 group-hover:border-amber-500/50 rounded-full flex items-center justify-center bg-neutral-900/60 transition-colors duration-300">
              <span className="font-display text-xs font-black text-gold-gradient tracking-tight">S.P</span>
            </div>
            <span className="font-display text-sm font-bold tracking-[0.2em] uppercase text-white group-hover:text-amber-400 transition-colors duration-300 hidden sm:inline-block">
              Shibam Pandab
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id.replace('#', '');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-1.5 text-xs tracking-widest uppercase font-sans font-medium hover:text-[#FFD700] transition-colors duration-300 cursor-none interactive-cursor ${
                    isActive ? 'text-amber-400' : 'text-neutral-400'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Contact CTA Button (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => handleNavClick('#contact')}
              className="px-5 py-2 text-xs font-semibold tracking-widest uppercase rounded-full border border-amber-500/30 hover:border-amber-400 text-amber-400 bg-amber-500/[0.03] hover:bg-amber-500/[0.08] transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.05)] cursor-none interactive-cursor"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors cursor-none"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Animated Full-width/Drawer Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Sliding navigation drawer with optimized mobile width */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-50 w-[85vw] sm:w-[380px] md:w-[420px] bg-neutral-950 flex flex-col justify-between p-8 sm:p-12 border-l border-white/[0.05] shadow-2xl"
            >
              {/* Header portion */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 border border-amber-500/20 rounded-full flex items-center justify-center bg-neutral-900">
                    <span className="font-display text-xs font-black text-amber-400">S.P</span>
                  </div>
                  <span className="font-display text-xs font-bold tracking-widest uppercase text-white">Shibam</span>
                </div>
                
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 border border-neutral-800 rounded-full text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Links */}
              <nav className="flex flex-col gap-6 py-6 overflow-y-auto">
                <span className="text-[10px] tracking-widest font-mono text-neutral-600 uppercase">Navigation</span>
                <div className="flex flex-col gap-2.5">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.id.replace('#', '');
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04, duration: 0.3 }}
                        onClick={() => handleNavClick(item.id)}
                        className="text-left py-1.5 font-display text-2xl sm:text-3xl font-extrabold tracking-tight hover:text-amber-400 hover:pl-2 transition-all duration-300 group"
                      >
                        <span className={`inline-block mr-3 font-mono text-[10px] font-normal ${isActive ? 'text-amber-400' : 'text-neutral-600'}`}>
                          0{index + 1}
                        </span>
                        <span className={isActive ? 'text-gold-gradient' : 'text-neutral-300'}>
                          {item.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </nav>

              {/* Socials & Status */}
              <div className="border-t border-neutral-900 pt-6 flex flex-col gap-4 font-mono text-[11px] text-neutral-500">
                <div className="flex gap-4">
                  <a href="https://github.com/ShibamPandab" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">GH</a>
                  <a href="https://www.linkedin.com/in/shibam-pandab" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">LI</a>
                </div>
                <div>shibampandab@gmail.com</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
