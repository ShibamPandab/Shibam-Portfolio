import { motion } from 'motion/react';
import { LayoutGrid, Cpu, PenTool, Terminal, CheckCircle } from 'lucide-react';
import { Skill } from '../types';

export default function Skills() {
  const skillsList: Skill[] = [
    // Frontend Architecture
    { name: 'HTML5 / Semantic Layout', category: 'frontend', level: 70, glowColor: 'rgba(212, 175, 55, 0.25)' },
    { name: 'CSS3 / Responsive Design', category: 'frontend', level: 70, glowColor: 'rgba(212, 175, 55, 0.2)' },
    { name: 'JavaScript (ES6+)', category: 'frontend', level: 30, glowColor: 'rgba(212, 175, 55, 0.3)' },
    { name: 'Git & GitHub', category: 'frontend', level: 60, glowColor: 'rgba(212, 175, 55, 0.2)' },
    
    // Backend & Tools
    { name: 'Node.js Basics', category: 'backend', level: 20, glowColor: 'rgba(212, 175, 55, 0.15)' },
    { name: 'REST APIs', category: 'backend', level: 25, glowColor: 'rgba(212, 175, 55, 0.2)' },
    { name: 'Firebase', category: 'backend', level: 20, glowColor: 'rgba(212, 175, 55, 0.15)' },
    { name: 'Vercel Deployment', category: 'backend', level: 70, glowColor: 'rgba(212, 175, 55, 0.25)' },
    
    // AI & Productivity
    { name: 'Prompt Systems Engineering', category: 'tools', level: 92, glowColor: 'rgba(212, 175, 55, 0.3)' },
    { name: 'AI Workflow Automation', category: 'tools', level: 88, glowColor: 'rgba(212, 175, 55, 0.3)' },
    { name: 'AI-Assisted Product Development', category: 'tools', level: 85, glowColor: 'rgba(212, 175, 55, 0.3)' },
    { name: 'Rapid Prototyping & Research', category: 'tools', level: 82, glowColor: 'rgba(212, 175, 55, 0.3)' },
    
    // Design & UI
    { name: 'UI/UX Fundamentals', category: 'design', level: 50, glowColor: 'rgba(212, 175, 55, 0.2)' },
    { name: 'Figma Basics', category: 'design', level: 40, glowColor: 'rgba(212, 175, 55, 0.18)' },
    { name: 'Responsive Design Principles', category: 'design', level: 70, glowColor: 'rgba(212, 175, 55, 0.25)' },
  ];

  const categories = [
    { id: 'frontend', title: 'Frontend Architecture', icon: LayoutGrid },
    { id: 'backend', title: 'Backend & Tools', icon: CPUComponent },
    { id: 'tools', title: 'AI & Productivity', icon: Terminal },
    { id: 'design', title: 'Design & UI', icon: PenTool }
  ];

  // Map Cpu safely from lucide-react
  function CPUComponent() {
    return <Cpu className="w-5 h-5 text-amber-400" />;
  }

  return (
    <section 
      id="skills" 
      className="py-24 sm:py-32 bg-neutral-900/50 p-6 sm:p-8 xl:p-12 relative overflow-hidden"
    >
      <div className="absolute left-1/3 top-1/3 w-96 h-96 rounded-full bg-amber-500/1 blur-[110px] hidden md:block" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-24">
          <span className="font-mono text-xs text-amber-500 tracking-widest font-semibold uppercase flex items-center gap-1.5 mb-3">
            <Terminal className="w-3.5 h-3.5" /> 03 / CAPABILITIES
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase">
            Technical <span className="text-gold-gradient">Symphony</span>
          </h2>
          <p className="mt-4 text-neutral-400 max-w-xl text-sm sm:text-base font-sans">
            A carefully selected arsenal of core frameworks, workflows, and aesthetic design instruments.
          </p>
          <div className="w-24 h-[1px] bg-amber-500/50 mt-6" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((cat, catIdx) => {
            const Icon = cat.icon;
            const filteredSkills = skillsList.filter((s) => s.category === cat.id);

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className="p-6 sm:p-8 rounded-[24px] glass-card shadow-xl text-left hover:border-[#D4AF37]/30 transition-all duration-300 group"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.05]">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/[0.06] flex items-center justify-center group-hover:scale-110 group-hover:border-amber-500/30 transition-all duration-300">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-white uppercase text-base sm:text-lg tracking-wide">
                      {cat.title}
                    </h3>
                    <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">SUB-GRID MODULE 0{catIdx + 1}</p>
                  </div>
                </div>

                {/* Skills Cards under Category */}
                <div className="space-y-6">
                  {filteredSkills.map((skill, sIdx) => (
                    <div key={skill.name} className="relative">
                      
                      {/* Name & Percentage */}
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-mono text-xs text-neutral-300 font-medium tracking-wide flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-amber-500/60" /> {skill.name}
                        </span>
                        <span className="font-mono text-xs text-amber-400 font-semibold">{skill.level}%</span>
                      </div>

                      {/* Premium Bar Layout */}
                      <div className="w-full h-[6px] bg-neutral-900 rounded-full overflow-hidden border border-white/[0.02]">
                        <motion.div
                          initial={{ width: '0%' }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                          style={{
                            boxShadow: `0 0 10px ${skill.glowColor}`,
                          }}
                        />
                      </div>

                    </div>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
