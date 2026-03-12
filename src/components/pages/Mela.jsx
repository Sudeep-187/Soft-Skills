import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { CalendarDays, Clock, Users, Store, Play, Star, MapPin, ArrowRight, Video, Mic, ShoppingBag } from 'lucide-react';
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

const typeColors = {
  ceremony: 'bg-purple-100 text-purple-700',
  demo: 'bg-blue-100 text-blue-700',
  talk: 'bg-green-100 text-green-700',
  sale: 'bg-red-100 text-red-700',
  workshop: 'bg-orange-100 text-orange-700',
  auction: 'bg-amber-100 text-amber-700',
};

export default function Mela() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 5);
    const timer = setInterval(() => {
      const diff = target - new Date();
      if (diff <= 0) { clearInterval(timer); return; }
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[var(--cream)] min-h-screen">
      {/* Hero banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1400&h=600&fit=crop" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--maroon-dark)]/90 to-[var(--maroon-dark)]/70" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 text-white">
          {/* Top: badge + title */}
          <div className="text-center mb-10">
            <Badge className="bg-amber-500/25 text-amber-200 border-amber-400/30 mb-4 text-xs px-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse mr-1.5 inline-block" /> Next Mela — Feb 26–28, 2026
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl font-bold">Sankranti Virtual Mela</h1>
            <p className="text-white/60 mt-3 max-w-xl mx-auto text-sm">
              The grandest online craft fair celebrating the heritage of Andhra Pradesh &amp; Telangana. 200+ stalls, 50+ artisans, 3 days of culture.
            </p>
          </div>

          {/* Two-column: countdown + past mela highlight */}
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Countdown */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15 text-center">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Event Starts In</p>
              <div className="flex justify-center gap-3 md:gap-4">
                {[
                  { val: countdown.days, label: 'Days' },
                  { val: countdown.hours, label: 'Hrs' },
                  { val: countdown.mins, label: 'Min' },
                  { val: countdown.secs, label: 'Sec' },
                ].map(t => (
                  <div key={t.label} className="text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/15 flex items-center justify-center">
                      <span className="font-serif text-xl md:text-2xl font-bold">{String(t.val).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[10px] text-white/40 mt-1 block">{t.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6 justify-center">
                <Button onClick={() => setRegistered(true)}
                  className={`rounded-full px-6 text-sm gap-2 ${registered ? 'bg-green-600 hover:bg-green-600' : 'bg-[var(--terracotta)] hover:bg-[var(--terracotta-dark)]'} text-white`}
                  disabled={registered}>
                  {registered ? '✓ Registered!' : 'Register Free'}
                  {!registered && <ArrowRight className="w-4 h-4" />}
                </Button>
                <Button variant="outline" className="rounded-full px-6 text-sm border-white/20 text-white hover:bg-white/10">
                  <Play className="w-4 h-4" /> Promo
                </Button>
              </div>
              <div className="flex justify-center gap-6 mt-5 text-xs text-white/40">
                <span className="flex items-center gap-1"><Store className="w-3.5 h-3.5" /> 200+ Stalls</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 50+ Artisans</span>
              </div>
            </div>

            {/* Past Mela Highlights */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-1">From Previous Melas</p>
              {[
                { year: 'Ugadi Mela 2025', location: 'HITEC City, Hyderabad', image: 'https://images.unsplash.com/photo-1567967455389-e432b1b43c6f?w=400&h=180&fit=crop', rating: 4.9, visitors: '12,000+' },
                { year: 'Diwali Crafts Fair 2025', location: 'Shilparamam, Hyderabad', image: 'https://images.unsplash.com/photo-1605649461784-efc6e6f39a2c?w=400&h=180&fit=crop', rating: 4.8, visitors: '9,500+' },
              ].map((m, i) => (
                <div key={i} className="flex gap-3 bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:bg-white/15 transition cursor-pointer">
                  <img src={m.image} alt={m.year} className="w-24 h-20 object-cover shrink-0" />
                  <div className="flex flex-col justify-center py-2 pr-3">
                    <p className="font-semibold text-sm leading-tight">{m.year}</p>
                    <p className="text-xs text-white/50 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {m.location}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-white/50">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {m.rating}</span>
                      <span><Users className="w-3 h-3 inline mr-1" />{m.visitors}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Link to={createPageUrl('Products')} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm border border-white/15 transition">
                <ShoppingBag className="w-4 h-4" /> Shop Mela Products Year-Round <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="bg-[var(--cream-dark)] border border-[var(--border-warm)]/50 w-full justify-start">
            <TabsTrigger value="schedule" className="gap-1.5"><Clock className="w-3.5 h-3.5" /> Schedule</TabsTrigger>
            <TabsTrigger value="artisans" className="gap-1.5"><Users className="w-3.5 h-3.5" /> Artisans</TabsTrigger>
            <TabsTrigger value="stalls" className="gap-1.5"><Store className="w-3.5 h-3.5" /> Stalls</TabsTrigger>
            <TabsTrigger value="live" className="gap-1.5"><Video className="w-3.5 h-3.5" /> Live Stage</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="mt-6">
            <div className="space-y-3">
              {schedule.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-[var(--border-warm)]/50 p-5 flex gap-4 items-start hover:shadow-md transition"
                >
                  <div className="text-center shrink-0 w-16">
                    <span className="text-sm font-bold text-[var(--terracotta)]">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm">{item.event_name}</h4>
                      <Badge className={`text-[10px] ${typeColors[item.type] || ''}`}>{item.type}</Badge>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="artisans" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {featuredArtisans.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-xl border border-[var(--border-warm)]/50 p-5 text-center hover:shadow-md transition"
                >
                  <img src={a.image} alt={a.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 ring-2 ring-[var(--border-warm)]" />
                  <h4 className="font-semibold text-sm">{a.name}</h4>
                  <p className="text-xs text-[var(--terracotta)] font-medium">{a.craft}</p>
                  <p className="text-[10px] text-[var(--text-muted)] flex items-center justify-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {a.village}</p>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stalls" className="mt-6">
            <div className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-8 text-center">
              <ShoppingBag className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold">Virtual Stall Map</h3>
              <p className="text-sm text-[var(--text-muted)] mt-2 max-w-md mx-auto">
                Explore 200+ virtual stalls organized by craft type. Navigate through Handloom Lane, Pottery Plaza, Spice Bazaar, and more!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                {['Handloom Lane', 'Pottery Plaza', 'Jewelry Chowk', 'Spice Bazaar', 'Art Gallery', 'Woodwork Corner', 'Metal Market', 'Food Court'].map(stall => (
                  <div key={stall} className="p-3 rounded-xl bg-[var(--cream)] border border-[var(--border-warm)]/50 text-sm font-medium hover:bg-[var(--terracotta)]/10 transition cursor-pointer">
                    {stall}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="live" className="mt-6">
            <div className="bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center relative">
              <img src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1000&h=560&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
              <div className="relative z-10 text-center text-white">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition">
                  <Play className="w-8 h-8 fill-white" />
                </div>
                <h3 className="font-serif text-xl font-bold">Live Stage — Coming Soon</h3>
                <p className="text-white/50 text-sm mt-1">Live streaming starts on Feb 26, 10:00 AM IST</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}