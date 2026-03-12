import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { CalendarDays, Users, Store, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UpcomingMela() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 5);
    const timer = setInterval(() => {
      const diff = target - new Date();
      if (diff <= 0) { clearInterval(timer); return; }
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-[var(--cream-dark)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1200&h=500&fit=crop"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--maroon-dark)]/95 to-[var(--maroon-dark)]/60" />
          </div>

          <div className="relative z-10 p-8 md:p-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 text-red-300 text-sm mb-6 border border-red-500/30">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> Coming Soon
            </div>

            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight">
              Sankranti Virtual Mela
            </h2>
            <p className="text-white/60 mt-3 max-w-lg text-sm leading-relaxed">
              Experience the grandeur of a traditional Telugu craft fair from your home. Live artisan demos, exclusive launches & cultural performances.
            </p>

            {/* Countdown */}
            <div className="flex gap-4 mt-8">
              {[
                { val: countdown.days, label: 'Days' },
                { val: countdown.hours, label: 'Hours' },
                { val: countdown.mins, label: 'Mins' },
                { val: countdown.secs, label: 'Secs' },
              ].map(t => (
                <div key={t.label} className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <span className="font-serif text-2xl md:text-3xl font-bold text-white">{String(t.val).padStart(2, '0')}</span>
                  </div>
                  <span className="text-[10px] md:text-xs text-white/50 mt-1.5 block">{t.label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 mt-8 text-sm text-white/60">
              <span className="flex items-center gap-1.5"><Store className="w-4 h-4" /> 200+ Stalls</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 50+ Artisans</span>
              <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> 3 Days</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link to={createPageUrl('Mela')} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[var(--terracotta)] hover:bg-[var(--terracotta-dark)] text-white font-medium text-sm group transition">
                Register Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white hover:bg-white/10 text-sm transition">
                <Play className="w-4 h-4" /> Watch Trailer
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}