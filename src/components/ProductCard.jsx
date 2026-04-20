import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Pencil } from 'lucide-react'
import { getStockStatus, formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import STCHCardHolder from './STCHCardHolder'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const stock = getStockStatus(product.stock)

  function handleAdd(e) {
    e.preventDefault()
    if (product.stock === 0) return
    addItem({
      cartId: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      material: product.material,
      price: product.price,
      stock: product.stock,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Link to={`/shop/${product.id}`} className="block group card-hover">
      <div className="relative overflow-hidden bg-white border border-sand/20 p-6 sm:p-8">
        {product.tag && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-bark text-ivory z-10">
            {product.tag}
          </span>
        )}
        <div className="transition-transform duration-500 group-hover:scale-[1.03]">
          <STCHCardHolder variant={product.variant} className="w-full" />
        </div>
      </div>
      <div className="pt-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-semibold text-lg text-bark leading-tight">{product.name}</h3>
            <p className="text-sm text-bark/55 mt-0.5">{product.tagline}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className={stock.cls}>{stock.label}</span>
            <p className="text-base font-semibold text-bark mt-1">{formatPrice(product.price, product.currency)}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/configure" onClick={e => e.stopPropagation()}
              className="p-2 border border-sand/50 text-bark/50 hover:border-bark hover:text-bark transition-colors" aria-label="Custom engraving">
              <Pencil size={14} />
            </Link>
            <button onClick={handleAdd} disabled={product.stock === 0}
              className="p-2.5 border border-bark text-bark hover:bg-bark hover:text-ivory transition-colors disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Add to cart">
              <ShoppingBag size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
