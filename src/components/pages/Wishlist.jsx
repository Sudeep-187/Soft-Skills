import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Heart, ShoppingCart, Share2, Trash2, Package, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movedIds, setMovedIds] = useState(new Set());

  useEffect(() => {
    base44.entities.Wishlist.list('-created_date').then(data => { setItems(data); setLoading(false); });
  }, []);

  const handleRemove = async (item) => {
    await base44.entities.Wishlist.delete(item.id);
    setItems(prev => prev.filter(i => i.id !== item.id));
  };

  const handleMoveToCart = async (item) => {
    await base44.entities.CartItem.create({
      product_id: item.product_id, product_name: item.product_name, product_image: item.product_image,
      price: item.price, quantity: 1, artisan_name: item.artisan_name,
    });
    setMovedIds(prev => new Set([...prev, item.id]));
  };

  const handleShare = (item) => {
    const url = `${window.location.origin}${createPageUrl('ProductDetail')}?id=${item.product_id}`;
    if (navigator.share) { navigator.share({ title: item.product_name, url }); } 
    else { navigator.clipboard.writeText(url); alert('Product link copied!'); }
  };

  return (
    <div className="bg-black min-h-screen text-white pb-20 pt-20">
      {/* Header */}
      <div className="bg-zinc-950 border-b border-white/5 pb-8 pt-10">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-2">
            <Heart className="w-8 h-8 text-[#D4A017] fill-[#D4A017]" />
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">Archives of Desire</h1>
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-white/40">{items.length} artifacts retained</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/5">
                <div className="bg-black/50 aspect-square animate-pulse" />
                <div className="p-6 space-y-3"><div className="bg-white/5 h-4 w-3/4 rounded animate-pulse" /><div className="bg-white/5 h-3 w-1/2 rounded animate-pulse" /><div className="bg-white/5 h-10 w-full rounded-xl mt-4 animate-pulse" /></div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-32 bg-zinc-900/50 rounded-3xl border border-white/5 mt-8">
            <Heart className="w-20 h-20 mx-auto mb-6 text-white/10" />
            <h2 className="font-serif text-3xl font-bold mb-3 text-white">Your repository lies barren.</h2>
            <p className="text-sm mb-8 text-white/40">Seek out the hidden treasures of the south and mark them here.</p>
            <Link to={createPageUrl('Products')}>
              <Button className="rounded-full px-10 h-14 font-bold text-black text-sm transition hover:bg-[#E8BB3A]" style={{ backgroundColor: '#D4A017' }}>Commence the Hunt</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Bulk actions */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <p className="text-sm font-bold text-white/60">{items.filter(i => !movedIds.has(i.id)).length} items awaiting acquisition.</p>
              <Button variant="outline" className="rounded-full text-xs font-bold border-white/20 text-white hover:bg-white/10 hover:text-white transition bg-transparent h-10 px-6"
                onClick={async () => {
                  const toMove = items.filter(i => !movedIds.has(i.id));
                  for (const item of toMove) await handleMoveToCart(item);
                }}>
                <ShoppingCart className="w-4 h-4 mr-2 text-[#D4A017]" /> Acquire All
              </Button>
            </div>

            <AnimatePresence>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {items.map((item, i) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }}>
                    <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 group transition-all duration-300 hover:border-[#D4A017]/50 hover:shadow-[0_0_30px_rgba(212,160,23,0.15)] flex flex-col h-full">
                      
                      <Link to={createPageUrl('ProductDetail') + '?id=' + item.product_id} className="block relative aspect-square overflow-hidden bg-black shrink-0">
                        <img src={item.product_image || 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&h=400&fit=crop'} alt={item.product_name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        
                        {movedIds.has(item.id) && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20">
                            <div className="text-center text-white">
                              <Package className="w-8 h-8 mx-auto mb-2 text-[#D4A017]" />
                              <p className="text-sm font-bold uppercase tracking-widest text-[#D4A017]">Secured in Cart</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 z-10">
                          <button onClick={(e) => { e.preventDefault(); handleShare(item); }} className="w-10 h-10 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-xl border border-white/20 text-white hover:text-[#D4A017] hover:border-[#D4A017] transition">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button onClick={(e) => { e.preventDefault(); handleRemove(item); }} className="w-10 h-10 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-xl border border-white/20 text-white hover:text-red-500 hover:border-red-500 transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </Link>

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-serif text-lg font-bold text-white mb-1 line-clamp-2 leading-snug hover:text-[#D4A017] transition">{item.product_name}</h3>
                        {item.artisan_name && <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">By Master {item.artisan_name}</p>}
                        
                        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                          <p className="font-bold text-xl text-white">₹{item.price?.toLocaleString()}</p>
                          <div className="flex gap-2">
                            <Button onClick={() => handleMoveToCart(item)} disabled={movedIds.has(item.id)} className="w-12 h-12 p-0 rounded-xl transition text-black disabled:opacity-50" style={{ backgroundColor: movedIds.has(item.id) ? '#A3E635' : '#D4A017' }}>
                              <ShoppingCart className="w-5 h-5" />
                            </Button>
                            <Link to={createPageUrl('ProductDetail') + '?id=' + item.product_id}>
                              <Button variant="outline" className="w-12 h-12 p-0 rounded-xl bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-white/40">
                                <ExternalLink className="w-5 h-5" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}