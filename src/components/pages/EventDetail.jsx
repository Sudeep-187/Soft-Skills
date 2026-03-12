import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Calendar, MapPin, Users, Clock, ChevronLeft, ChevronRight, Star, Award, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const EVENTS = {
  e1: {
    name: 'Hyderabad Crafts Mela', district: 'Hyderabad', state: 'Telangana',
    date: 'Mar 15–20, 2026', venue: 'NTR Gardens, Hyderabad', organizer: 'AP & Telangana Handicrafts Board',
    status: 'upcoming', artisans: 120, target: new Date('2026-03-15'),
    description: 'One of the largest craft fairs in South India, bringing together 120+ artisans from Andhra Pradesh and Telangana. Experience live demonstrations, workshops, and exclusive festival collections.',
    images: [
      'https://images.unsplash.com/photo-1567967455389-e432b1b43c6f?w=900&h=500&fit=crop',
      'https://images.unsplash.com/photo-1605649461784-efc6e6f39a2c?w=900&h=500&fit=crop',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=900&h=500&fit=crop',
      'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=900&h=500&fit=crop',
    ],
    artisanList: [
      { name: 'Lakshmi Devi', craft: 'Pochampally Ikat', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop', rating: 4.9 },
      { name: 'Raju Kummara', craft: 'Etikoppaka Lacquer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', rating: 4.8 },
      { name: 'Padmavathi B.', craft: 'Kalamkari Art', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', rating: 4.9 },
      { name: 'Venkat Reddy', craft: 'Bidriware', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop', rating: 4.7 },
      { name: 'Krishna Reddy', craft: 'Pembarthi Brass', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop', rating: 4.9 },
    ],
    reviews: [
      { name: 'Ananya S.', city: 'Bangalore', rating: 5, text: "The most authentic craft fair I've been to. The artisans were so welcoming and the live demos were incredible!", avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=60&h=60&fit=crop' },
      { name: 'Rahul M.', city: 'Chennai', rating: 5, text: 'Bought 3 sarees and a set of lacquer toys. Quality is unmatched. Will be back next year!', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
    ],
    pastMelas: [
      { year: '2025', location: 'HITEC City', image: 'https://images.unsplash.com/photo-1567967455389-e432b1b43c6f?w=400&h=250&fit=crop', artisans: 98 },
      { year: '2024', location: 'Shilparamam', image: 'https://images.unsplash.com/photo-1605649461784-efc6e6f39a2c?w=400&h=250&fit=crop', artisans: 75 },
    ],
  },
  e3: {
    name: 'Pochampally Ikat Utsav', district: 'Nalgonda', state: 'Telangana',
    date: 'Feb 28, 2026', venue: 'Pochampally Village Grounds', organizer: 'Pochampally IIML Art & Craft Trust',
    status: 'live', artisans: 40, target: new Date('2026-02-28'),
    description: 'A celebration of the ancient Ikat weaving tradition, hosted in the birthplace of Pochampally Ikat. Watch master weavers at their looms, buy directly, and learn the craft.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&h=500&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=900&h=500&fit=crop',
      'https://images.unsplash.com/photo-1605649461784-efc6e6f39a2c?w=900&h=500&fit=crop',
    ],
    artisanList: [
      { name: 'Lakshmi Devi', craft: 'Ikat Silk Sarees', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop', rating: 4.9 },
      { name: 'Varalakshmi W.', craft: 'Dharmavaram Silk', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', rating: 4.9 },
      { name: 'Meena Devi', craft: 'Cotton Ikat', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop', rating: 4.7 },
    ],
    reviews: [
      { name: 'Priya K.', city: 'Hyderabad', rating: 5, text: 'Witnessing the weaving process live is truly magical. You see how much effort goes into each saree.', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=60&h=60&fit=crop' },
    ],
    pastMelas: [
      { year: '2025', location: 'Pochampally Village', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=250&fit=crop', artisans: 35 },
    ],
  },
};

// Default fallback event for unknown IDs
const defaultEvent = EVENTS.e1;

function Countdown({ target }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = target - new Date();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [target]);

  return (
    <div className="flex gap-3">
      {Object.entries(timeLeft).map(([unit, val]) => (
        <div key={unit} className="text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
            {String(val).padStart(2, '0')}
          </div>
          <p className="text-[10px] mt-1 uppercase tracking-wider opacity-70 text-white">{unit}</p>
        </div>
      ))}
    </div>
  );
}

export default function EventDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id') || 'e1';
  const event = EVENTS[id] || defaultEvent;

  const [currentImage, setCurrentImage] = useState(0);
  const [artisanScroll, setArtisanScroll] = useState(0);

  const nextImage = () => setCurrentImage(i => (i + 1) % event.images.length);
  const prevImage = () => setCurrentImage(i => (i - 1 + event.images.length) % event.images.length);

  useEffect(() => {
    const t = setInterval(nextImage, 4000);
    return () => clearInterval(t);
  }, [event.images.length]);

  return (
    <div className="bg-[var(--cream)] min-h-screen">
      {/* Slideshow Hero */}
      <div className="relative h-64 md:h-[420px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img key={currentImage}
            src={event.images[currentImage]} alt=""
            initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full object-cover" />
        </AnimatePresence>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(44,26,14,0.85) 0%, rgba(44,26,14,0.3) 60%, transparent 100%)' }} />

        {/* Nav arrows */}
        <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {event.images.map((_, i) => (
            <button key={i} onClick={() => setCurrentImage(i)}
              className="h-1.5 rounded-full transition-all"
              style={{ width: i === currentImage ? 20 : 6, backgroundColor: i === currentImage ? 'var(--turmeric)' : 'rgba(255,255,255,0.5)' }} />
          ))}
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          {event.status === 'live' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white mb-3"
              style={{ backgroundColor: '#3A6B35' }}>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> LIVE NOW
            </span>
          )}
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-white mb-2">{event.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {event.date}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {event.venue}</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {event.artisans} artisans</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
              <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>About This Mela</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{event.description}</p>
            </div>

            {/* Artisan Carousel */}
            <div>
              <h2 className="font-serif text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Participating Artisans</h2>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {event.artisanList.map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="shrink-0 w-40 bg-white rounded-2xl overflow-hidden border text-center p-4"
                    style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
                    <img src={a.image} alt={a.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-[var(--border-warm)]" />
                    <p className="font-semibold text-xs leading-tight" style={{ color: 'var(--text-primary)' }}>{a.name}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{a.craft}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-current" style={{ color: 'var(--turmeric)' }} />
                      <span className="text-[10px] font-bold" style={{ color: 'var(--text-primary)' }}>{a.rating}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="font-serif text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Visitor Reviews</h2>
              <div className="space-y-4">
                {event.reviews.map((r, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border" style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <img src={r.avatar} alt={r.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{r.name}</p>
                        <div className="flex items-center gap-1">
                          {Array(r.rating).fill(0).map((_, j) => (
                            <Star key={j} className="w-3 h-3 fill-current" style={{ color: 'var(--turmeric)' }} />
                          ))}
                          <span className="text-[11px] ml-1" style={{ color: 'var(--text-muted)' }}>{r.city}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Melas */}
            <div>
              <h2 className="font-serif text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Past Mela Archive</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {event.pastMelas.map((m, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border relative group"
                    style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
                    <img src={m.image} alt={m.year} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4"
                      style={{ background: 'linear-gradient(to top, rgba(44,26,14,0.8), transparent)' }}>
                      <p className="font-serif font-bold text-white">{m.year} — {m.location}</p>
                      <p className="text-xs text-white/70">{m.artisans} artisans participated</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Countdown */}
            {event.status === 'upcoming' && (
              <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, var(--chili), var(--tamarind))' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-white opacity-80" />
                  <p className="text-xs font-semibold text-white opacity-80 uppercase tracking-wider">Event Starts In</p>
                </div>
                <Countdown target={event.target} />
              </div>
            )}

            {/* Venue details */}
            <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
              <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Venue Details</h3>
              <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <p className="flex items-start gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--chili)' }} /> {event.venue}</p>
                <p className="flex items-start gap-2"><Calendar className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--chili)' }} /> {event.date}</p>
                <p className="flex items-start gap-2"><Award className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--chili)' }} /> {event.organizer}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-white rounded-2xl p-5 border text-center" style={{ borderColor: 'var(--border-warm)', boxShadow: 'var(--shadow-card)' }}>
              <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Explore Products Online</p>
              <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Can't attend? Shop artisan products from this region</p>
              <Link to={createPageUrl('Products') + '?state=' + encodeURIComponent(event.state)}>
                <Button className="w-full rounded-full text-sm" style={{ backgroundColor: 'var(--tamarind)', color: 'white' }}>
                  Shop {event.state} Crafts <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>

            {/* Back link */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-1.5 text-sm hover:underline" style={{ color: 'var(--text-muted)' }}>
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}