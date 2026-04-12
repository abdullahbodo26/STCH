import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { getStockStatus, formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import WoodPreview from './WoodPreview'

export default function ProductCard({ product, layout = 'grid' }) {
  const { addItem } = useCart()
  const stock = getStockStatus(product.stock)

  function handleAdd(e) {
    e.preventDefault()
    if (product.stock === 0) return
    addItem({
      cartId: `${product.id}-default`,
      productId: product.id,
      name: product.name,
      material: product.material.label,
      price: product.price,
      stock: product.stock,
    })
  }

  if (layout === 'list') {
    return (
      <Link to={`/shop/${product.id}`} className="flex gap-6 p-4 bg-white hover:bg-ivory-dark transition-colors border border-sand/20 group card-hover">
        <div className="w-24 h-24 shrink-0 overflow-hidden">
          <WoodPreview material={product.material.id} className="w-full h-full" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display font-semibold text-lg text-bark">{product.name}</h3>
              {product.tag && <span className="shrink-0 text-xs px-2 py-0.5 bg-sand/20 text-sand-dark font-medium tracking-wide">{product.tag}</span>}
            </div>
            <p className="text-sm text-bark/60 mt-1 truncate">{product.tagline}</p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className={stock.cls}>{stock.label}</span>
              <p className="text-base font-semibold text-bark mt-1">{formatPrice(product.price, product.currency)}</p>
            </div>
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="btn-primary text-sm py-2 px-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={14} /> Add
            </button>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/shop/${product.id}`} className="block group card-hover">
      <div className="relative overflow-hidden bg-ivory-dark aspect-[4/3]">
        <WoodPreview material={product.material.id} className="w-full h-full" />
        {product.tag && (
          <span className="absolute top-3 left-3 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 bg-bark text-ivory">
            {product.tag}
          </span>
        )}
        <div className="absolute inset-0 bg-bark/0 group-hover:bg-bark/10 transition-colors duration-300" />
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
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="p-2.5 border border-bark text-bark hover:bg-bark hover:text-ivory transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </Link>
  )
}
