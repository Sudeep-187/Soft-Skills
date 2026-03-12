import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const artisans = [
  { id: '1', name: 'Lakshmi Devi', craft: 'Pochampally Ikat Weaving', village: 'Pochampally, Telangana', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&h=300&fit=crop', rating: 4.9, products: 42 },
  { id: '2', name: 'Raju Kummara', craft: 'Etikoppaka Wooden Toys', village: 'Etikoppaka, Andhra Pradesh', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', rating: 4.8, products: 28 },
  { id: '3', name: 'Padmavathi B.', craft: 'Kalamkari Painting', village: 'Srikalahasti, Andhra Pradesh', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop', rating: 4.9, products: 35 },
  { id: '4', name: 'Venkat Reddy', craft: 'Bidriware Metalwork', village: 'Bidar, Telangana', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop', rating: 4.7, products: 19 },
];

export default function FeaturedArtisans() {
  return (
    <section className="py-16 md:py-24 bg-[var(--warm-white)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--terracotta)]">Meet the Makers</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--text-primary)] mt-2">Featured Artisans</h2>
          </div>
          <Link to={createPageUrl('Products')} className="hidden md:flex items-center gap-1 text-sm font-medium text-[var(--terracotta)] hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {artisans.map((artisan, i) => (
            <motion.div
              key={artisan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={createPageUrl('ArtisanProfile') + '?id=' + artisan.id}
                className="group block text-center"
              >
                <div className="relative mx-auto w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-[var(--border-warm)] group-hover:ring-[var(--terracotta)]/30 transition-all duration-500">
                  <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mt-4 text-sm md:text-base group-hover:text-[var(--terracotta)] transition-colors">{artisan.name}</h3>
                <p className="text-xs text-[var(--terracotta)] font-medium mt-0.5">{artisan.craft}</p>
                <div className="flex items-center justify-center gap-1 mt-1.5 text-xs text-[var(--text-muted)]">
                  <MapPin className="w-3 h-3" />
                  <span>{artisan.village}</span>
                </div>
                <div className="flex items-center justify-center gap-1 mt-1.5">
                  <Star className="w-3.5 h-3.5 fill-[var(--mustard)] text-[var(--mustard)]" />
                  <span className="text-xs font-medium">{artisan.rating}</span>
                  <span className="text-xs text-[var(--text-muted)]">· {artisan.products} products</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}