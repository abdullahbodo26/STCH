import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Plus, Minus, ShoppingBag, ArrowRight, Truck, Gift } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

const FREE_DELIVERY_THRESHOLD = 1000

export default function Cart() {
  const { items, total, updateQty, removeItem, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')

  const discount = promoApplied ? Math.round(total * 0.1) : 0
  const delivery = total - discount >= FREE_DELIVERY_THRESHOLD ? 0 : 80
  const finalTotal = total - discount + delivery

  function applyPromo() {
    if (promoCode.trim().toUpperCase() === 'STCH10') {
      setPromoApplied(true)
      setPromoError('')
    } else {
      setPromoError('Invalid promo code. Try STCH10 for 10% off!')
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag size={64} className="text-sand/40 mx-auto mb-6" strokeWidth={1} />
          <h1 className="font-display text-3xl text-bark font-semibold mb-3">Your cart is empty</h1>
          <p className="text-bark/55 mb-8">You haven't added anything yet. Let's fix that.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/shop" className="btn-primary">
              <ShoppingBag size={16} /> Browse Products
            </Link>
            <Link to="/configure" className="btn-outline">
              Build Custom
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-subtitle mb-2">Review</p>
            <h1 className="section-title">Your Cart</h1>
          </div>
          <button onClick={clearCart} className="text-sm text-bark/40 hover:text-bark transition-colors flex items-center gap-1">
            <X size={13} /> Clear all
          </button>
        </div>

        {/* Free delivery banner */}
        {total < FREE_DELIVERY_THRESHOLD && (
          <div className="mb-6 px-4 py-3 bg-sand/15 border border-sand/30 text-sm text-bark flex items-center gap-2">
            <Truck size={15} className="text-sand-dark shrink-0" />
            Add <strong className="mx-1">EGP {FREE_DELIVERY_THRESHOLD - total}</strong> more for free delivery.
          </div>
        )}
        {total >= FREE_DELIVERY_THRESHOLD && (
          <div className="mb-6 px-4 py-3 bg-sage/10 border border-sage/30 text-sm text-bark flex items-center gap-2">
            <Truck size={15} className="text-sage-dark shrink-0" />
            You've unlocked <strong className="ml-1">free delivery!</strong>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">

          {/* Items */}
          <div className="space-y-4">
            {items.map(item => (
              <CartItem key={item.cartId} item={item} onUpdateQty={updateQty} onRemove={removeItem} />
            ))}
          </div>

          {/* Summary */}
          <div className="self-start space-y-4">
            <div className="bg-white border border-sand/20 p-6">
              <h2 className="font-semibold text-bark mb-5 uppercase tracking-widest text-sm">Order Summary</h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-bark/60">Subtotal</span>
                  <span className="font-medium text-bark">{formatPrice(total, 'EGP')}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sage-dark">
                    <span>Promo (STCH10)</span>
                    <span>−{formatPrice(discount, 'EGP')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-bark/60">Delivery</span>
                  <span className={`font-medium ${delivery === 0 ? 'text-sage-dark' : 'text-bark'}`}>
                    {delivery === 0 ? 'Free' : formatPrice(delivery, 'EGP')}
                  </span>
                </div>
                <div className="border-t border-sand/20 pt-3 flex justify-between font-semibold">
                  <span className="text-bark">Total</span>
                  <span className="font-display text-xl text-bark">{formatPrice(finalTotal, 'EGP')}</span>
                </div>
              </div>

              {/* Promo code */}
              {!promoApplied ? (
                <div className="mb-5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="input-field text-sm py-2"
                      onKeyDown={e => e.key === 'Enter' && applyPromo()}
                    />
                    <button
                      onClick={applyPromo}
                      className="px-4 py-2 bg-bark text-ivory text-sm font-medium hover:bg-bark-dark transition-colors whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-xs text-red-500 mt-1">{promoError}</p>}
                </div>
              ) : (
                <div className="mb-5 flex items-center gap-2 text-sm text-sage-dark">
                  <span>✓</span> Promo code applied (10% off)
                  <button
                    onClick={() => { setPromoApplied(false); setPromoCode('') }}
                    className="ml-auto text-bark/40 hover:text-bark text-xs"
                  >
                    Remove
                  </button>
                </div>
              )}

              <button className="btn-primary w-full justify-center py-4 text-base">
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              <div className="mt-4 text-center">
                <Link to="/shop" className="text-sm text-bark/50 hover:text-bark transition-colors flex items-center justify-center gap-1">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Trust signals */}
            <div className="bg-ivory-dark border border-sand/20 p-5 space-y-3 text-xs text-bark/60">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-sand-dark shrink-0" />
                Free delivery on orders over EGP 1,000
              </div>
              <div className="flex items-center gap-2">
                <Gift size={14} className="text-sand-dark shrink-0" />
                Gift wrap available for custom orders
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag size={14} className="text-sand-dark shrink-0" />
                Secure payment · Cash on delivery available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CartItem({ item, onUpdateQty, onRemove }) {
  return (
    <div className="flex gap-4 bg-white border border-sand/20 p-4">
      {/* Preview */}
      <div className="w-20 h-20 shrink-0 bg-ivory-dark overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-bark/20 text-xs text-center px-1">
          {item.material}
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-bark">{item.name}</h3>
          <button
            onClick={() => onRemove(item.cartId)}
            className="text-bark/30 hover:text-bark transition-colors shrink-0"
            aria-label="Remove item"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-1 space-y-0.5 text-xs text-bark/50">
          <p>Material: {item.material}</p>
          {item.slots && <p>Capacity: {item.slots} cards</p>}
          {item.design && item.design !== 'None' && <p>Engraving: {item.design}</p>}
          {item.customText && <p>"{item.customText}"</p>}
          {item.giftWrap && <p className="text-sand-dark">Gift wrapped</p>}
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-sand/30">
            <button
              onClick={() => onUpdateQty(item.cartId, item.qty - 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-sand/10 transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-sm font-medium text-bark">{item.qty}</span>
            <button
              onClick={() => onUpdateQty(item.cartId, item.qty + 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-sand/10 transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>
          <p className="font-semibold text-bark">{formatPrice(item.price * item.qty, 'EGP')}</p>
        </div>
      </div>
    </div>
  )
}
