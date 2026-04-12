import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Zap, Award, Truck } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import WoodPreview from '../components/WoodPreview'

const HERO_MATERIALS = ['walnut', 'oak', 'bamboo', 'leather-tan', 'leather-black']

export default function Home() {
  const featured = products.filter(p => p.featured)
  const [heroMat, setHeroMat] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setHeroMat(m => (m + 1) % HERO_MATERIALS.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-bark">
        {/* Grain overlay */}
        <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />

        {/* Decorative background circles */}
        <div className="absolute -right-40 -top-40 w-[700px] h-[700px] rounded-full bg-sand/10 pointer-events-none" />
        <div className="absolute -left-20 bottom-0 w-[400px] h-[400px] rounded-full bg-leather/10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: text */}
          <div className="text-ivory">
            <p className="section-subtitle text-sand mb-4 animate-fade-up">Handcrafted in Egypt</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.08] text-ivory mb-6 animate-fade-up">
              Carry nature<br />
              <span className="text-sand italic">in your pocket.</span>
            </h1>
            <p className="text-ivory/70 text-lg leading-relaxed max-w-md mb-10 animate-fade-up">
              Premium card holders handcrafted from organic wood and full-grain leather.
              Each piece is a small work of art, built to last decades.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up">
              <Link to="/shop" className="btn-sand text-sm">
                Shop Collection <ArrowRight size={16} />
              </Link>
              <Link to="/configure" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-ivory/40 text-ivory text-sm font-medium tracking-wide hover:border-sand hover:text-sand transition-colors">
                Build Yours <ArrowRight size={16} />
              </Link>
            </div>
            <div className="flex gap-8 mt-12 text-ivory/50 text-sm">
              <div>
                <span className="block font-display font-semibold text-2xl text-sand">8</span>
                Models
              </div>
              <div>
                <span className="block font-display font-semibold text-2xl text-sand">12</span>
                Designs
              </div>
              <div>
                <span className="block font-display font-semibold text-2xl text-sand">6</span>
                Materials
              </div>
            </div>
          </div>

          {/* Right: animated product preview */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              <div className="aspect-square transition-all duration-700">
                <WoodPreview
                  material={HERO_MATERIALS[heroMat]}
                  engraving="wave"
                  className="w-full h-full rounded-sm shadow-2xl"
                />
              </div>

              {/* Material selector dots */}
              <div className="flex gap-2 justify-center mt-6">
                {HERO_MATERIALS.map((m, i) => (
                  <button
                    key={m}
                    onClick={() => setHeroMat(i)}
                    className={`w-3 h-3 transition-all duration-200 ${i === heroMat ? 'scale-125' : 'opacity-50'}`}
                    style={{ backgroundColor: getMaterialHex(m) }}
                    aria-label={m}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/40 text-xs tracking-widest uppercase animate-bounce">
          <span>Scroll</span>
          <div className="w-px h-8 bg-ivory/20" />
        </div>
      </section>

      {/* ── PERKS ─────────────────────────────────────────────── */}
      <section className="bg-ivory-dark border-y border-sand/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Leaf,  title: 'Organic Materials', sub: 'Wood, bamboo & full-grain leather' },
              { icon: Zap,   title: 'Laser Engraving',   sub: 'Precision-cut designs & custom text' },
              { icon: Award, title: 'Lifetime Craftsmanship', sub: 'Built to outlast trends' },
              { icon: Truck, title: 'Delivery Across Egypt', sub: 'Free on orders over EGP 1,000' },
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

      {/* ── FEATURED PRODUCTS ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-subtitle mb-2">Featured</p>
            <h2 className="section-title">Bestselling<br />pieces</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-2 text-sm font-medium text-sand-dark hover:text-bark transition-colors">
            View all <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <Link to="/shop" className="flex sm:hidden items-center justify-center gap-2 mt-8 text-sm font-medium text-sand-dark">
          View all products <ArrowRight size={15} />
        </Link>
      </section>

      {/* ── MATERIAL SPOTLIGHT ───────────────────────────────── */}
      <section className="bg-ivory-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-subtitle mb-3">Materials</p>
              <h2 className="section-title mb-6">Organic, by design</h2>
              <p className="text-bark/70 leading-relaxed mb-6">
                Every material we use is chosen for its character and longevity. Our walnut and oak come from certified sustainable European forests. Our leathers are full-grain, vegetable-tanned using centuries-old methods.
              </p>
              <p className="text-bark/70 leading-relaxed mb-8">
                No synthetics. No shortcuts. Just honest materials that age beautifully — developing a unique patina that makes your piece yours alone.
              </p>
              <Link to="/shop" className="btn-outline text-sm">
                Explore Materials <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['walnut', 'oak', 'bamboo', 'leather-tan', 'leather-brown', 'leather-black'].map(m => (
                <Link key={m} to="/shop" className="aspect-square hover:scale-105 transition-transform duration-200">
                  <WoodPreview material={m} className="w-full h-full" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONFIGURATOR CALLOUT ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-walnut py-24">
        <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-ivory">
          <p className="section-subtitle text-sand mb-3">Fully Custom</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-ivory mb-5">
            Design your own.
          </h2>
          <p className="text-ivory/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Choose your material, finish, card capacity, engraving, and more.
            Our interactive configurator builds your ideal card holder — live, in your browser.
          </p>
          <Link to="/configure" className="btn-sand text-sm">
            Start Configuring <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── DESIGNS PREVIEW ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-subtitle mb-2">Engravings</p>
            <h2 className="section-title">12 signature<br />designs</h2>
          </div>
          <Link to="/designs" className="hidden sm:flex items-center gap-2 text-sm font-medium text-sand-dark hover:text-bark transition-colors">
            View all <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { mat: 'walnut',        eng: 'wave',     name: 'Nile Wave'     },
            { mat: 'leather-black', eng: 'pyramid',  name: 'Step Pyramid'  },
            { mat: 'oak',           eng: 'scarab',   name: 'Scarab'        },
            { mat: 'leather-brown', eng: 'solar',    name: 'Solar Eye'     },
          ].map(({ mat, eng, name }) => (
            <Link key={eng} to="/designs" className="group card-hover">
              <div className="aspect-[4/3] overflow-hidden">
                <WoodPreview material={mat} engraving={eng} className="w-full h-full" />
              </div>
              <p className="text-sm font-medium text-bark mt-2 group-hover:text-sand-dark transition-colors">{name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── STORY SNIPPET ────────────────────────────────────── */}
      <section className="bg-sand/10 border-t border-sand/20 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-subtitle mb-4">Our Story</p>
          <h2 className="section-title mb-6">Made in Egypt,<br />built for the world.</h2>
          <p className="text-bark/65 leading-relaxed text-lg mb-8">
            STCH was born in Cairo from a simple belief: that the everyday objects you carry should be as thoughtfully made as the life you live. We blend ancient Egyptian craft heritage with modern precision to create card holders that outlast trends.
          </p>
          <Link to="/about" className="btn-outline text-sm">
            Read Our Story <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  )
}

function getMaterialHex(m) {
  const map = { walnut: '#4A3728', oak: '#C19A6B', bamboo: '#D4B896', 'leather-tan': '#C19A6B', 'leather-black': '#1C1C1E' }
  return map[m] || '#C9A87C'
}
