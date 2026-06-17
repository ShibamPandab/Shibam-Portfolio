import { useEffect, useRef, useState, MouseEvent, RefObject } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Award, Send } from 'lucide-react';
import portraitImage from '../assets/portrait.jpeg';

// ─────────────────────────────────────────────────────────────────────────────
// Gold particle canvas — ambient, minimal
// ─────────────────────────────────────────────────────────────────────────────
function useParticleCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  containerRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    type P = {
      x: number; y: number;
      vx: number; vy: number;
      size: number; alpha: number;
    };
    let pts: P[] = [];

    const init = (w: number, h: number) => {
      pts = [];
      const n = Math.min(55, Math.floor((w * h) / 20000));
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          size: Math.random() * 1.8 + 0.4,
          alpha: Math.random() * 0.35 + 0.06,
        });
      }
    };

    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        const { width, height } = e.contentRect;
        canvas.width = width;
        canvas.height = height;
        init(width, height);
      }
    });
    if (containerRef.current) ro.observe(containerRef.current);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const l = pts.length;
      for (let i = 0; i < l; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#D4AF37';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < l; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 115) {
            ctx.strokeStyle = '#D4AF37';
            ctx.lineWidth = 0.4;
            ctx.globalAlpha = (1 - d / 115) * 0.09;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D tilt card state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  useParticleCanvas(canvasRef, sectionRef as RefObject<HTMLDivElement | null>);

  // ── GSAP cinematic entrance ────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Use gsap.context scoped to the full section so all #hero-* IDs are found
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Set initial hidden states
      gsap.set('#hero-content', { opacity: 0, scale: 1.04 });
      gsap.set('#hero-badge', { opacity: 0, y: 14 });
      gsap.set('#hero-name', { opacity: 0, y: 32, filter: 'blur(4px)' });
      gsap.set('#hero-role1', { opacity: 0, x: -18 });
      gsap.set('#hero-dot', { opacity: 0, scale: 0 });
      gsap.set('#hero-role2', { opacity: 0, x: 18 });
      gsap.set('#hero-desc', { opacity: 0, y: 18 });
      gsap.set('#hero-ctas', { opacity: 0, y: 16 });
      gsap.set('#hero-stats', { opacity: 0 });
      gsap.set('#hero-card', { opacity: 0, scale: 0.93, y: 20 });
      gsap.set('#hero-scroll', { opacity: 0 });

      // Content grid scale-in (cinematic zoom completes)
      tl.to('#hero-content', { scale: 1, opacity: 1, duration: 1.1 }, 0);

      // Badge
      tl.to('#hero-badge', { opacity: 1, y: 0, duration: 0.65 }, 0.25);

      // Name blur-in
      tl.to('#hero-name', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 }, 0.5);

      // Role 1
      tl.to('#hero-role1', { opacity: 1, x: 0, duration: 0.7 }, 0.8);

      // Divider dot
      tl.to('#hero-dot', { opacity: 1, scale: 1, duration: 0.35 }, 1.1);

      // Role 2
      tl.to('#hero-role2', { opacity: 1, x: 0, duration: 0.7 }, 1.05);

      // Description
      tl.to('#hero-desc', { opacity: 1, y: 0, duration: 0.75 }, 1.3);

      // CTAs
      tl.to('#hero-ctas', { opacity: 1, y: 0, duration: 0.7 }, 1.55);

      // Stats
      tl.to('#hero-stats', { opacity: 1, duration: 0.9 }, 1.85);

      // Card
      tl.to('#hero-card', { opacity: 1, scale: 1, y: 0, duration: 1.05 }, 0.7);

      // Scroll indicator
      tl.to('#hero-scroll', { opacity: 1, duration: 0.6 }, 2.0);
    }, section); // scope to entire section

    return () => { ctx.revert(); };
  }, []);

  // ── 3D tilt ───────────────────────────────────────────────────────────────
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const cx = r.width / 2, cy = r.height / 2;
    setRotateX(-((e.clientY - r.top) - cy) / 14);
    setRotateY(((e.clientX - r.left) - cx) / 14);
  };
  const handleMouseLeave = () => { setRotateX(0); setRotateY(0); };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-mesh-gradient"
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Ambient gold radial glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[18%] right-[8%] w-[420px] h-[420px] rounded-full bg-amber-500/[0.055] blur-[130px] animate-gold-glow hidden md:block" />
        <div className="absolute bottom-[8%] left-[4%] w-[340px] h-[340px] rounded-full bg-amber-500/[0.035] blur-[100px] animate-gold-glow hidden md:block" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-[55%] left-[38%] w-[280px] h-[280px] rounded-full bg-amber-400/[0.02] blur-[90px] animate-gold-glow hidden lg:block" style={{ animationDelay: '-6s' }} />
      </div>

      {/* ── Main content ── */}
      <div
        id="hero-content"
        className="container mx-auto px-6 sm:px-8 xl:px-12 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >

        {/* LEFT — Typography */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">

          {/* Status badge */}
          <div
            id="hero-badge"
            className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-white/[0.06] rounded-full mb-7 font-mono text-[10px] tracking-widest text-[#D4AF37] uppercase"
          >
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
            </span>
            Available for Creative Contracts
          </div>

          {/* Name */}
          <h1
            id="hero-name"
            className="font-display text-5xl sm:text-7xl xl:text-[5.5rem] font-extrabold tracking-tighter leading-[0.96] text-white"
          >
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #ffffff 30%, #D4AF37 75%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SHIBAM
            </span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #ffffff 20%, #D4AF37 70%, #e8c84a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              PANDAB
            </span>
          </h1>

          {/* Role row */}
          <div className="flex flex-wrap items-center gap-3 mt-6 mb-2">
            <span
              id="hero-role1"
              className="font-mono text-xs sm:text-sm tracking-[0.28em] text-white/70 uppercase"
            >
              Frontend Engineer
            </span>
            <span
              id="hero-dot"
              className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0"
            />
            <span
              id="hero-role2"
              className="font-mono text-xs sm:text-sm tracking-[0.28em] text-[#D4AF37] uppercase"
            >
              AI Workflow Builder
            </span>
          </div>

          {/* Thin gold separator line */}
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent mt-5 mb-7" />

          {/* Description */}
          <p
            id="hero-desc"
            className="text-neutral-400 text-base sm:text-lg lg:text-xl font-sans max-w-[520px] leading-relaxed"
          >
            Crafting interfaces that marry precision engineering with quiet elegance — from responsive frontends to AI-augmented workflows.
          </p>

          {/* CTA row */}
          <div
            id="hero-ctas"
            className="mt-10 flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={() => scrollTo('#projects')}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-neutral-950 font-bold tracking-widest text-xs uppercase rounded-full shadow-[0_0_30px_rgba(212,175,55,0.22)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-[1.03] transition-all duration-300 flex items-center gap-2 cursor-none interactive-cursor"
            >
              View Projects <Award className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="px-8 py-4 border border-white/[0.08] hover:border-amber-400 text-white hover:text-amber-400 rounded-full bg-neutral-950/20 backdrop-blur-sm tracking-widest text-xs uppercase font-bold hover:scale-[1.03] transition-all duration-300 flex items-center gap-2 cursor-none interactive-cursor"
            >
              Contact Me <Send className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          {/* Stats */}
          <div
            id="hero-stats"
            className="mt-14 pt-8 border-t border-white/[0.06] grid grid-cols-3 gap-6 font-display max-w-md w-full"
          >
            {[
              { value: '8+', label: 'Premium Builds' },
              { value: '10+', label: 'Core Skills' },
              { value: '100%', label: 'Responsive Design' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-xl sm:text-2xl font-bold text-white">{value}</p>
                <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — 3D card */}
        <div
          id="hero-card"
          className="lg:col-span-5 flex justify-center items-center"
        >
          <div
            className="relative w-full max-w-[380px] aspect-[4/5] rounded-[24px] cursor-none interactive-cursor p-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }}
          >
            <div
              className="absolute inset-4 rounded-[20px] glass-card overflow-hidden shadow-2xl flex flex-col justify-between p-6 group transition-transform duration-200"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Gloss */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-white/[0.018] to-amber-500/10 pointer-events-none group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top */}
              <div className="flex justify-between items-start" style={{ transform: 'translateZ(40px)' }}>
                <div className="w-10 h-10 rounded-xl bg-neutral-950/70 border border-white/[0.06] flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase">Frontend Portfolio</span>
              </div>

              {/* Portrait */}
              <div className="flex flex-col items-center justify-center py-6" style={{ transform: 'translateZ(60px)' }}>
                <div className="relative w-40 h-40 rounded-full flex items-center justify-center bg-gradient-to-tr from-amber-500/15 to-yellow-500/25 shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-4 rounded-full bg-amber-500/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-1 border border-amber-500/30 rounded-full animate-[spin_12s_linear_infinite]" />
                  <div className="absolute inset-3 border border-dashed border-yellow-400/20 rounded-full animate-[spin_24s_linear_infinite_reverse]" />
                  <div className="absolute inset-6 bg-neutral-950 rounded-full overflow-hidden flex items-center justify-center border border-white/[0.08] shadow-2xl">
                    <img
                      src={portraitImage}
                      alt="Shibam Pandab"
                      className="w-full h-full object-cover object-center grayscale contrast-[1.05] brightness-90 group-hover:scale-110 group-hover:brightness-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-amber-500/12 to-transparent mix-blend-color-burn" />
                    <div className="absolute inset-0 bg-neutral-950/20 group-hover:opacity-0 transition-opacity duration-500" />
                  </div>
                  <div
                    className="absolute -bottom-1 px-3 py-1 rounded-full bg-neutral-950/90 border border-amber-500/30 font-mono text-[8px] tracking-widest text-amber-400 font-bold uppercase backdrop-blur-md shadow-lg"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    S.P.
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-white/[0.06] pt-4" style={{ transform: 'translateZ(30px)' }}>
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <p className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">Primary Role</p>
                    <p className="font-display font-bold text-white mt-0.5">Frontend Engineer</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">Specialty</p>
                    <p className="font-display font-medium text-amber-400 mt-0.5">AI Workflows</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div
        id="hero-scroll"
        onClick={() => scrollTo('#about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-none interactive-cursor text-neutral-500 hover:text-[#D4AF37] transition-all duration-300 z-10"
      >
        <span className="font-mono text-[9px] tracking-widest uppercase">Explore Experience</span>
        <ChevronDown className="w-4 h-4 text-amber-500 animate-bounce" />
      </div>
    </section>
  );
}
