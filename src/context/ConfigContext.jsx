import React, { createContext, useContext, useState, useMemo } from 'react'
import { materialOptions, slotOptions, finishOptions, edgeOptions, stitchColors, engravedDesigns, BASE_PRICE } from '../data/configOptions'

const ConfigContext = createContext(null)

export function ConfigProvider({ children }) {
  const [material, setMaterial]     = useState(materialOptions[0])
  const [slots, setSlots]           = useState(slotOptions[1])
  const [finish, setFinish]         = useState(finishOptions[0])
  const [edge, setEdge]             = useState(edgeOptions[0])
  const [stitch, setStitch]         = useState(stitchColors[0])
  const [design, setDesign]         = useState(engravedDesigns[0])
  const [customText, setCustomText] = useState('')
  const [giftWrap, setGiftWrap]     = useState(false)
  const [giftNote, setGiftNote]     = useState('')

  const totalPrice = useMemo(() => {
    return (
      BASE_PRICE +
      (material?.price ?? 0) +
      (slots?.price ?? 0) +
      (finish?.price ?? 0) +
      (edge?.price ?? 0) +
      (design?.price ?? 0) +
      (giftWrap ? 80 : 0)
    )
  }, [material, slots, finish, edge, design, giftWrap])

  const config = { material, slots, finish, edge, stitch, design, customText, giftWrap, giftNote }

  function resetConfig() {
    setMaterial(materialOptions[0])
    setSlots(slotOptions[1])
    setFinish(finishOptions[0])
    setEdge(edgeOptions[0])
    setStitch(stitchColors[0])
    setDesign(engravedDesigns[0])
    setCustomText('')
    setGiftWrap(false)
    setGiftNote('')
  }

  return (
    <ConfigContext.Provider value={{
      config, totalPrice,
      material, setMaterial,
      slots, setSlots,
      finish, setFinish,
      edge, setEdge,
      stitch, setStitch,
      design, setDesign,
      customText, setCustomText,
      giftWrap, setGiftWrap,
      giftNote, setGiftNote,
      resetConfig,
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
