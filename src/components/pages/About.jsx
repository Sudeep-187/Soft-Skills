import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, MapPin, Award, Leaf, Target } from 'lucide-react';

const team = [
  { name: 'Ramaiah Naidu', role: 'Founder & CEO', from: 'Guntur, AP', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', bio: 'Born in a weaver family. Left a tech career to bring rural crafts to global markets.' },
  { name: 'Sunitha Devi', role: 'Head of Artisan Relations', from: 'Warangal, Telangana', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', bio: '15 years working with women SHGs. Onboarded 3,000+ artisan families.' },
  { name: 'Pradeep Varma', role: 'Technology Lead', from: 'Hyderabad, Telangana', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', bio: 'IIT Bombay alum who built the platform to scale rural commerce.' },
];

const values = [
  { icon: Heart, title: 'Artisan First', desc: 'Every decision starts with: "How does this benefit the artisan?"' },
  { icon: Leaf, title: 'Eco Conscious', desc: 'Organic packaging, carbon-neutral delivery, zero plastic.' },
  { icon: Users, title: 'Community Built', desc: 'We are a co-operative — artisans own 30% of the platform.' },
  { icon: Target, title: 'Radical Transparency', desc: 'Every product shows exactly how much goes to the artisan.' },
];

const milestones = [
  { year: '2019', event: 'Founded in a small office in Guntur with 12 artisan partners' },
  { year: '2020', event: 'Survived COVID by pivoting to online-only — grew 400% in 8 months' },
  { year: '2021', event: 'First Mela conducted in Hyderabad — 80 artisans, 1,200 visitors' },
  { year: '2022', event: 'Reached 1,000 artisan families. Revenue crossed ₹5 Crore.' },
  { year: '2023', event: 'National Craft Award from Ministry of Textiles. Expanded to 350 villages.' },
  { year: '2024', event: 'Launched Subscription Box. 12,000 subscribers in 3 months.' },
  { year: '2025', event: 'Mystery Box launched. 5,000+ artisan families. ₹12 Crore income generated.' },
];

export default function About() {
  return (
    <div style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen">

      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1400&h=500&fit=crop" alt="About" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(107,62,38,0.92) 40%, rgba(44,26,14,0.5) 100%)' }} />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-xs font-bold uppercase tracking-wider mb-3 block" style={{ color: 'var(--turmeric)' }}>Our Story</span>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight">
                We Exist for the<br />Artisan Family
              </h1>
              <p className="mt-4 text-white/60 max-w-lg text-sm leading-relaxed">
                Sustainable Rural Bazaar was born in a weaver's home in Guntur. It remains rooted there — in purpose, in culture, in community.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-20">

        {/* Mission */}
        <section className="max-w-3xl">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Our Mission</h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            We bridge the gap between 5,000+ rural artisan families and conscious urban consumers — ensuring fair trade, authentic products, and stories that travel alongside every purchase. We believe a handloom saree is not just fabric; it is 800 years of civilization held in thread.
          </p>
          <p className="text-base leading-relaxed mt-4" style={{ color: 'var(--text-secondary)', fontFamily: 'Caveat, cursive', fontSize: '1.1rem' }}>
            "Every rupee you spend here, feeds a family, preserves a craft, and keeps a village alive."
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white border" style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--cream-dark)' }}>
                  <v.icon className="w-6 h-6" style={{ color: 'var(--tamarind)' }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Our Journey</h2>
          <div className="relative border-l-2 pl-8 space-y-8" style={{ borderColor: 'var(--border-warm)' }}>
            {milestones.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="relative">
                <div className="absolute -left-10 w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: 'var(--turmeric)' }} />
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--cream-dark)', color: 'var(--tamarind)' }}>{m.year}</span>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{m.event}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>The People Behind It</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border text-center" style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
                <img src={m.image} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4" style={{ ringColor: 'var(--border-warm)' }} />
                <h3 className="font-serif text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{m.name}</h3>
                <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--chili)' }}>{m.role}</p>
                <p className="text-xs mt-0.5 flex items-center justify-center gap-1" style={{ color: 'var(--text-muted)' }}>
                  <MapPin className="w-3 h-3" /> {m.from}
                </p>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Impact numbers */}
        <section className="rounded-3xl p-10 text-center" style={{ background: 'linear-gradient(135deg, var(--tamarind-dark), var(--tamarind))' }}>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-8">Our Impact in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: '5,000+', l: 'Artisan Families' },
              { v: '350+', l: 'Villages Connected' },
              { v: '₹12 Cr', l: 'Income Generated' },
              { v: '1.2L+', l: 'Orders Delivered' },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-serif text-3xl font-bold" style={{ color: 'var(--turmeric)' }}>{s.v}</div>
                <div className="text-sm text-white/60 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}