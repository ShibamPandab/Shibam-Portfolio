import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, CheckCircle, Github, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please write a message';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ✅ EmailJS replaces Formspree here
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          // Who is writing — displayed in the email body
          from_name: formData.name,
          from_email: formData.email,
          // reply_to tells EmailJS to set the Reply-To header to the visitor's
          // email address. Clicking "Reply" in Gmail will therefore go to the
          // visitor, not back to yourself, eliminating the "me to me" thread.
          reply_to: formData.email,
          // to_name personalises the greeting line in your template ("Hi Shibam,")
          to_name: 'Shibam',
          // subject surfaces the sender name in your Gmail inbox subject line
          subject: `Portfolio Inquiry from ${formData.name}`,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      setSubmitError('Failed to send message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-neutral-900/40 p-6 sm:p-8 xl:p-12 relative overflow-hidden"
    >
      <div className="absolute left-[10%] bottom-[10%] w-[420px] h-[420px] rounded-full bg-amber-500/[0.012] blur-[130px] hidden md:block" />

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Header */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-24">
          <span className="font-mono text-xs text-amber-500 tracking-widest font-semibold uppercase flex items-center gap-1.5 mb-3">
            <Mail className="w-3.5 h-3.5 animate-pulse" /> 08 / ACQUISITION
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase sm:w-[80%] lg:w-[70%]">
            Let's Build <span className="text-gold-gradient">Something Amazing</span>
          </h2>
          <p className="mt-4 text-neutral-400 max-w-2xl text-sm sm:text-base font-sans">
            Have a project idea, portfolio request, landing page, business website, or redesign in mind? Let's discuss how I can help bring it to life.
          </p>
          <div className="w-24 h-[1px] bg-amber-500/50 mt-6" />
        </div>

        {/* Form Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT: Contact Cards */}
          <div className="lg:col-span-5 text-left space-y-8">
            <h3 className="font-display text-2xl font-bold text-white tracking-tight uppercase">
              Get in Touch Directly
            </h3>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
              Have a web development project, collaboration idea, or full-time opportunity? Select any option below to reach me instantly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <a href="mailto:shibampandab@gmail.com"
                className="p-5 glass-card rounded-[18px] border border-white/[0.04] text-left hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.08)] transition-all duration-300 block cursor-none interactive-cursor group">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3 text-amber-400 group-hover:scale-105 transition-transform duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <h4 className="font-display font-bold text-white text-xs uppercase tracking-wide">Email Me</h4>
                <p className="text-neutral-500 text-[10px] mt-1.5 leading-relaxed font-sans truncate">shibampandab@gmail.com</p>
              </a>

              <a href="https://wa.me/917908861804?text=Hello%20Shibam,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                target="_blank" rel="noreferrer"
                className="p-5 glass-card rounded-[18px] border border-white/[0.04] text-left hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.08)] transition-all duration-300 block cursor-none interactive-cursor group">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3 text-amber-400 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.022-.08-.124-.22-.364-.34-.24-.12-1.418-.7-1.638-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-.992-.367-1.89-1.167-.698-.622-1.17-1.39-1.305-1.63-.137-.24-.015-.37.106-.49.11-.107.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.195-.476-.39-.412-.54-.42-.14-.008-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.57.18 1.09.15 1.5.09.46-.07 1.418-.58 1.618-1.14.2-.56.2-1.04.14-1.14-.06-.1-.2-.16-.44-.28zM12 2C6.477 2 2 6.477 2 12c0 1.84.497 3.57 1.36 5.07L2 22l5.07-1.36C8.57 21.503 10.3 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.65 0-3.19-.44-4.52-1.21l-.32-.19-2.99.8.81-2.93-.21-.34C4.01 14.81 3.5 13.46 3.5 12c0-4.69 3.81-8.5 8.5-8.5s8.5 3.81 8.5 8.5-3.81 8.5-8.5 8.5z"/>
                  </svg>
                </div>
                <h4 className="font-display font-bold text-white text-xs uppercase tracking-wide">WhatsApp Chat</h4>
                <p className="text-neutral-500 text-[10px] mt-1.5 font-sans">Direct message</p>
              </a>

              <a href="https://github.com/ShibamPandab" target="_blank" rel="noreferrer"
                className="p-5 glass-card rounded-[18px] border border-white/[0.04] text-left hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.08)] transition-all duration-300 block cursor-none interactive-cursor group">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3 text-amber-400 group-hover:scale-105 transition-transform duration-300">
                  <Github className="w-4 h-4" />
                </div>
                <h4 className="font-display font-bold text-white text-xs uppercase tracking-wide">GitHub</h4>
                <p className="text-neutral-500 text-[10px] mt-1.5 font-sans truncate">ShibamPandab</p>
              </a>

              <a href="https://www.linkedin.com/in/shibam-pandab" target="_blank" rel="noreferrer"
                className="p-5 glass-card rounded-[18px] border border-white/[0.04] text-left hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.08)] transition-all duration-300 block cursor-none interactive-cursor group">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3 text-amber-400 group-hover:scale-105 transition-transform duration-300">
                  <Linkedin className="w-4 h-4" />
                </div>
                <h4 className="font-display font-bold text-white text-xs uppercase tracking-wide">LinkedIn</h4>
                <p className="text-neutral-500 text-[10px] mt-1.5 font-sans truncate">shibam-pandab</p>
              </a>
            </div>

            <div className="p-5 glass-card rounded-[18px] border border-white/[0.04] space-y-4">
              <h4 className="font-display font-extrabold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Why Work With Me?
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400 font-sans">
                {['Responsive Communication', 'Modern Frontend Development', 'Mobile Friendly Websites', 'Fast Deployment with Vercel', 'AI-Assisted Rapid Prototyping'].map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-amber-500 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-[28px] glass-card shadow-2xl relative">
              <form onSubmit={handleSubmit} className="space-y-6 text-left">

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Your Name *</label>
                  <input type="text" id="name" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`px-4 py-3 glass bg-white/[0.01] hover:bg-white/[0.02] border ${errors.name ? 'border-red-500/50' : 'border-white/[0.06]'} hover:border-neutral-700 focus:border-amber-400 rounded-xl text-sm font-sans text-white focus:outline-none transition-colors duration-200 cursor-none interactive-cursor`}
                    placeholder="e.g. Julian Vance" />
                  {errors.name && <span className="font-mono text-[9px] text-red-400 tracking-wider mt-1">{errors.name}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Email Address *</label>
                  <input type="email" id="email" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`px-4 py-3 glass bg-white/[0.012] hover:bg-white/[0.02] border ${errors.email ? 'border-red-500/50' : 'border-white/[0.06]'} hover:border-neutral-700 focus:border-amber-400 rounded-xl text-sm font-sans text-white focus:outline-none transition-colors duration-200 cursor-none interactive-cursor`}
                    placeholder="e.g. julian@vance.media" />
                  {errors.email && <span className="font-mono text-[9px] text-red-400 tracking-wider mt-1">{errors.email}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Project Details Brief *</label>
                  <textarea id="message" rows={4} value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`px-4 py-3 glass bg-white/[0.012] hover:bg-white/[0.02] border ${errors.message ? 'border-red-500/50' : 'border-white/[0.06]'} hover:border-neutral-700 focus:border-amber-400 rounded-xl text-sm font-sans text-white focus:outline-none transition-colors duration-200 cursor-none interactive-cursor resize-none`}
                    placeholder="Tell me about your project timeline, visual targets..." />
                  {errors.message && <span className="font-mono text-[9px] text-red-400 tracking-wider mt-1">{errors.message}</span>}
                </div>

                {submitError && (
                  <p className="font-mono text-[9px] text-red-400 text-center tracking-wider">{submitError}</p>
                )}

                <button type="submit" disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 disabled:from-neutral-800 disabled:to-neutral-900 text-neutral-950 font-bold tracking-widest text-xs uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-none interactive-cursor">
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin h-4 w-4 border-2 border-neutral-950 border-t-transparent rounded-full" />
                      Dispatching Message...
                    </>
                  ) : (
                    <>
                      Transmit Message <Send className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </button>
              </form>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 rounded-[28px] glass-card flex flex-col items-center justify-center text-center p-6 sm:p-8 z-20 border border-[#D4AF37]/30">
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: 'spring' }}
                      className="w-16 h-16 rounded-full bg-amber-500/15 border border-[#D4AF37]/40 flex items-center justify-center mb-6">
                      <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
                    </motion.div>
                    <h4 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-tight">Message Sent</h4>
                    <p className="mt-3 text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm font-sans mx-auto">
                      Message received. I'll get back to you within 24 hours.
                    </p>
                    <button onClick={() => setIsSuccess(false)}
                      className="mt-8 px-6 py-2.5 border border-white/[0.08] hover:border-amber-400 text-white hover:text-amber-400 font-bold tracking-widest text-[10px] uppercase rounded-full cursor-none interactive-cursor transition-colors">
                      Close
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-col items-center">
              <a href="https://wa.me/917908861804?text=Hello%20Shibam,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                target="_blank" rel="noreferrer"
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:scale-[1.02] text-neutral-950 font-bold tracking-widest text-xs uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-none interactive-cursor group">
                <svg className="w-4 h-4 fill-neutral-950 group-hover:rotate-6 transition-transform duration-300" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.022-.08-.124-.22-.364-.34-.24-.12-1.418-.7-1.638-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-.992-.367-1.89-1.167-.698-.622-1.17-1.39-1.305-1.63-.137-.24-.015-.37.106-.49.11-.107.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.195-.476-.39-.412-.54-.42-.14-.008-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.57.18 1.09.15 1.5.09.46-.07 1.418-.58 1.618-1.14.2-.56.2-1.04.14-1.14-.06-.1-.2-.16-.44-.28zM12 2C6.477 2 2 6.477 2 12c0 1.84.497 3.57 1.36 5.07L2 22l5.07-1.36C8.57 21.503 10.3 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.65 0-3.19-.44-4.52-1.21l-.32-.19-2.99.8.81-2.93-.21-.34C4.01 14.81 3.5 13.46 3.5 12c0-4.69 3.81-8.5 8.5-8.5s8.5 3.81 8.5 8.5-3.81 8.5-8.5 8.5z"/>
                </svg>
                Chat on WhatsApp
              </a>
              <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest mt-2 select-none">Quickest way to reach me</p>
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="mt-12 md:mt-16 pt-10 border-t border-white/[0.05] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start relative z-10">
          <div className="space-y-6 text-left">
            <h4 className="font-display text-sm font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Operational Status
            </h4>
            <div className="space-y-6">
              {[
                { label: 'Location', value: 'West Bengal, India', className: 'text-white font-display text-lg font-bold' },
                { label: 'Availability', value: 'Open for Freelance Projects', className: 'text-gold-gradient font-display text-lg font-black uppercase tracking-wider' },
                { label: 'Response Time', value: 'Within 24 Hours', className: 'text-neutral-300 font-display text-lg font-bold' },
              ].map(item => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-5 border-b border-white/[0.03] gap-2">
                  <span className="text-neutral-500 uppercase tracking-widest font-mono text-[10px]">{item.label}</span>
                  <span className={item.className}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 text-left">
            <h4 className="font-display text-sm font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Available For
            </h4>
            <ul className="space-y-3">
              {['Premium Portfolio Websites', 'Business Websites', 'SaaS Landing Pages', 'Frontend Development', 'UI/UX Optimization'].map((service) => (
                <li key={service} className="flex items-center gap-3.5 p-3.5 glass rounded-xl border border-white/[0.03] hover:border-amber-500/20 hover:bg-white/[0.01] hover:translate-x-1.5 transition-all duration-300 group">
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-[10px] font-bold shrink-0 group-hover:scale-110 transition-transform duration-300">✓</span>
                  <span className="text-neutral-300 text-xs sm:text-sm font-medium tracking-wide group-hover:text-white transition-colors">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
