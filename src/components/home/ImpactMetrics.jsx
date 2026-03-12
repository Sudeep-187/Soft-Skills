import React from 'react';
import { motion } from 'framer-motion';
import { Users, Package, MapPin, Heart, TrendingUp, Star } from 'lucide-react';

const metrics = [
  { icon: Users, value: '5,000+', label: 'Artisan Families', sub: 'Supported & empowered', color: '#D4A017' },
  { icon: Package, value: '1.2L+', label: 'Products Delivered', sub: 'Across India', color: '#43A047' },
  { icon: MapPin, value: '350+', label: 'Villages', sub: 'In 4 southern states', color: '#EF5350' },
  { icon: Star, value: '4.8★', label: 'Average Rating', sub: 'From 50,000+ reviews', color: '#AB47BC' },
  { icon: Heart, value: '₹12 Cr', label: 'Artisan Earnings', sub: 'Direct to craft families', color: '#FF7043' },
  { icon: TrendingUp, value: '96%', label: 'Repeat Buyers', sub: 'Trust & satisfaction', color: '#26C6DA' },
];

export default function ImpactMetrics() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'var(--tamarind-dark)' }}>
      {/* Decorative radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--turmeric) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--chili) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] mb-3 block" style={{ color: 'var(--turmeric)' }}>
            Our Impact
          </span>
          <h2 className="font-serif font-bold text-white leading-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Making a Real Difference
          </h2>
          <p className="text-white/50 text-sm mt-3 max-w-md mx-auto">
            Every purchase directly supports artisan livelihoods and preserves South India's craft heritage
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl p-6 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            >
              {/* Icon circle */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                style={{ background: `${m.color}22`, border: `1px solid ${m.color}44` }}
              >
                <m.icon className="w-6 h-6" style={{ color: m.color }} />
              </div>

              <div className="font-serif font-bold text-2xl md:text-3xl text-white mb-1">{m.value}</div>
              <div className="font-semibold text-sm text-white/80">{m.label}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{m.sub}</div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 inset-x-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: m.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}