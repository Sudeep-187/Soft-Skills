import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown } from 'lucide-react';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setCatOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => { if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const productsUrl = createPageUrl('Products');

  return (
    <>
      {/* Main navbar — dark transparent glass */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3 shrink-0 group">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all group-hover:shadow-[0_0_20px_rgba(212,160,23,0.3)]"
                style={{ background: 'linear-gradient(135deg, #D4A017, #E8BB3A)' }}>
                <span className="text-black font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>R</span>
              </div>
              <div>
                <div className="font-bold text-sm text-white tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Rural Bazaar
                </div>
                <div className="text-[8px] tracking-[0.25em] uppercase text-white/30">
                  South India
                </div>
              </div>
            </Link>

            {/* Center links */}
            <div className="hidden md:flex items-center gap-1">
              <Link to={createPageUrl('Home')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${location.pathname === '/' || location.pathname.includes('Home') ? 'text-white bg-white/10' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                Home
              </Link>

              {/* Categories dropdown */}
              <div ref={catRef} className="relative">
                <button
                  onClick={() => setCatOpen(!catOpen)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${catOpen ? 'text-white bg-white/10' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                  Crafts <ChevronDown className={`w-3 h-3 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
                </button>
                {catOpen && (
                  <div className="absolute top-full left-0 mt-3 w-52 rounded-2xl shadow-2xl py-2 z-50"
                    style={{ background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {categories.map(c => (
                      <Link key={c.name} to={`${productsUrl}${c.href}`}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition">
                        <span>{c.icon}</span> {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to={productsUrl}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${location.pathname.includes('Products') ? 'text-white bg-white/10' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                Shop All
              </Link>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <Link to={`${productsUrl}?search=`}
                className="p-2.5 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition">
                <Search className="w-4 h-4" />
              </Link>

              {/* Wishlist */}
              <Link to={createPageUrl('Wishlist')}
                className="hidden sm:flex p-2.5 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition">
                <Heart className="w-4 h-4" />
              </Link>

              {/* Cart */}
              <Link to={createPageUrl('Cart')}
                className="p-2.5 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition">
                <ShoppingCart className="w-4 h-4" />
              </Link>

              {/* CTA */}
              <Link to={productsUrl}
                className="hidden md:inline-flex px-5 py-2 rounded-full text-xs font-bold text-black transition-all hover:shadow-[0_0_20px_rgba(212,160,23,0.4)]"
                style={{ background: '#D4A017' }}>
                Explore
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden ml-1 p-2.5 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu — fullscreen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)' }} />
          <div className="relative h-full overflow-y-auto pt-24 px-8 pb-12" onClick={e => e.stopPropagation()}>

            <div className="flex flex-col gap-1 mb-8">
              {[
                { label: 'Home', href: createPageUrl('Home') },
                { label: 'Shop All', href: productsUrl },
                { label: 'Wishlist', href: createPageUrl('Wishlist') },
                { label: 'Cart', href: createPageUrl('Cart') },
              ].map(l => (
                <Link key={l.label} to={l.href}
                  className="text-3xl font-bold text-white/80 hover:text-white py-2 transition"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  {l.label}
                </Link>
              ))}
            </div>

            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3">Categories</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(c => (
                <Link key={c.name} to={`${productsUrl}${c.href}`}
                  className="px-4 py-2 rounded-full text-xs text-white/50 hover:text-white transition"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                  {c.icon} {c.name}
                </Link>
              ))}
            </div>

            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3">Shop by State</p>
            <div className="flex flex-wrap gap-2">
              {states.map(s => (
                <Link key={s.name} to={`${productsUrl}?state=${encodeURIComponent(s.name)}`}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-white transition"
                  style={{ background: s.color }}>
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}