import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Search, ShoppingCart, Heart, Menu, X, ChevronDown, LogIn } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { name: 'Handloom', icon: '🧵', href: '?category=handloom' },
  { name: 'Paintings', icon: '🎨', href: '?category=paintings' },
  { name: 'Jewelry', icon: '💎', href: '?category=jewelry' },
  { name: 'Woodcraft', icon: '🪵', href: '?category=woodcraft' },
  { name: 'Metalwork', icon: '🔨', href: '?category=metalwork' },
  { name: 'Spices', icon: '🌶️', href: '?category=spices' },
];

const states = [
  { name: 'Andhra Pradesh', color: '#D4A017' },
  { name: 'Telangana', color: '#C0392B' },
  { name: 'Tamil Nadu', color: '#2E7D32' },
  { name: 'Kerala', color: '#1565C0' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, userType } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [catOpen, setCatOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const catRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setCatOpen(false); setSearchOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const loadCount = async () => {
      try {
        const items = await base44.entities.CartItem.list();
        setCartCount(items.filter(i => !i.saved_for_later).length);
      } catch {}
    };
    loadCount();
    const unsub = base44.entities.CartItem.subscribe(loadCount);
    return unsub;
  }, []);

  useEffect(() => { if (searchOpen && searchRef.current) searchRef.current.focus(); }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${createPageUrl('Products')}?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const productsUrl = createPageUrl('Products');

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{ background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20 md:h-24">
            
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:shadow-[0_0_20px_rgba(212,160,23,0.3)] shadow-[0_0_15px_rgba(0,0,0,0.5)]" style={{ background: 'linear-gradient(135deg, #D4A017, #E8BB3A)' }}>
                <span className="text-black font-black text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>R</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-base tracking-wide text-white" style={{ fontFamily: 'Playfair Display, serif' }}>Rural Bazaar</div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#D4A017] font-bold">South India</div>
              </div>
            </Link>

            {/* Desktop Center Links */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: scrolled ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Link to={createPageUrl('Home')} className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${location.pathname === '/' || location.pathname.includes('Home') ? 'bg-[#D4A017] text-black shadow-[0_0_15px_rgba(212,160,23,0.3)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>Home</Link>
              
              <div ref={catRef} className="relative">
                <button onClick={() => setCatOpen(!catOpen)} className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${catOpen ? 'bg-[#D4A017] text-black shadow-[0_0_15px_rgba(212,160,23,0.3)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                  Crafts <ChevronDown className={`w-3.5 h-3.5 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {catOpen && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 rounded-2xl shadow-2xl py-3 z-50 bg-zinc-900/95 backdrop-blur-xl border border-white/10 overflow-hidden">
                      {categories.map(c => (
                        <Link key={c.name} to={`${productsUrl}${c.href}`} onClick={() => setCatOpen(false)} className="flex items-center gap-3 px-5 py-3 text-sm transition hover:bg-white/5 text-white/70 hover:text-white">
                          <span>{c.icon}</span> {c.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to={productsUrl} className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${location.pathname.includes('Products') ? 'bg-[#D4A017] text-black shadow-[0_0_15px_rgba(212,160,23,0.3)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>Shop All</Link>
              <Link to={createPageUrl('Mela')} className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${location.pathname.includes('Mela') ? 'bg-[#D4A017] text-black shadow-[0_0_15px_rgba(212,160,23,0.3)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>Mela Event</Link>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(!searchOpen)} className={`w-10 h-10 rounded-full flex items-center justify-center transition bg-black/30 backdrop-blur-md border border-white/10 ${searchOpen ? 'text-[#D4A017] border-[#D4A017]' : 'text-white hover:bg-white/10 hover:border-white/20'}`}>
                {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              </button>
              <Link to={createPageUrl('Wishlist')} className="w-10 h-10 rounded-full hidden sm:flex items-center justify-center transition bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20">
                <Heart className="w-4 h-4" />
              </Link>
              <Link to={createPageUrl('Cart')} className="relative w-10 h-10 rounded-full flex items-center justify-center transition bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20">
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-black bg-[#D4A017] shadow-[0_0_10px_rgba(212,160,23,0.5)]">{cartCount}</span>}
              </Link>
              {isAuthenticated ? (
                <Link to={createPageUrl('Profile')} className="hidden sm:flex ml-2 w-10 h-10 rounded-full items-center justify-center text-black text-sm font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105 transition transform" style={{ backgroundColor: userType === 'seller' ? '#A3E635' : '#E8BB3A' }}>
                  {user?.full_name?.[0] || 'U'}
                </Link>
              ) : (
                <Link to={createPageUrl('Login')} className="hidden sm:flex ml-2 items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition text-white hover:text-black hover:bg-[#D4A017] border border-white/20 hover:border-transparent">
                  <LogIn className="w-3.5 h-3.5" /> Login
                </Link>
              )}
              <button onClick={() => setMobileOpen(true)} className="md:hidden ml-2 w-10 h-10 rounded-full flex items-center justify-center transition bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Panel */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-white/5 bg-zinc-950/95 backdrop-blur-2xl overflow-hidden">
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto px-6 py-8">
                <div className="flex gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input ref={searchRef} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search for heritage crafts, master artisans..." className="w-full pl-14 pr-6 py-4 rounded-xl text-base bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#D4A017] transition" />
                  </div>
                  <button type="submit" className="px-8 py-4 rounded-xl text-sm font-bold text-black transition hover:shadow-[0_0_20px_rgba(212,160,23,0.3)] bg-[#D4A017]">Search</button>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/30">Popular:</span>
                  {categories.map(c => <Link key={c.name} to={`${productsUrl}${c.href}`} onClick={() => setSearchOpen(false)} className="px-4 py-1.5 rounded-full text-xs transition bg-white/5 text-white/60 border border-white/5 hover:bg-white/10 hover:text-white">{c.icon} {c.name}</Link>)}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu Fullscreen */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl overflow-y-auto">
            <div className="flex justify-end p-6">
              <button onClick={() => setMobileOpen(false)} className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="px-8 pb-20">
              <div className="flex flex-col gap-6 mb-12">
                {[{ label: 'Home', href: createPageUrl('Home') }, { label: 'Explore Products', href: productsUrl }, { label: 'Mela Gathering', href: createPageUrl('Mela') }, { label: 'My Wishlist', href: createPageUrl('Wishlist') }, { label: 'My Cart', href: createPageUrl('Cart') }, ...(isAuthenticated ? [{ label: 'My Profile', href: createPageUrl('Profile') }] : [{ label: 'Sign In / Register', href: createPageUrl('Login') }])].map(l => (
                  <Link key={l.label} to={l.href} onClick={() => setMobileOpen(false)} className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 hover:to-white transition-all transform hover:translate-x-4" style={{ fontFamily: 'Playfair Display, serif' }}>{l.label}</Link>
                ))}
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#D4A017] mb-4">Categories</p>
              <div className="flex flex-wrap gap-3 mb-10">
                {categories.map(c => <Link key={c.name} to={`${productsUrl}${c.href}`} onClick={() => setMobileOpen(false)} className="px-5 py-3 rounded-xl text-sm transition border border-white/10 text-white/70 hover:bg-white/5">{c.icon} {c.name}</Link>)}
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#D4A017] mb-4">Shop by State</p>
              <div className="flex flex-wrap gap-3">
                {states.map(s => <Link key={s.name} to={`${productsUrl}?state=${encodeURIComponent(s.name)}`} onClick={() => setMobileOpen(false)} className="px-5 py-3 rounded-xl text-xs font-bold text-black transition hover:scale-105" style={{ background: s.color }}>{s.name}</Link>)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}