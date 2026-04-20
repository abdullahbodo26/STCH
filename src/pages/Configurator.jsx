import React, { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, RotateCcw, Gift, Check } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import { useCart } from '../context/CartContext'
import ProductImage from '../components/ProductImage'
import { ENGRAVING_FONTS, BASE_PRICE, ENGRAVING_PRICE, GIFT_WRAP_PRICE } from '../data/configOptions'
import { formatPrice } from '../data/products'

const MAX_CHARS = 20

export default function Configurator() {
  const {
    engravingText, setEngravingText,
    font, setFont,
    fontSize, setFontSize,
    posX, setPosX,
    posY, setPosY,
    giftWrap, setGiftWrap,
    giftNote, setGiftNote,
    hasEngraving, totalPrice, resetConfig,
  } = useConfig()

  const { addItem } = useCart()
  const [added, setAdded]           = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const previewRef = useRef(null)

  const updatePos = useCallback((clientX, clientY) => {
    if (!previewRef.current) return
    const rect = previewRef.current.getBoundingClientRect()
    const x = Math.round(((clientX - rect.left) / rect.width) * 100)
    const y = Math.round(((clientY - rect.top)  / rect.height) * 100)
    setPosX(Math.max(5, Math.min(95, x)))
    setPosY(Math.max(5, Math.min(95, y)))
  }, [setPosX, setPosY])

  const onMouseDown = useCallback((e) => { setIsDragging(true); updatePos(e.clientX, e.clientY) }, [updatePos])
  const onMouseMove = useCallback((e) => { if (isDragging) updatePos(e.clientX, e.clientY) }, [isDragging, updatePos])
  const onMouseUp   = useCallback(() => setIsDragging(false), [])
  const onTouchStart = useCallback((e) => { const t = e.touches[0]; updatePos(t.clientX, t.clientY) }, [updatePos])
  const onTouchMove  = useCallback((e) => { e.preventDefault(); const t = e.touches[0]; updatePos(t.clientX, t.clientY) }, [updatePos])

  function handleAdd() {
    addItem({
      cartId: `custom-${Date.now()}`,
      productId: 'stch-classic-engraved',
      name: hasEngraving ? `STCH Classic — "${engravingText}"` : 'STCH Classic',
      material: 'Cherry Wood',
      engravingText: engravingText.trim(),
      font: font.label,
      price: totalPrice,
      stock: 99,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const priceRows = [
    { label: 'STCH Classic card holder', value: BASE_PRICE },
    hasEngraving ? { label: `Custom engraving (${font.label})`, value: ENGRAVING_PRICE } : null,
    giftWrap     ? { label: 'Gift wrap & branded box',           value: GIFT_WRAP_PRICE } : null,
  ].filter(Boolean)

  return (
    <div className="min-h-screen bg-ivory pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex items-end justify-between">
        <div>
          <p className="section-subtitle mb-2">Engrave Studio</p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-bark leading-tight">Make it yours</h1>
        </div>
        <button onClick={resetConfig} className="hidden sm:flex items-center gap-1.5 text-sm text-bark/40 hover:text-bark transition-colors">
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">

          {/* LEFT: Interactive preview */}
          <div>
            <ProductImage
              variant="plain"
              className={`w-full max-w-sm mx-auto select-none border border-sand/20 shadow-lg ${engravingText.trim() ? 'cursor-crosshair' : 'cursor-default'}`}
            >
              {/* Invisible event-capture layer so clicks/drags register on the image */}
              <div
                ref={previewRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                className="absolute inset-0 z-10"
                style={{ touchAction: 'none' }}
              />

              {/* Engraving text overlay */}
              {engravingText.trim() && (
                <div
                  className="absolute z-20 pointer-events-none select-none"
                  style={{
                    left: `${posX}%`,
                    top: `${posY}%`,
                    transform: 'translate(-50%, -50%)',
                    fontFamily: font.family,
                    fontSize: `${fontSize}px`,
                    color: '#3D1500',
                    opacity: 0.88,
                    textShadow: '0px 1px 2px rgba(0,0,0,0.3)',
                    mixBlendMode: 'multiply',
                    whiteSpace: 'nowrap',
                    userSelect: 'none',
                  }}
                >
                  {engravingText}
                </div>
              )}

              {engravingText.trim() && (
                <div className="absolute bottom-2 left-0 right-0 z-20 text-center pointer-events-none">
                  <span className="text-[10px] text-bark/50 tracking-wide bg-white/70 px-2 py-0.5">Click or drag to reposition</span>
                </div>
              )}
            </ProductImage>

            {/* Font preview strip */}
            {engravingText.trim() && (
              <div className="mt-4 bg-bark/5 border border-sand/20 p-4">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-bark/40 mb-3">Preview in all fonts</p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {ENGRAVING_FONTS.map(f => (
                    <div key={f.id} onClick={() => setFont(f)}
                      className={`p-2 text-center cursor-pointer border transition-all ${font.id === f.id ? 'border-bark bg-white' : 'border-sand/20 bg-white/50 hover:border-sand'}`}
                    >
                      <p style={{ fontFamily: f.family }} className="text-sm text-bark/80 truncate leading-tight">{engravingText.slice(0, 8)}</p>
                      <p className="text-[9px] text-bark/40 mt-1 font-sans">{f.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Controls */}
          <div className="lg:sticky lg:top-24 self-start space-y-5">

            {/* Text input */}
            <div className="bg-white border border-sand/20 p-5">
              <label className="block text-xs font-semibold tracking-widest uppercase text-bark/50 mb-3">Text to engrave</label>
              <input
                type="text"
                value={engravingText}
                maxLength={MAX_CHARS}
                onChange={e => setEngravingText(e.target.value)}
                placeholder="e.g. Your name, initials, a date…"
                className="input-field text-lg"
                autoFocus
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-bark/35">
                  {engravingText.trim() ? `+${ENGRAVING_PRICE} EGP · laser-engraved by hand` : 'Leave blank for standard STCH engraving'}
                </p>
                <span className={`text-xs font-medium ${engravingText.length >= MAX_CHARS - 2 ? 'text-red-500' : 'text-bark/30'}`}>
                  {engravingText.length}/{MAX_CHARS}
                </span>
              </div>
            </div>

            {/* Font selector */}
            {engravingText.trim() && (
              <div className="bg-white border border-sand/20 p-5">
                <p className="text-xs font-semibold tracking-widest uppercase text-bark/50 mb-3">Font style</p>
                <div className="grid grid-cols-3 gap-2">
                  {ENGRAVING_FONTS.map(f => (
                    <button key={f.id} onClick={() => setFont(f)}
                      className={`relative p-3 border-2 transition-all text-center ${font.id === f.id ? 'border-bark bg-bark/5' : 'border-sand/25 hover:border-sand'}`}
                    >
                      {font.id === f.id && (
                        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-bark flex items-center justify-center">
                          <Check size={8} className="text-ivory" />
                        </span>
                      )}
                      <span className="block text-lg text-bark leading-none mb-1" style={{ fontFamily: f.family }}>Aa</span>
                      <span className="text-[10px] text-bark/50 font-sans tracking-wide">{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size + Position */}
            {engravingText.trim() && (
              <div className="bg-white border border-sand/20 p-5 space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold tracking-widest uppercase text-bark/50">Text size</p>
                    <span className="text-xs text-bark/40">{fontSize}px</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-bark/40 w-4">S</span>
                    <input type="range" min={12} max={42} value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="flex-1" />
                    <span className="text-sm text-bark/40 w-4">L</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-bark/50 mb-3">
                    Position <span className="normal-case font-normal text-bark/30">(or click the product above)</span>
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-bark/40 w-16">Left ←</span>
                      <input type="range" min={5} max={95} value={posX} onChange={e => setPosX(Number(e.target.value))} className="flex-1" />
                      <span className="text-xs text-bark/40 w-16 text-right">→ Right</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-bark/40 w-16">Top ↑</span>
                      <input type="range" min={5} max={95} value={posY} onChange={e => setPosY(Number(e.target.value))} className="flex-1" />
                      <span className="text-xs text-bark/40 w-16 text-right">↓ Bottom</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Gift wrap */}
            <div className="bg-white border border-sand/20 p-5">
              <label className="flex items-start gap-4 cursor-pointer">
                <div onClick={() => setGiftWrap(v => !v)}
                  className={`mt-0.5 w-11 h-6 relative flex-shrink-0 transition-colors ${giftWrap ? 'bg-bark' : 'bg-sand/30'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white transition-transform ${giftWrap ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
                <div>
                  <p className="font-semibold text-bark text-sm flex items-center gap-2">
                    <Gift size={14} /> Gift Wrap
                    <span className="text-sand-dark font-normal text-xs">+{GIFT_WRAP_PRICE} EGP</span>
                  </p>
                  <p className="text-bark/45 text-xs mt-0.5 leading-snug">Cotton dust bag · kraft box · hand-tied ribbon</p>
                </div>
              </label>
              {giftWrap && (
                <div className="mt-4">
                  <label className="block text-xs font-semibold tracking-widest uppercase text-bark/40 mb-2">Gift note (optional)</label>
                  <textarea value={giftNote} onChange={e => setGiftNote(e.target.value)} maxLength={120} rows={3} placeholder="Write a personal message…" className="input-field resize-none text-sm" />
                  <p className="text-xs text-bark/30 mt-1 text-right">{giftNote.length}/120</p>
                </div>
              )}
            </div>

            {/* Price summary */}
            <div className="bg-white border border-sand/20 p-5">
              <p className="text-xs font-semibold tracking-widest uppercase text-bark/40 mb-4">Order summary</p>
              <div className="space-y-2.5 mb-4">
                {priceRows.map((row, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-bark/60">{row.label}</span>
                    <span className="font-medium text-bark">{row.value === BASE_PRICE ? formatPrice(row.value, 'EGP') : `+ EGP ${row.value}`}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-sand/20 pt-4 flex items-baseline justify-between">
                <span className="font-semibold text-bark text-sm">Total</span>
                <span className="font-display font-bold text-2xl text-bark">{formatPrice(totalPrice, 'EGP')}</span>
              </div>
            </div>

            <button onClick={handleAdd} className="btn-primary w-full justify-center py-4 text-base">
              <ShoppingBag size={18} />
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>

            <Link to="/shop" className="block text-center text-sm text-bark/40 hover:text-bark transition-colors">← Browse ready-made products</Link>

            <div className="bg-ivory-dark border border-sand/20 p-4 text-xs text-bark/50 space-y-1.5 leading-relaxed">
              <p>✓ Laser-engraved in our Cairo workshop</p>
              <p>✓ Cherry wood, hand-finished</p>
              <p>✓ Ships within 3–5 working days</p>
              <p>✓ Engraving is permanent and precise</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
