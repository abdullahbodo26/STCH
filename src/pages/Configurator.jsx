import React, { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ShoppingBag, RotateCcw, ChevronDown, ChevronUp, Check, Gift } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import { useCart } from '../context/CartContext'
import WoodPreview from '../components/WoodPreview'
import {
  materialOptions, slotOptions, finishOptions,
  edgeOptions, stitchColors, engravedDesigns, BASE_PRICE,
} from '../data/configOptions'
import { formatPrice } from '../data/products'

export default function Configurator() {
  const {
    material, setMaterial,
    slots, setSlots,
    finish, setFinish,
    edge, setEdge,
    stitch, setStitch,
    design, setDesign,
    customText, setCustomText,
    giftWrap, setGiftWrap,
    giftNote, setGiftNote,
    totalPrice, resetConfig,
  } = useConfig()

  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  function handleAdd() {
    addItem({
      cartId: `custom-${Date.now()}`,
      productId: 'custom',
      name: `Custom — ${material.label}`,
      material: material.label,
      slots: slots.value,
      finish: finish.label,
      edge: edge.label,
      stitch: stitch.label,
      design: design.label,
      customText: design.customInput ? customText : '',
      giftWrap,
      price: totalPrice,
      stock: 99,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const steps = [
    { title: 'Material',    icon: '🪵' },
    { title: 'Capacity',    icon: '🃏' },
    { title: 'Finish',      icon: '✨' },
    { title: 'Edge',        icon: '📐' },
    { title: 'Stitch',      icon: '🪡' },
    { title: 'Engraving',   icon: '🔲' },
    { title: 'Gifting',     icon: '🎁' },
  ]

  const priceBreakdown = [
    { label: 'Base price',          value: BASE_PRICE },
    { label: `Material (${material.label})`, value: material.price, hide: material.price === 0 },
    { label: `Capacity (${slots.label})`,    value: slots.price,    hide: slots.price === 0 },
    { label: `Finish (${finish.label})`,     value: finish.price,   hide: finish.price === 0 },
    { label: `Edge (${edge.label})`,         value: edge.price,     hide: edge.price === 0 },
    { label: `Engraving (${design.label})`,  value: design.price,   hide: design.price === 0 },
    { label: 'Gift wrap',                     value: 80,             hide: !giftWrap },
  ]

  return (
    <div className="min-h-screen pt-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="section-subtitle mb-2">Custom Build</p>
            <h1 className="section-title">Configure Your Card Holder</h1>
          </div>
          <button onClick={resetConfig} className="hidden sm:flex items-center gap-2 text-sm text-bark/50 hover:text-bark transition-colors">
            <RotateCcw size={13} /> Reset
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

          {/* Steps */}
          <div className="space-y-3">

            {/* Step 0: Material */}
            <ConfigStep idx={0} title="Material" icon="🪵" activeStep={activeStep} setActiveStep={setActiveStep}>
              <div className="space-y-4">
                {['Wood', 'Leather'].map(group => (
                  <div key={group}>
                    <p className="text-xs font-semibold tracking-widest uppercase text-bark/40 mb-3">{group}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {materialOptions.filter(m => m.group === group).map(m => (
                        <button
                          key={m.id}
                          onClick={() => setMaterial(m)}
                          className={`relative p-3 border-2 text-left transition-all ${
                            material.id === m.id
                              ? 'border-bark bg-bark/5'
                              : 'border-sand/30 hover:border-sand'
                          }`}
                        >
                          {material.id === m.id && (
                            <span className="absolute top-2 right-2 w-4 h-4 bg-bark flex items-center justify-center">
                              <Check size={10} className="text-ivory" />
                            </span>
                          )}
                          <div className="w-8 h-8 mb-2" style={{ backgroundColor: m.hex }} />
                          <p className="font-semibold text-bark text-sm">{m.label}</p>
                          <p className="text-bark/50 text-xs">{m.description}</p>
                          {m.price !== 0 && (
                            <p className="text-xs text-sand-dark mt-1">
                              {m.price > 0 ? `+${m.price}` : m.price} EGP
                            </p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ConfigStep>

            {/* Step 1: Capacity */}
            <ConfigStep idx={1} title="Card Capacity" icon="🃏" activeStep={activeStep} setActiveStep={setActiveStep}>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {slotOptions.map(s => (
                  <button
                    key={s.value}
                    onClick={() => setSlots(s)}
                    className={`p-4 border-2 text-center transition-all ${
                      slots.value === s.value
                        ? 'border-bark bg-bark text-ivory'
                        : 'border-sand/30 hover:border-sand text-bark'
                    }`}
                  >
                    <span className="block font-display font-bold text-2xl">{s.value}</span>
                    <span className="text-xs opacity-70">cards</span>
                    {s.price !== 0 && <span className="block text-xs mt-1 opacity-60">+{s.price} EGP</span>}
                  </button>
                ))}
              </div>
            </ConfigStep>

            {/* Step 2: Finish */}
            <ConfigStep idx={2} title="Surface Finish" icon="✨" activeStep={activeStep} setActiveStep={setActiveStep}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {finishOptions.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFinish(f)}
                    className={`p-4 border-2 text-left transition-all ${
                      finish.id === f.id
                        ? 'border-bark bg-bark/5'
                        : 'border-sand/30 hover:border-sand'
                    }`}
                  >
                    <p className="font-semibold text-bark text-sm mb-1">{f.label}</p>
                    <p className="text-bark/50 text-xs leading-snug">{f.description}</p>
                    {f.price !== 0 && <p className="text-xs text-sand-dark mt-2">+{f.price} EGP</p>}
                  </button>
                ))}
              </div>
            </ConfigStep>

            {/* Step 3: Edge */}
            <ConfigStep idx={3} title="Edge Treatment" icon="📐" activeStep={activeStep} setActiveStep={setActiveStep}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {edgeOptions.map(e => (
                  <button
                    key={e.id}
                    onClick={() => setEdge(e)}
                    className={`p-4 border-2 text-left transition-all ${
                      edge.id === e.id
                        ? 'border-bark bg-bark/5'
                        : 'border-sand/30 hover:border-sand'
                    }`}
                  >
                    <p className="font-semibold text-bark text-sm mb-1">{e.label}</p>
                    <p className="text-bark/50 text-xs">{e.description}</p>
                    {e.price !== 0 && <p className="text-xs text-sand-dark mt-2">+{e.price} EGP</p>}
                  </button>
                ))}
              </div>
            </ConfigStep>

            {/* Step 4: Stitch Color */}
            <ConfigStep idx={4} title="Stitch Color" icon="🪡" activeStep={activeStep} setActiveStep={setActiveStep}
              subtitle={material.group === 'Wood' ? 'Visible on leather accent pieces only' : undefined}
            >
              <div className="flex flex-wrap gap-4">
                {stitchColors.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setStitch(s)}
                    className={`flex flex-col items-center gap-2 group`}
                  >
                    <div
                      className={`w-10 h-10 border-2 transition-all ${stitch.id === s.id ? 'scale-110 border-bark' : 'border-transparent group-hover:border-sand'}`}
                      style={{ backgroundColor: s.hex }}
                    />
                    <span className="text-xs text-bark/60">{s.label}</span>
                  </button>
                ))}
              </div>
            </ConfigStep>

            {/* Step 5: Engraving */}
            <ConfigStep idx={5} title="Engraving Design" icon="🔲" activeStep={activeStep} setActiveStep={setActiveStep}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {engravedDesigns.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setDesign(d)}
                    className={`p-3 border-2 text-left transition-all ${
                      design.id === d.id
                        ? 'border-bark bg-bark/5'
                        : 'border-sand/30 hover:border-sand'
                    }`}
                  >
                    {/* Mini preview */}
                    <div className="h-16 mb-2 overflow-hidden">
                      <WoodPreview
                        material={material.id}
                        engraving={d.id === 'none' ? 'plain' : d.id}
                        customText={customText}
                        stitchColor={stitch.hex}
                        className="w-full h-full"
                      />
                    </div>
                    <p className="font-semibold text-bark text-xs">{d.label}</p>
                    {d.price !== 0 && <p className="text-xs text-sand-dark">+{d.price} EGP</p>}
                  </button>
                ))}
              </div>

              {/* Custom input */}
              {design.customInput && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold tracking-widest uppercase text-bark/50 mb-2">
                    {design.id === 'monogram' ? 'Your Initials (max 3)' : 'Your Text (max 24 chars)'}
                  </label>
                  <input
                    type="text"
                    value={customText}
                    maxLength={design.id === 'monogram' ? 3 : 24}
                    onChange={e => setCustomText(e.target.value)}
                    placeholder={design.id === 'monogram' ? 'ABC' : 'e.g. A gift for you'}
                    className="input-field max-w-xs"
                  />
                </div>
              )}
            </ConfigStep>

            {/* Step 6: Gift */}
            <ConfigStep idx={6} title="Gift Options" icon="🎁" activeStep={activeStep} setActiveStep={setActiveStep}>
              <label className="flex items-center gap-4 cursor-pointer mb-4">
                <div
                  onClick={() => setGiftWrap(v => !v)}
                  className={`w-12 h-6 relative transition-colors flex-shrink-0 ${giftWrap ? 'bg-bark' : 'bg-sand/30'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white transition-transform ${giftWrap ? 'translate-x-7' : 'translate-x-1'}`} />
                </div>
                <div>
                  <p className="font-semibold text-bark text-sm">Premium Gift Wrap <span className="text-sand-dark text-xs">(+80 EGP)</span></p>
                  <p className="text-bark/50 text-xs">Cotton dust bag + branded kraft box + ribbon</p>
                </div>
              </label>

              {giftWrap && (
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-bark/50 mb-2">Gift Note (optional)</label>
                  <textarea
                    value={giftNote}
                    onChange={e => setGiftNote(e.target.value)}
                    maxLength={120}
                    rows={3}
                    placeholder="Write a personal message..."
                    className="input-field resize-none"
                  />
                  <p className="text-xs text-bark/40 mt-1">{giftNote.length}/120 characters</p>
                </div>
              )}
            </ConfigStep>
          </div>

          {/* ── Sticky preview + summary ── */}
          <div className="lg:sticky lg:top-24 self-start space-y-4">

            {/* Live preview */}
            <div className="bg-white border border-sand/20 overflow-hidden">
              <div className="p-3 border-b border-sand/10 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest uppercase text-bark/40">Live Preview</span>
                <span className="text-xs text-bark/40">{material.label}</span>
              </div>
              <div className="aspect-[4/3]">
                <WoodPreview
                  material={material.id}
                  engraving={design.id === 'none' ? undefined : design.id}
                  customText={customText}
                  stitchColor={stitch.hex}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Price summary */}
            <div className="bg-white border border-sand/20 p-5">
              <h3 className="font-semibold text-bark mb-4 text-sm uppercase tracking-widest">Your Build</h3>
              <div className="space-y-2 mb-4">
                {priceBreakdown.filter(i => !i.hide).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-bark/60">{item.label}</span>
                    <span className="font-medium text-bark">{item.value === 0 ? 'Included' : `EGP ${item.value}`}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-sand/20 pt-4 flex items-center justify-between">
                <span className="font-semibold text-bark">Total</span>
                <span className="font-display font-bold text-xl text-bark">{formatPrice(totalPrice, 'EGP')}</span>
              </div>
            </div>

            {/* Config summary */}
            <div className="bg-ivory-dark border border-sand/20 p-4 text-xs text-bark/60 space-y-1.5">
              {[
                ['Material', material.label],
                ['Capacity', slots.label],
                ['Finish',   finish.label],
                ['Edge',     edge.label],
                ['Stitch',   stitch.label],
                ['Design',   design.id === 'none' ? 'None' : design.label],
                design.customInput && customText ? ['Custom Text', customText] : null,
                ['Gift Wrap', giftWrap ? 'Yes' : 'No'],
              ].filter(Boolean).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <span className="font-medium text-bark/40 uppercase tracking-wider">{k}</span>
                  <span className="text-bark truncate">{v}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={handleAdd}
              className="btn-primary w-full justify-center py-4 text-base"
            >
              <ShoppingBag size={18} />
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <Link to="/shop" className="block text-center text-sm text-bark/50 hover:text-bark transition-colors">
              or browse ready-made products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConfigStep({ idx, title, icon, subtitle, activeStep, setActiveStep, children }) {
  const isOpen = activeStep === idx

  return (
    <div className={`border ${isOpen ? 'border-bark/30 bg-white' : 'border-sand/20 bg-white'}`}>
      <button
        onClick={() => setActiveStep(isOpen ? -1 : idx)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <div>
            <span className="font-semibold text-bark text-sm">{title}</span>
            {subtitle && <span className="block text-xs text-bark/40 mt-0.5">{subtitle}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold tracking-widest uppercase ${isOpen ? 'text-bark' : 'text-bark/30'}`}>
            Step {idx + 1}
          </span>
          {isOpen ? <ChevronUp size={16} className="text-bark" /> : <ChevronDown size={16} className="text-bark/40" />}
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-6 border-t border-sand/10">
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  )
}
