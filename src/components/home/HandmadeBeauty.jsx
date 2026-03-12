import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { Leaf, Sparkles } from 'lucide-react';

const beautyItems = [
  {
    name: 'Kumkumadi Tailam',
    origin: 'Vizianagaram, Andhra Pradesh',
    story: 'Ancient saffron-infused face oil from an Ayurvedic family lineage spanning 6 generations.',
    price: 680,
    original_price: 850,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    tag: 'Ayurvedic',
  },
  {
    name: 'Multani Mitti Rose Pack',
    origin: 'Nellore, Andhra Pradesh',
    story: 'Sun-dried Fuller\'s Earth blended with Mysore rose petals. No chemicals, no fillers — just earth.',
    price: 220,
    original_price: 280,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    tag: '100% Natural',
  },
  {
    name: 'Neem & Turmeric Soap',
    origin: 'Warangal, Telangana',
    story: 'Cold-pressed handmade soap by a women\'s SHG. Turmeric from their own fields.',
    price: 120,
    original_price: 160,
    image: 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400&h=400&fit=crop',
    tag: 'SHG Made',
  },
  {
    name: 'Black Sesame Hair Oil',
    origin: 'Karimnagar, Telangana',
    story: 'Slow-fired sesame oil infused with hibiscus, curry leaves and bhringraj. A weekly ritual for generations.',
    price: 380,
    original_price: 480,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop',
    tag: 'Hair Care',
  },
];

export default function HandmadeBeauty() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--warm-white)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--forest)' }}>Pure & Handcrafted</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Natural Beauty Products
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'Caveat, cursive', fontSize: '1.1rem' }}>
            From village women who know the land — zero chemicals, all tradition
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {beautyItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link
                to={createPageUrl('Products')}
                className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border"
                style={{ borderColor: 'var(--border-warm)' }}
              >
                <div className="relative h-48 overflow-hidden" style={{ background: 'var(--cream-dark)' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1"
                    style={{ backgroundColor: 'var(--forest)' }}>
                    <Leaf className="w-3 h-3" /> {item.tag}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-serif text-sm font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>{item.name}</h3>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--tamarind)' }}>📍 {item.origin}</p>
                  <p className="text-xs mt-1.5 line-clamp-2 leading-relaxed"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'Caveat, cursive' }}>
                    {item.story}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>₹{item.price}</span>
                    <span className="text-[10px] line-through" style={{ color: 'var(--text-muted)' }}>₹{item.original_price}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to={createPageUrl('Products')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm text-white transition hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, var(--forest), var(--banana-leaf))' }}
          >
            <Sparkles className="w-4 h-4" /> Shop All Natural Beauty
          </Link>
        </div>
      </div>
    </section>
  );
}