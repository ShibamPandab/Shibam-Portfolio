import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Award, Zap, Smartphone, Palette, Film, Activity, Compass, Utensils, Sparkles, ShoppingBag, Cpu, GraduationCap } from 'lucide-react';

export default function PhilosophyAndIndustries() {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: '⚡ Performance First',
      description: 'Fast-loading, optimized experiences built with modern frontend technologies.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-amber-500" />,
      title: '📱 Responsive by Default',
      description: 'Seamless layouts designed for desktop, tablet, and mobile devices.',
    },
    {
      icon: <Palette className="w-5 h-5 text-amber-500" />,
      title: '🎨 Design with Purpose',
      description: 'Every visual decision is guided by usability, clarity, and brand storytelling.',
    },
  ];

  const industries = [
    {
      icon: <Film className="w-6 h-6 text-amber-500" />,
      name: '🎬 Wedding & Cinematic Portfolios',
    },
    {
      icon: <Activity className="w-6 h-6 text-amber-500" />,
      name: '🏥 Healthcare & Clinics',
    },
    {
      icon: <Compass className="w-6 h-6 text-amber-500" />,
      name: '🏛️ Architecture & Design Studios',
    },
    {
      icon: <Utensils className="w-6 h-6 text-amber-500" />,
      name: '🍽️ Restaurants & Hospitality',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      name: '💄 Salons & Beauty Brands',
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-amber-500" />,
      name: '🛍️ Ecommerce & Fashion',
    },
    {
      icon: <Cpu className="w-6 h-6 text-amber-500" />,
      name: '🤖 SaaS & AI Products',
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-amber-500" />,
      name: '🎓 Education & Coaching',
    },
  ];

  return (
    <>
      {/* ── PROJECT PHILOSOPHY SECTION ── */}
      <section
        id="philosophy"
        className="py-24 sm:py-32 bg-neutral-950 p-6 sm:p-8 xl:p-12 relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute left-[10%] top-1/4 w-[500px] h-[500px] bg-amber-500/[0.015] rounded-full blur-[140px] hidden md:block" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16 md:mb-20">
            <span className="font-mono text-xs text-amber-500 tracking-widest font-semibold uppercase flex items-center gap-1.5 mb-3">
              <Award className="w-3.5 h-3.5" /> 07 / PHILOSOPHY
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase select-none">
              Project <span className="text-gold-gradient">Philosophy</span>
            </h2>
            <p className="mt-4 text-neutral-400 max-w-xl text-sm sm:text-base font-sans">
              Crafting digital experiences that balance aesthetics, performance, and business impact.
            </p>
            <div className="w-24 h-[1px] bg-amber-500/50 mt-6" />
          </div>

          {/* Centered Main Statement Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl mx-auto p-8 sm:p-12 md:p-14 rounded-[28px] glass-card text-center shadow-2xl relative mb-16 overflow-hidden border border-white/[0.06] group"
          >
            {/* Ambient inner soft glow */}
            <div className="absolute -inset-1 rounded-[28px] bg-amber-500/[0.02] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />
            
            <p className="font-sans text-neutral-200 text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto relative z-10 italic">
              "I believe great websites should do more than look beautiful. Every project is designed to combine visual storytelling, responsive performance, intuitive user experience, and business-focused outcomes. My goal is to build digital experiences that feel premium, modern, and memorable."
            </p>
          </motion.div>

          {/* 3 Column Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-card rounded-[20px] p-6 sm:p-8 flex flex-col items-start text-left shadow-lg relative border border-white/[0.05] hover:border-[#D4AF37]/30 transition-all duration-300 group hover:-translate-y-1 cursor-none interactive-cursor"
              >
                {/* Gold Top Highlight Line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon Circle */}
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-white/[0.06] flex items-center justify-center mb-5 group-hover:border-[#D4AF37]/40 transition-colors">
                  {feat.icon}
                </div>

                <h3 className="font-display font-extrabold text-white text-base sm:text-lg mb-2 uppercase tracking-wide">
                  {feat.title}
                </h3>
                
                <p className="font-sans text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── INDUSTRIES SERVED SECTION ── */}
      <section
        id="industries"
        className="py-24 sm:py-32 bg-neutral-900/40 p-6 sm:p-8 xl:p-12 relative overflow-hidden"
      >
        <div className="absolute right-[5%] bottom-1/4 w-[450px] h-[450px] bg-amber-500/[0.012] rounded-full blur-[130px] hidden md:block" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16 md:mb-20">
            <span className="font-mono text-xs text-amber-500 tracking-widest font-semibold uppercase flex items-center gap-1.5 mb-3">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg> 08 / EXPERTISE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase select-none">
              Industries <span className="text-gold-gradient">Served</span>
            </h2>
            <p className="mt-4 text-neutral-400 max-w-xl text-sm sm:text-base font-sans">
              Projects built across multiple industries and business categories.
            </p>
            <div className="w-24 h-[1px] bg-amber-500/50 mt-6" />
          </div>

          {/* Grid of Industry Badges/Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {industries.map((ind, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-card rounded-[16px] p-5 flex items-center gap-4 text-left shadow-md border border-white/[0.04] hover:border-[#D4AF37]/25 hover:bg-neutral-900/60 transition-all duration-300 group cursor-none interactive-cursor"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  {ind.icon}
                </div>
                
                <span className="font-display font-semibold text-neutral-200 text-sm tracking-wide group-hover:text-white transition-colors leading-snug">
                  {ind.name}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
