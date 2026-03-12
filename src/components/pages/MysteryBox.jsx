import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Gift, Lock, Sparkles, Package, ChevronRight, Check, Play } from 'lucide-react';

const tiers = [
  {
    name: 'Sampler Mystery',
    price: 799,
    tagline: 'Your first taste of rural magic',
    items: '3–4 surprise items',
    caveat: 'One-time box',
    color: 'var(--tamarind-light)',
    bg: '#FFF8F2',
    badge: null,
    what: ['1 Handcraft item', '1 Food / Spice', '1 Natural product', 'Artisan story card'],
  },
  {
    name: 'Festival Mystery Box',
    price: 1999,
    tagline: 'Limited edition. Festival-themed.',
    items: '6–8 curated items',
    caveat: 'Per festival edition',
    color: 'var(--chili)',
    bg: '#FFF5F5',
    badge: '🔥 Limited Edition',
    what: ['2 Handcraft items', '2 Festival foods', '1 Beauty product', '1 Artisan collaboration', 'Festival recipe booklet', 'Handwritten note'],
  },
  {
    name: 'Monthly Heritage',
    price: 1499,
    tagline: 'Every month a new village story',
    items: '5–7 curated items',
    caveat: 'Monthly subscription',
    color: 'var(--banana-leaf)',
    bg: '#F2FFF5',
    badge: '⭐ Most Popular',
    what: ['2 Craft items', '1 Food/Spice', '1 Beauty product', '1 Mystery item', 'Origin story magazine', 'Early access + discounts'],
  },
  {
    name: 'Annual Grand Box',
    price: 14999,
    tagline: 'The full Telugu heritage experience',
    items: '12 monthly boxes + bonus',
    caveat: 'Annual plan — save 30%',
    color: 'var(--turmeric-dark)',
    bg: '#FFFBF0',
    badge: '💛 Best Value',
    what: ['All monthly boxes', 'All festival editions', 'Custom name engraving', 'Artisan video greeting', 'Free regional food hamper', 'Priority support + returns'],
  },
];

const unboxingVideos = [
  { name: 'Kavitha R.', city: 'Bangalore', thumb: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=200&fit=crop', rating: 5, quote: 'I screamed when I opened it! The Pochampally mini-saree was stunning.' },
  { name: 'Arun M.', city: 'Mumbai', thumb: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=300&h=200&fit=crop', rating: 5, quote: 'Festival box had a handmade diya set I\'ve never seen anywhere. Pure artistry.' },
  { name: 'Shreya D.', city: 'Hyderabad', thumb: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=300&h=200&fit=crop', rating: 5, quote: 'The Gongura pickle and Pootharekulu together — I cried thinking of my grandmother.' },
];

const trending = [
  { month: 'Jan 2026', item: 'Pochampally Ikat Mini-Scarf', village: 'Pochampally, Telangana' },
  { month: 'Dec 2025', item: 'Kondapalli Dashavataram Set', village: 'Kondapalli, AP' },
  { month: 'Nov 2025', item: 'Neem & Turmeric Soap Set', village: 'Warangal, Telangana' },
];

export default function MysteryBox() {
  const [selected, setSelected] = useState(1);

  return (
    <div style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen">

      {/* Hero */}
      <div className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--tamarind-dark) 0%, var(--tamarind) 60%, var(--chili) 100%)' }} />
        {/* Dotted texture overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(228,180,0,0.2)', border: '2px solid rgba(228,180,0,0.4)' }}>
              <Gift className="w-10 h-10" style={{ color: 'var(--turmeric)' }} />
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-4"
              style={{ backgroundColor: 'var(--chili)' }}>🔒 Mystery Inside</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight">
              The Mystery Box
            </h1>
            <p className="text-white/60 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
              Curated surprise boxes of authentic handcrafted rural products. Every box — a new discovery. Every item — a story.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8 text-white/70 text-sm">
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4" /> Surprise reveal on delivery</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> Handpicked by experts</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4" /> 4.9★ avg rating</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">

        {/* Tier cards */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Choose Your Box</h2>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Each box is a different experience — pick yours</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiers.map((tier, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                onClick={() => setSelected(i)} className="cursor-pointer relative">
                <div className="rounded-2xl p-5 h-full border-2 transition-all duration-300"
                  style={{
                    backgroundColor: tier.bg,
                    borderColor: selected === i ? tier.color : 'var(--border-warm)',
                    boxShadow: selected === i ? `0 8px 32px ${tier.color}33` : 'var(--shadow-card)',
                    transform: selected === i ? 'scale(1.02)' : 'scale(1)',
                  }}>
                  {tier.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold text-white whitespace-nowrap"
                      style={{ backgroundColor: tier.color }}>
                      {tier.badge}
                    </span>
                  )}
                  <Package className="w-8 h-8 mb-4" style={{ color: tier.color }} />
                  <h3 className="font-serif text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{tier.name}</h3>
                  <p className="text-xs mt-0.5 mb-3" style={{ fontFamily: 'Caveat, cursive', fontSize: '0.95rem', color: 'var(--text-muted)' }}>{tier.tagline}</p>
                  <div className="text-3xl font-bold mb-1" style={{ color: tier.color }}>₹{tier.price.toLocaleString()}</div>
                  <div className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>{tier.caveat}</div>
                  <ul className="space-y-1.5 mb-5">
                    {tier.what.map(w => (
                      <li key={w} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: tier.color }} /> {w}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-2.5 rounded-full text-sm font-semibold text-white transition hover:opacity-90"
                    style={{ backgroundColor: tier.color }}>
                    Subscribe
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What's been inside — trending */}
        <section className="mb-20">
          <h2 className="font-serif text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>📦 Recently Revealed</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trending.map((t, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border" style={{ borderColor: 'var(--border-warm)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--cream-dark)' }}>
                  <Sparkles className="w-5 h-5" style={{ color: 'var(--turmeric)' }} />
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{t.month}</div>
                  <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{t.item}</div>
                  <div className="text-xs" style={{ color: 'var(--tamarind)' }}>📍 {t.village}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Unboxing video reviews */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>🎬 Customer Unboxing Reviews</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Real reactions, real people — no filters</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {unboxingVideos.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
                <div className="relative h-44 overflow-hidden">
                  <img src={v.thumb} alt={v.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(44,26,14,0.45)' }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--chili)' }}>
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{v.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{v.city}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-current" style={{ color: 'var(--turmeric)' }} />)}
                    </div>
                  </div>
                  <p className="text-sm italic leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: 'Caveat, cursive', fontSize: '1rem' }}>
                    "{v.quote}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}