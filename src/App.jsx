import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ConfigProvider } from './context/ConfigContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Designs from './pages/Designs'
import Configurator from './pages/Configurator'
import About from './pages/About'
import Cart from './pages/Cart'

export default function App() {
  return (
    <CartProvider>
      <ConfigProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/"            element={<Home />}         />
              <Route path="/shop"        element={<Shop />}         />
              <Route path="/shop/:id"    element={<Shop />}         />
              <Route path="/designs"     element={<Designs />}      />
              <Route path="/configure"   element={<Configurator />} />
              <Route path="/about"       element={<About />}        />
              <Route path="/cart"        element={<Cart />}         />
            </Routes>
          </main>
          <Footer />
        </div>
      </ConfigProvider>
    </CartProvider>
  )
}
