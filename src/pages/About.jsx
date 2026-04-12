import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Heart, Zap } from 'lucide-react'
import WoodPreview from '../components/WoodPreview'

export default function About() {
  return (
    <div className="min-h-screen pt-20">

      {/* Hero */}
      <section className="relative bg-bark text-ivory overflow-hidden py-24">
        <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block opacity-20">
          <WoodPreview material="walnut" engraving="solar" className="w-full h-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-subtitle text-sand mb-4">Our Story</p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-ivory leading-tight max-w-2xl mb-6">
            Made in Egypt.<br />
            <span className="text-sand italic">Built forever.</span>
          </h1>
          <p className="text-ivory/70 text-lg max-w-lg leading-relaxed">
            STCH is a Cairo-born brand obsessed with one thing: making the most honest, beautiful card holder you'll ever carry.
          </p>
        </div>
      </section>

      {/* Origin story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-subtitle mb-3">Origin</p>
            <h2 className="section-title mb-6">Why we started</h2>
            <div className="space-y-4 text-bark/70 leading-relaxed">
              <p>
                STCH began in a small workshop in Cairo's Zamalek district in 2021. Our founder, tired of carrying plastic cards loose in a pocket, wanted something worthy of the Egyptian craftsman tradition — something that felt like an object, not a utility.
              </p>
              <p>
                We started with one walnut card holder and a CNC router borrowed from a friend's furniture workshop. The first batch sold out through Instagram in three days.
              </p>
              <p>
                Three years later, we're still handcrafting every piece — now with a small team of five, a laser engraver, and a collection of six organic materials sourced from around the world and finished in Cairo.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square">
              <WoodPreview material="walnut" engraving="pyramid" className="w-full h-full" />
            </div>
            <div className="aspect-square mt-8">
              <WoodPreview material="leather-tan" engraving="lotus" className="w-full h-full" />
            </div>
            <div className="aspect-square -mt-8">
              <WoodPreview material="oak" engraving="scarab" className="w-full h-full" />
            </div>
            <div className="aspect-square">
              <WoodPreview material="leather-black" engraving="solar" className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ivory-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">What we believe</p>
            <h2 className="section-title">Three commitments</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Organic Materials Only',
                body: 'We use walnut, oak, and bamboo from certified sustainable forests. Our leathers are full-grain and vegetable-tanned — no chrome tanning, no shortcuts. The materials we choose age gracefully and leave a minimal footprint.',
              },
              {
                icon: Heart,
                title: 'Human-Scale Craft',
                body: "Every card holder is touched by human hands before it leaves our workshop. We sand, finish, engrave, and inspect each piece individually. We will never sacrifice quality for volume — if we can't make it properly, we don't make it.",
              },
              {
                icon: Zap,
                title: 'Precision Engineering',
                body: 'The snap-fit tolerance on our wood wallets is 0.2mm. Our engravings are cut at 600 DPI. Egyptian heritage inspires our designs, but Swiss-level precision guides our manufacturing. Both things can be true.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white p-8 border border-sand/20">
                <div className="w-10 h-10 bg-sand/15 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-sand-dark" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-semibold text-xl text-bark mb-3">{title}</h3>
                <p className="text-bark/65 leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials sourcing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <p className="section-subtitle mb-3">Sourcing</p>
          <h2 className="section-title">Where our materials come from</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-sand/20">
          {[
            { mat: 'walnut', name: 'American Black Walnut', origin: 'Certified FSC forests, USA', note: 'Rich dark grain, dense and durable' },
            { mat: 'oak',    name: 'European White Oak',   origin: 'Sustainable forests, France', note: 'Light golden tones, fine even grain' },
            { mat: 'bamboo', name: 'Moso Bamboo',          origin: 'Certified organic farms, China', note: 'Fastest-growing, carbon-negative material' },
            { mat: 'leather-tan',   name: 'Full-Grain Tan Leather',   origin: 'Vegetable tannery, Italy', note: 'Vegetable-tanned, develops rich patina' },
            { mat: 'leather-brown', name: 'Full-Grain Dark Leather',  origin: 'Vegetable tannery, Italy', note: 'Espresso-dyed, supple and strong' },
            { mat: 'leather-black', name: 'Full-Grain Black Leather', origin: 'Vegetable tannery, Italy', note: 'Matte-finished, timeless professional look' },
          ].map(({ mat, name, origin, note }) => (
            <div key={mat} className="bg-white p-6 flex gap-4 items-start">
              <div className="w-12 h-12 shrink-0">
                <WoodPreview material={mat} className="w-full h-full" />
              </div>
              <div>
                <h4 className="font-semibold text-bark text-sm mb-0.5">{name}</h4>
                <p className="text-sand-dark text-xs mb-1">{origin}</p>
                <p className="text-bark/50 text-xs leading-snug">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-sand/10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">The team</p>
            <h2 className="section-title">Five people, one workshop</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
              { name: 'Ahmed',   role: 'Founder & Designer'  },
              { name: 'Nour',    role: 'Lead Craftsperson'    },
              { name: 'Omar',    role: 'CNC & Laser Operator' },
              { name: 'Salma',   role: 'Leatherwork'          },
              { name: 'Youssef', role: 'Finishing & QC'       },
            ].map(({ name, role }) => (
              <div key={name} className="space-y-3">
                <div className="aspect-square bg-ivory-dark mx-auto max-w-[100px] flex items-center justify-center">
                  <span className="font-display text-3xl font-bold text-bark/30">{name[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-bark text-sm">{name}</p>
                  <p className="text-bark/50 text-xs">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bark text-ivory py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ivory mb-4">
            Ready to carry something beautiful?
          </h2>
          <p className="text-ivory/65 mb-8">Every order supports a small Cairo workshop doing things the old way.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/shop" className="btn-sand text-sm">Shop the Collection <ArrowRight size={15} /></Link>
            <Link to="/configure" className="border-2 border-ivory/40 text-ivory px-6 py-3 text-sm font-medium hover:border-sand hover:text-sand transition-colors inline-flex items-center gap-2">
              Build Custom <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
