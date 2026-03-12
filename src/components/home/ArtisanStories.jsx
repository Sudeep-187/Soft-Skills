import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { MapPin, Star, Award } from 'lucide-react';

const artisans = [
  {
    id: '1',
    name: 'Lakshmi Devi',
    craft: 'Pochampally Ikat Weaving',
    village: 'Pochampally',
    state: 'Telangana',
    experience: 30,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=500&h=600&fit=crop',
    story: 'At 12, I sat beside my grandmother at the pit loom. Now my sarees are worn by women across India. Each thread I tie carries a prayer.',
    award: 'National Craft Award 2023',
    products: 42,
  },
  {
    id: '2',
    name: 'Raju Kummara',
    craft: 'Etikoppaka Wooden Toys',
    village: 'Etikoppaka',
    state: 'Andhra Pradesh',
    experience: 22,
    rating: 4.8,
    reviews: 187,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop',
    story: 'The forest gives me the wood, the river gives the clay for colors. I make toys so children remember where joy comes from.',
    award: 'State Craftsman of the Year 2022',
    products: 28,
  },
  {
    id: '3',
    name: 'Padmavathi B.',
    craft: 'Kalamkari Painting',
    village: 'Srikalahasti',
    state: 'Andhra Pradesh',
    experience: 25,
    rating: 4.9,
    reviews: 264,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=600&fit=crop',
    story: 'I draw the stories of Ramayana with a bamboo pen and natural dyes. Every painting is a month of my life.',
    award: 'Shilpa Guru Award 2021',
    products: 35,
  },
];

export default function ArtisanStories() {
  return (
    <section className="py-16 md:py-24" style={{ background: 'linear-gradient(135deg, #2C1A0E 0%, #4A2A18 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--mustard)' }}>Documentary Style</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 text-white">
            Meet the Makers
          </h2>
          <p className="mt-2 text-sm text-white/50">Real people, real stories — the hands behind every piece</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artisans.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link to={createPageUrl('ArtisanProfile') + '?id=' + a.id} className="group block">
                {/* Photo */}
                <div className="relative h-80 rounded-2xl overflow-hidden mb-5">
                  <img
                    src={a.image}
                    alt={a.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Award badge */}
                  {a.award && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold text-white backdrop-blur-sm"
                      style={{ backgroundColor: 'rgba(228,180,0,0.3)', border: '1px solid rgba(228,180,0,0.4)' }}>
                      <Award className="w-3 h-3" style={{ color: 'var(--mustard)' }} /> {a.award}
                    </div>
                  )}
                  {/* Bottom overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-xl font-bold text-white">{a.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--mustard)' }}>{a.craft}</p>
                    <div className="flex items-center gap-1 text-xs text-white/60 mt-1">
                      <MapPin className="w-3 h-3" /> {a.village}, {a.state}
                    </div>
                  </div>
                </div>

                {/* Story quote */}
                <blockquote className="border-l-2 pl-4 mb-4" style={{ borderColor: 'var(--mustard)' }}>
                  <p className="text-sm text-white/70 leading-relaxed italic"
                    style={{ fontFamily: 'Caveat, cursive', fontSize: '1rem' }}>
                    "{a.story}"
                  </p>
                </blockquote>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <Star className="w-3.5 h-3.5 fill-current" style={{ color: 'var(--mustard)' }} />
                    <span className="font-bold text-white">{a.rating}</span>
                    <span>({a.reviews} reviews)</span>
                    <span className="mx-1">·</span>
                    <span>{a.experience} yrs craft</span>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    {a.products} products
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to={createPageUrl('Products')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm transition hover:opacity-90"
            style={{ backgroundColor: 'var(--mustard)', color: '#2C1A0E' }}
          >
            View All Artisans →
          </Link>
        </div>
      </div>
    </section>
  );
}