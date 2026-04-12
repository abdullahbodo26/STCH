import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const navLinks = [
  { to: '/shop',        label: 'Shop'        },
  { to: '/designs',     label: 'Designs'     },
  { to: '/configure',   label: 'Configure'   },
  { to: '/about',       label: 'Our Story'   },
]

export default function Navbar() {
  const { count } = useCart()
  const [open, setOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  const navBg = isHome && !scrolled
    ? 'bg-transparent text-ivory'
    : 'bg-ivory/95 backdrop-blur text-bark border-b border-sand/30'

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-2xl md:text-3xl tracking-tight leading-none">
              STCH
            </span>
            <span className={`hidden sm:block text-[10px] tracking-[0.25em] uppercase mt-1 font-medium opacity-60`}>
              Egypt
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-opacity duration-150
                  ${isActive ? 'opacity-100 border-b-2 border-current pb-0.5' : 'opacity-70 hover:opacity-100'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative p-2 transition-opacity hover:opacity-70"
              aria-label="Cart"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center bg-sand text-white text-[10px] font-bold rounded-none leading-none px-1">
                  {count}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 transition-opacity hover:opacity-70"
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-ivory text-bark border-t border-sand/30 px-4 pb-6 pt-4 space-y-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block py-3 px-2 text-base font-medium border-b border-sand/20 transition-colors
                ${isActive ? 'text-sand-dark' : 'text-bark hover:text-sand-dark'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/cart"
            className="block pt-3 px-2 text-base font-medium text-bark hover:text-sand-dark transition-colors"
          >
            Cart {count > 0 && <span className="ml-2 text-sand font-bold">({count})</span>}
          </Link>
        </div>
      )}
    </header>
  )
}
