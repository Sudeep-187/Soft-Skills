import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { CalendarDays, Clock, Users, Store, Play, Star, MapPin, ArrowRight, Video, Mic, ShoppingBag, Camera, Heart, Music, CreditCard, CheckCircle2, Loader2, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

const schedule = [
  { time: '10:00 AM', event_name: 'Grand Opening Ceremony', description: 'Traditional Kuchipudi dance performance & lamp lighting', type: 'ceremony' },
  { time: '11:00 AM', event_name: 'Pochampally Ikat Live Demo', description: 'Watch master weavers create intricate Ikat patterns live', type: 'demo' },
  { time: '12:30 PM', event_name: 'Artisan Stories — Kalamkari', description: 'Padmavathi B. shares the ancient art of temple cloth painting', type: 'talk' },
  { time: '2:00 PM', event_name: 'Flash Sale — Festival Specials', description: 'Up to 50% off on festival collection for 1 hour', type: 'sale' },
  { time: '3:00 PM', event_name: 'Bidriware Workshop', description: 'Learn the art of silver inlay on metal from master craftsmen', type: 'workshop' },
  { time: '4:30 PM', event_name: 'Live Auction — Rare Crafts', description: 'Bid on one-of-a-kind handcrafted masterpieces', type: 'auction' },
  { time: '6:00 PM', event_name: 'Cultural Evening — Burra Katha', description: 'Traditional Telugu storytelling performance', type: 'ceremony' },
];

const featuredArtisans = [
  { name: 'Lakshmi Devi', craft: 'Ikat Weaving', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop', village: 'Pochampally' },
  { name: 'Raju Kummara', craft: 'Lacquer Toys', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', village: 'Etikoppaka' },
  { name: 'Padmavathi B.', craft: 'Kalamkari', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', village: 'Srikalahasti' },
  { name: 'Venkat Reddy', craft: 'Bidriware', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', village: 'Bidar' },
  { name: 'Sarojini N.', craft: 'Bronze Casting', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop', village: 'Pembarthi' },
  { name: 'Srinivasulu M.', craft: 'Nirmal Art', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', village: 'Nirmal' },
];

const traditionalVenues = [
  {
    name: 'Shilparamam Heritage Village', location: 'Madhapur, Hyderabad',
    description: 'An arts & crafts village spread across 65 acres with open-air amphitheatre, craft workshops, and a vibrant bazaar.',
    image: 'https://images.unsplash.com/photo-1567967455389-e432b1b43c6f?w=600&h=400&fit=crop',
    features: ['Open-Air Stage', 'Craft Workshops', 'Food Courts', '200+ Stalls'],
  },
  {
    name: 'NTR Gardens Pavilion', location: 'Tank Bund, Hyderabad',
    description: 'A beautiful lakeside ground with lush greenery, perfect for cultural gatherings and craft exhibitions.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&h=400&fit=crop',
    features: ['Lakeside Setting', 'Garden Grounds', 'Cultural Stage', 'Artisan Village'],
  },
];

const previousMelas = [
  {
    name: 'Ugadi Mela 2025', date: 'March 28-30, 2025', location: 'Shilparamam, Hyderabad',
    image: 'https://images.unsplash.com/photo-1567967455389-e432b1b43c6f?w=600&h=400&fit=crop', rating: 4.9, visitors: '12,000+', artisans: 55,
    highlights: ['Grand Ikat Fashion Show', 'Live Bronze Casting Demo', 'Cultural Night with Kuchipudi'],
    memories: ['https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=200&fit=crop', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=200&fit=crop', 'https://images.unsplash.com/photo-1605649461784-efc6e6f39a2c?w=300&h=200&fit=crop'],
    testimonial: { name: 'Priya Sharma', text: 'An incredible experience! I met the artisan who handwove my saree.' }
  },
];

const typeColors = {
  ceremony: 'bg-[#D4A017]/20 text-[#D4A017]', demo: 'bg-blue-500/20 text-blue-400', talk: 'bg-green-500/20 text-green-400',
  sale: 'bg-red-500/20 text-red-400', workshop: 'bg-orange-500/20 text-orange-400', auction: 'bg-purple-500/20 text-purple-400',
};

export default function Mela() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [registrationState, setRegistrationState] = useState('initial'); // initial, payment, processing, success

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 5);
    const timer = setInterval(() => {
      const diff = target - new Date();
      if (diff <= 0) { clearInterval(timer); return; }
      setCountdown({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), mins: Math.floor((diff % 3600000) / 60000), secs: Math.floor((diff % 60000) / 1000) });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePayment = () => {
    setRegistrationState('processing');
    setTimeout(() => {
      setRegistrationState('success');
    }, 1500);
  };

  return (
    <div className="bg-black text-white min-h-screen pb-20">
      {/* Hero banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1920&h=600&fit=crop" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-32 pt-32">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-xs px-3 bg-[#D4A017]/10 text-[#D4A017] border border-[#D4A017]/20">
              <span className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse mr-1.5 inline-block" /> Upcoming Event
            </Badge>
            <h1 className="font-serif text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#E8BB3A] to-[#D4A017] pb-2">Rural Bazaar Mela</h1>
            <p className="text-white/60 mt-4 max-w-2xl mx-auto text-base">A traditional meetup of subscribers, sellers, and registered artisan families. 200+ stalls, 50+ artisans, 3 days of craft heritage & culture.</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Countdown & Registration (Takes 3 columns) */}
            <div className="md:col-span-3 rounded-3xl p-8 bg-zinc-900 border border-white/5 shadow-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-[#D4A017] mb-6 font-bold text-center">Event Starts In</p>
              <div className="flex justify-center gap-4 md:gap-6 mb-10">
                {[{ val: countdown.days, label: 'Days' }, { val: countdown.hours, label: 'Hrs' }, { val: countdown.mins, label: 'Min' }, { val: countdown.secs, label: 'Sec' }].map(t => (
                  <div key={t.label} className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-inner">
                      <span className="font-serif text-2xl md:text-4xl text-white font-bold">{String(t.val).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-white/40 mt-3 block tracking-wider">{t.label}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic Registration Block */}
              <div className="mt-8 pt-8 border-t border-white/10 justify-center">
                {registrationState === 'initial' && (
                  <div className="text-center">
                    <p className="text-sm text-white/60 mb-4">Join 12,000+ others who have already secured their pass.</p>
                    <Button onClick={() => setRegistrationState('payment')} className="rounded-full px-8 py-6 text-base font-bold text-black gap-2 w-full md:w-auto hover:shadow-[0_0_20px_rgba(212,160,23,0.3)] transition" style={{ background: '#D4A017' }}>
                      Register Now - ₹499 <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                {registrationState === 'payment' && (
                  <div className="max-w-xs mx-auto text-left bg-black p-5 rounded-2xl border border-white/10">
                    <h4 className="text-white font-semibold mb-4 text-sm flex items-center gap-2"><CreditCard className="w-4 h-4 text-[#D4A017]" /> Secure Payment: ₹499</h4>
                    <input type="text" placeholder="Card Number (mock)" className="w-full px-4 py-3 mb-3 rounded-xl text-sm text-white bg-zinc-900 border border-white/10" disabled={registrationState === 'processing'} />
                    <div className="flex gap-3 mb-4">
                      <input type="text" placeholder="MM/YY" className="w-1/2 px-4 py-3 rounded-xl text-sm text-white bg-zinc-900 border border-white/10" />
                      <input type="text" placeholder="CVC" className="w-1/2 px-4 py-3 rounded-xl text-sm text-white bg-zinc-900 border border-white/10" />
                    </div>
                    <Button onClick={handlePayment} disabled={registrationState === 'processing'} className="w-full rounded-xl py-6 text-sm font-bold text-black hover:bg-[#D4A017]/90" style={{ background: '#D4A017' }}>
                      {registrationState === 'processing' ? <Loader2 className="animate-spin w-4 h-4" /> : 'Pay & Reserve Seat'}
                    </Button>
                    <Button variant="ghost" className="w-full mt-2 text-white/50 hover:text-white" onClick={() => setRegistrationState('initial')}>Cancel</Button>
                  </div>
                )}
                {registrationState === 'processing' && (
                  <div className="text-center py-6">
                    <Loader2 className="w-8 h-8 animate-spin text-[#D4A017] mx-auto mb-4" />
                    <p className="text-white/60 text-sm">Processing your ticket...</p>
                  </div>
                )}
                {registrationState === 'success' && (
                  <div className="bg-[#2E7D32]/20 border border-[#2E7D32]/50 p-6 rounded-2xl flex items-center justify-center gap-4">
                    <CheckCircle2 className="w-8 h-8 text-[#4CAF50] shrink-0" />
                    <div className="text-left">
                      <h3 className="text-white font-bold text-lg">You're Going!</h3>
                      <p className="text-white/60 text-sm mt-1">Ticket #RBM-2649 confirmed. See you at the Mela!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links (Takes 2 columns) */}
            <div className="md:col-span-2 space-y-4">
              <p className="text-xs uppercase tracking-widest text-[#D4A017] font-bold mb-4">Explore More</p>
              <Link to={createPageUrl('Products')} className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl text-sm transition bg-zinc-900 border border-white/10 hover:border-[#D4A017]/50 hover:bg-zinc-800">
                <ShoppingBag className="w-5 h-5 text-[#D4A017]" /> Shop Products Year-Round <ArrowRight className="w-4 h-4 text-white/50 ml-auto" />
              </Link>
              <Link to={createPageUrl('MysteryBox')} className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl text-sm transition bg-zinc-900 border border-white/10 hover:border-[#D4A017]/50 hover:bg-zinc-800">
                <Gift className="w-5 h-5 text-[#D4A017]" /> Get the Mystery Box <ArrowRight className="w-4 h-4 text-white/50 ml-auto" />
              </Link>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center"><Store className="w-4 h-4 text-white/50" /></div>
                  <div><p className="text-sm font-bold">200+ Stalls</p><p className="text-xs text-white/40">From all regions</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center"><Users className="w-4 h-4 text-white/50" /></div>
                  <div><p className="text-sm font-bold">50+ Artisans</p><p className="text-xs text-white/40">Live interaction</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <Tabs defaultValue="venues" className="w-full">
          <TabsList className="bg-zinc-900 border border-white/10 w-full justify-start rounded-full p-1 mb-10 h-14">
            <TabsTrigger value="venues" className="rounded-full data-[state=active]:bg-[#D4A017] data-[state=active]:text-black gap-2 px-6"><MapPin className="w-4 h-4" /> Venues</TabsTrigger>
            <TabsTrigger value="memories" className="rounded-full data-[state=active]:bg-[#D4A017] data-[state=active]:text-black gap-2 px-6"><Camera className="w-4 h-4" /> Memories</TabsTrigger>
            <TabsTrigger value="schedule" className="rounded-full data-[state=active]:bg-[#D4A017] data-[state=active]:text-black gap-2 px-6"><Clock className="w-4 h-4" /> Schedule</TabsTrigger>
            <TabsTrigger value="artisans" className="rounded-full data-[state=active]:bg-[#D4A017] data-[state=active]:text-black gap-2 px-6"><Users className="w-4 h-4" /> Artisans</TabsTrigger>
          </TabsList>

          {/* VENUES TAB */}
          <TabsContent value="venues">
            <h2 className="font-serif text-3xl font-bold mb-2">Traditional Event Grounds</h2>
            <p className="text-white/50 mb-8">Heritage locations celebrating the grandeur of our culture.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {traditionalVenues.map((venue, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all group">
                  <div className="relative h-56 overflow-hidden">
                    <img src={venue.image} alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 z-10"><h3 className="font-serif text-xl font-bold text-white mb-1">{venue.name}</h3><p className="text-xs text-[#D4A017] flex items-center gap-1 font-bold uppercase tracking-wider"><MapPin className="w-3 h-3" /> {venue.location}</p></div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-white/50 leading-relaxed mb-4">{venue.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {venue.features.map(f => <span key={f} className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-white/5 text-white border border-white/10 uppercase tracking-wider">{f}</span>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* MEMORIES TAB */}
          <TabsContent value="memories">
            <h2 className="font-serif text-3xl font-bold mb-8">Mela Archives</h2>
            <div className="space-y-12">
              {previousMelas.map((mela, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/5">
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img src={mela.image} alt={mela.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-8 z-10">
                      <h3 className="font-serif text-3xl font-bold text-white mb-2">{mela.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-[#D4A017]">
                        <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> {mela.date}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {mela.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="flex gap-2 mb-6">
                          {mela.highlights.map(h => <span key={h} className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-white/5 text-white border border-white/10">✦ {h}</span>)}
                        </div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#D4A017] mb-3">Gallery</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {mela.memories.map((img, j) => <img key={j} src={img} alt="" className="w-full h-24 object-cover rounded-xl" />)}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center bg-black/50 border border-white/10 p-6 rounded-2xl">
                        <Star className="w-8 h-8 text-[#D4A017] fill-[#D4A017] mb-4" />
                        <p className="text-base italic leading-relaxed text-white/70">"{mela.testimonial.text}"</p>
                        <p className="text-sm font-bold mt-4 text-[#D4A017]">— {mela.testimonial.name}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* SCHEDULE TAB */}
          <TabsContent value="schedule">
            <h2 className="font-serif text-3xl font-bold mb-8">Event Itinerary</h2>
            <div className="space-y-4">
              {schedule.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="bg-zinc-900 rounded-2xl p-6 flex gap-6 items-center border border-white/5 hover:border-white/20 transition">
                  <div className="text-center shrink-0 w-24">
                    <span className="text-lg font-black text-[#D4A017] block">{item.time.split(' ')[0]}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">{item.time.split(' ')[1]}</span>
                  </div>
                  <div className="w-px h-12 bg-white/10 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h4 className="font-bold text-lg">{item.event_name}</h4>
                      <Badge className={`text-[9px] uppercase tracking-wider font-bold ${typeColors[item.type] || ''}`}>{item.type}</Badge>
                    </div>
                    <p className="text-sm text-white/50">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* ARTISANS TAB */}
          <TabsContent value="artisans">
            <h2 className="font-serif text-3xl font-bold mb-8">Featured Master Craftsmen</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {featuredArtisans.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-zinc-900 rounded-3xl p-6 text-center border border-white/5 hover:border-[#D4A017]/50 transition group">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <img src={a.image} alt={a.name} className="w-full h-full rounded-full object-cover ring-2 ring-white/10 group-hover:ring-[#D4A017] transition-all" />
                    <div className="absolute inset-0 rounded-full bg-[#D4A017]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="font-bold text-lg mb-1">{a.name}</h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#D4A017] mb-2">{a.craft}</p>
                  <p className="text-xs flex items-center justify-center gap-1 text-white/40"><MapPin className="w-3 h-3" /> {a.village}</p>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}