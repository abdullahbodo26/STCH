import React from 'react'

// Photo-accurate SVG of the actual STCH cherry-wood card holder
// variant: 'plain' | 'band'
export default function STCHCardHolder({
  engravingText = '',
  fontFamily = "'Playfair Display', serif",
  fontSize = 22,
  posX = 35,        // 0-100% of viewBox width
  posY = 50,        // 0-100% of viewBox height
  showPosition = false,
  variant = 'plain',
  className = '',
}) {
  // ViewBox dimensions
  const VW = 460, VH = 320
  // Body bounds (leaves room for shadow)
  const BX = 32, BY = 24, BW = 355, BH = 272, BR = 14
  const RIGHT = BX + BW   // 387
  const BOTTOM = BY + BH  // 296

  // Thumb notch (centered vertically on right edge)
  const TNR = 28
  const TNY = BY + BH / 2 // 160

  // Stitch holes (left side of face)
  const holes = [
    { cx: BX + 22, cy: BY + 68 },
    { cx: BX + 22, cy: BOTTOM - 68 },
  ]

  // Colors
  const WOOD_BASE  = '#C47C35'
  const WOOD_MID   = '#B86E28'
  const WOOD_LIGHT = '#D9965A'
  const WOOD_DARK  = '#8B4E1E'
  const ENGRAVE    = '#3D1500'
  const NOTCH_FILL = '#6B3010'

  // Body path with thumb notch cutout on right edge
  const bodyPath = [
    `M ${BX + BR} ${BY}`,
    `L ${RIGHT - BR} ${BY}`,
    `A ${BR} ${BR} 0 0 1 ${RIGHT} ${BY + BR}`,
    `L ${RIGHT} ${TNY - TNR}`,
    `A ${TNR} ${TNR} 0 0 0 ${RIGHT} ${TNY + TNR}`,
    `L ${RIGHT} ${BOTTOM - BR}`,
    `A ${BR} ${BR} 0 0 1 ${RIGHT - BR} ${BOTTOM}`,
    `L ${BX + BR} ${BOTTOM}`,
    `A ${BR} ${BR} 0 0 1 ${BX} ${BOTTOM - BR}`,
    `L ${BX} ${BY + BR}`,
    `A ${BR} ${BR} 0 0 1 ${BX + BR} ${BY}`,
    `Z`,
  ].join(' ')

  // Engrave text position in SVG units
  const engX = BX + 15 + (BW - 60) * (posX / 100)
  const engY = BY + 15 + (BH - 30) * (posY / 100)

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      className={className}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        {/* Drop shadow */}
        <filter id="holder-drop" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#1A0800" floodOpacity="0.38" />
        </filter>

        {/* Engrave look: inset shadow */}
        <filter id="engrave-fx">
          <feDropShadow dx="0.6" dy="0.8" stdDeviation="0.4" floodColor={ENGRAVE} floodOpacity="0.85" />
        </filter>

        {/* Wood surface gradient (top-left light → bottom-right dark) */}
        <linearGradient id="wood-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={WOOD_LIGHT} />
          <stop offset="45%"  stopColor={WOOD_BASE} />
          <stop offset="100%" stopColor={WOOD_MID} />
        </linearGradient>

        {/* Top-edge highlight */}
        <linearGradient id="edge-hi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="0.22" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Body clip */}
        <clipPath id="body-clip"><path d={bodyPath} /></clipPath>

        {/* Slot depth shadow */}
        <linearGradient id="slot-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="#0A0400" stopOpacity="0" />
          <stop offset="100%" stopColor="#0A0400" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* ─── Drop shadow beneath holder ─── */}
      <ellipse cx={BX + BW / 2} cy={BOTTOM + 28} rx={BW * 0.42} ry={12}
        fill="#1A0800" opacity="0.22" />

      {/* ─── Holder shadow (raised look) ─── */}
      <path d={bodyPath} fill={WOOD_BASE} filter="url(#holder-drop)" />

      {/* ─── Wood face fill ─── */}
      <path d={bodyPath} fill="url(#wood-grad)" />

      {/* ─── Wood grain lines ─── */}
      <g clipPath="url(#body-clip)">
        {Array.from({ length: 16 }, (_, i) => {
          const y = BY + 10 + i * 17
          const w1 = (i % 3 === 0) ? 1.1 : 0.55
          const opc = (i % 4 === 0) ? 0.4 : (i % 2 === 0 ? 0.22 : 0.15)
          const col = (i % 3 === 0) ? WOOD_DARK : WOOD_LIGHT
          const d = i % 2 === 0 ? 1.5 : -1.5
          return (
            <path
              key={i}
              d={`M ${BX} ${y} Q ${BX + BW * 0.35} ${y + d} ${BX + BW * 0.65} ${y - d * 0.6} T ${RIGHT} ${y}`}
              stroke={col} strokeWidth={w1} strokeOpacity={opc} fill="none"
            />
          )
        })}

        {/* Face highlight (top edge) */}
        <rect x={BX} y={BY} width={BW} height={BH} fill="url(#edge-hi)" />

        {/* ─── Right-side card slot layers ─── */}
        {/* Slot depth shading */}
        <rect x={RIGHT - 70} y={BY} width={70} height={BH} fill="url(#slot-grad)" />
        {/* Layer separation lines */}
        {[52, 34, 18].map((offset, i) => (
          <line key={i}
            x1={RIGHT - offset} y1={BY + 30} x2={RIGHT - offset} y2={TNY - TNR - 4}
            stroke={ENGRAVE} strokeWidth="0.8" strokeOpacity={0.18 - i * 0.04}
          />
        ))}
        {[52, 34, 18].map((offset, i) => (
          <line key={i}
            x1={RIGHT - offset} y1={TNY + TNR + 4} x2={RIGHT - offset} y2={BOTTOM - 30}
            stroke={ENGRAVE} strokeWidth="0.8" strokeOpacity={0.18 - i * 0.04}
          />
        ))}

        {/* Visible card edge in slot */}
        <rect x={RIGHT - 42} y={BY + 22} width={38} height={TNY - TNR - BY - 22 - 4}
          rx={3} fill="#F0E4CC" opacity={0.55} />
        <rect x={RIGHT - 42} y={TNY + TNR + 4} width={38} height={BOTTOM - 22 - (TNY + TNR + 4)}
          rx={3} fill="#F0E4CC" opacity={0.55} />

        {/* ─── Thumb notch recess ─── */}
        {/* Dark fill inside the notch arc */}
        <path
          d={`M ${RIGHT} ${TNY - TNR} A ${TNR} ${TNR} 0 0 0 ${RIGHT} ${TNY + TNR} L ${RIGHT} ${TNY - TNR}`}
          fill={NOTCH_FILL}
        />
        {/* Notch inner shadow */}
        <path
          d={`M ${RIGHT} ${TNY - TNR} A ${TNR} ${TNR} 0 0 0 ${RIGHT} ${TNY + TNR}`}
          fill="none" stroke={ENGRAVE} strokeWidth="3" strokeOpacity="0.4"
        />

        {/* ─── Elastic band (Band variant) ─── */}
        {variant === 'band' && (
          <g>
            {/* Band shadow */}
            <rect x={BX + BW * 0.45 + 1} y={BY + 1} width={22} height={BH}
              fill="#1A1A2E" opacity="0.18" />
            {/* Band */}
            <rect x={BX + BW * 0.45} y={BY} width={20} height={BH}
              fill="#2C3454" />
            {/* Band highlight */}
            <rect x={BX + BW * 0.45} y={BY} width={3} height={BH}
              fill="white" opacity="0.08" />
          </g>
        )}
      </g>

      {/* ─── Body outline (subtle edge bevel) ─── */}
      <path d={bodyPath} fill="none" stroke={WOOD_DARK} strokeWidth="1.2" strokeOpacity="0.35" />
      {/* Top highlight rim */}
      <path
        d={`M ${BX + BR} ${BY} L ${RIGHT - BR} ${BY} A ${BR} ${BR} 0 0 1 ${RIGHT} ${BY + BR}`}
        fill="none" stroke="white" strokeWidth="1.2" strokeOpacity="0.25"
      />

      {/* ─── Left stitch holes ─── */}
      {holes.map((h, i) => (
        <g key={i}>
          {/* Hole shadow */}
          <ellipse cx={h.cx + 0.8} cy={h.cy + 1} rx={7} ry={9}
            fill="#2A0D00" opacity="0.35" />
          {/* Hole */}
          <ellipse cx={h.cx} cy={h.cy} rx={6.5} ry={8.5}
            fill="#1C0800" />
          {/* Cord detail — upper twist */}
          <path
            d={`M ${h.cx - 3} ${h.cy - 9} C ${h.cx - 3} ${h.cy - 4} ${h.cx + 3} ${h.cy - 7} ${h.cx + 3} ${h.cy - 2}`}
            stroke={WOOD_LIGHT} strokeWidth="1.8" fill="none" strokeOpacity="0.75"
          />
          <path
            d={`M ${h.cx + 3} ${h.cy - 9} C ${h.cx + 3} ${h.cy - 4} ${h.cx - 3} ${h.cy - 7} ${h.cx - 3} ${h.cy - 2}`}
            stroke={WOOD_DARK} strokeWidth="1.2" fill="none" strokeOpacity="0.5"
          />
          {/* Cord detail — lower twist */}
          <path
            d={`M ${h.cx + 3} ${h.cy + 9} C ${h.cx + 3} ${h.cy + 4} ${h.cx - 3} ${h.cy + 7} ${h.cx - 3} ${h.cy + 2}`}
            stroke={WOOD_LIGHT} strokeWidth="1.8" fill="none" strokeOpacity="0.75"
          />
          <path
            d={`M ${h.cx - 3} ${h.cy + 9} C ${h.cx - 3} ${h.cy + 4} ${h.cx + 3} ${h.cy + 7} ${h.cx + 3} ${h.cy + 2}`}
            stroke={WOOD_DARK} strokeWidth="1.2" fill="none" strokeOpacity="0.5"
          />
        </g>
      ))}

      {/* ─── Default STCH brand engraving (shown when no custom text) ─── */}
      {!engravingText.trim() && (
        <text
          x={BX + 105}
          y={BY + BH / 2}
          fontSize="30"
          fontFamily="'Playfair Display', serif"
          fontWeight="600"
          fill={ENGRAVE}
          fillOpacity="0.82"
          transform={`rotate(-90 ${BX + 105} ${BY + BH / 2})`}
          textAnchor="middle"
          dominantBaseline="middle"
          letterSpacing="7"
          filter="url(#engrave-fx)"
        >
          STCH
        </text>
      )}

      {/* ─── Custom engraving overlay ─── */}
      {engravingText.trim() && (
        <g>
          {/* Position crosshair (optional) */}
          {showPosition && (
            <g opacity="0.4">
              <line x1={engX - 10} y1={engY} x2={engX + 10} y2={engY}
                stroke={ENGRAVE} strokeWidth="1" />
              <line x1={engX} y1={engY - 10} x2={engX} y2={engY + 10}
                stroke={ENGRAVE} strokeWidth="1" />
            </g>
          )}
          {/* Engraved text */}
          <text
            x={engX}
            y={engY}
            fontSize={fontSize}
            fontFamily={fontFamily}
            fill={ENGRAVE}
            fillOpacity="0.88"
            textAnchor="middle"
            dominantBaseline="middle"
            filter="url(#engrave-fx)"
          >
            {engravingText}
          </text>
        </g>
      )}
    </svg>
  )
}
