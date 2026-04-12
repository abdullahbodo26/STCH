import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { designs, designCategories } from '../data/designs'
import WoodPreview from '../components/WoodPreview'

export default function Designs() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredDesign, setHoveredDesign] = useState(null)

  const filtered = activeCategory === 'All'
    ? designs
    : designs.filter(d => d.category === activeCategory)

  return (
    <div className="min-h-screen pt-20">

      {/* Header */}
      <section className="bg-ivory-dark border-b border-sand/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-subtitle mb-3">Engraving Gallery</p>
          <h1 className="section-title mb-4">12 Signature Designs</h1>
          <p className="text-bark/60 max-w-xl leading-relaxed">
            Every design is precision laser-engraved. From ancient Egyptian heritage patterns to clean minimalist engravings — choose one or commission a custom piece.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {designCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-medium transition-colors border ${
                activeCategory === cat
                  ? 'bg-bark text-ivory border-bark'
                  : 'bg-white text-bark border-sand/40 hover:border-bark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Design grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(design => (
            <DesignCard
              key={design.id}
              design={design}
              isHovered={hoveredDesign === design.id}
              onHover={setHoveredDesign}
            />
          ))}
        </div>

        {/* Custom callout */}
        <div className="mt-16 bg-bark text-ivory p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-sand text-xs tracking-widest uppercase font-medium mb-2">Fully Bespoke</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ivory mb-2">Want something unique?</h2>
            <p className="text-ivory/65 text-sm max-w-md leading-relaxed">
              We offer fully custom engraving — your logo, a signature, a special date, or any artwork you have in mind. Reach out to discuss.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Link to="/configure" className="btn-sand text-sm whitespace-nowrap">
              Start Configuring <ArrowRight size={15} />
            </Link>
            <a href="mailto:hello@stch.eg" className="text-center text-ivory/60 hover:text-sand transition-colors text-sm">
              hello@stch.eg
            </a>
          </div>
        </div>

        {/* Material compat table */}
        <div className="mt-16">
          <h2 className="section-title mb-2">Design × Material Compatibility</h2>
          <p className="text-bark/55 mb-6 text-sm">Not all engravings are available on every material. Here's what works best.</p>
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-sand/30">
                  <th className="text-left py-3 pr-6 font-semibold text-bark/50 text-xs tracking-widest uppercase">Design</th>
                  {['walnut','oak','bamboo','leather-tan','leather-brown','leather-black'].map(m => (
                    <th key={m} className="text-center py-3 px-4 font-semibold text-bark/50 text-xs tracking-widest uppercase whitespace-nowrap">
                      {materialLabel(m)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {designs.map((d, i) => (
                  <tr key={d.id} className={`border-b border-sand/10 ${i % 2 === 0 ? 'bg-white' : 'bg-ivory'}`}>
                    <td className="py-3 pr-6 font-medium text-bark whitespace-nowrap">{d.name}</td>
                    {['walnut','oak','bamboo','leather-tan','leather-brown','leather-black'].map(m => (
                      <td key={m} className="text-center py-3 px-4">
                        {d.available.includes(m)
                          ? <Check size={14} className="inline text-sage-dark" />
                          : <span className="text-bark/15 text-xs">—</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function DesignCard({ design, isHovered, onHover }) {
  const previewMaterial = design.available[0] || 'walnut'

  return (
    <div
      className="group cursor-pointer card-hover"
      onMouseEnter={() => onHover(design.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Preview area */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <WoodPreview
          material={previewMaterial}
          engraving={design.preview.pattern}
          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        {design.popular && (
          <span className="absolute top-2 right-2 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-sand text-white">
            Popular
          </span>
        )}
        {design.customInput && (
          <span className="absolute top-2 left-2 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-bark text-ivory">
            Custom
          </span>
        )}
      </div>

      {/* Info */}
      <div className="pt-4 pb-2">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-semibold text-lg text-bark leading-tight">{design.name}</h3>
          <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-sand-dark bg-sand/15 px-2 py-0.5">
            {design.category}
          </span>
        </div>
        <p className="text-sm text-bark/55 leading-snug mb-3">{design.description}</p>

        {/* Available on */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {design.available.map(m => (
            <span key={m} className="text-[10px] px-2 py-0.5 bg-sand/10 text-bark/60 font-medium">
              {materialLabel(m)}
            </span>
          ))}
        </div>

        <Link
          to={`/configure?design=${design.preview.pattern}&material=${previewMaterial}`}
          className="text-xs font-medium text-sand-dark hover:text-bark transition-colors flex items-center gap-1"
        >
          Try in Configurator <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  )
}

function materialLabel(id) {
  const map = {
    walnut: 'Walnut', oak: 'Oak', bamboo: 'Bamboo',
    'leather-tan': 'Tan Leather', 'leather-brown': 'Dark Leather', 'leather-black': 'Black Leather',
  }
  return map[id] || id
}
