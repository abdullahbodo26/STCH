import React, { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SlidersHorizontal, LayoutGrid, List, X, ShoppingBag, ArrowLeft } from 'lucide-react'
import { products, getStockStatus, formatPrice } from '../data/products'
import { MATERIALS } from '../data/products'
import ProductCard from '../components/ProductCard'
import WoodPreview from '../components/WoodPreview'
import { useCart } from '../context/CartContext'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured'   },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A–Z'       },
  { value: 'stock', label: 'In Stock First' },
]

const MAT_GROUPS = ['All', 'Wood', 'Leather']

export default function Shop() {
  const { id } = useParams()

  if (id) return <ProductDetail id={id} />

  const [sort, setSort]           = useState('featured')
  const [matGroup, setMatGroup]   = useState('All')
  const [minSlots, setMinSlots]   = useState(0)
  const [maxPrice, setMaxPrice]   = useState(900)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [layout, setLayout]       = useState('grid')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]
    if (matGroup === 'Wood')    list = list.filter(p => ['walnut','oak','bamboo'].includes(p.material.id))
    if (matGroup === 'Leather') list = list.filter(p => p.material.id.startsWith('leather'))
    if (inStockOnly)            list = list.filter(p => p.stock > 0)
    list = list.filter(p => p.price <= maxPrice && p.slots >= minSlots)

    switch (sort) {
      case 'price-asc':  list.sort((a,b) => a.price - b.price);  break
      case 'price-desc': list.sort((a,b) => b.price - a.price);  break
      case 'name':       list.sort((a,b) => a.name.localeCompare(b.name)); break
      case 'stock':      list.sort((a,b) => b.stock - a.stock);  break
      default:           list.sort((a,b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    return list
  }, [sort, matGroup, minSlots, maxPrice, inStockOnly])

  const activeFilters = (matGroup !== 'All' ? 1 : 0) + (inStockOnly ? 1 : 0) + (maxPrice < 900 ? 1 : 0) + (minSlots > 0 ? 1 : 0)

  function clearFilters() {
    setMatGroup('All')
    setMinSlots(0)
    setMaxPrice(900)
    setInStockOnly(false)
  }

  const FilterPanel = () => (
    <div className="space-y-7">
      {/* Material */}
      <div>
        <h4 className="text-xs font-semibold tracking-widest uppercase text-bark/50 mb-3">Material</h4>
        <div className="flex flex-col gap-1">
          {MAT_GROUPS.map(g => (
            <button
              key={g}
              onClick={() => setMatGroup(g)}
              className={`text-left py-1.5 px-2 text-sm transition-colors ${matGroup === g ? 'bg-bark text-ivory font-medium' : 'text-bark hover:bg-sand/10'}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h4 className="text-xs font-semibold tracking-widest uppercase text-bark/50 mb-3">Max Price</h4>
        <input type="range" min={250} max={900} step={50} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} className="w-full" />
        <div className="flex justify-between text-xs text-bark/50 mt-1">
          <span>EGP 250</span>
          <span className="font-semibold text-bark">EGP {maxPrice}</span>
        </div>
      </div>

      {/* Min slots */}
      <div>
        <h4 className="text-xs font-semibold tracking-widest uppercase text-bark/50 mb-3">Min Card Slots</h4>
        <div className="flex gap-2 flex-wrap">
          {[0, 4, 6, 8, 10, 12].map(n => (
            <button
              key={n}
              onClick={() => setMinSlots(n)}
              className={`w-9 h-9 text-sm border transition-colors ${minSlots === n ? 'bg-bark border-bark text-ivory' : 'border-sand/50 text-bark hover:border-bark'}`}
            >
              {n === 0 ? 'Any' : n}
            </button>
          ))}
        </div>
      </div>

      {/* In stock */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => setInStockOnly(v => !v)}
            className={`w-10 h-5 relative transition-colors ${inStockOnly ? 'bg-bark' : 'bg-sand/30'}`}
          >
            <div className={`absolute top-0.5 w-4 h-4 bg-white transition-transform ${inStockOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
          <span className="text-sm text-bark">In Stock Only</span>
        </label>
      </div>

      {activeFilters > 0 && (
        <button onClick={clearFilters} className="flex items-center gap-2 text-xs text-sand-dark hover:text-bark transition-colors">
          <X size={12} /> Clear all filters ({activeFilters})
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="mb-10">
          <p className="section-subtitle mb-2">Collection</p>
          <h1 className="section-title">All Card Holders</h1>
        </div>

        <div className="flex gap-8">

          {/* Sidebar – desktop */}
          <aside className="hidden lg:block w-56 shrink-0">
            <FilterPanel />
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-sand/20">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-sm font-medium text-bark border border-sand/40 px-3 py-1.5 hover:border-bark transition-colors"
                >
                  <SlidersHorizontal size={14} />
                  Filters {activeFilters > 0 && <span className="bg-bark text-ivory text-[10px] w-4 h-4 flex items-center justify-center">{activeFilters}</span>}
                </button>
                <p className="text-sm text-bark/55">{filtered.length} products</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="text-sm border border-sand/40 px-3 py-1.5 bg-white text-bark focus:outline-none focus:border-bark"
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <button onClick={() => setLayout('grid')} className={`p-1.5 ${layout === 'grid' ? 'text-bark' : 'text-bark/30'}`}>
                  <LayoutGrid size={16} />
                </button>
                <button onClick={() => setLayout('list')} className={`p-1.5 ${layout === 'list' ? 'text-bark' : 'text-bark/30'}`}>
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Product grid */}
            {filtered.length === 0 ? (
              <div className="py-24 text-center text-bark/40">
                <p className="text-lg">No products match your filters.</p>
                <button onClick={clearFilters} className="mt-4 text-sand-dark underline text-sm">Clear filters</button>
              </div>
            ) : layout === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {filtered.map(p => <ProductCard key={p.id} product={p} layout="grid" />)}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(p => <ProductCard key={p.id} product={p} layout="list" />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="relative ml-auto w-72 bg-white h-full overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-bark">Filters</h3>
              <button onClick={() => setDrawerOpen(false)}><X size={20} /></button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-8 w-full btn-primary justify-center"
            >
              Show {filtered.length} products
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ProductDetail({ id }) {
  const { addItem } = useCart()
  const product = products.find(p => p.id === id)
  const [added, setAdded] = useState(false)

  if (!product) return (
    <div className="min-h-screen pt-32 text-center">
      <p className="text-bark/50">Product not found.</p>
      <Link to="/shop" className="btn-outline mt-6 inline-flex">Back to Shop</Link>
    </div>
  )

  const stock = getStockStatus(product.stock)

  function handleAdd() {
    addItem({
      cartId: `${product.id}-default`,
      productId: product.id,
      name: product.name,
      material: product.material.label,
      price: product.price,
      stock: product.stock,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = products.filter(p => p.id !== product.id && p.material.id === product.material.id).slice(0, 3)

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-bark/50 hover:text-bark mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Image */}
          <div className="aspect-square bg-ivory-dark">
            <WoodPreview material={product.material.id} className="w-full h-full" />
          </div>

          {/* Info */}
          <div>
            {product.tag && (
              <span className="inline-block text-xs font-semibold tracking-wider uppercase px-2.5 py-1 bg-bark text-ivory mb-4">{product.tag}</span>
            )}
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-bark mb-2">{product.name}</h1>
            <p className="text-bark/55 text-lg mb-6">{product.tagline}</p>
            <p className="font-display text-3xl font-semibold text-bark mb-6">{formatPrice(product.price, product.currency)}</p>

            <p className="text-bark/70 leading-relaxed mb-8">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="bg-ivory-dark px-4 py-3">
                <span className="text-bark/50 block text-xs uppercase tracking-wider mb-1">Material</span>
                <span className="font-medium">{product.material.label}</span>
              </div>
              <div className="bg-ivory-dark px-4 py-3">
                <span className="text-bark/50 block text-xs uppercase tracking-wider mb-1">Card Slots</span>
                <span className="font-medium">Up to {product.slots}</span>
              </div>
              <div className="bg-ivory-dark px-4 py-3">
                <span className="text-bark/50 block text-xs uppercase tracking-wider mb-1">Dimensions</span>
                <span className="font-medium">{product.dimensions}</span>
              </div>
              <div className="bg-ivory-dark px-4 py-3">
                <span className="text-bark/50 block text-xs uppercase tracking-wider mb-1">Weight</span>
                <span className="font-medium">{product.weight}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className={stock.cls}>{stock.label}</span>
              {product.stock > 0 && product.stock <= 5 && (
                <span className="text-xs text-bark/50">Order soon</span>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className="btn-primary flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={16} />
                {added ? 'Added!' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <Link to="/configure" className="btn-outline px-4 py-3">
                Customize
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-sand/20">
              <h3 className="font-semibold text-sm uppercase tracking-widest text-bark/50 mb-4">Available Colors</h3>
              <div className="flex gap-2">
                {product.colors.map(c => (
                  <div key={c} className="w-7 h-7 border-2 border-white shadow-sm" style={{ backgroundColor: c }} title={c} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="section-title mb-8">Same Material</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
