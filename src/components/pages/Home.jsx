import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, ShoppingBag, Star, Users, MapPin, Package, CheckCircle2, Gift, CreditCard, Loader2 } from 'lucide-react';
import { STATES_DATA } from '@/data/products';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useToast } from "@/components/ui/use-toast";

function StateReveal({ state, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [80, 0, -50]);
  const textOp = useTransform(scrollYProgress, [0.08, 0.3, 0.7, 0.92], [0, 1, 1, 0]);
  const isRight = index % 2 === 1;

  const txtRotY = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [isRight ? -25 : 25, 0, 0, isRight ? 15 : -15]);
  const txtX = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [isRight ? 60 : -60, 0, 0, isRight ? -30 : 30]);
  const txtScale = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0.9, 1, 1, 0.95]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden" id={state.name.toLowerCase().replace(/\s+/g, '-')}>
      <motion.div className="absolute inset-0 -top-[25%]" style={{ y: bgY, willChange: 'transform' }}>
        <img src={state.image} alt={state.name} className="w-full h-[150%] object-cover" loading="lazy" decoding="async" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: `linear-gradient(${isRight ? '135deg' : '225deg'}, ${state.color}DD 0%, rgba(0,0,0,0.88) 70%)` }} />
      <motion.div className={`relative z-10 h-full flex items-center px-8 md:px-20 max-w-7xl mx-auto ${isRight ? 'justify-end text-right' : 'justify-start text-left'}`} style={{ y: textY, opacity: textOp }}>
        <div className="max-w-2xl">
          <motion.div style={{ perspective: 1000, transformStyle: 'preserve-3d', rotateY: txtRotY, x: txtX, scale: txtScale, willChange: 'transform' }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] mb-6" style={{ background: `${state.color}30`, color: state.color, border: `1px solid ${state.color}50` }}>{state.tagline}</span>
            <h2 className="text-6xl md:text-8xl flex flex-col lg:text-[9rem] font-black text-white leading-[0.85] tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              {state.name.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
            </h2>
            <p className="text-white/45 mt-6 text-sm md:text-base max-w-lg leading-relaxed" style={isRight ? { marginLeft: 'auto' } : {}}>{state.desc}</p>
            <Link to={`${createPageUrl('Products')}?state=${encodeURIComponent(state.name)}`} className="group inline-flex items-center gap-3 mt-8 px-7 py-3.5 rounded-full text-sm font-bold text-black transition-all duration-300 hover:gap-5 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]" style={{ background: state.color }}>
              Explore Crafts <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ value, label, icon, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 50, rotateX: 30 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} style={{ perspective: 600 }} className="text-center">
      <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3" style={{ background: 'rgba(212,160,23,0.12)', color: '#D4A017' }}>{icon}</div>
      <div className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>{value}</div>
      <div className="text-xs text-white/35 mt-2 uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroBgY = useTransform(heroP, [0, 1], ['0%', '35%']);
  const heroTxtOp = useTransform(heroP, [0, 0.5], [1, 0]);
  const heroTxtY = useTransform(heroP, [0, 0.5], [0, -80]);

  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [showPaymentContext, setShowPaymentContext] = useState(false);
  const [paymentStep, setPaymentStep] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubscribeClick = () => {
    if (!email) return;
    if (!user) {
      toast({ title: "Login Required", description: "Please login to subscribe to the mystery box." });
      return;
    }
    setPaymentStep(true);
  };

  const handlePaymentConfirm = async () => {
    setSubscribing(true);
    await new Promise(r => setTimeout(r, 1500)); // simulate payment
    await base44.entities.Subscription.create({ email, user_id: user.id || 'anonymous', tier: 'premium_box', status: 'active', payment_status: 'paid' });
    setSubscribing(false);
    setSubscribed(true);
    setPaymentStep(false);
  };

  return (
    <div className="bg-black">
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div className="absolute inset-0 -top-[35%]" style={{ y: heroBgY, willChange: 'transform' }}>
          <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&h=1200&fit=crop&q=80" alt="" className="w-full h-[170%] object-cover" loading="eager" fetchpriority="high" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.88) 100%)' }} />
        <motion.div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-7xl mx-auto" style={{ opacity: heroTxtOp, y: heroTxtY }}>
          <motion.div initial={{ opacity: 0, y: 70, rotateX: 12 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} style={{ perspective: 800 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] mb-8" style={{ background: 'rgba(212,160,23,0.12)', color: '#D4A017', border: '1px solid rgba(212,160,23,0.25)' }}>✨ Four States · 44 Masterpieces · One Mission</div>
            <h1 className="text-white leading-[0.88]" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', fontFamily: 'Playfair Display, serif', fontWeight: 900 }}>Where Ancient<br />Hands Meet<br /><span style={{ color: '#D4A017' }}>Modern Hearts</span></h1>
            <p className="text-white/40 mt-8 text-base md:text-lg max-w-lg leading-relaxed">Scroll down to discover each state and its craft heritage. Select a state to see its products come alive with 3D scrolling.</p>
            <div className="flex flex-wrap gap-4 mt-10">
              <a href="#andhra-pradesh" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold text-black transition-all hover:gap-5 hover:shadow-[0_0_40px_rgba(212,160,23,0.4)]" style={{ background: '#D4A017' }}>Begin the Journey <ChevronDown className="w-4 h-4" /></a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* STATES */}
      {STATES_DATA.map((s, i) => <StateReveal key={s.name} state={s} index={i} />)}

      {/* MELA CTA */}
      <section className="bg-zinc-950 py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-red-900/30 blur-[100px] rounded-full mix-blend-screen" />
          <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-orange-900/30 blur-[100px] rounded-full mix-blend-screen" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A017] mb-3 block">Annual Gathering</span>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.1] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>The Great<br />Rural Mela 2026</h2>
              <p className="text-white/40 text-lg leading-relaxed mb-8 max-w-md">Experience the magic in person. Meet the artisans, learn the ancient techniques, and celebrate our shared heritage at our traditional mela event.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={createPageUrl('Mela')} className="px-8 py-4 rounded-full text-sm font-bold text-black flex justify-center items-center gap-2 transition hover:shadow-[0_0_20px_rgba(212,160,23,0.3)]" style={{ background: '#D4A017' }}>View Mela Details <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-[400px] rounded-3xl overflow-hidden border border-white/10">
              <img src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop" alt="Mela Event" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <div className="flex items-center gap-6">
                  <div className="text-center"><p className="text-3xl font-bold text-white">200+</p><p className="text-[10px] uppercase text-white/50 tracking-wider">Stalls</p></div>
                  <div className="w-px h-10 bg-white/20" />
                  <div className="text-center"><p className="text-3xl font-bold text-[#D4A017]">3</p><p className="text-[10px] uppercase text-white/50 tracking-wider">Days of Joy</p></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=1920&h=800&fit=crop&q=60" alt="" className="w-full h-full object-cover" loading="lazy" /></div>
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.88)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A017]">Our Impact</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-3" style={{ fontFamily: 'Playfair Display, serif' }}>Numbers That Tell a Story</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
            <Stat value="5,000+" label="Artisan Families" icon={<Users className="w-6 h-6" />} delay={0} />
            <Stat value="350+" label="Craft Villages" icon={<MapPin className="w-6 h-6" />} delay={0.1} />
            <Stat value="12,000+" label="Products Delivered" icon={<ShoppingBag className="w-6 h-6" />} delay={0.2} />
            <Stat value="4.8 ★" label="Average Rating" icon={<Star className="w-6 h-6" />} delay={0.3} />
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION */}
      <section className="bg-zinc-950 py-24 px-8 md:px-20 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A017] flex items-center gap-2"><Gift className="w-4 h-4" /> Mystery Box Subscription</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>The Magic of Rural India Delivered.</h2>
              <p className="text-white/40 mb-8 text-sm leading-relaxed">Subscribe for ₹999/month and receive a curated surprise box of authentic crafts, plus early access to new collections and festival discounts.</p>
              
              {!subscribed ? (
                !paymentStep ? (
                  <div className="flex flex-col gap-3 max-w-md">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email to subscribe" className="w-full px-5 py-4 rounded-xl text-sm text-white placeholder-white/25 outline-none bg-white/5 border border-white/10 focus:border-[#D4A017] transition" />
                    <button onClick={handleSubscribeClick} disabled={!email} className="w-full px-8 py-4 rounded-xl text-sm font-bold text-black transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A017]/90" style={{ background: '#D4A017' }}>Proceed to Payment</button>
                    <p className="text-[10px] text-white/30 text-center mt-2">Requires being logged in to an account.</p>
                  </div>
                ) : (
                  <div className="bg-black/50 border border-white/10 p-5 rounded-xl max-w-md">
                    <h4 className="text-white font-semibold mb-4 text-sm flex items-center gap-2"><CreditCard className="w-4 h-4 text-[#D4A017]" /> Secure Payment: ₹999</h4>
                    <input type="text" placeholder="Card Number (mock)" className="w-full px-4 py-3 mb-3 rounded-lg text-sm text-white bg-white/5 border border-white/10" disabled={subscribing} />
                    <div className="flex gap-3 mb-4">
                      <input type="text" placeholder="MM/YY" className="w-1/2 px-4 py-3 rounded-lg text-sm text-white bg-white/5 border border-white/10" disabled={subscribing} />
                      <input type="text" placeholder="CVC" className="w-1/2 px-4 py-3 rounded-lg text-sm text-white bg-white/5 border border-white/10" disabled={subscribing} />
                    </div>
                    <button onClick={handlePaymentConfirm} disabled={subscribing} className="w-full px-8 py-3 rounded-lg text-sm font-bold text-black transition flex justify-center items-center gap-2 hover:bg-[#D4A017]/90" style={{ background: '#D4A017' }}>
                      {subscribing ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing payment...</> : 'Pay ₹999 & Subscribe'}
                    </button>
                    <button onClick={() => setPaymentStep(false)} disabled={subscribing} className="w-full mt-3 text-xs text-white/40 hover:text-white transition">Cancel</button>
                  </div>
                )
              ) : (
                <div className="bg-[#D4A017]/10 border border-[#D4A017]/30 p-6 rounded-2xl flex items-start gap-4">
                  <CheckCircle2 className="w-8 h-8 text-[#D4A017] shrink-0" />
                  <div>
                    <h3 className="text-white font-bold text-lg">Subscription Active!</h3>
                    <p className="text-white/60 text-sm mt-1">Payment successful. Your first mystery box will beautifully arrive at your doorstep next month!</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
          <div className="w-full md:w-1/2 hidden md:block">
            <motion.div initial={{ opacity: 0, scale: 0.9, rotateZ: -5 }} whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A017]/20 to-transparent rounded-[3rem] transform rotate-6" />
              <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&fit=crop" alt="Mystery Box" className="w-full h-full object-cover rounded-3xl relative z-10 border border-white/10 shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}