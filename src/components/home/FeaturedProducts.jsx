import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { base44 } from '@/api/base44Client';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '@/components/shared/ProductCard';
import SkeletonCard from '@/components/shared/SkeletonCard';
import { motion, useScroll, useTransform } from 'framer-motion';

// Re-export from centralized data
export { ALL_PRODUCTS } from '@/data/products';
import { ALL_PRODUCTS } from '@/data/products';

export default function FeaturedProducts({ title = 'Trending Crafts', subtitle = 'Handpicked for You', festival = false }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yEven = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const yOdd = useTransform(scrollYProgress, [0, 1], [80, -80]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await base44.entities.Product.list('-created_date', 24);
        let pool = data.length > 0 ? data : ALL_PRODUCTS;
        if (festival) pool = ALL_PRODUCTS.filter(p => p.is_festival_special);
        else pool = ALL_PRODUCTS.filter(p => p.is_featured);
        setProducts(pool.slice(0, 8));
      } catch {
        const pool = festival
          ? ALL_PRODUCTS.filter(p => p.is_festival_special)
          : ALL_PRODUCTS.filter(p => p.is_featured);
        setProducts(pool.slice(0, 8));
      }
      setLoading(false);
    };
    load();
  }, [festival]);

  return (
    <section ref={containerRef} className="py-20 md:py-32 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 flex items-center gap-1.5">
              {festival && <Sparkles className="w-4 h-4" />}{subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h2>
          </motion.div>
          <Link
            to={festival ? `${createPageUrl('Products')}?festival=true` : createPageUrl('Products')}
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold shrink-0 px-5 py-2.5 rounded-full text-amber-400 hover:text-amber-300 transition"
            style={{ border: '1px solid rgba(212,160,23,0.3)' }}
          >
            Explore Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
          style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}>
          {loading
            ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : products.map((p, i) => (
              <motion.div key={p.id} style={{ y: i % 2 === 0 ? yEven : yOdd, willChange: 'transform' }}>
                <ProductCard product={p} index={i} />
              </motion.div>
            ))
          }
        </div>

        <div className="md:hidden text-center mt-8">
          <Link to={festival ? `${createPageUrl('Products')}?festival=true` : createPageUrl('Products')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-black"
            style={{ background: '#D4A017' }}>
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}