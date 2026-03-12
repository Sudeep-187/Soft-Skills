import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Star, Clock, Trophy, Phone, Mail, ArrowRight, ChevronDown } from 'lucide-react';

const melaHistory = [
  {
    year: '2025 — Sankranti Grand Mela',
    location: 'Hyderabad Exhibition Grounds, Telangana',
    sponsor: 'Andhra Pradesh Handicrafts Board + TCS Foundation',
    members: 4800,
    artisans: 312,
    stalls: 428,
    duration: '4 Days',
    revenue: '₹4.2 Crore',
    rating: 4.9,
    reviews: 3240,
    highlight: 'First ever live-streamed Telugu craft fair with 1.2 lakh online viewers.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=400&fit=crop',
  },
  {
    year: '2025 — Dussehra Mela',
    location: 'NTR Grounds, Vijayawada, Andhra Pradesh',
    sponsor: 'AP Tourism + Khadi Gram Udyog',
    members: 3200,
    artisans: 210,
    stalls: 295,
    duration: '5 Days',
    revenue: '₹2.8 Crore',
    rating: 4.8,
    reviews: 1960,
    highlight: 'Featured Kuchipudi dancers alongside 40 craft categories. Largest leather crafts display in AP history.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
  },
  {
    year: '2024 — Ugadi Mela',
    location: 'HITEX Exhibition Center, Hyderabad',
    sponsor: 'Telangana Handicraft Development Corporation',
    members: 2800,
    artisans: 180,
    stalls: 240,
    duration: '3 Days',
    revenue: '₹1.9 Crore',
    rating: 4.7,
    reviews: 1340,
    highlight: 'Inaugural edition — set the benchmark for rural-urban craft exchange in Telangana.',
    image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&h=400&fit=crop',
  },
];

const upcomingMela = {
  name: 'Sankranti Grand Mela 2027',
  dates: 'Jan 14 – 17, 2027',
  location: 'Hyderabad Exhibition Grounds',
  city: 'Hyderabad, Telangana',
  artisans: '400+',
  stalls: '500+',
  online: true,
  schedule: [
    { day: 'Day 1 — Jan 14', events: ['Inauguration by Hon. Minister', 'Pochampally Ikat Live Weaving Demo', 'Kalamkari Art Workshop'] },
    { day: 'Day 2 — Jan 15', events: ['Food & Spice Exhibition', 'Kondapalli Toy Making Workshop', 'Village Cooking Live Show'] },
    { day: 'Day 3 — Jan 16', events: ['Jewelry & Metalwork Display', 'Artisan Award Ceremony', 'Cultural Performances — Kuchipudi'] },
    { day: 'Day 4 — Jan 17', events: ['Natural Beauty & Wellness Zone', 'Grand Closing Ceremony', 'Online Mela Goes Live'] },
  ],
};

const reviews = [
  { name: 'Geeta P.', city: 'Hyderabad', rating: 5, text: 'Best craft fair I have ever attended. The handloom section was extraordinary. Bought a Pochampally saree directly from the weaver.', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=60&h=60&fit=crop' },
  { name: 'Suresh K.', city: 'Bangalore', rating: 5, text: 'Flew from Bangalore for this. Worth every rupee. The live cooking demos with village recipes were unforgettable.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
  { name: 'Anita M.', city: 'Mumbai', rating: 4, text: 'Great event. More variety in jewelry would be welcome. But the food section — Sakinalu, Pootharekulu — absolutely divine!', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop' },
  { name: 'Ravi T.', city: 'Chennai', rating: 5, text: 'The artisan stories section was moving. I sat with a toy-maker for an hour and watched him shape a peacock. Pure magic.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop' },
  { name: 'Priya N.', city: 'Pune', rating: 5, text: 'Online streaming was seamless. Could not attend physically but the virtual tour was equally immersive. Amazing initiative!', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop' },
  { name: 'Vikram R.', city: 'Delhi', rating: 4, text: 'Huge variety, great prices, direct from artisans. More parking and seating would help. Overall a world-class event.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
];

export default function MelaDetails() {
  const [openDay, setOpenDay] = useState(0);

  return (
    <div style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen">

      {/* Hero */}
      <div className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1400&h=600&fit=crop" alt="Mela" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(107,62,38,0.92) 40%, rgba(44,26,14,0.5) 100%)' }} />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-4"
                style={{ backgroundColor: 'var(--chili)' }}>🎪 Online & Physical Event</span>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight">
                Sankranti Grand<br />Mela 2027
              </h1>
              <div className="flex flex-wrap gap-4 mt-4 text-white/70 text-sm">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Jan 14–17, 2027</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Hyderabad, Telangana</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 400+ Artisans</span>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="btn-cta flex items-center gap-2">Register Now <ArrowRight className="w-4 h-4" /></button>
                <button className="px-6 py-2.5 rounded-full text-sm font-semibold border text-white transition hover:bg-white/10"
                  style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
                  🌐 Join Online
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { v: '500+', l: 'Stalls', c: 'var(--chili)' },
            { v: '400+', l: 'Artisans', c: 'var(--tamarind)' },
            { v: '4 Days', l: 'Duration', c: 'var(--banana-leaf)' },
            { v: '₹0', l: 'Entry (Free)', c: 'var(--turmeric)' },
          ].map((s, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-white border" style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
              <div className="font-serif text-3xl font-bold" style={{ color: s.c }}>{s.v}</div>
              <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Schedule */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>📅 Event Schedule</h2>
          <div className="space-y-3">
            {upcomingMela.schedule.map((day, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border-warm)' }}>
                <button
                  onClick={() => setOpenDay(openDay === i ? -1 : i)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white"
                >
                  <span className="font-semibold" style={{ color: 'var(--tamarind)' }}>{day.day}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDay === i ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
                </button>
                {openDay === i && (
                  <div className="px-5 pb-4 bg-white border-t" style={{ borderColor: 'var(--border-warm)' }}>
                    <ul className="space-y-2 pt-3">
                      {day.events.map((ev, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: 'var(--turmeric)' }} />
                          {ev}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Previous Melas History */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>📖 Written History of Our Melas</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Every mela is a chapter. Every artisan, a story.</p>
          <div className="space-y-8">
            {melaHistory.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
                <div className="md:flex">
                  <div className="md:w-80 h-52 md:h-auto shrink-0">
                    <img src={m.image} alt={m.year} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-serif text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{m.year}</h3>
                        <p className="text-sm flex items-center gap-1 mt-1" style={{ color: 'var(--text-muted)' }}>
                          <MapPin className="w-3.5 h-3.5" /> {m.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold text-white"
                        style={{ backgroundColor: 'var(--banana-leaf)' }}>
                        <Star className="w-3.5 h-3.5 fill-white" /> {m.rating}
                        <span className="font-normal text-white/80 ml-1">({m.reviews.toLocaleString()})</span>
                      </div>
                    </div>
                    <p className="text-xs mb-4 px-3 py-2 rounded-lg text-white inline-block"
                      style={{ backgroundColor: 'var(--tamarind)' }}>
                      🏆 Sponsored by: {m.sponsor}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {[
                        { l: 'Members', v: m.members.toLocaleString() },
                        { l: 'Artisans', v: m.artisans },
                        { l: 'Stalls', v: m.stalls },
                        { l: 'Duration', v: m.duration },
                      ].map(s => (
                        <div key={s.l} className="text-center p-2 rounded-xl" style={{ backgroundColor: 'var(--cream)' }}>
                          <div className="font-bold text-sm" style={{ color: 'var(--tamarind)' }}>{s.v}</div>
                          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{s.l}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed italic" style={{ color: 'var(--text-secondary)', fontFamily: 'Caveat, cursive', fontSize: '1rem' }}>
                      ✨ "{m.highlight}"
                    </p>
                    <div className="mt-3 text-sm font-semibold" style={{ color: 'var(--banana-leaf)' }}>Revenue Generated: {m.revenue}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Customer Reviews */}
        <section>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>⭐ What Visitors Say</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Real experiences from our mela community</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 border" style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <img src={r.avatar} alt={r.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{r.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{r.city}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-current" style={{ color: 'var(--turmeric)' }} />)}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{r.text}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}