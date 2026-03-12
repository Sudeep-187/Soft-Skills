import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Gift, Zap, Crown } from 'lucide-react';

const packs = [
  {
    icon: Gift,
    name: 'Sampler Box',
    tagline: 'Try before you commit',
    price: 799,
    frequency: 'one-time',
    color: 'var(--tamarind)',
    bg: '#F8F1E5',
    items: [
      '2-3 handpicked products',
      'Artisan story cards',
      'Free shipping',
      'No commitment',
    ],
    badge: null,
  },
  {
    icon: Star,
    name: 'Monthly Craft Box',
    tagline: 'Bestseller — most loved',
    price: 1499,
    frequency: '/month',
    color: 'var(--chili)',
    bg: '#FFF5F5',
    items: [
      '4-6 curated artisan products',
      'Origin certificates',
      'Handwritten notes',
      'Free shipping',
      'Early access to new products',
    ],
    badge: '⭐ Most Popular',
  },
  {
    icon: Crown,
    name: 'Festival Mystery Box',
    tagline: 'Every festival, a surprise',
    price: 2499,
    frequency: '/festival',
    color: '#6B3E26',
    bg: '#FFF8ED',
    items: [
      '8-10 festival-themed items',
      'Exclusive artisan collabs',
      'Premium packaging',
      'Artisan video message',
      'Festival recipe book',
      'Priority support',
    ],
    badge: '🎉 Festival Special',
  },
  {
    icon: Zap,
    name: 'Annual Heritage Pack',
    tagline: 'Best value — save 30%',
    price: 12999,
    frequency: '/year',
    color: 'var(--forest)',
    bg: '#F0F8F0',
    items: [
      '12 monthly boxes',
      'All festivals included',
      'Artisan meet & greet access',
      'Custom name card inside',
      'Free regional food hamper',
      '30% savings vs monthly',
    ],
    badge: '💚 Best Value',
  },
];

export default function SubscriptionPacks() {
  const [selected, setSelected] = useState(1);

  return (
    <section className="py-16 md:py-24" style={{ background: 'linear-gradient(180deg, var(--cream-dark) 0%, var(--cream) 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--chili)' }}>
            Monthly Curated Boxes
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Delivering Rural India to Your Door
          </h2>
          <p className="mt-3 max-w-lg mx-auto text-sm" style={{ color: 'var(--text-muted)' }}>
            Monthly curated boxes delivering authentic rural products to urban subscribers. Every box tells a story.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packs.map((pack, i) => {
            const Icon = pack.icon;
            const isSelected = selected === i;
            return (
              <motion.div
                key={pack.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelected(i)}
                className="cursor-pointer relative"
              >
                <div
                  className="rounded-2xl p-5 h-full border-2 transition-all duration-300 hover:shadow-xl"
                  style={{
                    backgroundColor: pack.bg,
                    borderColor: isSelected ? pack.color : 'var(--border-warm)',
                    transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                    boxShadow: isSelected ? `0 8px 30px ${pack.color}33` : undefined,
                  }}
                >
                  {pack.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold text-white whitespace-nowrap"
                      style={{ backgroundColor: pack.color }}>
                      {pack.badge}
                    </span>
                  )}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: pack.color + '20' }}>
                    <Icon className="w-5 h-5" style={{ color: pack.color }} />
                  </div>
                  <h3 className="font-serif text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{pack.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'Caveat, cursive', fontSize: '0.95rem' }}>{pack.tagline}</p>
                  <div className="mt-4 mb-4">
                    <span className="text-3xl font-bold" style={{ color: pack.color }}>₹{pack.price.toLocaleString()}</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{pack.frequency}</span>
                  </div>
                  <ul className="space-y-2 mb-5">
                    {pack.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: pack.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full py-2.5 rounded-full text-sm font-medium text-white transition hover:opacity-90"
                    style={{ backgroundColor: pack.color }}
                  >
                    Subscribe Now
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}