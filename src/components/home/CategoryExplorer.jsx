import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Handloom',
    slug: 'handloom',
    icon: '🧵',
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&h=700&fit=crop',
    count: '245+ items',
    desc: 'Silk, Ikat & Cotton Weaves',
    span: 'row-span-2',
  },
  {
    name: 'Pottery',
    slug: 'pottery',
    icon: '🏺',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop',
    count: '128+ items',
    desc: 'Terracotta & Stoneware',
    span: '',
  },
  {
    name: 'Paintings',
    slug: 'paintings',
    icon: '🎨',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&h=400&fit=crop',
    count: '94+ items',
    desc: 'Kalamkari, Tanjore & Nirmal',
    span: '',
  },
  {
    name: 'Jewelry',
    slug: 'jewelry',
    icon: '💎',
    image: 'https://images.unsplash.com/photo-1515562141589-67f0d4c68dab?w=600&h=500&fit=crop',
    count: '186+ items',
    desc: 'Silver, Temple & Tribal',
    span: 'row-span-2',
  },
  {
    name: 'Woodcraft',
    slug: 'woodcraft',
    icon: '🪵',
    image: 'https://images.unsplash.com/photo-1602517623547-daea57e10fda?w=600&h=350&fit=crop',
    count: '72+ items',
    desc: 'Toys & Sculptures',
    span: '',
  },
  {
    name: 'Spices',
    slug: 'spices',
    icon: '🌶️',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=350&fit=crop',
    count: '156+ items',
    desc: 'Organic & Premium Grade',
    span: '',
  },
];

export default function CategoryExplorer() {
  const featured = categories[0];
  const rest = categories.slice(1);

  return (
    <section className="py-16 md:py-24" style={{ background: 'var(--cream-dark)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="section-sub">Shop by Craft</span>
            <h2 className="section-heading mt-2">Explore Our Collections</h2>
            <p className="section-desc mt-2 max-w-md">
              Each craft carries generations of knowledge, tradition & artistic brilliance
            </p>
          </div>
          <Link
            to={createPageUrl('Products')}
            className="hidden md:flex items-center gap-1 text-sm font-semibold hover:underline"
            style={{ color: 'var(--terracotta)' }}
          >
            All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Asymmetric category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-4">

          {/* Featured large card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="col-span-2 md:col-span-1 lg:col-span-2 row-span-2"
          >
            <Link
              to={`${createPageUrl('Products')}?category=${featured.slug}`}
              className="group relative block h-full rounded-2xl overflow-hidden"
            >
              <img src={featured.image} alt={featured.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 gradient-card" />
              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'rgba(107,62,38,0.25)' }} />
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="text-3xl mb-2">{featured.icon}</div>
                <h3 className="font-serif font-bold text-white text-2xl md:text-3xl">{featured.name}</h3>
                <p className="text-white/70 text-sm mt-1">{featured.desc}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-white/60 text-xs">{featured.count}</span>
                  <span
                    className="flex items-center gap-1 text-xs font-bold text-white px-3 py-1.5 rounded-full translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: 'var(--terracotta)' }}
                  >
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Regular cards */}
          {rest.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.08 }}
              className={cat.slug === 'jewelry' ? 'row-span-2' : ''}
            >
              <Link
                to={`${createPageUrl('Products')}?category=${cat.slug}`}
                className="group relative block h-full rounded-2xl overflow-hidden"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" />
                <div className="absolute inset-0 gradient-card" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'rgba(107,62,38,0.2)' }} />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <div className="text-xl mb-1">{cat.icon}</div>
                  <h3 className="font-semibold text-white text-sm md:text-base">{cat.name}</h3>
                  <p className="text-white/60 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{cat.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile: View all */}
        <div className="md:hidden text-center mt-8">
          <Link to={createPageUrl('Products')} className="btn-primary">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}