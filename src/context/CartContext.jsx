import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.findIndex(i => i.cartId === action.payload.cartId)
      if (existing >= 0) {
        const updated = [...state.items]
        updated[existing] = { ...updated[existing], qty: updated[existing].qty + 1 }
        return { ...state, items: updated }
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.cartId !== action.payload) }
    case 'UPDATE_QTY': {
      if (action.payload.qty <= 0) {
        return { ...state, items: state.items.filter(i => i.cartId !== action.payload.cartId) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.cartId === action.payload.cartId ? { ...i, qty: action.payload.qty } : i
        ),
      }
    }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

const STORAGE_KEY = 'stch_cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { items: [] }
  } catch {
    return { items: [] }
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = state.items.reduce((sum, i) => sum + i.qty, 0)

  function addItem(item) {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }
  function removeItem(cartId) {
    dispatch({ type: 'REMOVE_ITEM', payload: cartId })
  }
  function updateQty(cartId, qty) {
    dispatch({ type: 'UPDATE_QTY', payload: { cartId, qty } })
  }
  function clearCart() {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider value={{ items: state.items, total, count, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
