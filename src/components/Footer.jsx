import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-bark text-ivory/80 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-display font-bold text-3xl text-ivory mb-1">STCH</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-sand mb-4">Organic Card Holders · Egypt</p>
            <p className="text-sm leading-relaxed max-w-sm opacity-75">
              Handcrafted card holders made from premium organic materials — wood sourced from sustainable forests and full-grain leather from ethical tanneries. Every piece is made with care, built to last a lifetime.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-ivory/60 hover:text-sand transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="mailto:hello@stch.eg" className="text-ivory/60 hover:text-sand transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-ivory font-semibold text-sm tracking-widest uppercase mb-5">Explore</h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/shop',      label: 'Shop All'     },
                { to: '/designs',   label: 'Designs'      },
                { to: '/configure', label: 'Configure'    },
                { to: '/about',     label: 'Our Story'    },
                { to: '/cart',      label: 'Cart'         },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-sand transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / info */}
          <div>
            <h4 className="text-ivory font-semibold text-sm tracking-widest uppercase mb-5">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-sand" />
                <span>Cairo, Egypt<br /><span className="opacity-60">Delivery across Egypt</span></span>
              </li>
              <li>
                <a href="mailto:hello@stch.eg" className="hover:text-sand transition-colors">
                  hello@stch.eg
                </a>
              </li>
              <li>
                <a href="tel:+201000000000" className="hover:text-sand transition-colors">
                  +20 100 000 0000
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-ivory/10">
              <p className="text-xs opacity-50">
                Prices in Egyptian Pounds (EGP).<br />
                Free delivery on orders over EGP 1,000.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-40">
          <p>© {new Date().getFullYear()} STCH. All rights reserved.</p>
          <p>Made with care in Egypt</p>
        </div>
      </div>
    </footer>
  )
}
