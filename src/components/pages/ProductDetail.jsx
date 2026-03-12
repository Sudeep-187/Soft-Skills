import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Heart, ShoppingCart, Star, MapPin, Truck, Shield, RotateCcw, Share2, Minus, Plus, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import FoodOrderPanel from '@/components/product/FoodOrderPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import ProductCard from '@/components/shared/ProductCard';

const demoProduct = {
  id: 'p1', name: 'Pochampally Ikat Silk Saree — Cobalt Blue & Gold', description: 'This stunning Pochampally Ikat silk saree features intricate geometric patterns woven using the resist-dyeing technique that has been practiced for over 800 years. Each saree takes approximately 15-20 days to complete, with master weavers carefully tying and dyeing each thread before weaving them together on a traditional pit loom.', short_description: 'Handwoven silk saree with traditional Ikat patterns', price: 4500, original_price: 6000, category: 'handloom', material: 'Pure Silk', images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop', 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=800&fit=crop'], artisan_name: 'Lakshmi Devi', artisan_id: '1', village: 'Pochampally', state: 'Telangana', district: 'Yadadri Bhuvanagiri', origin_story: 'The art of Pochampally Ikat weaving dates back to the 19th century. Lakshmi Devi learned this craft from her grandmother at the age of 12 and has been perfecting it for over 30 years. Her family has been part of the weaving community for five generations.', stock: 5, rating: 4.9, review_count: 127, tags: ['silk', 'ikat', 'saree', 'wedding'], is_featured: true, weight_grams: 700, dimensions: '5.5m x 1.2m', care_instructions: 'Dry clean only. Store in cotton cloth. Avoid direct sunlight.', is_festival_special: true
};

const demoReviews = [
  { id: 'r1', reviewer_name: 'Priya M.', rating: 5, comment: 'Absolutely gorgeous saree! The colors are vibrant and the silk quality is exceptional. The weaving is so intricate — you can feel the craftsmanship.', created_date: '2026-01-15' },
  { id: 'r2', reviewer_name: 'Anitha K.', rating: 5, comment: 'Bought this for my daughters engagement. Everyone complimented the saree. Worth every rupee!', created_date: '2026-01-08' },
  { id: 'r3', reviewer_name: 'Rekha S.', rating: 4, comment: 'Beautiful saree with authentic ikat patterns. Delivery was quick and packaging was excellent.', created_date: '2025-12-20' },
];

const similarProducts = [
  { id: 'p9', name: 'Dharmavaram Pattu Saree — Bridal Gold', price: 8900, original_price: 12000, category: 'handloom', images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop'], artisan_name: 'Varalakshmi W.', state: 'Andhra Pradesh', rating: 4.9 },
  { id: 'p3', name: 'Kalamkari Dupatta — Tree of Life', price: 2800, original_price: 3500, category: 'paintings', images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop'], artisan_name: 'Padmavathi B.', state: 'Andhra Pradesh', rating: 4.9 },
  { id: 'p10', name: 'Cheriyal Scroll Painting', price: 3200, original_price: 4000, category: 'paintings', images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop'], artisan_name: 'Nageshwar D.', state: 'Telangana', rating: 4.8 },
  { id: 'p11', name: 'Silver Filigree Jhumkas', price: 1800, original_price: 2200, category: 'jewelry', images: ['https://images.unsplash.com/photo-1515562141589-67f0d4c68dab?w=400&h=400&fit=crop'], artisan_name: 'Sita Devi', state: 'Telangana', rating: 4.7 },
];

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(demoReviews);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (productId && !productId.startsWith('p')) {
        try {
          const data = await base44.entities.Product.filter({ id: productId });
          if (data.length) { setProduct(data[0]); setLoading(false); return; }
        } catch {}
      }
      setProduct(demoProduct);
      setLoading(false);
    };
    load();
  }, [productId]);

  const handleAddToCart = async () => {
    await base44.entities.CartItem.create({
      product_id: product.id,
      product_name: product.name,
      product_image: product.images?.[0] || '',
      price: product.price,
      quantity,
      artisan_name: product.artisan_name,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="aspect-square skeleton rounded-2xl" />
          <div className="space-y-4">
            <div className="h-4 w-32 skeleton" />
            <div className="h-8 w-full skeleton" />
            <div className="h-6 w-48 skeleton" />
            <div className="h-20 w-full skeleton" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;
  const discount = product.original_price ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;
  const images = product.images?.length > 0 ? product.images : [demoProduct.images[0]];

  return (
    <div className="bg-[var(--cream)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-6">
          <Link to={createPageUrl('Home')} className="hover:text-[var(--terracotta)]">Home</Link>
          <span>/</span>
          <Link to={createPageUrl('Products')} className="hover:text-[var(--terracotta)]">Products</Link>
          <span>/</span>
          <span className="text-[var(--text-primary)]">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--border-warm)]/50 cursor-zoom-in" onClick={() => setZoomed(!zoomed)}>
              <img
                src={images[selectedImage]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${zoomed ? 'scale-150' : ''}`}
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-[var(--terracotta)] text-white">{discount}% Off</Badge>
              )}
              <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center">
                <ZoomIn className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
              {images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedImage((p) => (p - 1 + images.length) % images.length); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedImage((p) => (p + 1) % images.length); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition ${i === selectedImage ? 'border-[var(--terracotta)]' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.category && <Badge variant="outline" className="text-xs capitalize border-[var(--border-warm)]">{product.category.replace(/_/g, ' ')}</Badge>}
              {product.is_festival_special && <Badge className="bg-[var(--mustard)] text-white text-xs">🎉 Festival Special</Badge>}
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-snug">{product.name}</h1>

            {product.artisan_name && (
              <Link to={createPageUrl('ArtisanProfile') + '?id=' + (product.artisan_id || '')} className="inline-flex items-center gap-2 mt-2 text-sm text-[var(--terracotta)] hover:underline">
                by {product.artisan_name}
                {product.village && <span className="text-[var(--text-muted)] flex items-center gap-1"><MapPin className="w-3 h-3" />{product.village}, {product.state}</span>}
              </Link>
            )}

            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating || 0) ? 'fill-[var(--mustard)] text-[var(--mustard)]' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-[var(--text-muted)]">({product.review_count || 0} reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-6 p-5 rounded-xl bg-white border border-[var(--border-warm)]/50">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[var(--text-primary)]">₹{product.price?.toLocaleString()}</span>
                {product.original_price && (
                  <>
                    <span className="text-lg text-[var(--text-muted)] line-through">₹{product.original_price?.toLocaleString()}</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">Save ₹{(product.original_price - product.price).toLocaleString()}</Badge>
                  </>
                )}
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1">Inclusive of all taxes</p>
            </div>

            {/* Food items: full food ordering panel */}
            {(product.category === 'spices' || product.category === 'organic_food' || product.is_perishable) ? (
              <FoodOrderPanel product={product} />
            ) : (
              <>
                {/* Regular: Quantity + Actions */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-[var(--text-primary)]">Quantity:</span>
                    <div className="flex items-center gap-0 border border-[var(--border-warm)] rounded-full overflow-hidden">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-[var(--cream-dark)] transition"><Minus className="w-4 h-4" /></button>
                      <span className="px-4 py-2 text-sm font-medium border-x border-[var(--border-warm)]">{quantity}</span>
                      <button onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))} className="px-3 py-2 hover:bg-[var(--cream-dark)] transition"><Plus className="w-4 h-4" /></button>
                    </div>
                    <span className="text-xs text-[var(--text-muted)]">{product.stock || 0} in stock</span>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleAddToCart}
                      className="flex-1 h-12 rounded-full bg-[var(--terracotta)] hover:bg-[var(--terracotta-dark)] text-white font-medium gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                    </Button>
                    <button
                      onClick={() => setWishlisted(!wishlisted)}
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition ${wishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'border-[var(--border-warm)] text-[var(--text-secondary)] hover:border-red-200'}`}
                    >
                      <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
                    </button>
                    <button className="w-12 h-12 rounded-full border border-[var(--border-warm)] text-[var(--text-secondary)] hover:bg-[var(--cream-dark)] flex items-center justify-center transition">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {/* Delivery check */}
                <div className="mt-6 p-4 rounded-xl bg-[var(--cream-dark)] border border-[var(--border-warm)]/50">
                  <div className="flex gap-3">
                    <input
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter pincode for delivery estimate"
                      maxLength={6}
                      className="flex-1 px-4 py-2 rounded-full border border-[var(--border-warm)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]/20"
                    />
                    <Button variant="outline" className="rounded-full border-[var(--terracotta)] text-[var(--terracotta)]">Check</Button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4 text-xs text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-[var(--forest)]" /> Delivery in {product.delivery_days_min || 3}–{product.delivery_days_max || 7} days</span>
                    <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-[var(--forest)]" /> Authentic guarantee</span>
                    <span className="flex items-center gap-1.5"><RotateCcw className="w-4 h-4 text-[var(--forest)]" /> 7-day returns</span>
                  </div>
                </div>
              </>
            )}

            {/* Artisan story */}
            {product.origin_story && (
              <div className="mt-6 p-5 rounded-xl bg-white border border-[var(--border-warm)]/50">
                <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] mb-2">Artisan's Story</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{product.origin_story}</p>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mt-12">
          <TabsList className="bg-[var(--cream-dark)] border border-[var(--border-warm)]/50">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-6">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{product.description}</p>
              {product.care_instructions && (
                <div className="mt-4 p-4 rounded-xl bg-[var(--cream)]">
                  <h4 className="font-semibold text-sm mb-1">Care Instructions</h4>
                  <p className="text-sm text-[var(--text-muted)]">{product.care_instructions}</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6 space-y-4">
            {reviews.map(r => (
              <div key={r.id} className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-sm">{r.reviewer_name}</span>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map(s => <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'fill-[var(--mustard)] text-[var(--mustard)]' : 'text-gray-300'}`} />)}
                    </div>
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">{r.created_date}</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="details" className="mt-6">
            <div className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-6 grid grid-cols-2 gap-4 text-sm">
              {product.material && <div><span className="text-[var(--text-muted)]">Material</span><p className="font-medium mt-0.5">{product.material}</p></div>}
              {product.weight_grams && <div><span className="text-[var(--text-muted)]">Weight</span><p className="font-medium mt-0.5">{product.weight_grams}g</p></div>}
              {product.dimensions && <div><span className="text-[var(--text-muted)]">Dimensions</span><p className="font-medium mt-0.5">{product.dimensions}</p></div>}
              {product.state && <div><span className="text-[var(--text-muted)]">Origin</span><p className="font-medium mt-0.5">{product.village}, {product.state}</p></div>}
            </div>
          </TabsContent>
        </Tabs>

        {/* Similar products */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {similarProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      </div>
    </div>
  );
}