import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Play, ThumbsUp, Camera } from 'lucide-react';

const TABS = ['Customer Reviews', 'Maker Reviews', 'Artisan Background'];

const customerReviews = [
  { id: 1, name: 'Geeta Prasad', city: 'Bangalore', rating: 5, date: 'Jan 12, 2026', text: 'The Ikat saree is even more beautiful in person. You can feel the hours of work that went into each thread. Will definitely order again!', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=60&h=60&fit=crop', video: true, helpful: 42 },
  { id: 2, name: 'Arun Mehta', city: 'Mumbai', rating: 5, date: 'Dec 28, 2025', text: 'Gifted this to my mother for her birthday — she cried. The craftsmanship is extraordinary. Packaging was also beautiful with the handwritten story card.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop', helpful: 31 },
  { id: 3, name: 'Priya Nair', city: 'Chennai', rating: 4, date: 'Nov 15, 2025', text: 'Lovely texture and authentic feel. Delivery took a bit longer than expected but the quality made it worth the wait. Would recommend.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop', helpful: 18 },
];

const makerReviews = [
  { id: 1, name: 'Sunitha Cooperative', city: 'Warangal', rating: 5, date: 'Feb 1, 2026', text: 'Lakshmi Devi is an inspiration. Her cooperative model has uplifted 50+ women. Her techniques are authentic and she always delivers on time.', verified: true, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop', helpful: 28 },
  { id: 2, name: 'AP Handicrafts Board', city: 'Vijayawada', rating: 5, date: 'Jan 5, 2026', text: 'One of our top-rated artisan partners. Products are consistently certified authentic. Zero complaints in 3 years of collaboration.', verified: true, avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop', helpful: 55 },
];

const background = {
  education: 'Learned Ikat weaving from her grandmother at age 8. Trained by Craft Council of AP in 2001.',
  certifications: ['GI Tag Certified — Pochampally Ikat', 'Fair Trade Verified', 'Craft Mark by Ministry of Textiles'],
  languages: ['Telugu', 'Hindi', 'Basic English'],
  trainedArtisans: 52,
  community: 'Runs the "Pochampally Women Weavers Cooperative" — 50+ active members, self-sufficient in production.',
  philosophy: '"Every thread I weave carries the prayers of my grandmother. I weave to keep her alive."',
};

function StarRow({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className="w-3.5 h-3.5" style={{ color: s <= rating ? 'var(--turmeric)' : 'var(--border-warm)', fill: s <= rating ? 'var(--turmeric)' : 'transparent' }} />
      ))}
    </div>
  );
}

function ReviewCard({ review, showVerified = false }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="bg-white rounded-2xl p-5 border" style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
      <div className="flex items-start gap-3 mb-3">
        <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{review.name}</p>
            {showVerified && review.verified && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: 'var(--banana-leaf)' }}>
                <CheckCircle className="w-3 h-3" /> Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <StarRow rating={review.rating} />
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{review.date} · {review.city}</span>
          </div>
        </div>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{review.text}</p>

      {review.video && (
        <div className="mt-3 relative w-32 h-20 rounded-xl overflow-hidden cursor-pointer group">
          <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&h=140&fit=crop" alt="unboxing" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(44,26,14,0.45)' }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--chili)' }}>
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
          </div>
          <span className="absolute bottom-1 left-1 text-[10px] text-white font-bold">Unboxing</span>
        </div>
      )}

      <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid var(--border-warm)' }}>
        <button onClick={() => { if (!voted) { setHelpful(h => h + 1); setVoted(true); } }}
          className="flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: voted ? 'var(--banana-leaf)' : 'var(--text-muted)' }}>
          <ThumbsUp className="w-3.5 h-3.5" /> Helpful ({helpful})
        </button>
      </div>
    </motion.div>
  );
}

export default function ArtisanReviews({ artisan }) {
  const [activeTab, setActiveTab] = useState('Customer Reviews');

  const avgRating = (customerReviews.reduce((a, r) => a + r.rating, 0) / customerReviews.length).toFixed(1);

  return (
    <div className="mt-10 mb-10">
      {/* Rating summary */}
      <div className="flex items-center gap-6 mb-6 p-5 rounded-2xl bg-white border" style={{ borderColor: 'var(--border-warm)' }}>
        <div className="text-center">
          <div className="font-serif text-5xl font-bold" style={{ color: 'var(--tamarind)' }}>{avgRating}</div>
          <StarRow rating={Math.round(avgRating)} />
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{customerReviews.length + makerReviews.length} reviews</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5,4,3,2,1].map(star => {
            const count = customerReviews.filter(r => r.rating === star).length;
            const pct = Math.round((count / customerReviews.length) * 100);
            return (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span style={{ color: 'var(--text-muted)' }}>{star}★</span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--cream-dark)' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: 'var(--turmeric)' }} />
                </div>
                <span style={{ color: 'var(--text-muted)' }}>{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b mb-6" style={{ borderColor: 'var(--border-warm)' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="pb-3 px-1 text-sm font-semibold transition-all relative"
            style={{ color: activeTab === tab ? 'var(--tamarind)' : 'var(--text-muted)' }}>
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: 'var(--turmeric)' }} />
            )}
          </button>
        ))}
      </div>

      {/* Customer Reviews */}
      {activeTab === 'Customer Reviews' && (
        <div className="space-y-4">
          {customerReviews.map(r => <ReviewCard key={r.id} review={r} />)}
          <div className="p-5 rounded-2xl border-2 border-dashed text-center" style={{ borderColor: 'var(--border-warm)' }}>
            <Camera className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Share your unboxing video</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Upload a short video review and earn 50 reward points</p>
            <button className="mt-3 btn-primary text-sm">Upload Video Review</button>
          </div>
        </div>
      )}

      {/* Maker Reviews */}
      {activeTab === 'Maker Reviews' && (
        <div className="space-y-4">
          <p className="text-xs px-3 py-2 rounded-lg mb-2" style={{ backgroundColor: 'rgba(58,107,53,0.08)', color: 'var(--banana-leaf)' }}>
            ✅ Maker Reviews are submitted by verified craft organizations, cooperatives, and government bodies.
          </p>
          {makerReviews.map(r => <ReviewCard key={r.id} review={r} showVerified />)}
        </div>
      )}

      {/* Artisan Background */}
      {activeTab === 'Artisan Background' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: 'var(--border-warm)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Education & Training</h4>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{background.education}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: 'var(--border-warm)' }}>
            <h4 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Certifications</h4>
            <div className="flex flex-wrap gap-2">
              {background.certifications.map(c => (
                <span key={c} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: 'rgba(58,107,53,0.1)', color: 'var(--banana-leaf)' }}>
                  <CheckCircle className="w-3.5 h-3.5" /> {c}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: 'var(--border-warm)' }}>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Community Impact</h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{background.community}</p>
              <p className="mt-3 text-2xl font-bold" style={{ color: 'var(--tamarind)' }}>{background.trainedArtisans}+</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>artisans trained</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: 'var(--border-warm)' }}>
              <h4 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Languages</h4>
              <div className="flex flex-wrap gap-2">
                {background.languages.map(l => (
                  <span key={l} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--cream-dark)', color: 'var(--tamarind)' }}>{l}</span>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl" style={{ backgroundColor: 'var(--cream-dark)' }}>
                <p className="text-sm italic" style={{ color: 'var(--tamarind)', fontFamily: 'Caveat, cursive', fontSize: '1rem' }}>
                  {background.philosophy}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}