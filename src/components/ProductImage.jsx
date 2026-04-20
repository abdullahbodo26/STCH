import React from 'react'

// Displays the real product photo rotated 90° CW so the holder is upright (portrait)
// children renders on top — used for the engraving text overlay in Configurator
export default function ProductImage({ variant = 'plain', className = '', children }) {
  const src = variant === 'band' ? '/stch-back.jpg' : '/stch-front.jpg'
  const alt = variant === 'band' ? 'STCH Band Card Holder' : 'STCH Classic Card Holder'

  return (
    <div
      className={`relative overflow-hidden bg-[#e8e0d5] ${className}`}
      style={{ aspectRatio: '3/4' }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          position: 'absolute',
          width: '134%',
          height: 'auto',
          maxWidth: 'none',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-50%) rotate(90deg)',
          userSelect: 'none',
        }}
      />
      {children}
    </div>
  )
}
