import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Heart, ShoppingCart, Star, MapPin, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

const STATE_COLORS = {
  'Andhra Pradesh': '#D4A017',
  'Telangana': '#C0392B',
  'Tamil Nadu': '#2E7D32',
  'Kerala': '#1565C0',
};

export default function ProductCard({ product, index = 0 }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const handleWishlist = async (e) => {
    e.preventDefault(); e.stopPropagation();
    setWishlisted(w => !w);
    if (!wishlisted) await base44.entities.Wishlist.create({ product_id: product.id, product_name: product.name, price: product.price });
  };

  const handleAddToCart = async (e) => {
    e.preventDefault(); e.stopPropagation();
    await base44.entities.CartItem.create({ product_id: product.id, product_name: product.name, price: product.price, quantity: 1 });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  const stateColor = STATE_COLORS[product.state] || '#888';
  const productImage = product.images?.[0] || 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=400&fit=crop';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform, opacity' }}
    >
      <Link
        to={`${createPageUrl('ProductDetail')}?id=${product.id}`}
        className="group block rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* ── Image ── */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={productImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width="400"
            height="400"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&h=400&fit=crop'; }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {discount > 0 && (
              <span className="px-2.5 py-1 text-white text-[10px] font-bold rounded-full" style={{ background: '#C0392B' }}>
                -{discount}%
              </span>
            )}
            {product.is_festival_special && (
              <span className="px-2.5 py-1 text-[10px] font-bold rounded-full" style={{ background: '#D4A017', color: '#000' }}>
                🎉 Festival
              </span>
            )}
            {product.is_featured && (
              <span className="px-2.5 py-1 text-white text-[10px] font-bold rounded-full flex items-center gap-0.5" style={{ background: 'rgba(212,160,23,0.9)' }}>
                <Sparkles className="w-2.5 h-2.5" />Top Pick
              </span>
            )}
          </div>

          {/* Action buttons — slide in on hover */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-20 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400">
            <button
              onClick={handleWishlist}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              style={{ background: wishlisted ? '#C0392B' : 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', color: 'white' }}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleAddToCart}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              style={{ background: addedToCart ? '#2E7D32' : 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', color: 'white' }}
            >
              {addedToCart ? '✓' : <ShoppingCart className="w-4 h-4" />}
            </button>
          </div>

          {/* Price overlay on image bottom */}
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-white font-bold text-lg">₹{product.price?.toLocaleString('en-IN')}</span>
                {product.original_price && (
                  <span className="text-white/40 text-xs line-through ml-2">₹{product.original_price?.toLocaleString('en-IN')}</span>
                )}
              </div>
              {product.rating && (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-white text-[11px] font-semibold">{product.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Info ── */}
        <div className="p-4">
          {/* State + village */}
          <div className="flex items-center gap-2 mb-2">
            {product.state && (
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: stateColor }}>
                {product.state}
              </span>
            )}
            {product.village && (
              <span className="flex items-center gap-0.5 text-[10px] text-white/25">
                <MapPin className="w-2.5 h-2.5" />{product.village}
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="text-white/80 font-medium text-sm leading-snug line-clamp-2 group-hover:text-white transition-colors duration-300">
            {product.name}
          </h3>

          {/* Artisan */}
          {product.artisan_name && (
            <p className="text-white/25 text-[11px] mt-1">
              by {product.artisan_name}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}