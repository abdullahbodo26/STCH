import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Zap, Award, Truck, Pencil } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import ProductImage from '../components/ProductImage'

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-bark">
        <div className="absolute -right-40 -top-40 w-[700px] h-[700px] rounded-full bg-sand/10 pointer-events-none" />
        <div className="absolute -left-20 bottom-0 w-[400px] h-[400px] rounded-full bg-bark-dark/30 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-ivory">
            <p className="section-subtitle text-sand mb-4">Handcrafted in Cairo</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.06] text-ivory mb-6">
              Carry something<br /><span className="text-sand italic">beautiful.</span>
            </h1>
            <p className="text-ivory/70 text-lg leading-relaxed max-w-md mb-10">
              Cherry wood card holders, laser-engraved and hand-finished in our Cairo workshop. Built to last decades.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="btn-sand text-sm">Shop Collection <ArrowRight size={16} /></Link>
              <Link to="/configure" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-ivory/35 text-ivory text-sm font-medium tracking-wide hover:border-sand hover:text-sand transition-colors">
                <Pencil size={15} /> Engrave Yours
              </Link>
            </div>
            <div className="flex gap-10 mt-14 text-ivory/45 text-sm">
              <div><span className="block font-display font-semibold text-2xl text-sand">2</span>Models</div>
              <div><span className="block font-display font-semibold text-2xl text-sand">6</span>Font Styles</div>
              <div><span className="block font-display font-semibold text-2xl text-sand">∞</span>Engravings</div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              <ProductImage variant="plain" className="w-full shadow-2xl" />
              <p className="text-center text-ivory/30 text-xs tracking-widest uppercase mt-5">Cherry Wood · Laser Engraved</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/35 text-xs tracking-widest uppercase animate-bounce">
          <span>Scroll</span><div className="w-px h-8 bg-ivory/20" />
        </div>
      </section>

      {/* PERKS */}
      <section className="bg-ivory-dark border-y border-sand/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Leaf,  title: 'Cherry Wood',       sub: 'Solid wood, sourced responsibly' },
              { icon: Zap,   title: 'Laser Engraving',   sub: 'Custom text, any font, any position' },
              { icon: Award, title: 'Hand-finished',     sub: 'Individual inspection every piece' },
              { icon: Truck, title: 'Ships in 3–5 Days', sub: 'Free delivery over EGP 1,000' },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex flex-col items-center gap-2 py-4">
                <Icon size={22} className="text-sand" strokeWidth={1.5} />
                <p className="font-semibold text-bark text-sm">{title}</p>
                <p className="text-bark/55 text-xs leading-snug">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-subtitle mb-2">The Collection</p>
            <h2 className="section-title">Two versions,<br />one standard.</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-2 text-sm font-medium text-sand-dark hover:text-bark transition-colors">
            View all <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ENGRAVING CTA */}
      <section className="relative overflow-hidden bg-bark-dark py-24">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-sand/5 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-ivory">
              <p className="section-subtitle text-sand mb-3">Custom Engraving</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-ivory mb-5 leading-tight">Make it<br />uniquely yours.</h2>
              <p className="text-ivory/65 text-lg leading-relaxed mb-8 max-w-md">
                Type your name, a date, initials — anything. Choose from 6 font styles, set the size, and drag the text exactly where you want it on the product. We laser-engrave it before shipping.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/configure" className="btn-sand text-sm"><Pencil size={15} /> Open Engrave Studio</Link>
                <Link to="/shop" className="inline-flex items-center gap-2 px-5 py-3 border border-ivory/25 text-ivory text-sm hover:border-sand hover:text-sand transition-colors">Browse Products</Link>
              </div>
            </div>
            <div className="relative max-w-xs mx-auto">
              <ProductImage variant="plain" className="w-full shadow-xl" />
              {/* Engraving preview overlay */}
              <div
                className="absolute pointer-events-none select-none"
                style={{
                  left: '38%',
                  top: '48%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '28px',
                  color: '#3D1500',
                  opacity: 0.82,
                  textShadow: '0px 1px 2px rgba(0,0,0,0.25)',
                  mixBlendMode: 'multiply',
                  whiteSpace: 'nowrap',
                }}
              >
                Omar
              </div>
              <p className="text-center text-ivory/30 text-xs mt-4 tracking-wide">Example: "Omar" in Script · +EGP 120</p>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="border-t border-sand/20 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-subtitle mb-4">Our Story</p>
          <h2 className="section-title mb-6">Made in Cairo,<br />built to last.</h2>
          <p className="text-bark/65 leading-relaxed text-lg mb-8">
            STCH began with a single CNC router borrowed from a furniture workshop. Today we are a small team of five, hand-finishing every piece that leaves our Zamalek studio — and the standard has not changed.
          </p>
          <Link to="/about" className="btn-outline text-sm">Read Our Story <ArrowRight size={15} /></Link>
        </div>
      </section>
    </div>
  )
}
