import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Minus, Plus, Trash2, Heart, ShoppingBag, ArrowRight, Tag, Truck, ShieldCheck, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const items = await base44.entities.CartItem.list();
        setCartItems(items.filter(i => !i.saved_for_later));
        setSavedItems(items.filter(i => i.saved_for_later));
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const updateQuantity = async (item, delta) => {
    const newQty = Math.max(1, (item.quantity || 1) + delta);
    await base44.entities.CartItem.update(item.id, { quantity: newQty });
    setCartItems(prev => prev.map(i => i.id === item.id ? { ...i, quantity: newQty } : i));
  };

  const removeItem = async (item) => {
    await base44.entities.CartItem.delete(item.id);
    setCartItems(prev => prev.filter(i => i.id !== item.id));
  };

  const saveForLater = async (item) => {
    await base44.entities.CartItem.update(item.id, { saved_for_later: true });
    setCartItems(prev => prev.filter(i => i.id !== item.id));
    setSavedItems(prev => [...prev, { ...item, saved_for_later: true }]);
  };

  const moveToCart = async (item) => {
    await base44.entities.CartItem.update(item.id, { saved_for_later: false });
    setSavedItems(prev => prev.filter(i => i.id !== item.id));
    setCartItems(prev => [...prev, { ...item, saved_for_later: false }]);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal - discount + shipping;

  if (!loading && cartItems.length === 0 && savedItems.length === 0) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center px-4">
        <div className="text-center py-20 bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-2xl px-6">
          <div className="w-24 h-24 rounded-full bg-black border border-white/5 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <ShoppingBag className="w-10 h-10 text-white/30" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-white mb-2">Your coffer is empty</h2>
          <p className="text-sm text-white/40 mt-2">Discover authentic handcrafted treasures from rural artisans.</p>
          <Link to={createPageUrl('Products')}>
            <Button className="mt-8 h-14 rounded-full bg-[#D4A017] hover:bg-[#E8BB3A] text-black font-bold px-10 gap-2 transition hover:scale-105">
              Begin Exploration <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
          <ShoppingBag className="w-8 h-8 text-[#D4A017]" />
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">Acquisitions ({cartItems.length})</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 md:gap-14">
          <div className="flex-1 space-y-6">
            <AnimatePresence>
              {cartItems.map(item => (
                <motion.div key={item.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }} className="bg-zinc-900 rounded-3xl border border-white/10 p-5 md:p-6 transition hover:border-white/20">
                  <div className="flex gap-6">
                    <Link to={createPageUrl('ProductDetail') + '?id=' + item.product_id} className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shrink-0 bg-black border border-white/5 relative group">
                      <img src={item.product_image || 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=200&h=200&fit=crop'} alt={item.product_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <Link to={createPageUrl('ProductDetail') + '?id=' + item.product_id} className="font-serif text-xl md:text-2xl font-bold text-white hover:text-[#D4A017] transition line-clamp-2 leading-tight">{item.product_name}</Link>
                          {item.artisan_name && <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4A017] mt-2 block">By Master {item.artisan_name}</p>}
                        </div>
                        <span className="font-bold text-2xl text-white">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-white/5">
                        <div className="flex items-center bg-black border border-white/10 rounded-full overflow-hidden h-12">
                          <button onClick={() => updateQuantity(item, -1)} className="px-4 h-full text-white/50 hover:text-white hover:bg-white/5 transition"><Minus className="w-4 h-4" /></button>
                          <span className="px-5 font-bold text-white min-w-[3rem] text-center">{item.quantity || 1}</span>
                          <button onClick={() => updateQuantity(item, 1)} className="px-4 h-full text-white/50 hover:text-white hover:bg-white/5 transition"><Plus className="w-4 h-4" /></button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" onClick={() => saveForLater(item)} className="h-12 px-5 rounded-full text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 gap-2 border border-transparent hover:border-white/10">
                            <Bookmark className="w-4 h-4" /> Save
                          </Button>
                          <Button variant="ghost" onClick={() => removeItem(item)} className="h-12 w-12 p-0 rounded-full text-white/30 hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {savedItems.length > 0 && (
              <div className="mt-16 pt-10 border-t border-white/10">
                <h3 className="font-serif text-2xl font-bold text-white mb-6">Saved for Later ({savedItems.length})</h3>
                <div className="space-y-4">
                  {savedItems.map(item => (
                    <div key={item.id} className="bg-zinc-950 rounded-2xl border border-white/10 p-5 flex items-center gap-5">
                      <img src={item.product_image || 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=100&h=100&fit=crop'} alt="" className="w-20 h-20 rounded-xl object-cover opacity-70" />
                      <div className="flex-1">
                        <p className="text-base font-bold text-white/80 line-clamp-1">{item.product_name}</p>
                        <p className="text-lg font-bold text-white mt-1">₹{item.price?.toLocaleString()}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => moveToCart(item)} className="h-12 px-6 rounded-full text-xs font-bold bg-transparent border-[#D4A017]/30 text-[#D4A017] hover:bg-[#D4A017]/10 hover:border-[#D4A017]">
                        Reinstate
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:w-[420px] shrink-0">
            <div className="bg-zinc-900 rounded-3xl border border-white/10 p-8 sticky top-32 shadow-2xl">
              <h3 className="font-serif text-2xl font-bold text-white mb-8">The Ledger</h3>
              
              <div className="flex gap-2 mb-8">
                <div className="relative flex-1">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4A017]" />
                  <input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Seal or Code" className="w-full pl-12 pr-4 h-14 rounded-xl bg-black border border-white/10 text-sm text-white focus:outline-none focus:border-[#D4A017] transition" />
                </div>
                <Button onClick={() => { if (couponCode) setCouponApplied(true); }} className="h-14 px-8 rounded-xl bg-[#D4A017] hover:bg-[#E8BB3A] text-black font-bold">Apply</Button>
              </div>

              <div className="space-y-4 text-sm mb-8 font-medium text-white/70">
                <div className="flex justify-between"><span>Summation</span><span className="text-white">₹{subtotal.toLocaleString()}</span></div>
                {discount > 0 && <div className="flex justify-between text-[#D4A017]"><span>Decree (10% off)</span><span>−₹{discount.toLocaleString()}</span></div>}
                <div className="flex justify-between"><span>Conveyance</span><span>{shipping === 0 ? <span className="text-green-400">Complimentary</span> : `₹${shipping}`}</span></div>
                <div className="border-t border-white/10 pt-6 mt-4 flex justify-between items-center text-xl font-black text-white">
                  <span>Final Tribute</span><span className="text-[#D4A017]">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Button onClick={() => navigate(createPageUrl('Checkout'))} className="w-full h-16 rounded-2xl bg-[#D4A017] hover:bg-[#E8BB3A] text-black font-bold text-base gap-3 hover:scale-[1.02] transition shadow-[0_0_20px_rgba(212,160,23,0.2)]">
                Finalize Charter <ArrowRight className="w-5 h-5" />
              </Button>

              <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-white/10 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                <span className="flex items-center gap-3"><Truck className="w-4 h-4 text-[#D4A017]" /> Free journey on tributes above ₹999</span>
                <span className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-[#D4A017]" /> Certified pure rural craftsmanship</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}