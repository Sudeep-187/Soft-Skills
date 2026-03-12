import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { ArrowRight, ShoppingBag, Star, Users, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SLIDES = [
  {
    title: 'Woven by Hand,',
    titleAccent: 'Carried Through Time',
    subtitle: 'Pochampally · Kanchipuram · Balaramapuram',
    desc: 'Explore GI-tagged handloom sarees directly from the looms of South India\'s master weavers',
    cta: 'Shop Handloom',
    category: 'handloom',
    bg: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&h=900&fit=crop&q=80',
    accent: '#C0392B',
    tag: 'Handloom Collection',
  },
  {
    title: 'Colours Drawn',
    titleAccent: 'from the Earth',
    subtitle: 'Kalamkari · Tanjore · Nirmal · Cheriyal',
    desc: 'Traditional Indian paintings crafted with natural pigments, tamarind pens, and centuries of devotion',
    cta: 'Explore Paintings',
    category: 'paintings',
    bg: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=1600&h=900&fit=crop&q=80',
    accent: '#D4A017',
    tag: 'Folk Art & Paintings',
  },
  {
    title: 'Forged in Fire,',
    titleAccent: 'Polished by Skill',
    subtitle: 'Pembarthi · Bidriware · Aranmula · Swamimalai',
    desc: 'Bronze idols, silver mirrors, and brass urlis — each a masterpiece of traditional South Indian metalcraft',
    cta: 'Discover Metalwork',
    category: 'metalwork',
    bg: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=1600&h=900&fit=crop&q=80',
    accent: '#2E7D32',
    tag: 'Metal Craft',
  },
];

const STATS = [
  { icon: <Users className="w-4 h-4" />, value: '5,000+', label: 'Artisans' },
  { icon: <MapPin className="w-4 h-4" />, value: '350+', label: 'Villages' },
  { icon: <ShoppingBag className="w-4 h-4" />, value: '24', label: 'Categories' },
  { icon: <Star className="w-4 h-4" />, value: '4.8 ★', label: 'Avg Rating' },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const heroRef = useRef(null);

  // Scroll-based parallax — background moves at 40% scroll speed (pure GPU)
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ['0%', '30%']);
  const overlayOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Auto-slide
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const slide = SLIDES[current];

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ height: 'min(100vh, 780px)', minHeight: 480 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Parallax background — will-change:transform promotes to GPU layer */}
      <motion.div
        key={current}
        className="absolute inset-0"
        style={{ y: bgY, willChange: 'transform', scale: 1.08 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <img
          src={slide.bg}
          alt={slide.tag}
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Multi-layer overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(30,14,6,0.80) 0%, rgba(30,14,6,0.35) 60%, transparent 100%)' }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at bottom right, ${slide.accent}25 0%, transparent 60%)` }} />

      {/* Slide indicator line */}
      <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(to right, ${slide.accent}, transparent)` }} />

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ opacity: overlayOpacity }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
          {/* Tag pill */}
          <motion.div
            key={`tag-${current}`}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{ background: `${slide.accent}30`, color: slide.accent, border: `1px solid ${slide.accent}60` }}>
              {slide.tag}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            key={`h-${current}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-white leading-[1.08]"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 800 }}
          >
            {slide.title}<br />
            <span style={{ color: slide.accent }}>{slide.titleAccent}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-3 text-xs md:text-sm font-semibold uppercase tracking-widest"
            style={{ color: `${slide.accent}CC` }}
          >
            {slide.subtitle}
          </motion.p>

          {/* Desc */}
          <motion.p
            key={`d-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-4 text-white/75 max-w-lg text-sm md:text-base leading-relaxed"
          >
            {slide.desc}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            key={`cta-${current}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <Link
              to={`${createPageUrl('Products')}?category=${slide.category}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:gap-3 hover:shadow-xl active:scale-95"
              style={{ background: slide.accent }}
            >
              {slide.cta} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={createPageUrl('Products')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:bg-white hover:text-gray-900 active:scale-95"
              style={{ border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
            >
              Browse All
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              background: i === current ? slide.accent : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>

      {/* Stats bar — pinned to bottom */}
      <div className="absolute bottom-0 inset-x-0" style={{ background: 'rgba(30,14,6,0.72)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ background: `${slide.accent}40` }}>
                {s.icon}
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">{s.value}</p>
                <p className="text-white/55 text-[11px] mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}