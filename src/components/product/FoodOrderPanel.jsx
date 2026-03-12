import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart, Zap, Flame, Leaf, Clock, AlertTriangle, ChevronDown, ChevronUp, UtensilsCrossed, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';

const SPICE_LABELS = ['', 'Mild', 'Medium', 'Spicy', 'Very Spicy', '🔥 Extra Hot'];

export default function FoodOrderPanel({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState({});
  const [addedToCart, setAddedToCart] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  const extraCost = Object.values(selectedCustomizations).reduce((sum, opt) => {
    const custGroup = product.customizations?.find(c => c.options?.includes(opt));
    return sum + (custGroup?.extra_cost || 0);
  }, 0);

  const pricePerPlate = product.price + extraCost;
  const totalPrice = pricePerPlate * quantity;
  const isSpoilRisk = product.shelf_life_days && (product.delivery_days_max || 7) >= product.shelf_life_days;

  const handleAddToCart = async () => {
    await base44.entities.CartItem.create({
      product_id: product.id,
      product_name: product.name,
      product_image: product.images?.[0] || '',
      price: pricePerPlate,
      quantity,
      artisan_name: product.artisan_name,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleBuyNow = async () => {
    await base44.entities.CartItem.create({
      product_id: product.id,
      product_name: product.name,
      product_image: product.images?.[0] || '',
      price: pricePerPlate,
      quantity,
      artisan_name: product.artisan_name,
    });
    window.location.href = createPageUrl('Checkout');
  };

  return (
    <div className="mt-4 space-y-4">

      {/* Veg / Non-veg + Meal type */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border-2 ${product.is_veg !== false ? 'border-green-600 text-green-700 bg-green-50' : 'border-red-600 text-red-700 bg-red-50'}`}>
          <span className={`w-3 h-3 rounded-full inline-block ${product.is_veg !== false ? 'bg-green-600' : 'bg-red-600'}`} />
          {product.is_veg !== false ? 'Vegetarian' : 'Non-Vegetarian'}
        </span>
        {product.meal_type && (
          <Badge variant="outline" className="capitalize text-xs border-[var(--border-warm)]">
            {product.meal_type}
          </Badge>
        )}
        {product.calories_per_serving && (
          <span className="flex items-center gap-1 text-xs text-[var(--text-muted)] bg-[var(--cream-dark)] px-3 py-1 rounded-full">
            🔥 {product.calories_per_serving} kcal {product.serving_size ? `/ ${product.serving_size}` : '/ serving'}
          </span>
        )}
      </div>

      {/* Spice level */}
      {product.spice_level > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--text-muted)] font-medium">Spice Level:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(lvl => (
              <Flame key={lvl} className={`w-4 h-4 ${lvl <= product.spice_level ? 'text-orange-500 fill-orange-500' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-xs font-medium text-orange-600">{SPICE_LABELS[product.spice_level]}</span>
        </div>
      )}

      {/* Shelf life warning */}
      {product.is_perishable && product.shelf_life_days && (
        <div className={`flex items-start gap-2 p-3 rounded-xl text-sm ${isSpoilRisk ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-amber-50 border border-amber-200 text-amber-800'}`}>
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold">{isSpoilRisk ? '⚠️ Delivery Risk!' : '⏱ Freshness Notice'}</span>
            <p className="text-xs mt-0.5">
              {isSpoilRisk
                ? `Delivery takes ${product.delivery_days_max} days but this item stays fresh for only ${product.shelf_life_days} days. Order only if within city.`
                : `Best consumed within ${product.shelf_life_days} days of delivery. Store in a cool, dry place.`}
            </p>
          </div>
        </div>
      )}

      {/* Combo includes */}
      {product.combo_includes?.length > 0 && (
        <div className="p-4 rounded-xl bg-[var(--cream-dark)] border border-[var(--border-warm)]/50">
          <p className="text-xs font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
            <UtensilsCrossed className="w-3.5 h-3.5" /> Combo Includes
          </p>
          <ul className="grid grid-cols-2 gap-1.5">
            {product.combo_includes.map((item, i) => (
              <li key={i} className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--banana-leaf)] inline-block" /> {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Customizations */}
      {product.customizations?.length > 0 && (
        <div className="border border-[var(--border-warm)]/60 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowCustom(!showCustom)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[var(--text-primary)] bg-white"
          >
            <span>Customize Your Order</span>
            {showCustom ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showCustom && (
            <div className="px-4 pb-4 pt-2 bg-white space-y-4">
              {product.customizations.map((group, gi) => (
                <div key={gi}>
                  <p className="text-xs font-semibold text-[var(--text-primary)] mb-2">
                    {group.name} {group.extra_cost > 0 && <span className="text-[var(--text-muted)] font-normal">(+₹{group.extra_cost})</span>}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.options?.map((opt, oi) => {
                      const isSelected = selectedCustomizations[group.name] === opt;
                      return (
                        <button
                          key={oi}
                          onClick={() => setSelectedCustomizations(prev => ({
                            ...prev,
                            [group.name]: isSelected ? null : opt
                          }))}
                          className={`px-3 py-1.5 rounded-full text-xs border transition ${isSelected ? 'bg-[var(--tamarind)] text-white border-[var(--tamarind)]' : 'border-[var(--border-warm)] text-[var(--text-secondary)] hover:border-[var(--tamarind)]'}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Serving size + Price box */}
      <div className="p-4 rounded-xl bg-white border border-[var(--border-warm)]/50">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-[var(--text-primary)]">₹{pricePerPlate.toLocaleString()}</span>
          {product.serving_size && (
            <span className="text-sm text-[var(--text-muted)]">per {product.serving_size}</span>
          )}
          {extraCost > 0 && (
            <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">incl. +₹{extraCost} add-ons</span>
          )}
        </div>

        {/* Quantity selector */}
        <div className="flex items-center gap-4 mt-4">
          <span className="text-sm font-medium text-[var(--text-primary)]">
            {product.serving_size ? 'Plates / Qty:' : 'Quantity:'}
          </span>
          <div className="flex items-center border border-[var(--border-warm)] rounded-full overflow-hidden">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-[var(--cream-dark)] transition">
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 text-sm font-bold border-x border-[var(--border-warm)]">{quantity}</span>
            <button onClick={() => setQuantity(Math.min(product.stock || 20, quantity + 1))} className="px-3 py-2 hover:bg-[var(--cream-dark)] transition">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {quantity > 1 && (
            <span className="text-sm text-[var(--text-muted)]">= <span className="font-bold text-[var(--text-primary)]">₹{totalPrice.toLocaleString()}</span></span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-4">
          <Button
            onClick={handleAddToCart}
            className="flex-1 h-12 rounded-full bg-white hover:bg-[var(--cream-dark)] text-[var(--tamarind)] border-2 border-[var(--tamarind)] font-semibold gap-2"
            variant="outline"
          >
            <ShoppingCart className="w-5 h-5" />
            {addedToCart ? '✓ Added!' : 'Add to Meal'}
          </Button>
          <Button
            onClick={handleBuyNow}
            className="flex-1 h-12 rounded-full bg-[var(--chili)] hover:bg-[var(--chili-dark)] text-white font-semibold gap-2"
          >
            <Zap className="w-5 h-5" />
            Order Now
          </Button>
        </div>
      </div>

      {/* Delivery estimate */}
      <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] px-1">
        <Clock className="w-4 h-4 text-[var(--banana-leaf)]" />
        {product.is_perishable
          ? `Same-day / next-day delivery recommended for freshness`
          : `Estimated delivery: ${product.delivery_days_min || 3}–${product.delivery_days_max || 7} business days`}
      </div>
    </div>
  );
}