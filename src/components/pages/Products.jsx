import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ALL_PRODUCTS, STATES_DATA } from '@/data/products';
import { Search, X, ArrowRight, Star, Heart, ShoppingCart, MapPin, Sparkles, Check } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { createPageUrl } from '../../utils';

const CATEGORIES = [
  { value: 'handloom', label: 'Handloom', icon: '🧵' },
  { value: 'paintings', label: 'Paintings', icon: '🎨' },
  { value: 'woodcraft', label: 'Woodcraft', icon: '🪵' },
  { value: 'metalwork', label: 'Metalwork', icon: '🔨' },
  { value: 'spices', label: 'Spices', icon: '🌶️' },
  { value: 'jewelry', label: 'Jewelry', icon: '💎' },
];

const STATES = [
  { value: 'Andhra Pradesh', color: '#D4A017' },
  { value: 'Telangana', color: '#C0392B' },
  { value: 'Tamil Nadu', color: '#2E7D32' },
  { value: 'Kerala', color: '#1565C0' },
];

const PATTERNS = [
  { type: 'hero' },
  { type: 'split', imgSide: 'left', width: '92%', align: 'flex-start', rotDir: -1, skew: -2 },
  { type: 'split', imgSide: 'right', width: '88%', align: 'flex-end', rotDir: 1, skew: 2 },
  { type: 'center', width: '75%', rotDir: -1, skew: 0 },
  { type: 'split', imgSide: 'left', width: '95%', align: 'flex-start', rotDir: 1, skew: -1 },
  { type: 'split', imgSide: 'right', width: '80%', align: 'flex-end', rotDir: -1, skew: 1 },
];

function ActionButtons({ product, styleColor }) {
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault(); e.stopPropagation();
    await base44.entities.CartItem.create({
      product_id: product.id, product_name: product.name,
      product_image: product.images?.[0] || '', price: product.price,
      quantity: 1, artisan_name: product.artisan_name,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWish = async (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!wishlisted) {
      await base44.entities.Wishlist.create({
        product_id: product.id, product_name: product.name,
        product_image: product.images?.[0] || '', price: product.price,
        artisan_name: product.artisan_name,
      });
    }
    setWishlisted(!wishlisted);
  };

  return (
    <div className="flex gap-3 mt-6">
      <button onClick={handleAdd} className="flex-1 py-3.5 rounded-full text-sm font-bold text-black flex items-center justify-center gap-2 transition hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]" style={{ background: added ? '#2E7D32' : styleColor, color: added ? '#fff' : '#000' }}>
        {added ? <><Check className="w-4 h-4" /> Added</> : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>}
      </button>
      <button onClick={handleWish} className="w-11 h-11 rounded-full flex items-center justify-center transition" style={{ background: wishlisted ? '#e53e3e' : 'rgba(255,255,255,0.1)', color: wishlisted ? '#fff' : 'rgba(255,255,255,0.5)', border: wishlisted ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
        <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
}

function HeroProduct({ product, stateColor }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [60, 0, -40]);
  const textOp = useTransform(scrollYProgress, [0.15, 0.35, 0.7, 0.9], [0, 1, 1, 0]);
  const rotX = useTransform(scrollYProgress, [0.1, 0.4, 0.8], [8, 0, -5]);

  const discount = product.original_price ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;

  return (
    <section ref={ref} className="relative overflow-hidden rounded-3xl mx-4 md:mx-8 mb-8" style={{ height: '85vh' }}>
      <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
        <motion.div className="absolute inset-0 -top-[20%]" style={{ y: bgY, scale: bgScale, willChange: 'transform' }}>
          <img src={product.images?.[0]} alt={product.name} className="w-full h-[140%] object-cover" loading="lazy" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${stateColor}CC 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.2) 100%)` }} />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10"
          style={{ y: textY, opacity: textOp, rotateX: rotX, perspective: 800, transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {discount > 0 && <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-600 text-white">-{discount}%</span>}
            {product.is_featured && <span className="px-3 py-1 text-xs font-bold rounded-full text-black" style={{ background: '#D4A017' }}>✨ Top Pick</span>}
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9]" style={{ fontFamily: 'Playfair Display, serif' }}>{product.name}</h2>
          {product.desc && <p className="text-white/50 text-sm md:text-base mt-4 max-w-xl leading-relaxed">{product.desc}</p>}
          <div className="flex items-center gap-4 mt-6">
            <span className="text-3xl md:text-4xl font-bold text-white">₹{product.price?.toLocaleString('en-IN')}</span>
            {product.original_price && <span className="text-lg text-white/30 line-through">₹{product.original_price?.toLocaleString('en-IN')}</span>}
            {product.rating && <div className="flex items-center gap-1 ml-4"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /><span className="text-amber-300 font-bold">{product.rating}</span></div>}
          </div>
          <ActionButtons product={product} styleColor="#D4A017" />
        </motion.div>
      </Link>
    </section>
  );
}

function SplitProduct({ product, pattern, stateColor }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotateY = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [pattern.rotDir * 20, pattern.rotDir * 5, 0, pattern.rotDir * -3, pattern.rotDir * -12]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [8, 2, 0, -1, -6]);
  const x = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.7, 1], [pattern.rotDir * -80, pattern.rotDir * -15, 0, pattern.rotDir * 10, pattern.rotDir * 50]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.88, 1, 1, 0.92]);
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.1]);
  const skewY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [pattern.skew, 0, 0, -pattern.skew]);

  const isRight = pattern.imgSide === 'right';
  const discount = product.original_price ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;

  return (
    <motion.section ref={ref} className="mb-6 md:mb-10" style={{ display: 'flex', justifyContent: pattern.align, perspective: 1200 }}>
      <motion.div style={{ width: pattern.width, rotateY, rotateX, x, opacity, scale, skewY, transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}>
        <div className={`flex flex-col ${isRight ? 'md:flex-row-reverse' : 'md:flex-row'} rounded-3xl overflow-hidden`} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="relative w-full md:w-3/5 overflow-hidden block" style={{ minHeight: '55vh' }}>
            <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
              <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale, willChange: 'transform' }}>
                <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </motion.div>
              <div className="absolute inset-0" style={{ background: isRight ? 'linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 60%)' : 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
              <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
                {discount > 0 && <span className="px-3 py-1 text-white text-xs font-bold rounded-full bg-red-600">-{discount}%</span>}
                {product.is_featured && <span className="px-3 py-1 text-black text-xs font-bold rounded-full flex items-center gap-1" style={{ background: '#D4A017' }}><Sparkles className="w-3 h-3" /> Top Pick</span>}
                {product.is_festival_special && <span className="px-3 py-1 text-black text-xs font-bold rounded-full" style={{ background: '#E8BB3A' }}>🎉 Festival</span>}
              </div>
            </Link>
          </div>
          <div className="w-full md:w-2/5 flex flex-col justify-center p-8 md:p-12 z-20">
            <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: stateColor }}>{product.state}</span>
                {product.village && <span className="flex items-center gap-0.5 text-white/20 text-[10px]"><MapPin className="w-2.5 h-2.5" /> {product.village}</span>}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{product.name}</h3>
              {product.artisan_name && <p className="text-white/25 text-xs mt-2">by <span className="text-white/40">{product.artisan_name}</span></p>}
              {product.desc && <p className="text-white/30 text-sm mt-4 leading-relaxed">{product.desc}</p>}
              <div className="flex items-center gap-3 mt-8">
                <span className="text-2xl md:text-3xl font-bold text-white">₹{product.price?.toLocaleString('en-IN')}</span>
                {product.original_price && <span className="text-sm text-white/20 line-through">₹{product.original_price?.toLocaleString('en-IN')}</span>}
                {product.rating && <div className="flex items-center gap-1 ml-auto px-2 py-1 rounded-full" style={{ background: 'rgba(212,160,23,0.1)' }}><Star className="w-3 h-3 fill-amber-400 text-amber-400" /><span className="text-amber-400 text-xs font-bold">{product.rating}</span></div>}
              </div>
            </Link>
            <ActionButtons product={product} styleColor="#D4A017" />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

function CenterProduct({ product, pattern, stateColor }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [15, 4, 0, -3, -10]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [pattern.rotDir * 3, pattern.rotDir * 0.5, 0, pattern.rotDir * -0.5, pattern.rotDir * -2]);
  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [60, 0, 0, -40]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1.02, 1.02, 0.9]);
  const imgY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const discount = product.original_price ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;

  return (
    <motion.section ref={ref} className="mb-6 md:mb-10 flex justify-center" style={{ perspective: 1200 }}>
      <motion.div style={{ width: pattern.width, rotateX, rotateZ, y, opacity, scale, transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}>
        <div className="rounded-3xl overflow-hidden relative" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="relative overflow-hidden block" style={{ height: '50vh' }}>
            <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
              <motion.div className="absolute inset-0" style={{ y: imgY, willChange: 'transform' }}>
                <img src={product.images?.[0]} alt={product.name} className="w-full h-[130%] object-cover" loading="lazy" />
              </motion.div>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
              <div className="absolute top-5 left-5 flex gap-2 z-10">
                {discount > 0 && <span className="px-3 py-1 text-white text-xs font-bold rounded-full bg-red-600">-{discount}%</span>}
                {product.is_featured && <span className="px-3 py-1 text-black text-xs font-bold rounded-full" style={{ background: '#D4A017' }}>✨ Top Pick</span>}
              </div>
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-2" style={{ color: stateColor }}>{product.state} · {product.village}</span>
                <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{product.name}</h3>
              </div>
            </Link>
          </div>
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4 z-20 relative">
            <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`} className="flex-1">
              {product.artisan_name && <p className="text-white/25 text-xs">by {product.artisan_name}</p>}
              {product.desc && <p className="text-white/30 text-sm mt-2 leading-relaxed max-w-lg">{product.desc}</p>}
            </Link>
            <div className="flex items-center gap-4 shrink-0">
              <div>
                <span className="text-2xl font-bold text-white">₹{product.price?.toLocaleString('en-IN')}</span>
                {product.original_price && <span className="block text-xs text-white/20 line-through">₹{product.original_price?.toLocaleString('en-IN')}</span>}
              </div>
              <ActionButtons product={product} styleColor="#D4A017" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

function ProductRenderer({ product, index, stateColor }) {
  const pattern = PATTERNS[index % PATTERNS.length];
  if (pattern.type === 'hero') return <HeroProduct product={product} stateColor={stateColor} />;
  if (pattern.type === 'center') return <CenterProduct product={product} pattern={pattern} stateColor={stateColor} />;
  return <SplitProduct product={product} pattern={pattern} stateColor={stateColor} />;
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const p = {};
    if (selectedState !== 'all') p.state = selectedState;
    if (selectedCategory !== 'all') p.category = selectedCategory;
    if (searchQuery) p.search = searchQuery;
    setSearchParams(p, { replace: true });
  }, [selectedState, selectedCategory, searchQuery]);

  useEffect(() => {
    const s = searchParams.get('state');
    const c = searchParams.get('category');
    const q = searchParams.get('search');
    if (s && s !== selectedState) setSelectedState(s);
    if (c && c !== selectedCategory) setSelectedCategory(c);
    if (q && q !== searchQuery) setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await base44.entities.Product.list('-created_date', 50);
        setProducts(data.length > 0 ? data : ALL_PRODUCTS);
      } catch { setProducts(ALL_PRODUCTS); }
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let r = [...products];
    if (searchQuery) r = r.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.village?.toLowerCase().includes(searchQuery.toLowerCase()) || p.artisan_name?.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedCategory !== 'all') r = r.filter(p => p.category === selectedCategory);
    if (selectedState !== 'all') r = r.filter(p => p.state === selectedState);
    if (searchParams.get('festival')) r = r.filter(p => p.is_festival_special);
    switch (sortBy) {
      case 'price_low': r.sort((a, b) => a.price - b.price); break;
      case 'price_high': r.sort((a, b) => b.price - a.price); break;
      case 'rating': r.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      default: break;
    }
    return r;
  }, [products, searchQuery, selectedCategory, selectedState, sortBy]);

  const stateAccent = STATES.find(s => s.value === selectedState)?.color || '#D4A017';
  const stateData = STATES_DATA.find(s => s.name === selectedState);
  const pageTitle = selectedState !== 'all' ? selectedState : selectedCategory !== 'all' ? CATEGORIES.find(c => c.value === selectedCategory)?.label || 'Collection' : 'All Crafts';

  const heroRef = useRef(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroBgY = useTransform(heroP, [0, 1], ['0%', '30%']);
  const heroTxtOp = useTransform(heroP, [0, 0.6], [1, 0]);
  const heroTxtY = useTransform(heroP, [0, 0.5], [0, -60]);

  return (
    <div className="bg-black min-h-screen text-white pb-32">

      <section ref={heroRef} className="relative h-[65vh] md:h-[75vh] overflow-hidden flex items-end">
        <motion.div className="absolute inset-0 -top-[30%]" style={{ y: heroBgY, willChange: 'transform' }}>
          <img src={stateData?.image || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&h=800&fit=crop&q=75'} alt={pageTitle} className="w-full h-[160%] object-cover" loading="eager" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: stateData ? `linear-gradient(225deg, ${stateAccent}BB 0%, rgba(0,0,0,0.92) 70%)` : 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)' }} />
        <motion.div className="relative z-10 max-w-7xl mx-auto w-full px-8 md:px-16 pb-16" style={{ opacity: heroTxtOp, y: heroTxtY }}>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block" style={{ color: stateAccent }}>{stateData?.tagline || "South India's Heritage"}</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black" style={{ fontFamily: 'Playfair Display, serif' }}>{pageTitle}</h1>
          <p className="text-white/35 text-sm mt-3">{loading ? 'Loading…' : `${filtered.length} handcrafted products`}</p>

          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search crafts, artisans, villages..." className="w-full pl-11 pr-4 py-3 min-h-[48px] rounded-full text-sm text-white placeholder-white/30 outline-none bg-white/10 border border-white/10 focus:border-white/30 focus:bg-white/15 transition focus:ring-1 focus:ring-white/20" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"><X className="w-4 h-4" /></button>}
            </div>
          </div>
        </motion.div>
      </section>

      <div className="sticky top-16 md:top-20 z-40" style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-3.5">
          <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide py-1">
            <button onClick={() => { setSelectedState('all'); setSelectedCategory('all'); }} className="shrink-0 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all" style={selectedState === 'all' && selectedCategory === 'all' ? { background: '#D4A017', color: '#000' } : { color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.06)' }}>All</button>
            {STATES.map(s => <button key={s.value} onClick={() => setSelectedState(selectedState === s.value ? 'all' : s.value)} className="shrink-0 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all" style={selectedState === s.value ? { background: s.color, color: '#fff' } : { color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.06)' }}>{s.value}</button>)}
            <div className="hidden md:block w-px h-4 mx-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            {CATEGORIES.map(c => <button key={c.value} onClick={() => setSelectedCategory(c.value === selectedCategory ? 'all' : c.value)} className="shrink-0 px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all" style={selectedCategory === c.value ? { background: 'rgba(255,255,255,0.1)', color: '#fff' } : { color: 'rgba(255,255,255,0.25)' }}>{c.icon} {c.label}</button>)}
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="ml-auto shrink-0 text-[10px] bg-transparent text-white/30 outline-none cursor-pointer px-3 py-1.5 rounded-full" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <option value="newest" style={{ background: '#111' }}>Newest</option>
              <option value="price_low" style={{ background: '#111' }}>Price ↑</option>
              <option value="price_high" style={{ background: '#111' }}>Price ↓</option>
              <option value="rating" style={{ background: '#111' }}>Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="py-10 md:py-16">
        {loading ? (
          <div className="flex flex-col items-center py-32 text-white/30">
            <div className="w-8 h-8 border-2 border-t-amber-400 border-white/10 rounded-full animate-spin" />
            <p className="mt-4 text-sm">Loading crafts…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center px-6">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>No crafts found</h3>
            <p className="text-white/30 text-sm mb-8">Try a different state, category, or search term.</p>
            <button onClick={() => { setSelectedCategory('all'); setSelectedState('all'); setSearchQuery(''); }} className="px-8 py-3 rounded-full text-sm font-bold text-black" style={{ background: '#D4A017' }}>Clear Filters</button>
          </div>
        ) : (
          <div className="max-w-8xl mx-auto overflow-hidden">
            {filtered.map((product, i) => (
              <ProductRenderer key={product.id} product={product} index={i} stateColor={stateAccent} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}