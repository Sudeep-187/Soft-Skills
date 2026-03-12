import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Package, Palette, Brush } from 'lucide-react';

const reviewTabs = ['App Reviews', 'Product Reviews', 'Artisan Reviews', 'Design Reviews'];

const allReviews = {
  'App Reviews': [
    { name: 'Kavitha R.', city: 'Bangalore', rating: 5, text: 'Finally an app that connects me to real artisans! The story behind each product is so moving. Ordered 5 sarees already.', date: 'Feb 2026', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=60&h=60&fit=crop' },
    { name: 'Arun S.', city: 'Mumbai', rating: 5, text: 'Gifted my mother a Pootharekulu box. She cried. Said it tasted exactly like her village. This is not just commerce — it\'s memory.', date: 'Jan 2026', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
    { name: 'Meera P.', city: 'Delhi', rating: 4, text: 'Beautiful curation. Delivery was fast, packaging eco-friendly. Would love more Telangana products.', date: 'Jan 2026', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop' },
  ],
  'Product Reviews': [
    { name: 'Sujata M.', city: 'Hyderabad', rating: 5, text: 'The Pochampally saree quality is extraordinary. You can feel 30 years of skill in every thread. Absolutely worth it.', date: 'Feb 2026', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop', product: 'Pochampally Ikat Saree' },
    { name: 'Vijay K.', city: 'Chennai', rating: 5, text: 'Gongura pickle is FIRE. Literally. My Hyderabadi colleague said this is the real deal — from the source. Reordering monthly.', date: 'Jan 2026', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop', product: 'Gongura Pickle' },
    { name: 'Ananya T.', city: 'Pune', rating: 5, text: 'The Kalamkari dupatta exceeded all expectations. Colors so vibrant, fabric so soft. Unique and truly handmade.', date: 'Dec 2025', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=60&h=60&fit=crop', product: 'Kalamkari Dupatta' },
  ],
  'Artisan Reviews': [
    { name: 'Priya A.', city: 'Bengaluru', rating: 5, text: 'Lakshmi Devi\'s sarees come with a personal note. She hand-wrote my name on the card. I felt such a human connection.', date: 'Feb 2026', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop', artisan: 'Lakshmi Devi' },
    { name: 'Rohit V.', city: 'Kolkata', rating: 5, text: 'Raju\'s lacquer toys are exquisite. My daughter won\'t let go of her peacock set. The artistry is museum-level.', date: 'Jan 2026', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop', artisan: 'Raju Kummara' },
    { name: 'Deepa C.', city: 'Coimbatore', rating: 5, text: 'Padmavathi\'s Kalamkari paintings — I literally tracked her process on Instagram for 3 weeks watching her paint mine.', date: 'Dec 2025', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop', artisan: 'Padmavathi B.' },
  ],
  'Design Reviews': [
    { name: 'Ishaan K.', city: 'Gurgaon', rating: 5, text: 'Most beautiful e-commerce app I\'ve seen for Indian crafts. The warm palette, the photography, the story cards — all perfect.', date: 'Feb 2026', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop' },
    { name: 'Shreya N.', city: 'Ahmedabad', rating: 5, text: 'The clay-pot style food cards are genius. Felt like I was at a village mela. Design is immersive and so culturally rooted.', date: 'Jan 2026', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop' },
    { name: 'Kiran R.', city: 'Hyderabad', rating: 4, text: 'Love the handwritten font for the food section. The origin story feature is what sets this apart from every other app.', date: 'Jan 2026', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=60&h=60&fit=crop' },
  ],
};

const tabIcons = [ThumbsUp, Package, Brush, Palette];

export default function ReviewsSection() {
  const [activeTab, setActiveTab] = useState('App Reviews');
  const reviews = allReviews[activeTab];

  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--warm-white)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--chili)' }}>What People Say</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Reviews & Ratings
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-current" style={{ color: 'var(--mustard)' }} />)}
            <span className="font-bold text-lg ml-1" style={{ color: 'var(--text-primary)' }}>{avg}</span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>from thousands of happy customers</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {reviewTabs.map((tab, i) => {
            const Icon = tabIcons[i];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: activeTab === tab ? 'var(--chili)' : 'var(--cream-dark)',
                  color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                }}
              >
                <Icon className="w-4 h-4" /> {tab}
              </button>
            );
          })}
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border shadow-sm"
              style={{ borderColor: 'var(--border-warm)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={r.avatar} alt={r.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{r.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{r.city} · {r.date}</p>
                </div>
              </div>
              {(r.product || r.artisan) && (
                <p className="text-xs mb-2 px-2 py-1 rounded-full inline-block font-medium"
                  style={{ backgroundColor: 'var(--cream-dark)', color: 'var(--tamarind)' }}>
                  {r.product || r.artisan}
                </p>
              )}
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-current" style={{ color: 'var(--mustard)' }} />)}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}