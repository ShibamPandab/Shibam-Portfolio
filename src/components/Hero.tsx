import { useEffect, useRef, useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowDownLeft, ChevronDown, Award, Send, Cpu } from 'lucide-react';
import portraitImage from '../assets/portrait.jpeg';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D Card Hover Effect State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Floating gold particle calculations on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const initParticles = (width: number, height: number) => {
      particles = [];
      const count = Math.min(60, Math.floor((width * height) / 20000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          color: '#D4AF37',
          alpha: Math.random() * 0.4 + 0.1,
        });
      }
    };

    // ResizeObserver implementation to avoid fixed width/height issues
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        initParticles(width, height);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle connectors between particles
      const len = particles.length;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < len; i++) {
        const p1 = particles[i];
        p1.x += p1.speedX;
        p1.y += p1.speedY;

        // Wrap around borders
        if (p1.x < 0) p1.x = canvas.width;
        if (p1.x > canvas.width) p1.x = 0;
        if (p1.y < 0) p1.y = canvas.height;
        if (p1.y > canvas.height) p1.y = 0;

        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.strokeStyle = '#D4AF37';
            ctx.globalAlpha = (1 - dist / 120) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle subtle 3D card tilt effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate relative to card
    const y = e.clientY - rect.top; // y coordinate relative to card
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const calcRotateX = -(y - centerY) / 12; // cap maximum tilt
    const calcRotateY = (x - centerX) / 12;

    setRotateX(calcRotateX);
    setRotateY(calcRotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section 
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-mesh-gradient"
    >
      {/* Dynamic particles background canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft glowing ambient gold bulbs (hidden on mobile for performance/responsiveness) */}
        <div className="absolute top-[20%] right-[10%] w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] animate-gold-glow hidden md:block" />
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full bg-amber-500/3 blur-[90px] animate-gold-glow hidden md:block" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="container mx-auto px-6 sm:px-8 xl:px-12 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COMPONENT - Typography intro */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-white/[0.06] rounded-full mb-6 font-mono text-[10px] tracking-widest text-[#D4AF37] uppercase"
          >
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
            </span>
            Available for Creative Contracts
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.05] text-white"
          >
            Hi, I'm <span className="text-gold-gradient block sm:inline">Shibam Pandab</span>
            <span className="block text-neutral-400 text-3xl sm:text-5xl xl:text-6xl mt-2 font-medium tracking-tight">
              Frontend Developer & Creative Web Designer
            </span>
          </motion.h1>

          {/* Description Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-neutral-400 text-base sm:text-lg lg:text-xl font-sans max-w-xl leading-relaxed"
          >
            I build responsive, clean, and interactive digital spaces that combine structured frontend code with modern web design principles.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={() => scrollToSection('#projects')}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-neutral-950 font-bold tracking-widest text-xs uppercase rounded-full shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:scale-[1.03] transition-all duration-300 flex items-center gap-2 cursor-none interactive-cursor"
            >
              View Projects <Award className="w-4 h-4 ml-1" />
            </button>
            
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-4 border border-white/[0.08] hover:border-amber-400 text-white hover:text-amber-400 rounded-full bg-neutral-950/20 backdrop-blur-sm tracking-widest text-xs uppercase font-bold hover:scale-[1.03] transition-all duration-300 flex items-center gap-2 cursor-none interactive-cursor"
            >
              Contact Me <Send className="w-3.5 h-3.5 ml-1" />
            </button>
          </motion.div>

          {/* Developer Metric Anchors */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-14 pt-8 border-t border-white/[0.06] grid grid-cols-3 gap-6 font-display max-w-md w-full"
          >
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white">8+</p>
              <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mt-1">Premium Builds</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white">10+</p>
              <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mt-1">Core Skills</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white">100%</p>
              <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mt-1">Responsive Design</p>
            </div>
          </motion.div>

        </div>

        {/* RIGHT COMPONENT - 3D Card / Graphical Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          {/* Interactive 3D Card Containment */}
          <div
            className="relative w-full max-w-[380px] aspect-[4/5] rounded-[24px] cursor-none interactive-cursor p-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              perspective: '1000px',
            }}
          >
            <motion.div
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: 'preserve-3d',
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="absolute inset-4 rounded-[20px] glass-card overflow-hidden shadow-2xl flex flex-col justify-between p-6 group"
            >
              {/* Card glossy lighting sheet */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-white/[0.02] to-amber-500/10 pointer-events-none group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Card Top Branding */}
              <div className="flex justify-between items-start" style={{ transform: 'translateZ(40px)' }}>
                <div className="w-10 h-10 rounded-xl bg-neutral-950/70 border border-white/[0.06] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase">FRONTEND PORTFOLIO</span>
              </div>

              {/* Card Center - Floating visual node */}
              <div className="flex flex-col items-center justify-center py-6" style={{ transform: 'translateZ(60px)' }}>
                <div className="relative w-40 h-40 rounded-full flex items-center justify-center bg-gradient-to-tr from-amber-500/15 to-yellow-500/25 shadow-inner group-hover:scale-105 transition-transform duration-500">
                  {/* Glowing gold halo behind the avatar */}
                  <div className="absolute inset-4 rounded-full bg-amber-500/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                  
                  {/* Rotating rings */}
                  <div className="absolute inset-1 border border-amber-500/30 rounded-full animate-[spin_12s_linear_infinite]" />
                  <div className="absolute inset-3 border border-dashed border-yellow-400/20 rounded-full animate-[spin_24s_linear_infinite_reverse]" />
                  
                  {/* Photo Frame with premium monochrome + luxury gold shade blend ratio */}
                  <div className="absolute inset-6 bg-neutral-950 rounded-full overflow-hidden flex items-center justify-center border border-white/[0.08] shadow-2xl">
                    <img 
                      src={portraitImage}
                      alt="Shibam Pandab Profile Portrait"
                      className="w-full h-full object-cover object-center grayscale contrast-[1.05] brightness-90 group-hover:scale-110 group-hover:brightness-100 transition-all duration-700"
                    />
                    {/* Gold overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-amber-500/12 to-transparent mix-blend-color-burn" />
                    {/* Dark reflection overlay */}
                    <div className="absolute inset-0 bg-neutral-950/20 group-hover:opacity-0 transition-opacity duration-500" />
                  </div>

                  {/* Small luxurious badge overlay containing the existing monogram content */}
                  <div className="absolute -bottom-1 px-3 py-1 rounded-full bg-neutral-950/90 border border-amber-500/30 font-mono text-[8px] tracking-widest text-amber-400 font-bold uppercase backdrop-blur-md shadow-lg" style={{ transform: 'translateZ(10px)' }}>
                    S.P.
                  </div>
                </div>
              </div>

              {/* Card Footer Statistics */}
              <div className="border-t border-white/[0.06] pt-4" style={{ transform: 'translateZ(30px)' }}>
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <p className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">PRIMARY ROLE</p>
                    <p className="font-display font-bold text-white mt-0.5">WEB DEVELOPER</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">FOCUS ZONE</p>
                    <p className="font-display font-medium text-amber-400 mt-0.5">UI & DESIGN</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Floating Prompt on Bottom Center */}
      <div 
        onClick={() => scrollToSection('#about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-none interactive-cursor text-neutral-500 hover:text-[#D4AF37] transition-all duration-300 z-10"
      >
        <span className="font-mono text-[9px] tracking-widest uppercase">Explore Experience</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-amber-500" />
        </motion.div>
      </div>

    </section>
  );
}
