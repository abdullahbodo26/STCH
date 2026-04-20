import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag, ArrowLeft, Pencil } from 'lucide-react'
import { products, getStockStatus, formatPrice } from '../data/products'
import ProductImage from '../components/ProductImage'
import { useCart } from '../context/CartContext'

export default function Shop() {
  const { id } = useParams()
  if (id) return <ProductDetail id={id} />
  return <ShopGrid />
}

function ShopGrid() {
  return (
    <div className="min-h-screen pt-20 bg-ivory">
      <div className="bg-ivory-dark border-b border-sand/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="section-subtitle mb-3">The Collection</p>
          <h1 className="section-title">Cherry Wood Card Holders</h1>
          <p className="text-bark/55 mt-4 max-w-md mx-auto leading-relaxed">
            Two versions. One material. Handcrafted in Cairo from solid cherry wood, finished by hand.
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {products.map(p => <ShopCard key={p.id} product={p} />)}
        </div>
        <div className="mt-20 bg-bark text-white p-10 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="section-subtitle mb-2" style={{ color: '#C9A87C' }}>Personalise</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold leading-tight">Add your own engraving</h2>
            <p className="text-white/60 mt-2 max-w-sm leading-relaxed text-sm">Choose your text, font, and position. We laser-engrave it before shipping. +EGP 120.</p>
          </div>
          <Link to="/configure" className="shrink-0 bg-sand hover:bg-sand-dark transition-colors text-white font-medium px-8 py-3.5 text-sm tracking-wide flex items-center gap-2">
            <Pencil size={15} /> Open Engrave Studio
          </Link>
        </div>
      </div>
    </div>
  )
}

function ShopCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const stock = getStockStatus(product.stock)

  function handleAdd(e) {
    e.preventDefault()
    if (product.stock === 0) return
    addItem({ cartId: `${product.id}-${Date.now()}`, productId: product.id, name: product.name, material: product.material, price: product.price, stock: product.stock })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Link to={`/shop/${product.id}`} className="block group">
      <div className="relative bg-white border border-sand/20 overflow-hidden">
        {product.tag && <span className="absolute top-3 left-3 z-10 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-bark text-ivory">{product.tag}</span>}
        <div className="transition-transform duration-500 group-hover:scale-[1.02]">
          <ProductImage variant={product.variant} className="w-full" />
        </div>
      </div>
      <div className="pt-5 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display font-semibold text-xl text-bark leading-tight">{product.name}</h3>
            <p className="text-sm text-bark/55 mt-0.5">{product.tagline}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-display font-semibold text-lg text-bark">{formatPrice(product.price, product.currency)}</p>
            <span className={`${stock.cls} block mt-1`}>{stock.label}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-bark/45">
          <span>{product.material}</span><span>·</span><span>{product.capacity}</span><span>·</span><span>{product.dimensions}</span>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={handleAdd} disabled={product.stock === 0}
            className="btn-primary flex-1 justify-center py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed">
            <ShoppingBag size={15} />{added ? '✓ Added!' : 'Add to Cart'}
          </button>
          <Link to="/configure" onClick={e => e.stopPropagation()} className="btn-outline px-4 py-3 text-sm flex items-center gap-1.5">
            <Pencil size={13} /> Engrave
          </Link>
        </div>
      </div>
    </Link>
  )
}

function ProductDetail({ id }) {
  const { addItem } = useCart()
  const product = products.find(p => p.id === id)
  const [added, setAdded] = useState(false)

  if (!product) return (
    <div className="min-h-screen pt-32 text-center text-bark/50">
      <p className="text-lg mb-6">Product not found.</p>
      <Link to="/shop" className="btn-outline inline-flex">← Back to Shop</Link>
    </div>
  )

  const stock = getStockStatus(product.stock)

  function handleAdd() {
    addItem({ cartId: `${product.id}-${Date.now()}`, productId: product.id, name: product.name, material: product.material, price: product.price, stock: product.stock })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen pt-20 bg-ivory">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-bark/45 hover:text-bark transition-colors mb-10">
          <ArrowLeft size={14} /> All products
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="bg-white border border-sand/20 p-10 sm:p-16">
            <ProductImage variant={product.variant} className="w-full" />
          </div>
          <div className="flex flex-col justify-center">
            {product.tag && <span className="inline-block text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-bark text-ivory mb-5 self-start">{product.tag}</span>}
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-bark leading-tight mb-2">{product.name}</h1>
            <p className="text-bark/55 text-lg mb-5">{product.tagline}</p>
            <p className="font-display text-3xl font-semibold text-bark mb-6">{formatPrice(product.price, product.currency)}</p>
            <p className="text-bark/65 leading-relaxed mb-8 text-[15px]">{product.description}</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[['Material', product.material], ['Capacity', product.capacity], ['Dimensions', product.dimensions], ['Weight', product.weight]].map(([k, v]) => (
                <div key={k} className="bg-ivory-dark px-4 py-3 border border-sand/15">
                  <span className="block text-[10px] uppercase tracking-widest text-bark/40 mb-1">{k}</span>
                  <span className="font-medium text-bark text-sm">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 mb-6"><span className={stock.cls}>{stock.label}</span></div>
            <div className="flex gap-3">
              <button onClick={handleAdd} disabled={product.stock === 0}
                className="btn-primary flex-1 justify-center py-4 disabled:opacity-40 disabled:cursor-not-allowed">
                <ShoppingBag size={17} />{added ? '✓ Added!' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <Link to="/configure" className="btn-outline px-5 py-4 flex items-center gap-2"><Pencil size={15} /> Engrave</Link>
            </div>
            <p className="text-xs text-bark/40 mt-4 leading-relaxed">Add custom laser engraving via Engrave Studio (+EGP 120). Ships in 3–5 days.</p>
          </div>
        </div>
        {/* Other product */}
        <div className="mt-24">
          <h2 className="section-subtitle mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {products.filter(p => p.id !== id).map(p => (
              <Link key={p.id} to={`/shop/${p.id}`} className="flex gap-5 bg-white border border-sand/20 p-5 hover:border-sand transition-colors">
                <div className="w-24 shrink-0"><ProductImage variant={p.variant} className="w-full" /></div>
                <div className="flex-1">
                  <p className="font-display font-semibold text-bark">{p.name}</p>
                  <p className="text-xs text-bark/50 mt-1">{p.tagline}</p>
                  <p className="font-semibold text-bark mt-2">{formatPrice(p.price, p.currency)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
