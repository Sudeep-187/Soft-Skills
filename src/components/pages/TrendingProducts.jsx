import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { TrendingUp, Flame, Star, Heart, ShoppingCart, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ProductCard from '@/components/shared/ProductCard';
import SkeletonCard from '@/components/shared/SkeletonCard';

const demoProducts = [
  { id: 'p1', name: 'Pochampally Ikat Silk Saree — Cobalt Blue', price: 4500, original_price: 6000, category: 'handloom', images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop'], artisan_name: 'Lakshmi Devi', village: 'Pochampally', state: 'Telangana', rating: 4.9, likes: 2340, is_featured: true },
  { id: 'p2', name: 'Etikoppaka Lacquer Toy Set', price: 1200, original_price: 1500, category: 'woodcraft', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop'], artisan_name: 'Raju Kummara', village: 'Etikoppaka', state: 'Andhra Pradesh', rating: 4.8, likes: 1890 },
  { id: 'p3', name: 'Kalamkari Hand-Painted Dupatta', price: 2800, original_price: 3500, category: 'paintings', images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop'], artisan_name: 'Padmavathi B.', village: 'Srikalahasti', state: 'Andhra Pradesh', rating: 4.9, likes: 3100, is_festival_special: true },
  { id: 'p4', name: 'Bidriware Silver Inlay Vase', price: 3500, original_price: 4500, category: 'metalwork', images: ['https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop'], artisan_name: 'Venkat Reddy', village: 'Bidar', state: 'Telangana', rating: 4.7, likes: 1560 },
  { id: 'p5', name: 'Organic Guntur Chilli Powder', price: 450, original_price: 550, category: 'spices', images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop'], artisan_name: 'Suresh Farms', village: 'Guntur', state: 'Andhra Pradesh', rating: 4.6, likes: 4200 },
  { id: 'p6', name: 'Nirmal Painting — Elephant Procession', price: 6800, original_price: 8500, category: 'paintings', images: ['https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=400&h=400&fit=crop'], artisan_name: 'Srinivasulu M.', village: 'Nirmal', state: 'Telangana', rating: 4.8, likes: 2780 },
  { id: 'p7', name: 'Kondapalli Wooden Dashavataram Set', price: 2200, original_price: 2800, category: 'woodcraft', images: ['https://images.unsplash.com/photo-1602517623547-daea57e10fda?w=400&h=400&fit=crop'], artisan_name: 'Ramalingam S.', village: 'Kondapalli', state: 'Andhra Pradesh', rating: 4.7, likes: 1920 },
  { id: 'p8', name: 'Pembarthi Brass Urli — Decorative Bowl', price: 5200, original_price: 6500, category: 'metalwork', images: ['https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop'], artisan_name: 'Krishna Reddy', village: 'Pembarthi', state: 'Telangana', rating: 4.9, likes: 2450 },
];

const tabs = ['All', 'Most Liked', 'Top Rated', 'Festival Picks', 'Food & Spices'];

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await base44.entities.Product.list('-rating', 24);
        setProducts(data.length > 0 ? data : demoProducts);
      } catch {
        setProducts(demoProducts);
      }
      setLoading(false);
    };
    load();
  }, []);

  const filtered = products.filter(p => {
    if (activeTab === 'Most Liked') return (p.likes || 0) > 1800;
    if (activeTab === 'Top Rated') return (p.rating || 0) >= 4.8;
    if (activeTab === 'Festival Picks') return p.is_festival_special;
    if (activeTab === 'Food & Spices') return ['spices', 'organic_food'].includes(p.category);
    return true;
  });

  return (
    <div style={{ backgroundColor: 'var(--cream)' }} className="min-h-screen">

      {/* Header */}
      <div className="py-10 md:py-14" style={{ background: 'linear-gradient(135deg, var(--tamarind-dark) 0%, var(--tamarind) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(228,180,0,0.2)' }}>
                <Flame className="w-5 h-5" style={{ color: 'var(--turmeric)' }} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--turmeric)' }}>Right Now</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">Trending Products</h1>
            <p className="mt-2 text-white/60 text-sm">What everyone is loving — updated daily from artisan communities</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all shrink-0"
              style={{
                backgroundColor: activeTab === tab ? 'var(--tamarind)' : 'white',
                color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                border: `1.5px solid ${activeTab === tab ? 'var(--tamarind)' : 'var(--border-warm)'}`,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Top 3 spotlight */}
        {activeTab === 'All' && !loading && (
          <div className="mb-12">
            <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <TrendingUp className="w-5 h-5" style={{ color: 'var(--chili)' }} /> Top 3 This Week
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {products.slice(0, 3).map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link to={createPageUrl('ProductDetail') + '?id=' + p.id}
                    className="group block bg-white rounded-2xl overflow-hidden border relative"
                    style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
                    <span className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white"
                      style={{ backgroundColor: i === 0 ? '#E4B400' : i === 1 ? '#C0C0C0' : '#CD7F32' }}>
                      #{i + 1}
                    </span>
                    <div className="h-56 overflow-hidden">
                      <img src={p.images?.[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-1" style={{ color: 'var(--text-primary)' }}>{p.name}</h3>
                      <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <MapPin className="w-3 h-3" /> {p.village}, {p.state}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold" style={{ color: 'var(--tamarind)' }}>₹{p.price?.toLocaleString()}</span>
                        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-current" style={{ color: 'var(--turmeric)' }} /> {p.rating}</span>
                          <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" style={{ color: 'var(--chili)' }} /> {(p.likes || 0).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Full grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {loading
            ? Array(12).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
          }
        </div>

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p style={{ color: 'var(--text-muted)' }}>No products in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}