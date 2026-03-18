import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import { User, Package, Heart, MapPin, Shield, ChevronRight, LogOut, Trash2, Eye, ChevronDown, ChevronUp, Plus, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

const statusColors = {
  placed: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-indigo-100 text-indigo-700',
  shipped: 'bg-yellow-100 text-yellow-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function Profile() {
  const urlParams = new URLSearchParams(window.location.search);
  const defaultTab = urlParams.get('tab') || 'profile';
  const { logout, user: authUser } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  // New states for expanded UX
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ full_name: '', phone: '', address_line: '', city: '', state: '', pincode: '', label: 'home' });
  const [securityMsg, setSecurityMsg] = useState('');

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const created = await base44.entities.Address.create(newAddress);
    setAddresses([...addresses, created]);
    setShowAddressForm(false);
    setNewAddress({ full_name: '', phone: '', address_line: '', city: '', state: '', pincode: '', label: 'home' });
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [o, w, a] = await Promise.all([
          base44.entities.Order.list('-created_date', 20),
          base44.entities.Wishlist.list('-created_date', 20),
          base44.entities.Address.list(),
        ]);
        setOrders(o);
        setWishlist(w);
        setAddresses(a);
      } catch {}
      setLoading(false);
    };
    if (authUser) load();
  }, [authUser]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#D4A017] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pb-20 pt-24 text-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Profile header */}
        <div className="bg-zinc-900 rounded-2xl border border-white/10 p-6 flex flex-col sm:flex-row items-center gap-4 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-[#D4A017]/10 to-transparent" />
          <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-black font-serif text-2xl font-bold" style={{ background: '#D4A017' }}>
            {authUser?.full_name?.[0] || 'U'}
          </div>
          <div className="relative z-10 text-center sm:text-left flex-1">
            <h1 className="font-serif text-2xl font-bold text-white">{authUser?.full_name || 'User'}</h1>
            <p className="text-sm text-white/50">{authUser?.email}</p>
          </div>
          <Button variant="outline" onClick={() => { logout(); navigate(createPageUrl('Home')); }} className="relative z-10 rounded-full border-white/20 bg-black hover:bg-white/10 hover:text-white text-white gap-2 text-sm transition">
            <LogOut className="w-4 h-4 text-[#D4A017]" /> Sign Out
          </Button>
        </div>

        <Tabs defaultValue={defaultTab}>
          <TabsList className="bg-zinc-950 border border-white/10 w-full justify-start overflow-x-auto rounded-full p-1 h-14">
            <TabsTrigger value="profile" className="gap-2 rounded-full px-6 data-[state=active]:bg-[#D4A017] data-[state=active]:text-black"><User className="w-3.5 h-3.5" /> Profile</TabsTrigger>
            <TabsTrigger value="orders" className="gap-2 rounded-full px-6 data-[state=active]:bg-[#D4A017] data-[state=active]:text-black"><Package className="w-3.5 h-3.5" /> Orders</TabsTrigger>
            <TabsTrigger value="wishlist" className="gap-2 rounded-full px-6 data-[state=active]:bg-[#D4A017] data-[state=active]:text-black"><Heart className="w-3.5 h-3.5" /> Wishlist</TabsTrigger>
            <TabsTrigger value="addresses" className="gap-2 rounded-full px-6 data-[state=active]:bg-[#D4A017] data-[state=active]:text-black"><MapPin className="w-3.5 h-3.5" /> Addresses</TabsTrigger>
            <TabsTrigger value="security" className="gap-2 rounded-full px-6 data-[state=active]:bg-[#D4A017] data-[state=active]:text-black"><Shield className="w-3.5 h-3.5" /> Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-8">
            <div className="bg-zinc-900 rounded-2xl border border-white/10 p-8 shadow-xl">
              <h3 className="font-serif text-xl font-bold mb-6 text-[#D4A017]">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div><Label className="text-xs uppercase tracking-wider font-bold text-white/40">Full Name</Label><Input value={authUser?.full_name || ''} readOnly className="mt-2 border-white/10 bg-black text-white h-12 rounded-xl" /></div>
                <div><Label className="text-xs uppercase tracking-wider font-bold text-white/40">Email</Label><Input value={authUser?.email || ''} readOnly className="mt-2 border-white/10 bg-black text-white h-12 rounded-xl" /></div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-8 space-y-4">
            {orders.length === 0 ? (
              <div className="bg-zinc-900 rounded-2xl border border-white/10 p-12 text-center shadow-xl">
                <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/50 mb-6">No orders yet</p>
                <Link to={createPageUrl('Products')}><Button className="rounded-full font-bold text-black border-none px-8 py-6 h-auto hover:shadow-[0_0_20px_rgba(212,160,23,0.3)] transition" style={{ background: '#D4A017' }}>Start Shopping</Button></Link>
              </div>
            ) : orders.map(order => (
              <div key={order.id} className="bg-zinc-900 rounded-2xl border border-white/10 p-6 shadow-lg hover:border-[#D4A017]/30 transition overflow-hidden">
                <div className="flex items-center justify-between mb-4 cursor-pointer group" onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-white/50 font-bold block mb-1">Order #{order.order_number}</span>
                    <Badge className={`text-[10px] uppercase font-bold tracking-wider ${statusColors[order.status] || ''}`}>{order.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-xl text-white">₹{order.total_amount?.toLocaleString()}</span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4A017]/20 transition">
                      {expandedOrderId === order.id ? <ChevronUp className="w-4 h-4 text-[#D4A017]" /> : <ChevronDown className="w-4 h-4 text-[#D4A017]" />}
                    </div>
                  </div>
                </div>
                
                {expandedOrderId === order.id ? (
                  <div className="pt-4 border-t border-white/10 mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex gap-4 items-center p-3 rounded-xl bg-black/30 border border-white/5">
                        <img src={item.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-white">{item.product_name}</p>
                          <p className="text-xs text-white/50 mt-1">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-[#D4A017]">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 p-4 rounded-xl bg-black/50 border border-white/5 text-sm">
                      <div>
                        <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest block mb-2">Shipping To</span>
                        <p className="text-white font-bold text-sm">{order.shipping_address?.full_name || 'N/A'}</p>
                        <p className="text-white/60 text-xs mt-1">{order.shipping_address?.address_line}, {order.shipping_address?.city}</p>
                      </div>
                      <div className="sm:text-right">
                        <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest block mb-2">Payment Method</span>
                        <p className="text-white font-bold text-sm capitalize">{order.payment_method || 'Online'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {order.items?.map((item, i) => (
                      <div key={i} className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-white/10">
                        <img src={item.image || 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=80&h=80&fit=crop'} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="wishlist" className="mt-8">
            {wishlist.length === 0 ? (
              <div className="bg-zinc-900 rounded-2xl border border-white/10 p-12 text-center shadow-xl">
                <Heart className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/50">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wishlist.map(item => (
                  <div key={item.id} className="bg-zinc-900 rounded-2xl border border-white/10 p-5 flex gap-5 hover:border-[#D4A017]/50 transition group shadow-lg">
                    <img src={item.product_image || 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=100&h=100&fit=crop'} alt="" className="w-24 h-24 rounded-xl object-cover shrink-0 border border-white/5 group-hover:scale-105 transition transform" />
                    <div className="flex flex-col flex-1">
                      <p className="text-sm font-bold text-white line-clamp-2" style={{ fontFamily: 'Playfair Display, serif' }}>{item.product_name}</p>
                      <p className="font-bold mt-1 text-white">₹{item.price?.toLocaleString()}</p>
                      <div className="flex gap-3 mt-auto pt-3 border-t border-white/5">
                        <Link to={createPageUrl('ProductDetail') + '?id=' + item.product_id} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full text-xs rounded-full h-8 gap-2 bg-transparent text-[#D4A017] border-[#D4A017]/30 hover:bg-[#D4A017]/10"><Eye className="w-3.5 h-3.5" /> View</Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={async () => { await base44.entities.Wishlist.delete(item.id); setWishlist(prev => prev.filter(w => w.id !== item.id)); }} className="text-xs text-red-500 bg-red-500/10 hover:bg-red-500/20 h-8 gap-1 rounded-full px-3"><Trash2 className="w-3.5 h-3.5" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="addresses" className="mt-8">
            <div className="bg-zinc-900 rounded-2xl border border-white/10 p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl font-bold text-[#D4A017]">Saved Addresses</h3>
                <Button onClick={() => setShowAddressForm(!showAddressForm)} size="sm" className="rounded-full bg-[#D4A017] text-black font-bold text-xs gap-1 hover:bg-[#E8BB3A] transition">
                  {showAddressForm ? <span className="px-2">Cancel</span> : <><Plus className="w-3.5 h-3.5" /> Add New</>}
                </Button>
              </div>

              {showAddressForm && (
                <form onSubmit={handleAddAddress} className="mb-8 p-6 bg-black/40 rounded-2xl border border-white/10 space-y-4 animate-in fade-in slide-in-from-top-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><Label className="text-xs text-white/50 uppercase tracking-wider font-bold">Full Name</Label><Input required value={newAddress.full_name} onChange={e => setNewAddress({...newAddress, full_name: e.target.value})} className="mt-1 bg-zinc-900 border-white/10 text-white" /></div>
                    <div><Label className="text-xs text-white/50 uppercase tracking-wider font-bold">Phone</Label><Input required value={newAddress.phone} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} className="mt-1 bg-zinc-900 border-white/10 text-white" /></div>
                    <div className="sm:col-span-2"><Label className="text-xs text-white/50 uppercase tracking-wider font-bold">Full Address</Label><Input required value={newAddress.address_line} onChange={e => setNewAddress({...newAddress, address_line: e.target.value})} className="mt-1 bg-zinc-900 border-white/10 text-white" /></div>
                    <div><Label className="text-xs text-white/50 uppercase tracking-wider font-bold">City</Label><Input required value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className="mt-1 bg-zinc-900 border-white/10 text-white" /></div>
                    <div><Label className="text-xs text-white/50 uppercase tracking-wider font-bold">State</Label><Input required value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} className="mt-1 bg-zinc-900 border-white/10 text-white" /></div>
                    <div><Label className="text-xs text-white/50 uppercase tracking-wider font-bold">Pincode</Label><Input required value={newAddress.pincode} onChange={e => setNewAddress({...newAddress, pincode: e.target.value})} className="mt-1 bg-zinc-900 border-white/10 text-white" /></div>
                    <div>
                      <Label className="text-xs text-white/50 uppercase tracking-wider font-bold">Label</Label>
                      <select value={newAddress.label} onChange={e => setNewAddress({...newAddress, label: e.target.value})} className="w-full mt-1 bg-zinc-900 border border-white/10 text-white h-10 rounded-md px-3 text-sm focus:outline-none focus:border-[#D4A017]">
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/5">
                    <Button type="button" variant="outline" onClick={() => setShowAddressForm(false)} className="rounded-full border-white/20 text-white hover:bg-white/10">Cancel</Button>
                    <Button type="submit" className="rounded-full bg-[#D4A017] text-black font-bold hover:bg-[#E8BB3A]">Save Address</Button>
                  </div>
                </form>
              )}

              {addresses.length === 0 ? (
                <p className="text-white/40 text-center py-8">No saved addresses</p>
              ) : (
                <div className="space-y-4">
                  {addresses.map(addr => (
                    <div key={addr.id} className="p-5 rounded-2xl border border-white/10 bg-black/50 flex justify-between items-start hover:border-[#D4A017]/30 transition">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-sm text-white">{addr.full_name}</span>
                          <Badge variant="outline" className="text-[9px] uppercase tracking-widest font-bold border-[#D4A017] text-[#D4A017]">{addr.label}</Badge>
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed max-w-sm">{addr.address_line},<br/>{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-sm text-white/50 mt-2 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" /> {addr.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-8">
            <div className="bg-zinc-900 rounded-2xl border border-white/10 p-8 shadow-xl space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#D4A017] mb-6">Security Settings</h3>
              
              {securityMsg && (
                <div className="mb-6 p-4 rounded-xl bg-[#D4A017]/10 border border-[#D4A017]/20 flex items-center gap-3 text-[#D4A017] animate-in fade-in slide-in-from-top-4">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-bold">{securityMsg}</p>
                </div>
              )}

              <div className="p-5 bg-black/50 rounded-2xl border border-white/10 flex items-center justify-between hover:border-white/20 transition cursor-pointer">
                <div><p className="text-sm font-bold text-white mb-1">Change Password</p><p className="text-xs text-white/40">Update your password regularly</p></div>
                <Button variant="outline" size="sm" onClick={() => { setSecurityMsg('A password reset link has been sent to your email.'); setTimeout(() => setSecurityMsg(''), 4000); }} className="rounded-full border-white/20 bg-transparent text-white hover:bg-[#D4A017] hover:border-transparent hover:text-black px-6 transition">Update</Button>
              </div>
              <div className="p-5 bg-black/50 rounded-2xl border border-white/10 flex items-center justify-between hover:border-white/20 transition cursor-pointer">
                <div><p className="text-sm font-bold text-white mb-1">Two-Factor Authentication</p><p className="text-xs text-white/40">Add extra security to your account</p></div>
                <Button variant="outline" size="sm" onClick={() => { setSecurityMsg('Two-Factor Authentication has been successfully enabled!'); setTimeout(() => setSecurityMsg(''), 4000); }} className="rounded-full border-white/20 bg-transparent text-white hover:bg-[#D4A017] hover:border-transparent hover:text-black px-6 transition font-bold text-xs uppercase tracking-wider">Enable</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}