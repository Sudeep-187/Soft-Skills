import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { User, Package, Heart, MapPin, Shield, ChevronRight, LogOut, Trash2, Eye } from 'lucide-react';
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
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
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
    load();
  }, []);

  if (loading) {
    return (
      <div className="bg-[var(--cream)] min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[var(--terracotta)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[var(--cream)] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Profile header */}
        <div className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-6 flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full gradient-warm flex items-center justify-center text-white font-serif text-2xl font-bold">
            {user?.full_name?.[0] || 'U'}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="font-serif text-xl font-bold text-[var(--text-primary)]">{user?.full_name || 'User'}</h1>
            <p className="text-sm text-[var(--text-muted)]">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={() => base44.auth.logout()} className="rounded-full border-[var(--border-warm)] gap-2 text-sm">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>

        <Tabs defaultValue={defaultTab}>
          <TabsList className="bg-[var(--cream-dark)] border border-[var(--border-warm)]/50 w-full justify-start overflow-x-auto">
            <TabsTrigger value="profile" className="gap-1.5"><User className="w-3.5 h-3.5" /> Profile</TabsTrigger>
            <TabsTrigger value="orders" className="gap-1.5"><Package className="w-3.5 h-3.5" /> Orders</TabsTrigger>
            <TabsTrigger value="wishlist" className="gap-1.5"><Heart className="w-3.5 h-3.5" /> Wishlist</TabsTrigger>
            <TabsTrigger value="addresses" className="gap-1.5"><MapPin className="w-3.5 h-3.5" /> Addresses</TabsTrigger>
            <TabsTrigger value="security" className="gap-1.5"><Shield className="w-3.5 h-3.5" /> Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <div className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-6">
              <h3 className="font-serif text-lg font-bold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label className="text-xs text-[var(--text-muted)]">Full Name</Label><Input value={user?.full_name || ''} readOnly className="mt-1 border-[var(--border-warm)] bg-[var(--cream)]" /></div>
                <div><Label className="text-xs text-[var(--text-muted)]">Email</Label><Input value={user?.email || ''} readOnly className="mt-1 border-[var(--border-warm)] bg-[var(--cream)]" /></div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-6 space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-10 text-center">
                <Package className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3" />
                <p className="text-[var(--text-muted)]">No orders yet</p>
                <Link to={createPageUrl('Products')}><Button className="mt-4 rounded-full bg-[var(--terracotta)] text-white">Start Shopping</Button></Link>
              </div>
            ) : orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs text-[var(--text-muted)]">Order #{order.order_number}</span>
                    <Badge className={`ml-2 text-xs ${statusColors[order.status] || ''}`}>{order.status}</Badge>
                  </div>
                  <span className="font-bold">₹{order.total_amount?.toLocaleString()}</span>
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {order.items?.map((item, i) => (
                    <img key={i} src={item.image || 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=80&h=80&fit=crop'} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="wishlist" className="mt-6">
            {wishlist.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-10 text-center">
                <Heart className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3" />
                <p className="text-[var(--text-muted)]">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlist.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-4 flex gap-4">
                    <img src={item.product_image || 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=100&h=100&fit=crop'} alt="" className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">{item.product_name}</p>
                      <p className="font-bold mt-1">₹{item.price?.toLocaleString()}</p>
                      <div className="flex gap-2 mt-2">
                        <Link to={createPageUrl('ProductDetail') + '?id=' + item.product_id}>
                          <Button variant="outline" size="sm" className="text-xs rounded-full h-7 gap-1"><Eye className="w-3 h-3" /> View</Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={async () => { await base44.entities.Wishlist.delete(item.id); setWishlist(prev => prev.filter(w => w.id !== item.id)); }} className="text-xs text-red-400 h-7 gap-1"><Trash2 className="w-3 h-3" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="addresses" className="mt-6">
            <div className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-6">
              {addresses.length === 0 ? (
                <p className="text-[var(--text-muted)] text-center py-6">No saved addresses</p>
              ) : (
                <div className="space-y-3">
                  {addresses.map(addr => (
                    <div key={addr.id} className="p-4 rounded-xl border border-[var(--border-warm)] flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{addr.full_name}</span>
                          <Badge variant="outline" className="text-[10px] capitalize">{addr.label}</Badge>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{addr.address_line}, {addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-xs text-[var(--text-muted)]">{addr.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="bg-white rounded-2xl border border-[var(--border-warm)]/50 p-6 space-y-4">
              <h3 className="font-serif text-lg font-bold">Security Settings</h3>
              <div className="p-4 rounded-xl border border-[var(--border-warm)] flex items-center justify-between">
                <div><p className="text-sm font-medium">Change Password</p><p className="text-xs text-[var(--text-muted)]">Update your password regularly</p></div>
                <Button variant="outline" size="sm" className="rounded-full border-[var(--border-warm)]">Update</Button>
              </div>
              <div className="p-4 rounded-xl border border-[var(--border-warm)] flex items-center justify-between">
                <div><p className="text-sm font-medium">Two-Factor Authentication</p><p className="text-xs text-[var(--text-muted)]">Add extra security to your account</p></div>
                <Button variant="outline" size="sm" className="rounded-full border-[var(--border-warm)]">Enable</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}