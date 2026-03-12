import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Star, MapPin, Award, Package, Heart, Share2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/shared/ProductCard';
import { motion } from 'framer-motion';
import ArtisanReviews from '@/components/artisan/ArtisanReviews';

const demoArtisan = {
  id: '1', name: 'Lakshmi Devi', bio: 'A master weaver from Pochampally village, Lakshmi Devi has been practicing the traditional Ikat weaving technique for over 30 years. She learned this intricate art from her grandmother and has since trained over 50 women in her village, creating a self-sustaining community of weavers.',
  profile_image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
  cover_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=400&fit=crop',
  village: 'Pochampally', district: 'Yadadri Bhuvanagiri', state: 'Telangana', craft_type: 'Pochampally Ikat Weaving',
  experience_years: 30, rating: 4.9, total_sales: 1250, products_count: 42,
  awards: ['National Handicraft Award 2019', 'State Craft Excellence 2021', 'UNESCO Recognition'],
  story: 'The art of Pochampally Ikat dates back centuries, where each thread is individually tied and dyed before weaving — a painstaking process that creates stunning geometric patterns. Lakshmi Devi\'s family has preserved this technique for five generations, and she now leads a cooperative of 50 women weavers in her village, ensuring this art form thrives for future generations.'
};

const demoProducts = [
  { id: 'p1', name: 'Pochampally Ikat Silk Saree — Cobalt Blue', price: 4500, original_price: 6000, category: 'handloom', images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop'], artisan_name: 'Lakshmi Devi', village: 'Pochampally', state: 'Telangana', rating: 4.9 },
  { id: 'p14', name: 'Ikat Cotton Stole — Geometric Green', price: 1200, original_price: 1500, category: 'handloom', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop'], artisan_name: 'Lakshmi Devi', state: 'Telangana', rating: 4.8 },
  { id: 'p15', name: 'Double Ikat Patola Saree — Red Gold', price: 12000, original_price: 15000, category: 'handloom', images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop'], artisan_name: 'Lakshmi Devi', state: 'Telangana', rating: 5.0 },
  { id: 'p16', name: 'Ikat Table Runner — Indigo White', price: 800, category: 'handloom', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop'], artisan_name: 'Lakshmi Devi', state: 'Telangana', rating: 4.7 },
];

export default function ArtisanProfile() {
  const [artisan, setArtisan] = useState(demoArtisan);
  const [products, setProducts] = useState(demoProducts);

  return (
    <div className="bg-[var(--cream)] min-h-screen">
      {/* Cover */}
      <div className="relative h-48 md:h-72">
        <img src={artisan.cover_image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-16 relative z-10">
        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
          <img src={artisan.profile_image} alt={artisan.name} className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-lg -mt-20 md:-mt-16" />
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)]">{artisan.name}</h1>
            <p className="text-[var(--terracotta)] font-medium text-sm mt-0.5">{artisan.craft_type}</p>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-2 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {artisan.village}, {artisan.state}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {artisan.experience_years} years</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[var(--mustard)] text-[var(--mustard)]" />
                <span className="font-bold text-sm">{artisan.rating}</span>
              </div>
              <span className="text-sm text-[var(--text-muted)]">{artisan.total_sales} sales</span>
              <span className="text-sm text-[var(--text-muted)]">{artisan.products_count} products</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="rounded-full bg-[var(--terracotta)] hover:bg-[var(--terracotta-dark)] text-white gap-2 px-6">
              <Heart className="w-4 h-4" /> Support
            </Button>
            <Button variant="outline" className="rounded-full border-[var(--border-warm)]">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Bio & Awards */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2 bg-white rounded-2xl border border-[var(--border-warm)]/50 p-6">
            <h3 className="font-serif text-lg font-bold mb-3">About</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{artisan.bio}</p>
            {artisan.story && (
              <>
                <h3 className="font-serif text-lg font-bold mt-6 mb-3">The Craft Story</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{artisan.story}</p>
              </>
            )}
          </div>
          <div className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-6">
            <h3 className="font-serif text-lg font-bold mb-3">Awards & Recognition</h3>
            <div className="space-y-3">
              {artisan.awards?.map((award, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-[var(--mustard)] shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--text-secondary)]">{award}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mt-10">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] mb-6">Products by {artisan.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>

        {/* Reviews & Background */}
        <ArtisanReviews artisan={artisan} />
      </div>
    </div>
  );
}