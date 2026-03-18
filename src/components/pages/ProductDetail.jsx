import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Heart, ShoppingCart, Star, MapPin, Truck, Shield, RotateCcw, Share2, Minus, Plus, ChevronLeft, ChevronRight, ZoomIn, Check, Send } from 'lucide-react';
import FoodOrderPanel from '@/components/product/FoodOrderPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import ProductCard from '@/components/shared/ProductCard';
import { ALL_PRODUCTS } from '@/data/products';

const demoReviews = [
  { id: 'r1', reviewer_name: 'Priya M.', rating: 5, comment: 'Absolutely gorgeous! The colors are vibrant and the quality is exceptional. You can feel the craftsmanship in every detail.', created_date: '2026-01-15' },
  { id: 'r2', reviewer_name: 'Anitha K.', rating: 5, comment: 'Bought this for a special occasion. Everyone complimented it. Worth every rupee!', created_date: '2026-01-08' },
];

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(demoReviews);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const load = async () => {
      const staticProduct = ALL_PRODUCTS.find(p => p.id === productId);
      if (staticProduct) { setProduct(staticProduct); setLoading(false); return; }
      if (productId) {
        try {
          const data = await base44.entities.Product.filter({ id: productId });
          if (data.length) { setProduct(data[0]); setLoading(false); return; }
        } catch {}
      }
      setProduct(ALL_PRODUCTS[0]);
      setLoading(false);
    };
    load();
    base44.entities.Review.list().then(apiReviews => {
      const productReviews = apiReviews.filter(r => r.product_id === productId);
      if (productReviews.length > 0) setReviews([...productReviews, ...demoReviews]);
    }).catch(() => {});
  }, [productId]);

  const handleAddToCart = async () => {
    await base44.entities.CartItem.create({
      product_id: product.id, product_name: product.name,
      product_image: product.images?.[0] || '', price: product.price,
      quantity, artisan_name: product.artisan_name,
    });
    setAddedToCart(true); setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleWishlist = async () => {
    if (!wishlisted) {
      await base44.entities.Wishlist.create({
        product_id: product.id, product_name: product.name,
        product_image: product.images?.[0] || '', price: product.price, artisan_name: product.artisan_name,
      });
    }
    setWishlisted(!wishlisted);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    const newReview = { product_id: productId, reviewer_name: reviewName || 'Anonymous', rating: reviewRating, comment: reviewComment, created_date: new Date().toISOString().split('T')[0] };
    await base44.entities.Review.create(newReview);
    setReviews(prev => [{ id: Date.now().toString(), ...newReview }, ...prev]);
    setReviewSubmitted(true); setReviewComment(''); setReviewName(''); setReviewRating(5);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 bg-black min-h-screen">
        <div className="grid md:grid-cols-2 gap-10 pt-20">
          <div className="aspect-square bg-zinc-900 animate-pulse rounded-2xl" />
          <div className="space-y-4">
            <div className="h-4 w-32 bg-zinc-900 animate-pulse rounded" />
            <div className="h-8 w-full bg-zinc-900 animate-pulse rounded" />
            <div className="h-20 w-full bg-zinc-900 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;
  const discount = product.original_price ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;
  const images = product.images?.length > 0 ? product.images : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=800&fit=crop'];
  const similarProducts = ALL_PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.state === product.state)).slice(0, 4);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#D4A017] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest mb-8 pt-20 text-white/40">
          <Link to={createPageUrl('Home')} className="hover:text-[#D4A017] transition">Home</Link><span>/</span>
          <Link to={createPageUrl('Products')} className="hover:text-[#D4A017] transition">Products</Link><span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-14">
          <div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-900 cursor-zoom-in border border-white/10 group" onClick={() => setZoomed(!zoomed)}>
              <img src={images[selectedImage]} alt={product.name} className={`w-full h-full object-cover transition-transform duration-700 ${zoomed ? 'scale-150' : 'group-hover:scale-105'}`} />
              {discount > 0 && <Badge className="absolute top-5 left-5 bg-[#D4A017] text-black font-bold uppercase tracking-widest text-[10px] px-3 py-1">{discount}% Off</Badge>}
              <button className="absolute top-5 right-5 w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition opacity-0 group-hover:opacity-100"><ZoomIn className="w-5 h-5" /></button>
              {images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedImage((p) => (p - 1 + images.length) % images.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition opacity-0 group-hover:opacity-100 hover:scale-110"><ChevronLeft className="w-6 h-6" /></button>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedImage((p) => (p + 1) % images.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition opacity-0 group-hover:opacity-100 hover:scale-110"><ChevronRight className="w-6 h-6" /></button>
                </>
              )}
            </div>
            <div className="flex gap-4 mt-6 overflow-x-auto pb-4 custom-scrollbar">
              {images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all duration-300 ${i === selectedImage ? 'border-[#D4A017] scale-105 shadow-[0_0_15px_rgba(212,160,23,0.3)]' : 'border-transparent opacity-50 hover:opacity-100 hover:border-white/20'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              {product.category && <Badge className="text-[10px] uppercase font-bold tracking-widest bg-white/5 text-white/70 border border-white/10 hover:bg-white/10">{product.category.replace(/_/g, ' ')}</Badge>}
              {product.is_festival_special && <Badge className="text-[10px] uppercase font-bold tracking-widest bg-[#D4A017]/20 text-[#D4A017] border border-[#D4A017]/30">Festival Special</Badge>}
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-white mb-4">{product.name}</h1>

            {product.artisan_name && (
              <div className="inline-flex items-center gap-3 text-sm font-bold text-[#D4A017]">
                Master Artisan: {product.artisan_name}
                {product.village && <span className="flex items-center gap-1.5 text-white/40 font-normal"><MapPin className="w-3.5 h-3.5" />{product.village}, {product.state}</span>}
              </div>
            )}

            <div className="flex items-center gap-3 mt-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating || 0) ? 'fill-[#D4A017] text-[#D4A017]' : 'text-white/10'}`} />)}
              </div>
              <span className="text-sm font-bold text-white/90">{product.rating}</span>
              <span className="text-sm text-white/40">({reviews.length} verifies reviews)</span>
            </div>

            <div className="mt-8 mb-8">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-white">₹{product.price?.toLocaleString()}</span>
                {product.original_price && (
                  <>
                    <span className="text-xl line-through text-white/30">₹{product.original_price?.toLocaleString()}</span>
                    <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] uppercase tracking-wider font-bold">Save ₹{(product.original_price - product.price).toLocaleString()}</Badge>
                  </>
                )}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#D4A017]/60 mt-3 font-bold">Taxes Included • Free Shipping</p>
            </div>

            {(product.category === 'spices' || product.category === 'organic_food' || product.is_perishable) ? (
              <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10">
                <FoodOrderPanel product={product} />
              </div>
            ) : (
              <>
                <div className="mt-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">Quantity</span>
                    <div className="flex items-center gap-0 border border-white/10 rounded-full bg-zinc-900">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-white/5 transition text-white"><Minus className="w-4 h-4" /></button>
                      <span className="px-6 py-3 text-sm font-bold border-x border-white/10 text-white min-w-[3rem] text-center">{quantity}</span>
                      <button onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))} className="px-4 py-3 hover:bg-white/5 transition text-white"><Plus className="w-4 h-4" /></button>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#D4A017]/60">{product.stock || 5} pieces strictly left</span>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={handleAddToCart} className="flex-1 h-16 rounded-full font-bold gap-3 text-base transition-all text-black hover:scale-[1.02]" style={{ backgroundColor: addedToCart ? '#A3E635' : '#D4A017' }}>
                      {addedToCart ? <><Check className="w-5 h-5" /> Added to Cart!</> : <><ShoppingCart className="w-5 h-5" /> Secure Mine</>}
                    </Button>
                    <button onClick={handleWishlist} className={`w-16 h-16 rounded-full border flex items-center justify-center transition hover:scale-[1.05] ${wishlisted ? 'border-red-500/50 bg-red-500/10 text-red-500' : 'border-white/20 bg-zinc-900 text-white/50 hover:bg-white/5 hover:border-white/30'}`}>
                      <Heart className={`w-6 h-6 ${wishlisted ? 'fill-current' : ''}`} />
                    </button>
                    <button className="w-16 h-16 rounded-full border border-white/20 bg-zinc-900 text-white/50 flex items-center justify-center transition hover:scale-[1.05] hover:bg-white/5 hover:border-white/30"><Share2 className="w-6 h-6" /></button>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-3xl bg-zinc-900 border border-white/10">
                  <div className="flex gap-3">
                    <input value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Delivery pincode" maxLength={6} className="flex-1 px-6 py-3 rounded-full bg-black border border-white/10 text-sm text-white focus:outline-none focus:border-[#D4A017] transition" />
                    <Button variant="outline" className="rounded-full px-8 bg-transparent border-[#D4A017]/50 text-[#D4A017] hover:bg-[#D4A017]/10 hover:text-[#D4A017]">Check availability</Button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 mt-6 pt-6 border-t border-white/5 text-[10px] uppercase font-bold tracking-wider text-white/40">
                    <span className="flex items-center gap-2 text-white/60"><Truck className="w-4 h-4 text-[#D4A017]" /> Ships in 3–7 days</span>
                    <span className="flex items-center gap-2 text-white/60"><Shield className="w-4 h-4 text-[#D4A017]" /> Authentic certified</span>
                    <span className="flex items-center gap-2 text-white/60"><RotateCcw className="w-4 h-4 text-[#D4A017]" /> Returns accepted</span>
                  </div>
                </div>
              </>
            )}

            {(product.origin_story || product.desc) && (
              <div className="mt-8 p-8 rounded-3xl bg-[#D4A017]/5 border border-[#D4A017]/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#D4A017]" />
                <h3 className="font-serif text-xl font-bold mb-3 text-white">The Artisan's Tale</h3>
                <p className="text-sm leading-relaxed text-white/70">{product.origin_story || product.desc}</p>
              </div>
            )}
          </div>
        </div>

        <Tabs defaultValue="reviews" className="mt-20">
          <TabsList className="bg-zinc-900 border border-white/10 rounded-full h-14 p-1">
            <TabsTrigger value="description" className="rounded-full data-[state=active]:bg-[#D4A017] data-[state=active]:text-black text-white/50 px-8 text-sm font-bold uppercase tracking-wider">Provenance</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-full data-[state=active]:bg-[#D4A017] data-[state=active]:text-black text-white/50 px-8 text-sm font-bold uppercase tracking-wider">Chronicles ({reviews.length})</TabsTrigger>
            <TabsTrigger value="details" className="rounded-full data-[state=active]:bg-[#D4A017] data-[state=active]:text-black text-white/50 px-8 text-sm font-bold uppercase tracking-wider">Specifications</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-8">
            <div className="bg-zinc-900 rounded-3xl p-8 md:p-12 border border-white/5">
              <p className="leading-loose text-white/70 text-lg max-w-4xl">{product.description || product.desc || 'Every thread spun, every stroke brushed, every chisel marking speaks of a lineage of masters passing down their legacy to the next generation.'}</p>
              {product.care_instructions && (
                <div className="mt-10 p-8 rounded-3xl bg-black border border-white/10 max-w-4xl">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-[#D4A017] mb-3">Upkeep Instructions</h4>
                  <p className="text-white/60 leading-relaxed">{product.care_instructions}</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5 relative">
              <div className="sticky top-32 bg-zinc-900 rounded-3xl p-8 border border-white/5">
                <h3 className="font-serif text-3xl font-bold mb-6 text-white">Inscribe your experience</h3>
                {reviewSubmitted ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4 p-6 rounded-2xl bg-[#D4A017]/10 border border-[#D4A017]/30">
                    <Check className="w-6 h-6 text-[#D4A017] shrink-0" />
                    <span className="text-sm font-bold text-white leading-relaxed">Your testament is written. Thank you for enriching the chronicle.</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-6">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-white/30 block mb-3">Rating</label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(s => (
                          <button key={s} type="button" onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} onClick={() => setReviewRating(s)} className="p-1 transition-transform hover:scale-110">
                            <Star className={`w-8 h-8 transition-colors ${s <= (hoverRating || reviewRating) ? 'fill-[#D4A017] text-[#D4A017]' : 'text-white/10'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-white/30 block mb-3">Name</label>
                      <input value={reviewName} onChange={e => setReviewName(e.target.value)} placeholder="How shall we address you?" className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 text-sm focus:outline-none focus:border-[#D4A017] text-white transition placeholder-white/20" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-white/30 block mb-3">Testament *</label>
                      <textarea value={reviewComment} onChange={e => setReviewComment(e.target.value)} placeholder="What did you feel when you beheld the craft?" rows={5} required className="w-full px-5 py-4 rounded-xl bg-black border border-white/10 text-sm focus:outline-none focus:border-[#D4A017] text-white transition resize-none placeholder-white/20" />
                    </div>
                    <Button type="submit" className="w-full h-14 rounded-xl gap-2 font-bold text-black text-sm bg-[#D4A017] hover:bg-[#E8BB3A] transition">
                      Seal & Submit <Send className="w-4 h-4" />
                    </Button>
                  </form>
                )}
              </div>
            </div>
            <div className="md:col-span-7 space-y-6">
              {reviews.map((r, i) => (
                <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-zinc-900 rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 text-[6rem] font-serif leading-none italic group-hover:opacity-20 transition-opacity">"</div>
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <span className="font-bold text-lg text-white block mb-2">{r.reviewer_name}</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= r.rating ? 'fill-[#D4A017] text-[#D4A017]' : 'text-white/10'}`} />)}
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/30">{r.created_date}</span>
                  </div>
                  <p className="text-white/60 mt-6 leading-relaxed relative z-10">{r.comment}</p>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="mt-8">
            <div className="bg-zinc-900 rounded-3xl p-8 md:p-12 border border-white/5 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-y-8 gap-x-12">
                {product.material && <div className="border-b border-white/10 pb-4"><span className="text-[10px] uppercase tracking-widest font-bold text-[#D4A017]/70 block mb-2">Purity & Material</span><p className="font-bold text-lg text-white">{product.material}</p></div>}
                {product.weight_grams && <div className="border-b border-white/10 pb-4"><span className="text-[10px] uppercase tracking-widest font-bold text-[#D4A017]/70 block mb-2">Mass</span><p className="font-bold text-lg text-white">{product.weight_grams}g</p></div>}
                {product.dimensions && <div className="border-b border-white/10 pb-4"><span className="text-[10px] uppercase tracking-widest font-bold text-[#D4A017]/70 block mb-2">Proportions</span><p className="font-bold text-lg text-white">{product.dimensions}</p></div>}
                {product.state && <div className="border-b border-white/10 pb-4"><span className="text-[10px] uppercase tracking-widest font-bold text-[#D4A017]/70 block mb-2">Lands of Make</span><p className="font-bold text-lg text-white">{product.village}, {product.state}</p></div>}
                {product.category && <div className="border-b border-white/10 pb-4"><span className="text-[10px] uppercase tracking-widest font-bold text-[#D4A017]/70 block mb-2">Artifact Class</span><p className="font-bold text-lg text-white capitalize">{product.category.replace(/_/g, ' ')}</p></div>}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {similarProducts.length > 0 && (
          <section className="mt-32 mb-16 border-t border-white/10 pt-20">
            <div className="text-center mb-12">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#D4A017] block mb-4">Discover Similar</span>
              <h2 className="font-serif text-4xl font-bold text-white">Worthy Companions</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}