import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';

const foodItems = [
  {
    name: 'Pootharekulu',
    origin: 'Atreyapuram, Andhra Pradesh',
    story: 'Paper-thin rice wafers stuffed with jaggery and ghee — a 500-year-old temple prasad turned artisan sweet.',
    price: 320,
    original_price: 400,
    spice: 0,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    tag: 'Heritage Sweet',
    tag_color: '#E4B400',
  },
  {
    name: 'Sakinalu',
    origin: 'West Godavari, Andhra Pradesh',
    story: 'Sesame-rice spirals fried in sunflower oil. Every Sankranti morning, grandmothers wake at 4am to fry these for the family.',
    price: 180,
    original_price: 220,
    spice: 1,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop',
    tag: 'Festival Special',
    tag_color: '#B22222',
  },
  {
    name: 'Gongura Pickle',
    origin: 'Guntur, Andhra Pradesh',
    story: 'Bold, tart sorrel leaves slow-pickled with 12 spices. Andhra\'s most-loved pickle — fire in a jar.',
    price: 240,
    original_price: 290,
    spice: 3,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=400&fit=crop',
    tag: '🌶 Fiery',
    tag_color: '#B22222',
  },
  {
    name: 'Millet Laddu',
    origin: 'Medak, Telangana',
    story: 'Ancient grain laddus made with foxtail millet, jaggery and cardamom. No sugar, no preservatives — just nourishment.',
    price: 280,
    original_price: 340,
    spice: 0,
    image: 'https://images.unsplash.com/photo-1574484284002-952d92a03a05?w=400&h=400&fit=crop',
    tag: 'Superfood',
    tag_color: '#3A6B35',
  },
];

const SpiceLevel = ({ level }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3].map(i => (
      <span key={i} className={`text-xs ${i <= level ? 'opacity-100' : 'opacity-20'}`}>🌶</span>
    ))}
  </div>
);

export default function HandmadeFood() {
  return (
    <section className="py-16 md:py-24" style={{ background: 'linear-gradient(135deg, #F8F1E5 0%, #EDE3D0 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--chili)' }}>From Grandmother's Kitchen</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Handmade Foods & Spices
          </h2>
          <p className="mt-2 text-sm max-w-md mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'Caveat, cursive', fontSize: '1.1rem' }}>
            Every jar, every sweet, every pickle — made with love in rural kitchens
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {foodItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Clay pot style card */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border-2"
                style={{ borderColor: 'var(--border-warm)' }}>
                {/* Image */}
                <div className="relative h-52 overflow-hidden" style={{ background: 'var(--cream-dark)' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold text-white"
                    style={{ backgroundColor: item.tag_color }}>
                    {item.tag}
                  </span>
                  {item.spice > 0 && (
                    <div className="absolute top-3 right-3">
                      <SpiceLevel level={item.spice} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-serif text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{item.name}</h3>
                  <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: 'var(--tamarind)' }}>
                    📍 {item.origin}
                  </p>
                  {/* Story */}
                  <p className="text-xs mt-2 leading-relaxed line-clamp-2"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'Caveat, cursive', fontSize: '0.95rem' }}>
                    "{item.story}"
                  </p>
                  {/* Price */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-warm)' }}>
                    <div>
                      <span className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>₹{item.price}</span>
                      <span className="text-xs line-through ml-1.5" style={{ color: 'var(--text-muted)' }}>₹{item.original_price}</span>
                    </div>
                    <Link
                      to={createPageUrl('Products') + '?category=organic_food'}
                      className="px-3 py-1.5 rounded-full text-xs font-medium text-white transition hover:opacity-80"
                      style={{ backgroundColor: 'var(--tamarind)' }}
                    >
                      Shop
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to={createPageUrl('Products') + '?category=organic_food'}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm text-white transition hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, var(--chili), var(--tamarind))' }}
          >
            🍛 Explore All Food & Spices
          </Link>
        </div>
      </div>
    </section>
  );
}