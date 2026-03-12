import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Minus, Plus, Trash2, Heart, ShoppingBag, ArrowRight, Tag, Truck, ShieldCheck, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
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
      <div className="bg-[var(--cream)] min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-[var(--cream-dark)] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-[var(--text-muted)]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)]">Your cart is empty</h2>
          <p className="text-sm text-[var(--text-muted)] mt-2">Discover authentic handcrafted treasures from rural artisans</p>
          <Link to={createPageUrl('Products')}>
            <Button className="mt-6 rounded-full bg-[var(--terracotta)] hover:bg-[var(--terracotta-dark)] text-white px-8 gap-2">
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--cream)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6">Shopping Cart ({cartItems.length})</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="flex-1 space-y-4">
            <AnimatePresence>
              {cartItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-4 md:p-5"
                >
                  <div className="flex gap-4">
                    <Link to={createPageUrl('ProductDetail') + '?id=' + item.product_id} className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shrink-0 bg-[var(--cream-dark)]">
                      <img src={item.product_image || 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=200&h=200&fit=crop'} alt={item.product_name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={createPageUrl('ProductDetail') + '?id=' + item.product_id} className="font-medium text-sm md:text-base text-[var(--text-primary)] hover:text-[var(--terracotta)] transition line-clamp-2">{item.product_name}</Link>
                      {item.artisan_name && <p className="text-xs text-[var(--text-muted)] mt-0.5">by {item.artisan_name}</p>}
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-[var(--border-warm)] rounded-full overflow-hidden">
                          <button onClick={() => updateQuantity(item, -1)} className="px-2.5 py-1.5 hover:bg-[var(--cream-dark)] transition"><Minus className="w-3.5 h-3.5" /></button>
                          <span className="px-3 py-1.5 text-sm font-medium border-x border-[var(--border-warm)]">{item.quantity || 1}</span>
                          <button onClick={() => updateQuantity(item, 1)} className="px-2.5 py-1.5 hover:bg-[var(--cream-dark)] transition"><Plus className="w-3.5 h-3.5" /></button>
                        </div>
                        <span className="font-bold text-[var(--text-primary)]">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <button onClick={() => saveForLater(item)} className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--terracotta)] transition">
                          <Bookmark className="w-3.5 h-3.5" /> Save for later
                        </button>
                        <button onClick={() => removeItem(item)} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition">
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Saved for later */}
            {savedItems.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">Saved for Later ({savedItems.length})</h3>
                <div className="space-y-3">
                  {savedItems.map(item => (
                    <div key={item.id} className="bg-white rounded-xl border border-[var(--border-warm)]/50 p-4 flex items-center gap-4">
                      <img src={item.product_image || 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=100&h=100&fit=crop'} alt="" className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{item.product_name}</p>
                        <p className="text-sm font-bold mt-0.5">₹{item.price?.toLocaleString()}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => moveToCart(item)} className="text-xs rounded-full border-[var(--terracotta)] text-[var(--terracotta)]">
                        Move to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:w-96 shrink-0">
            <div className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-6 sticky top-28">
              <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] mb-4">Order Summary</h3>
              
              {/* Coupon */}
              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[var(--border-warm)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]/20"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => { if (couponCode) setCouponApplied(true); }}
                  className="rounded-full border-[var(--terracotta)] text-[var(--terracotta)]"
                >
                  Apply
                </Button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-600"><span>Coupon Discount</span><span>−₹{discount.toLocaleString()}</span></div>}
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Shipping</span><span>{shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}</span></div>
                <div className="border-t border-[var(--border-warm)] pt-3 flex justify-between font-bold text-base">
                  <span>Total</span><span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Link to={createPageUrl('Checkout')}>
                <Button className="w-full mt-6 h-12 rounded-full bg-[var(--terracotta)] hover:bg-[var(--terracotta-dark)] text-white font-medium gap-2">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <div className="flex flex-col gap-2 mt-4 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Free delivery on orders above ₹999</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> 100% authentic artisan products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}