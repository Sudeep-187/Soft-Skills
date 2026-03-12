import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import MelaStallMap from '@/components/home/MelaStallMap';

const upcomingMelas = [
  {
    name: 'Sankranti Grand Mela',
    date: 'Jan 14 – 17, 2027',
    location: 'Hyderabad Exhibition Grounds',
    city: 'Hyderabad, Telangana',
    artisans: 200,
    stalls: 350,
    image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600&h=350&fit=crop',
    status: 'upcoming',
    online: true,
  },
  {
    name: 'Ugadi Craft Fair',
    date: 'Mar 30 – Apr 2, 2027',
    location: 'Vijayawada Trade Fair Grounds',
    city: 'Vijayawada, AP',
    artisans: 150,
    stalls: 240,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=350&fit=crop',
    status: 'upcoming',
    online: false,
  },
];

const previousMelas = [
  { name: 'Dussehra Mela 2025', location: 'Hyderabad', rating: 4.9, reviews: 1240, image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200&h=200&fit=crop' },
  { name: 'Diwali Fair 2025', location: 'Vijayawada', rating: 4.8, reviews: 890, image: 'https://images.unsplash.com/photo-1574484284002-952d92a03a05?w=200&h=200&fit=crop' },
  { name: 'Sankranti 2025', location: 'Guntur', rating: 4.9, reviews: 2100, image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=200&h=200&fit=crop' },
];

const CountdownTimer = ({ targetDays }) => {
  const [cd, setCd] = useState({ d: targetDays, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + targetDays);
    const timer = setInterval(() => {
      const diff = target - new Date();
      if (diff <= 0) return;
      setCd({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex gap-2 mt-3">
      {[{ v: cd.d, l: 'Days' }, { v: cd.h, l: 'Hrs' }, { v: cd.m, l: 'Min' }, { v: cd.s, l: 'Sec' }].map(t => (
        <div key={t.l} className="text-center">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-lg" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            {String(t.v).padStart(2, '0')}
          </div>
          <p className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{t.l}</p>
        </div>
      ))}
    </div>
  );
};

export default function MelaSection() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--cream-dark)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--chili)' }}>🎪 Online & Physical</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Upcoming Melas
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>Experience the vibrance of traditional craft fairs — in-person and online</p>
        </div>

        {/* Upcoming */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {upcomingMelas.map((mela, i) => (
            <motion.div
              key={mela.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative rounded-3xl overflow-hidden group"
            >
              <img src={mela.image} alt={mela.name} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(44,26,14,0.92) 40%, rgba(44,26,14,0.3) 100%)' }} />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: 'var(--chili)' }}>
                    Upcoming
                  </span>
                  {mela.online && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: 'var(--forest)' }}>
                      🌐 Online Available
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">{mela.name}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-white/70">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {mela.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {mela.city}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {mela.artisans}+ Artisans</span>
                </div>
                <CountdownTimer targetDays={i === 0 ? 330 : 430} />
                <Link
                  to={createPageUrl('Mela')}
                  className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-white transition hover:opacity-90 w-fit"
                  style={{ backgroundColor: 'var(--terracotta)' }}
                >
                  Register Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive stall map */}
        <MelaStallMap />

        {/* Previous mela glimpses */}
        <div>
          <h3 className="font-serif text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>✨ Glimpses from Past Melas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {previousMelas.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-4 rounded-2xl bg-white border"
                style={{ borderColor: 'var(--border-warm)' }}
              >
                <img src={m.image} alt={m.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{m.name}</h4>
                  <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                    <MapPin className="w-3 h-3" /> {m.location}
                  </p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" style={{ color: 'var(--mustard)' }} />
                    <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{m.rating}</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>({m.reviews.toLocaleString()} reviews)</span>
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