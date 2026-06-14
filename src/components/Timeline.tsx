import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { TimelineItem } from '../types';

export default function Timeline() {
  const experiences: TimelineItem[] = [
    {
      id: 'time-01',
      period: 'JAN – FEB 2026',
      title: 'Foundations',
      companyOrRole: 'HTML, CSS, Responsive Design, Semantic HTML, Accessibility',
      description: 'Built strong web development fundamentals with a focus on clean structure, responsive layouts, semantic markup, and modern design principles.',
      tech: ['HTML', 'CSS', 'Responsive Design', 'Semantic HTML', 'Accessibility']
    },
    {
      id: 'time-02',
      period: 'MAR 2026',
      title: 'AI-Powered Learning',
      companyOrRole: 'AI Tools, Prompt Engineering, Development Workflows',
      description: 'Leveraged modern AI tools to accelerate learning, improve development workflows, explore rapid prototyping, and increase productivity.',
      tech: ['AI Tools', 'Prompt Engineering', 'Workflows']
    },
    {
      id: 'time-03',
      period: 'APR 2026',
      title: 'Modern UI Systems',
      companyOrRole: 'Animations, Premium Interfaces, UX Patterns',
      description: 'Focused on crafting immersive user experiences through premium visual design, motion systems, interface architecture, and storytelling-driven layouts.',
      tech: ['Animations', 'Premium Interfaces', 'UX Patterns']
    },
    {
      id: 'time-04',
      period: 'MAY 2026',
      title: 'Production Workflows',
      companyOrRole: 'GitHub, Vercel, Deployment, Performance Optimization',
      description: 'Adopted professional workflows including version control, deployment pipelines, performance optimization, debugging, and project maintenance.',
      tech: ['GitHub', 'Vercel', 'Deployment', 'Optimization']
    },
    {
      id: 'time-05',
      period: 'JUN 2026 – PRESENT',
      title: 'Client-Focused Solutions',
      companyOrRole: 'Portfolio Websites, Business Websites, SaaS Interfaces',
      description: 'Designing and developing premium digital experiences tailored for businesses, creators, agencies, and modern brands with a focus on presentation and usability.',
      tech: ['Portfolio Sites', 'Business Sites', 'SaaS Interfaces']
    }
  ];

  return (
    <section 
      id="experience" 
      className="py-24 sm:py-32 bg-neutral-900/40 p-6 sm:p-8 xl:p-12 relative overflow-hidden"
    >
      <div className="absolute right-1/4 top-1/4 w-80 h-80 bg-amber-500/1 rounded-full blur-[100px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-24">
          <span className="font-mono text-xs text-amber-500 tracking-widest font-semibold uppercase flex items-center gap-1.5 mb-3">
            <Calendar className="w-3.5 h-3.5" /> 05 / CHRONOLOGY
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase">
            Evolution <span className="text-gold-gradient">Timeline</span>
          </h2>
          <p className="mt-4 text-neutral-400 max-w-xl text-sm sm:text-base font-sans">
            A focused six-month journey from web fundamentals to building premium client-ready digital experiences.
          </p>
          <div className="w-24 h-[1px] bg-amber-500/50 mt-6" />
        </div>

        {/* Timeline Grid (Self-adjusting: Desktop horizontal, Mobile/Tablet vertical) */}
        <div className="relative mt-12 md:mt-20">
          
          {/* Desktop Connection line (hidden on mobile) */}
          <div className="absolute top-6 left-6 right-[calc(20%_-_24px)] h-[1.5px] bg-neutral-800 hidden md:block z-0" />
          <div className="absolute top-6 left-6 w-3/5 h-[1.5px] bg-gradient-to-r from-amber-600 via-amber-400 to-transparent hidden md:block z-0" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10 items-stretch">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="h-full"
              >
                <div className="relative flex flex-col items-start text-left group h-full">
                  
                  {/* Visual Step bubble / Indicator */}
                  <div className="flex items-center md:flex-col md:items-start gap-4 md:gap-0 w-full mb-6 md:mb-8">
                    
                    {/* Circle */}
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center relative z-10 group-hover:border-amber-400 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-300">
                      <span className="font-mono text-xs font-bold text-amber-400">0{idx + 1}</span>
                    </div>

                    {/* Period badge (on top for desktop grid, right for mobile) */}
                    <div className="px-2.5 py-1 glass rounded-md font-mono text-[10px] tracking-widest text-[#D4AF37] uppercase md:mt-5">
                      {exp.period}
                    </div>

                  </div>

                  {/* Card details */}
                  <div className="p-5 pt-10 sm:p-6 sm:pt-12 rounded-[20px] glass-card flex-1 w-full transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-extrabold text-white text-sm sm:text-base tracking-tight uppercase">
                        {exp.title}
                      </h3>
                      
                      <p className="font-mono text-[9px] text-neutral-500 mt-2 uppercase tracking-wider">
                        {exp.companyOrRole}
                      </p>

                      <p className="text-neutral-400 text-xs mt-12 sm:mt-14 leading-relaxed font-sans">
                        {exp.description}
                      </p>
                    </div>

                    {/* Micro tags */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {exp.tech?.map((t) => (
                        <span 
                          key={t}
                          className="px-2 py-0.5 bg-neutral-900 border border-white/[0.04] rounded-md font-mono text-[8px] text-neutral-400 uppercase tracking-widest"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
