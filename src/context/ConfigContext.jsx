import React, { createContext, useContext, useState, useMemo } from 'react'
import { ENGRAVING_FONTS, BASE_PRICE, ENGRAVING_PRICE, GIFT_WRAP_PRICE } from '../data/configOptions'

const ConfigContext = createContext(null)

export function ConfigProvider({ children }) {
  const [engravingText, setEngravingText] = useState('')
  const [font, setFont]         = useState(ENGRAVING_FONTS[0])
  const [fontSize, setFontSize] = useState(22)
  const [posX, setPosX]         = useState(35)
  const [posY, setPosY]         = useState(50)
  const [giftWrap, setGiftWrap] = useState(false)
  const [giftNote, setGiftNote] = useState('')

  const hasEngraving = engravingText.trim().length > 0

  const totalPrice = useMemo(() => {
    return BASE_PRICE + (hasEngraving ? ENGRAVING_PRICE : 0) + (giftWrap ? GIFT_WRAP_PRICE : 0)
  }, [hasEngraving, giftWrap])

  function resetConfig() {
    setEngravingText('')
    setFont(ENGRAVING_FONTS[0])
    setFontSize(22)
    setPosX(35)
    setPosY(50)
    setGiftWrap(false)
    setGiftNote('')
  }

  return (
    <ConfigContext.Provider value={{
      engravingText, setEngravingText,
      font, setFont,
      fontSize, setFontSize,
      posX, setPosX,
      posY, setPosY,
      giftWrap, setGiftWrap,
      giftNote, setGiftNote,
      hasEngraving, totalPrice, resetConfig,
    }}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const ctx = useContext(ConfigContext)
  if (!ctx) throw new Error('useConfig must be used within ConfigProvider')
  return ctx
}
