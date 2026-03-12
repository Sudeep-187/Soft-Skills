import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, ShoppingBag, Star, Users, MapPin } from 'lucide-react';
import { STATES_DATA } from '@/data/products';

/* ═══════════════════════════════════════════════════════════════════
   STATE REVEAL — Full-screen parallax + 3D entrance (no products)
   ═══════════════════════════════════════════════════════════════════ */
function StateReveal({ state, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [80, 0, -50]);
  const textOp = useTransform(scrollYProgress, [0.08, 0.3, 0.7, 0.92], [0, 1, 1, 0]);
  const isRight = index % 2 === 1;

  // Bidirectional 3D transforms for the text block
  const txtRotY = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [isRight ? -25 : 25, 0, 0, isRight ? 15 : -15]);
  const txtX = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [isRight ? 60 : -60, 0, 0, isRight ? -30 : 30]);
  const txtScale = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0.9, 1, 1, 0.95]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden" id={state.name.toLowerCase().replace(/\s+/g, '-')}>
      {/* Parallax background */}
      <motion.div className="absolute inset-0 -top-[25%]" style={{ y: bgY, willChange: 'transform' }}>
        <img src={state.image} alt={state.name} className="w-full h-[150%] object-cover" loading="lazy" decoding="async" />
      </motion.div>

      {/* Color overlay */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(${isRight ? '135deg' : '225deg'}, ${state.color}DD 0%, rgba(0,0,0,0.88) 70%)`
      }} />

      {/* Content */}
      <motion.div
        className={`relative z-10 h-full flex items-center px-8 md:px-20 max-w-7xl mx-auto ${isRight ? 'justify-end text-right' : 'justify-start text-left'}`}
        style={{ y: textY, opacity: textOp }}
      >
        <div className="max-w-2xl">
          <motion.div
            style={{
              perspective: 1000, transformStyle: 'preserve-3d',
              rotateY: txtRotY, x: txtX, scale: txtScale,
              willChange: 'transform',
            }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] mb-6"
              style={{ background: `${state.color}30`, color: state.color, border: `1px solid ${state.color}50` }}>
              {state.tagline}
            </span>

            <h2 className="text-6xl md:text-8xl lg:text-[9rem] font-black text-white leading-[0.85] tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              {state.name.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
            </h2>

            <p className="text-white/45 mt-6 text-sm md:text-base max-w-lg leading-relaxed"
              style={isRight ? { marginLeft: 'auto' } : {}}>
              {state.desc}
            </p>

            <Link to={`${createPageUrl('Products')}?state=${encodeURIComponent(state.name)}`}
              className="group inline-flex items-center gap-3 mt-8 px-7 py-3.5 rounded-full text-sm font-bold text-black transition-all duration-300 hover:gap-5 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              style={{ background: state.color }}>
              Explore Crafts <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STAT
   ═══════════════════════════════════════════════════════════════════ */
function Stat({ value, label, icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 600 }}
      className="text-center"
    >
      <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3"
        style={{ background: 'rgba(212,160,23,0.12)', color: '#D4A017' }}>{icon}</div>
      <div className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>{value}</div>
      <div className="text-xs text-white/35 mt-2 uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroBgY = useTransform(heroP, [0, 1], ['0%', '35%']);
  const heroTxtOp = useTransform(heroP, [0, 0.5], [1, 0]);
  const heroTxtY = useTransform(heroP, [0, 0.5], [0, -80]);

  return (
    <div className="bg-black">

      {/* ══════ HERO ══════ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div className="absolute inset-0 -top-[35%]" style={{ y: heroBgY, willChange: 'transform' }}>
          <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&h=1200&fit=crop&q=80"
            alt="" className="w-full h-[170%] object-cover" loading="eager" fetchpriority="high" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.88) 100%)' }} />

        <motion.div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-7xl mx-auto"
          style={{ opacity: heroTxtOp, y: heroTxtY }}>
          <motion.div
            initial={{ opacity: 0, y: 70, rotateX: 12 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 800 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] mb-8"
              style={{ background: 'rgba(212,160,23,0.12)', color: '#D4A017', border: '1px solid rgba(212,160,23,0.25)' }}>
              ✦ Four States · 44 Masterpieces · One Mission
            </div>

            <h1 className="text-white leading-[0.88]" style={{
              fontSize: 'clamp(3rem, 9vw, 8rem)', fontFamily: 'Playfair Display, serif', fontWeight: 900
            }}>
              Where Ancient<br />
              Hands Meet<br />
              <span style={{ color: '#D4A017' }}>Modern Hearts</span>
            </h1>

            <p className="text-white/40 mt-8 text-base md:text-lg max-w-lg leading-relaxed">
              Scroll down to discover each state and its craft heritage.
              Select a state to see its products come alive with 3D scrolling.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <a href="#andhra-pradesh"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold text-black transition-all hover:gap-5 hover:shadow-[0_0_40px_rgba(212,160,23,0.4)]"
                style={{ background: '#D4A017' }}>
                Begin the Journey <ChevronDown className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/25 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <span className="text-[8px] uppercase tracking-[0.4em]">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ══════ STATES (one per viewport, no products) ══════ */}
      {STATES_DATA.map((s, i) => (
        <StateReveal key={s.name} state={s} index={i} />
      ))}

      {/* ══════ STATS — scroll-revealed ══════ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=1920&h=800&fit=crop&q=60"
            alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.88)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">Our Impact</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              Numbers That Tell a Story
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
            <Stat value="5,000+" label="Artisan Families" icon={<Users className="w-6 h-6" />} delay={0} />
            <Stat value="350+" label="Craft Villages" icon={<MapPin className="w-6 h-6" />} delay={0.1} />
            <Stat value="12,000+" label="Products Delivered" icon={<ShoppingBag className="w-6 h-6" />} delay={0.2} />
            <Stat value="4.8 ★" label="Average Rating" icon={<Star className="w-6 h-6" />} delay={0.3} />
          </div>
        </div>
      </section>

      {/* ══════ NEWSLETTER ══════ */}
      <section className="bg-black py-24 px-8 md:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">Stay Connected</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Get Early Access
            </h2>
            <p className="text-white/35 mb-8 text-sm">New arrivals and exclusive festival drops.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your@email.com"
                className="flex-1 px-5 py-4 rounded-full text-sm text-white placeholder-white/25 outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }} />
              <button className="px-8 py-4 rounded-full text-sm font-bold text-black shrink-0 transition hover:shadow-[0_0_30px_rgba(212,160,23,0.3)]"
                style={{ background: '#D4A017' }}>Subscribe</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}