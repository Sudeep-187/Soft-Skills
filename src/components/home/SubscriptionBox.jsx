import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Gift, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SubscriptionBox() {
  return (
    <section className="py-16 md:py-24 bg-[var(--warm-white)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=500&fit=crop"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--forest-dark)]/95 via-[var(--forest-dark)]/80 to-[var(--forest-dark)]/40" />
          </div>

          <div className="relative z-10 p-8 md:p-14 lg:p-20 flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 text-white">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm mb-6">
                <Gift className="w-4 h-4" /> Monthly Craft Box
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                A Box of Rural India,<br />Delivered Monthly
              </h2>
              <p className="text-white/70 mt-4 max-w-md leading-relaxed text-sm">
                Curated selection of authentic crafts from different villages each month. Includes artisan stories, cultural context & surprise gifts.
              </p>
              <ul className="mt-6 space-y-2">
                {['4-6 handpicked artisan products', 'Story cards & origin certificates', 'Free shipping across India'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <Check className="w-4 h-4 text-[var(--mustard)]" /> {item}
                  </li>
                ))}
              </ul>
              <button className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--mustard)] hover:bg-[var(--mustard-dark)] text-white font-medium transition text-sm group">
                Subscribe — ₹1,499/month
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="hidden lg:block w-72 h-72 rounded-2xl overflow-hidden shadow-2xl rotate-3">
              <img
                src="https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&h=400&fit=crop"
                alt="Craft box"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}