import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useAuth } from '@/lib/AuthContext';
import { Eye, EyeOff, Upload, Shield, User, Store, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const { login, register, isAuthenticated, user, userType, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('customer');
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [customerForm, setCustomerForm] = useState({ full_name: '', email: '', password: '', phone: '' });

  const [sellerForm, setSellerForm] = useState({
    full_name: '', email: '', password: '', phone: '',
    business_name: '', business_type: 'individual',
    gov_id_type: 'aadhaar', gov_id_number: '',
    bank_name: '', bank_account: '', ifsc: '',
    address: '', state: '', pincode: '',
    id_file_name: ''
  });

  const [sellerStep, setSellerStep] = useState(0);

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-black">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-sm w-full text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-[#D4A017]/20 border border-[#D4A017]/50">
            <CheckCircle2 className="w-10 h-10 text-[#D4A017]" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-white">Welcome, {user.full_name}!</h2>
          <p className="text-sm mt-2 text-white/50">Logged in as {userType === 'seller' ? 'Verified Seller' : 'Customer'}</p>
          <div className="flex flex-col gap-3 mt-8">
            <Link to={createPageUrl('Products')}>
              <Button className="w-full rounded-full h-12 text-black font-bold hover:bg-[#D4A017]/90" style={{ background: '#D4A017' }}>Browse Products <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
            <Button variant="outline" onClick={logout} className="w-full rounded-full h-12 bg-transparent border-white/20 text-white hover:bg-white/5 hover:text-white">Sign Out</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    if (!customerForm.email || !customerForm.password || (isRegister && !customerForm.full_name)) return;
    setLoading(true);
    setTimeout(() => {
      login({ full_name: customerForm.full_name || customerForm.email.split('@')[0], email: customerForm.email, phone: customerForm.phone }, 'customer');
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate(createPageUrl('Home')), 1500);
    }, 800);
  };

  const isSellerStepValid = () => {
    if (sellerStep === 0) return sellerForm.full_name && sellerForm.email && sellerForm.password && sellerForm.phone;
    if (sellerStep === 1) return sellerForm.business_name && sellerForm.address;
    if (sellerStep === 2) return sellerForm.gov_id_number && sellerForm.id_file_name;
    return false;
  };

  const handleSellerSubmit = (e) => {
    e.preventDefault();
    if (!isSellerStepValid()) return;
    if (sellerStep < 2) { setSellerStep(sellerStep + 1); return; }
    
    setLoading(true);
    setTimeout(() => {
      login({ full_name: sellerForm.full_name || sellerForm.business_name, email: sellerForm.email, phone: sellerForm.phone, business_name: sellerForm.business_name, gov_id_type: sellerForm.gov_id_type, is_verified: true }, 'seller');
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate(createPageUrl('Home')), 1500);
    }, 1200);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-black">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-[#D4A017]/20 border border-[#D4A017]/50">
            <CheckCircle2 className="w-10 h-10 text-[#D4A017]" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-white">{activeTab === 'seller' ? 'Seller Account Verified!' : 'Welcome to Rural Bazaar!'}</h2>
          <p className="text-sm mt-3 text-white/50">Redirecting you to home...</p>
        </motion.div>
      </div>
    );
  }

  const inputClasses = "mt-1 rounded-xl bg-zinc-900 border-white/10 text-white placeholder-white/20 focus:border-[#D4A017] focus:ring-[#D4A017]/20 h-12";
  const labelClasses = "text-xs font-bold uppercase tracking-wider text-[#D4A017]/70";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#D4A017]/20 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-[#D4A017]/10 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to={createPageUrl('Home')} className="inline-flex items-center gap-3 mb-8 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(212,160,23,0.3)] transition transform group-hover:scale-105" style={{ background: 'linear-gradient(135deg, #D4A017, #E8BB3A)' }}>
              <span className="text-black font-black text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>R</span>
            </div>
            <span className="font-bold text-xl text-white tracking-widest uppercase text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>Rural Bazaar</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-white">{isRegister ? 'Create Account' : 'Welcome Back'}</h1>
          <p className="text-sm mt-2 text-white/40">{isRegister ? 'Join our heritage artisan community.' : 'Sign in to discover authentic crafts.'}</p>
        </div>

        <div className="flex rounded-full p-1 mb-8 bg-zinc-900 border border-white/10">
          <button onClick={() => { setActiveTab('customer'); setSellerStep(0); }} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'customer' ? 'bg-[#D4A017] text-black shadow-lg' : 'text-white/40 hover:text-white'}`}>
            <User className="w-4 h-4" /> Customer
          </button>
          <button onClick={() => setActiveTab('seller')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'seller' ? 'bg-[#D4A017] text-black shadow-lg' : 'text-white/40 hover:text-white'}`}>
            <Store className="w-4 h-4" /> Seller
          </button>
        </div>

        <div className="bg-zinc-950/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            {activeTab === 'customer' ? (
              <motion.form key="customer" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleCustomerSubmit} className="space-y-5">
                {isRegister && (
                  <div>
                    <Label className={labelClasses}>Full Name</Label>
                    <Input value={customerForm.full_name} onChange={e => setCustomerForm({...customerForm, full_name: e.target.value})} placeholder="Enter your name" className={inputClasses} />
                  </div>
                )}
                <div>
                  <Label className={labelClasses}>Email *</Label>
                  <Input type="email" required value={customerForm.email} onChange={e => setCustomerForm({...customerForm, email: e.target.value})} placeholder="you@example.com" className={inputClasses} />
                </div>
                <div>
                  <Label className={labelClasses}>Password *</Label>
                  <div className="relative mt-1">
                    <Input type={showPassword ? 'text' : 'password'} required value={customerForm.password} onChange={e => setCustomerForm({...customerForm, password: e.target.value})} placeholder="Min 6 characters" className={`${inputClasses} mt-0 pr-12`} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {isRegister && (
                  <div>
                    <Label className={labelClasses}>Phone</Label>
                    <Input value={customerForm.phone} onChange={e => setCustomerForm({...customerForm, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" className={inputClasses} />
                  </div>
                )}
                <Button type="submit" disabled={loading || (!customerForm.email || !customerForm.password || (isRegister && !customerForm.full_name))} className="w-full h-14 mt-6 rounded-xl font-bold gap-2 text-black text-base hover:bg-[#E8BB3A] transition disabled:opacity-50" style={{ backgroundColor: '#D4A017' }}>
                  {loading ? 'Authenticating...' : (isRegister ? 'Join Rural Bazaar' : 'Sign In')} <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.form>
            ) : (
              <motion.form key="seller" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSellerSubmit} className="space-y-5">
                <div className="flex justify-between mb-6 relative">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2" />
                  {['Account', 'Business', 'Verify'].map((s, i) => (
                    <div key={s} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i <= sellerStep ? 'bg-[#D4A017] text-black' : 'bg-zinc-900 border border-white/20 text-white/40'}`}>
                        {i < sellerStep ? '✓' : i + 1}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${i <= sellerStep ? 'text-[#D4A017]' : 'text-white/40'}`}>{s}</span>
                    </div>
                  ))}
                </div>

                {sellerStep === 0 && (
                  <>
                    <div><Label className={labelClasses}>Full Name *</Label><Input required value={sellerForm.full_name} onChange={e => setSellerForm({...sellerForm, full_name: e.target.value})} className={inputClasses} /></div>
                    <div><Label className={labelClasses}>Email *</Label><Input type="email" required value={sellerForm.email} onChange={e => setSellerForm({...sellerForm, email: e.target.value})} className={inputClasses} /></div>
                    <div><Label className={labelClasses}>Password *</Label><Input type="password" required value={sellerForm.password} onChange={e => setSellerForm({...sellerForm, password: e.target.value})} className={inputClasses} /></div>
                    <div><Label className={labelClasses}>Phone *</Label><Input required value={sellerForm.phone} onChange={e => setSellerForm({...sellerForm, phone: e.target.value})} className={inputClasses} /></div>
                  </>
                )}

                {sellerStep === 1 && (
                  <>
                    <div><Label className={labelClasses}>Business Name *</Label><Input required value={sellerForm.business_name} onChange={e => setSellerForm({...sellerForm, business_name: e.target.value})} placeholder="Your craft business name" className={inputClasses} /></div>
                    <div>
                      <Label className={labelClasses}>Business Type</Label>
                      <select value={sellerForm.business_type} onChange={e => setSellerForm({...sellerForm, business_type: e.target.value})} className={`${inputClasses} w-full px-4`}>
                        <option value="individual">Individual Artisan</option>
                        <option value="cooperative">Artisan Cooperative</option>
                        <option value="ngo">NGO / Self-Help Group</option>
                      </select>
                    </div>
                    <div><Label className={labelClasses}>Address *</Label><Input required value={sellerForm.address} onChange={e => setSellerForm({...sellerForm, address: e.target.value})} className={inputClasses} /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label className={labelClasses}>State</Label><Input value={sellerForm.state} onChange={e => setSellerForm({...sellerForm, state: e.target.value})} className={inputClasses} /></div>
                      <div><Label className={labelClasses}>Pincode</Label><Input value={sellerForm.pincode} onChange={e => setSellerForm({...sellerForm, pincode: e.target.value})} maxLength={6} className={inputClasses} /></div>
                    </div>
                  </>
                )}

                {sellerStep === 2 && (
                  <>
                    <div className="p-4 rounded-xl flex items-start gap-4 bg-[#D4A017]/10 border border-[#D4A017]/20 mb-6">
                      <Shield className="w-5 h-5 shrink-0 mt-0.5 text-[#D4A017]" />
                      <div>
                        <p className="text-sm font-bold text-[#D4A017]">Govt. ID Verification</p>
                        <p className="text-xs mt-1 text-white/50">Required for the authenticity badge.</p>
                      </div>
                    </div>
                    <div>
                      <Label className={labelClasses}>ID Type *</Label>
                      <select value={sellerForm.gov_id_type} onChange={e => setSellerForm({...sellerForm, gov_id_type: e.target.value})} className={`${inputClasses} w-full px-4`}>
                        <option value="aadhaar">Aadhaar Card</option>
                        <option value="pan">PAN Card</option>
                        <option value="voter">Voter ID</option>
                      </select>
                    </div>
                    <div>
                      <Label className={labelClasses}>ID Number *</Label>
                      <Input required value={sellerForm.gov_id_number} onChange={e => setSellerForm({...sellerForm, gov_id_number: e.target.value})} placeholder="Enter your ID number" className={inputClasses} />
                    </div>
                    <div>
                      <Label className={labelClasses}>Upload Document *</Label>
                      <div className="mt-2 relative p-6 rounded-xl border-2 border-dashed border-white/20 text-center cursor-pointer hover:border-[#D4A017]/50 transition bg-white/5">
                        <input type="file" required accept=".jpg,.jpeg,.png,.pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => setSellerForm({...sellerForm, id_file_name: e.target.files[0]?.name || ''})} />
                        <Upload className={`w-6 h-6 mx-auto mb-2 ${sellerForm.id_file_name ? 'text-[#D4A017]' : 'text-white/40'}`} />
                        <p className={`text-sm ${sellerForm.id_file_name ? 'text-[#D4A017] font-bold' : 'text-white/60'}`}>{sellerForm.id_file_name || 'Click to upload document'}</p>
                        {!sellerForm.id_file_name && <p className="text-[10px] mt-1 text-white/30 tracking-wider uppercase">JPG, PNG or PDF</p>}
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-4 pt-4 mt-8 pt-6 border-t border-white/10">
                  {sellerStep > 0 && (
                    <Button type="button" variant="outline" onClick={() => setSellerStep(sellerStep - 1)} className="flex-1 h-14 rounded-xl border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent">
                      Back
                    </Button>
                  )}
                  <Button type="submit" disabled={loading || !isSellerStepValid()} className="flex-1 h-14 rounded-xl font-bold gap-2 text-black text-sm transition hover:bg-[#E8BB3A] disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundColor: '#D4A017' }}>
                    {loading ? 'Processing...' : sellerStep < 2 ? 'Continue' : 'Verify & Setup Store'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {activeTab === 'customer' && (
          <div className="text-center mt-8">
            <span className="text-sm text-white/40">{isRegister ? 'Already have an account? ' : "New to Rural Bazaar? "}</span>
            <button onClick={() => setIsRegister(!isRegister)} className="text-sm font-bold text-[#D4A017] hover:text-[#E8BB3A] transition hover:underline">
              {isRegister ? 'Sign In' : 'Create an Account'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
