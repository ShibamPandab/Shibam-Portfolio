import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Cinematic intro — "A developer's journey from nothing to creation"
//
// Timeline (absolute seconds):
//   0.3  → cursor appears (gold blink)
//   0.5  → S1 types: "Every project starts with a blank screen."  [41ch × 46ms = 1.89s → done ~2.4s]
//   2.9  → S1 fades out
//   3.4  → S2 types: "One idea."                                  [9ch  × 68ms = 0.61s → done ~4.0s]
//   4.6  → S2 fades out
//   4.85 → S3 types: "One decision."                              [13ch × 58ms = 0.75s → done ~5.6s]
//   6.0  → S3 dissolves (blur + opacity) + slow zoom begins
//   6.6  → S4 types: "Thousands of lines later..."               [26ch × 52ms = 1.35s → done ~7.95s]
//         + particles fade in
//   8.4  → S4 fades, typewriter layer hides
//   8.9  → SHIBAM PANDAB reveals (motion blur → sharp)
//   9.6  → "Frontend Engineer" slides in
//   9.85 → "AI Workflow Builder" slides in
//  10.2  → gold line expands from center
//  11.5  → preloader slides UP revealing portfolio underneath
//  12.35 → onComplete() → React unmounts preloader
// ─────────────────────────────────────────────────────────────────────────────

export default function Preloader({ onComplete }: PreloaderProps) {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const cursorRef   = useRef<HTMLSpanElement>(null);
  const textRef     = useRef<HTMLSpanElement>(null);
  const typeRowRef  = useRef<HTMLDivElement>(null);
  const nameRef     = useRef<HTMLHeadingElement>(null);
  const role1Ref    = useRef<HTMLParagraphElement>(null);
  const role2Ref    = useRef<HTMLParagraphElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // ── Safety: always exit within 15 s even if GSAP stalls ─────────────────
    const safety = setTimeout(() => {
      document.body.style.overflow = '';
      onComplete();
    }, 15000);

    // ── Lock body scroll during intro ────────────────────────────────────────
    document.body.style.overflow = 'hidden';

    // ── Null-guard early exit ────────────────────────────────────────────────
    const wrapper  = wrapperRef.current;
    const textEl   = textRef.current;
    const cursorEl = cursorRef.current;
    const typeRow  = typeRowRef.current;

    if (!wrapper || !textEl || !cursorEl || !typeRow) {
      clearTimeout(safety);
      document.body.style.overflow = '';
      onComplete();
      return;
    }

    // ── Particle canvas ──────────────────────────────────────────────────────
    interface Pt {
      x: number; y: number;
      vx: number; vy: number;
      size: number; alpha: number; targetAlpha: number;
      color: string;
    }

    let raf = 0;
    let particlesActive = false;
    const particles: Pt[] = [];
    const canvas = canvasRef.current;
    let canvasCtx: CanvasRenderingContext2D | null = null;

    if (canvas) {
      canvasCtx = canvas.getContext('2d');
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;

      for (let i = 0; i < 60; i++) {
        const ta = Math.random() * 0.28 + 0.07;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          size: Math.random() * 1.3 + 0.3,
          alpha: 0,
          targetAlpha: ta,
          color: Math.random() > 0.72 ? '#D4AF37' : 'rgba(255,255,255,0.65)',
        });
      }

      const drawLoop = () => {
        const ctx = canvasCtx;
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of particles) {
          // Ease alpha toward target (in) or to zero (out)
          if (particlesActive) {
            p.alpha += (p.targetAlpha - p.alpha) * 0.009;
          } else {
            p.alpha *= 0.97;
          }

          if (p.alpha < 0.003) continue;

          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          ctx.globalAlpha = p.alpha;
          ctx.fillStyle   = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        raf = requestAnimationFrame(drawLoop);
      };
      drawLoop();
    }

    // ── Typewriter utility ───────────────────────────────────────────────────
    const ivs: ReturnType<typeof setInterval>[] = [];

    const type = (text: string, speedMs: number) => {
      textEl.textContent = '';
      let i = 0;
      const iv = setInterval(() => {
        if (i >= text.length) { clearInterval(iv); return; }
        textEl.textContent += text[i++];
      }, speedMs);
      ivs.push(iv);
    };

    // ── Set all initial GSAP states ──────────────────────────────────────────
    gsap.set(cursorEl, { opacity: 0 });
    gsap.set(typeRow,  { opacity: 1, filter: 'blur(0px)' });
    gsap.set(textEl,   { opacity: 1 });

    const nameEl  = nameRef.current;
    const role1El = role1Ref.current;
    const role2El = role2Ref.current;
    const lineEl  = lineRef.current;

    if (nameEl)  gsap.set(nameEl,  { opacity: 0, y: 28, filter: 'blur(10px)' });
    if (role1El) gsap.set(role1El, { opacity: 0, y: 18 });
    if (role2El) gsap.set(role2El, { opacity: 0, y: 18 });
    if (lineEl)  gsap.set(lineEl,  { scaleX: 0 });

    // ── Master GSAP Timeline ─────────────────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 0.3 s ── gold cursor blinks in
    tl.to(cursorEl, { opacity: 1, duration: 0.01 }, 0.3);

    // 0.5 s ── sentence 1
    tl.add(() => type('Every project starts with a blank screen.', 46), 0.5);

    // 2.9 s ── fade s1 (0.4 s)
    tl.to(typeRow, { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 2.9);

    // 3.4 s ── sentence 2 "One idea."
    tl.add(() => {
      textEl.textContent = '';
      gsap.set(typeRow, { opacity: 1, filter: 'blur(0px)' });
      type('One idea.', 68);
    }, 3.4);

    // 4.6 s ── fade s2 quickly
    tl.to(typeRow, { opacity: 0, duration: 0.28, ease: 'power2.inOut' }, 4.6);

    // 4.85 s ── morph / sentence 3 "One decision."
    tl.add(() => {
      textEl.textContent = '';
      gsap.set(typeRow, { opacity: 1, filter: 'blur(0px)' });
      type('One decision.', 58);
    }, 4.85);

    // 6.0 s ── s3 dissolves with motion blur + begin slow cinematic zoom
    tl.to(typeRow, {
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.55,
      ease: 'power2.inOut',
    }, 6.0);
    tl.to(wrapper, {
      scale: 1.03,
      duration: 3.5,
      ease: 'none',        // linear drift — the most cinematic feel
    }, 6.0);

    // 6.6 s ── particles fade in + sentence 4 "Thousands of lines later..."
    tl.add(() => {
      particlesActive = true;
      textEl.textContent = '';
      gsap.set(typeRow, { opacity: 0, filter: 'blur(0px)' });
      gsap.to(typeRow, { opacity: 1, duration: 0.45, ease: 'power2.out' });
      type('Thousands of lines later...', 52);
    }, 6.6);

    // 8.4 s ── s4 fades + typewriter layer hides
    tl.to(typeRow, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 8.4);

    // 8.9 s ── SHIBAM PANDAB: motion blur clears as it rises
    if (nameEl) {
      tl.to(nameEl, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.15,
        ease: 'power3.out',
      }, 8.9);
    }

    // 9.6 s ── "Frontend Engineer" slides up
    if (role1El) {
      tl.to(role1El, { opacity: 1, y: 0, duration: 0.65 }, 9.6);
    }

    // 9.85 s ── "AI Workflow Builder" slides up
    if (role2El) {
      tl.to(role2El, { opacity: 1, y: 0, duration: 0.65 }, 9.85);
    }

    // 10.2 s ── gold line expands from center
    if (lineEl) {
      tl.to(lineEl, { scaleX: 1, duration: 0.95, ease: 'power3.out' }, 10.2);
    }

    // 11.5 s ── slide preloader UP revealing the portfolio underneath
    //           Portfolio is always rendered in App.tsx so it's ready here.
    tl.to(wrapper, {
      yPercent: -100,
      duration: 0.88,
      ease: 'power3.inOut',
      onComplete: () => {
        clearTimeout(safety);
        cancelAnimationFrame(raf);
        ivs.forEach(clearInterval);
        document.body.style.overflow = '';
        onComplete(); // → App.tsx sets loading=false → React unmounts this component
      },
    }, 11.5);

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      tl.kill();
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      ivs.forEach(clearInterval);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000000',
        overflow: 'hidden',
        // No flex centering here — each layer is absolutely centered itself
      }}
    >
      {/* ── Particle canvas ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── Typewriter layer (absolute center) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <div
          ref={typeRowRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            padding: '0 28px',
            maxWidth: 700,
            width: '100%',
          }}
        >
          <span
            ref={textRef}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(15px, 2.1vw, 20px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.82)',
              letterSpacing: '0.03em',
              lineHeight: 1.6,
            }}
          />
          <span
            ref={cursorRef}
            style={{
              display: 'inline-block',
              width: 2,
              height: '1.1em',
              backgroundColor: '#D4AF37',
              flexShrink: 0,
              verticalAlign: 'middle',
              animation: 'cineBlinkCursor 0.9s step-end infinite',
            }}
          />
        </div>
      </div>

      {/* ── Name / role reveal layer (absolute center) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {/* Name */}
        <h1
          ref={nameRef}
          style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontSize: 'clamp(42px, 9.5vw, 104px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            lineHeight: 0.92,
            margin: 0,
          }}
        >
          SHIBAM<br />PANDAB
        </h1>

        {/* Roles */}
        <div style={{ marginTop: 26 }}>
          <p
            ref={role1Ref}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(9px, 1.35vw, 13px)',
              letterSpacing: '0.34em',
              color: 'rgba(255,255,255,0.40)',
              textTransform: 'uppercase',
              margin: '0 0 8px',
            }}
          >
            Frontend Engineer
          </p>
          <p
            ref={role2Ref}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(9px, 1.35vw, 13px)',
              letterSpacing: '0.34em',
              color: '#D4AF37',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            AI Workflow Builder
          </p>
        </div>

        {/* Gold line — expands from center after roles */}
        <div style={{ marginTop: 30 }}>
          <div
            ref={lineRef}
            style={{
              width: 100,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)',
              transformOrigin: 'center',
            }}
          />
        </div>
      </div>

      {/* Cursor blink keyframe */}
      <style>{`
        @keyframes cineBlinkCursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
