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
    base44.entities.Wishlist.list('-created_date').then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const handleRemove = async (item) => {
    await base44.entities.Wishlist.delete(item.id);
    setItems(prev => prev.filter(i => i.id !== item.id));
  };

  const handleMoveToCart = async (item) => {
    await base44.entities.CartItem.create({
      product_id: item.product_id,
      product_name: item.product_name,
      product_image: item.product_image,
      price: item.price,
      quantity: 1,
      artisan_name: item.artisan_name,
    });
    setMovedIds(prev => new Set([...prev, item.id]));
  };

  const handleShare = (item) => {
    const url = `${window.location.origin}${createPageUrl('ProductDetail')}?id=${item.product_id}`;
    if (navigator.share) {
      navigator.share({ title: item.product_name, url });
    } else {
      navigator.clipboard.writeText(url);
      alert('Product link copied!');
    }
  };

  return (
    <div className="bg-[var(--cream)] min-h-screen">
      {/* Header */}
      <div className="bg-[var(--warm-white)] border-b border-[var(--border-warm)]">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center gap-3 mb-1">
            <Heart className="w-6 h-6" style={{ color: 'var(--chili)' }} />
            <h1 className="font-serif text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              My Wishlist
            </h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{items.length} saved items</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[var(--border-warm)]">
                <div className="skeleton aspect-square" />
                <div className="p-4 space-y-2">
                  <div className="skeleton h-4 w-3/4 rounded" />
                  <div className="skeleton h-3 w-1/2 rounded" />
                  <div className="skeleton h-8 w-full rounded-full mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--border-warm)' }} />
            <h2 className="font-serif text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Your wishlist is empty</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Save items you love and revisit them anytime</p>
            <Link to={createPageUrl('Products')}>
              <Button className="rounded-full px-8" style={{ backgroundColor: 'var(--tamarind)', color: 'white' }}>
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Bulk actions */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                {items.filter(i => !movedIds.has(i.id)).length} items ready to order
              </p>
              <Button variant="outline" className="rounded-full text-xs border-[var(--border-warm)]"
                onClick={async () => {
                  const toMove = items.filter(i => !movedIds.has(i.id));
                  for (const item of toMove) await handleMoveToCart(item);
                }}>
                <ShoppingCart className="w-3.5 h-3.5 mr-1.5" /> Move All to Cart
              </Button>
            </div>

            <AnimatePresence>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {items.map((item, i) => (
                  <motion.div key={item.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }}>
                    <div className="bg-white rounded-2xl overflow-hidden border group transition-all duration-300 hover:shadow-xl"
                      style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
                      {/* Image */}
                      <Link to={createPageUrl('ProductDetail') + '?id=' + item.product_id} className="block relative aspect-square overflow-hidden bg-[var(--cream-dark)]">
                        <img src={item.product_image || 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&h=400&fit=crop'}
                          alt={item.product_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        {movedIds.has(item.id) && (
                          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(58,107,53,0.8)' }}>
                            <div className="text-center text-white">
                              <Package className="w-8 h-8 mx-auto mb-1" />
                              <p className="text-sm font-semibold">Added to Cart!</p>
                            </div>
                          </div>
                        )}
                        {/* Action buttons overlay */}
                        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleShare(item)}
                            className="w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                            style={{ backgroundColor: 'white', color: 'var(--text-secondary)' }}>
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleRemove(item)}
                            className="w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                            style={{ backgroundColor: 'white', color: 'var(--chili)' }}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-medium text-sm line-clamp-2 mb-0.5" style={{ color: 'var(--text-primary)' }}>
                          {item.product_name}
                        </h3>
                        {item.artisan_name && (
                          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>by {item.artisan_name}</p>
                        )}
                        <p className="font-bold text-base mb-3" style={{ color: 'var(--tamarind)' }}>
                          ₹{item.price?.toLocaleString()}
                        </p>
                        <div className="flex gap-2">
                          <Button onClick={() => handleMoveToCart(item)}
                            disabled={movedIds.has(item.id)}
                            className="flex-1 rounded-full text-xs h-9"
                            style={{ backgroundColor: movedIds.has(item.id) ? 'var(--banana-leaf)' : 'var(--tamarind)', color: 'white' }}>
                            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                            {movedIds.has(item.id) ? 'In Cart' : 'Add to Cart'}
                          </Button>
                          <Link to={createPageUrl('ProductDetail') + '?id=' + item.product_id}>
                            <Button variant="outline" className="h-9 w-9 p-0 rounded-full border-[var(--border-warm)]">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
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