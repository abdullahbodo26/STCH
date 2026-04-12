import React from 'react'

/**
 * SVG-based material preview rendered purely in CSS/SVG.
 * Shows a realistic card-holder silhouette with material-accurate fill.
 */
export default function WoodPreview({ material = 'walnut', engraving = 'none', customText = '', stitchColor = '#D4C5A9', className = '' }) {
  const mat = getMaterialStyle(material)

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ background: mat.bg }}>
      <svg
        viewBox="0 0 240 160"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4/5 max-w-[220px] drop-shadow-xl"
        aria-label={`${material} card holder preview`}
      >
        <defs>
          {mat.pattern && (
            <pattern id={`pat-${material}`} patternUnits="userSpaceOnUse" width={mat.pattern.w} height={mat.pattern.h} patternTransform="rotate(8)">
              {mat.pattern.lines.map((l, i) => (
                <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={l.stroke} strokeWidth={l.sw} opacity={l.op} />
              ))}
            </pattern>
          )}
          <filter id="inner-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00000033" />
          </filter>
        </defs>

        {/* Card holder body */}
        <rect x="20" y="20" width="200" height="120" rx="6" ry="6" fill={mat.base} filter="url(#inner-shadow)" />
        {mat.pattern && <rect x="20" y="20" width="200" height="120" rx="6" ry="6" fill={`url(#pat-${material})`} opacity="0.4" />}

        {/* Highlight */}
        <rect x="20" y="20" width="200" height="35" rx="6" ry="6" fill="white" opacity="0.08" />

        {/* Card slots / edge lines */}
        {material.startsWith('leather') ? (
          <>
            {/* Leather stitch lines */}
            <line x1="30" y1="80" x2="210" y2="80" stroke={stitchColor} strokeWidth="1" strokeDasharray="5 3" opacity="0.7" />
            {/* Pockets */}
            <rect x="26" y="26" width="88" height="108" rx="3" fill="none" stroke={mat.edge} strokeWidth="1" opacity="0.3" />
            <rect x="126" y="26" width="88" height="108" rx="3" fill="none" stroke={mat.edge} strokeWidth="1" opacity="0.3" />
          </>
        ) : (
          <>
            {/* Wood slot lines */}
            <line x1="20" y1="75" x2="220" y2="75" stroke={mat.edge} strokeWidth="1.5" opacity="0.4" />
            <line x1="120" y1="20" x2="120" y2="140" stroke={mat.edge} strokeWidth="1" opacity="0.25" />
          </>
        )}

        {/* Engraving */}
        <EngravedDesign type={engraving} customText={customText} matColor={mat.engrave} />

        {/* Edge highlight */}
        <rect x="20" y="20" width="200" height="120" rx="6" ry="6" fill="none" stroke={mat.edge} strokeWidth="1" opacity="0.35" />
        <rect x="21" y="21" width="198" height="118" rx="5" ry="5" fill="none" stroke="white" strokeWidth="0.5" opacity="0.12" />
      </svg>
    </div>
  )
}

function EngravedDesign({ type, customText, matColor }) {
  const color = matColor
  const cx = 120, cy = 85

  switch (type) {
    case 'wave':
      return <path d={`M ${cx-40} ${cy} Q ${cx-20} ${cy-12} ${cx} ${cy} Q ${cx+20} ${cy+12} ${cx+40} ${cy}`} fill="none" stroke={color} strokeWidth="1.5" opacity="0.55" />
    case 'pyramid':
      return <polygon points={`${cx},${cy-22} ${cx-30},${cy+14} ${cx+30},${cy+14}`} fill="none" stroke={color} strokeWidth="1.5" opacity="0.55" />
    case 'lotus':
      return (
        <g opacity="0.55">
          <ellipse cx={cx} cy={cy} rx="8" ry="16" fill="none" stroke={color} strokeWidth="1.2" />
          <ellipse cx={cx-14} cy={cy} rx="8" ry="12" fill="none" stroke={color} strokeWidth="1" transform={`rotate(-30,${cx-14},${cy})`} />
          <ellipse cx={cx+14} cy={cy} rx="8" ry="12" fill="none" stroke={color} strokeWidth="1" transform={`rotate(30,${cx+14},${cy})`} />
        </g>
      )
    case 'scarab':
      return (
        <g opacity="0.55" stroke={color} fill="none" strokeWidth="1.2">
          <ellipse cx={cx} cy={cy} rx="12" ry="18" />
          <ellipse cx={cx} cy={cy-6} rx="8" ry="6" />
          <line x1={cx-12} y1={cy-8} x2={cx-22} y2={cy-14} />
          <line x1={cx+12} y1={cy-8} x2={cx+22} y2={cy-14} />
          <line x1={cx-12} y1={cy+4} x2={cx-22} y2={cy+10} />
          <line x1={cx+12} y1={cy+4} x2={cx+22} y2={cy+10} />
        </g>
      )
    case 'solar':
      return (
        <g opacity="0.55" stroke={color} fill="none" strokeWidth="1.2">
          <circle cx={cx} cy={cy} r="10" />
          <circle cx={cx} cy={cy} r="5" />
          {[0,45,90,135,180,225,270,315].map(a => {
            const rad = a * Math.PI / 180
            return <line key={a} x1={cx + 12 * Math.cos(rad)} y1={cy + 12 * Math.sin(rad)} x2={cx + 20 * Math.cos(rad)} y2={cy + 20 * Math.sin(rad)} />
          })}
        </g>
      )
    case 'dune':
      return (
        <g opacity="0.5" stroke={color} fill="none" strokeWidth="1.2">
          {[0,10,20].map(off => (
            <path key={off} d={`M ${cx-40} ${cy+off} Q ${cx} ${cy+off-18} ${cx+40} ${cy+off}`} />
          ))}
        </g>
      )
    case 'stripe':
      return (
        <g opacity="0.45" stroke={color} strokeWidth="1.5">
          {[-12, 0, 12].map(off => (
            <line key={off} x1={cx - 35} y1={cy + off} x2={cx + 35} y2={cy + off} />
          ))}
        </g>
      )
    case 'weave':
      return (
        <g opacity="0.45" stroke={color} fill="none" strokeWidth="1">
          {[-3,-1,1,3].map(i => (
            <React.Fragment key={i}>
              <line x1={cx + i*10 - 30} y1={cy - 20} x2={cx + i*10 + 30} y2={cy + 20} />
              <line x1={cx + i*10 + 30} y1={cy - 20} x2={cx + i*10 - 30} y2={cy + 20} />
            </React.Fragment>
          ))}
        </g>
      )
    case 'kufic':
      return <text x={cx} y={cy + 6} textAnchor="middle" fontSize="20" fontFamily="Georgia, serif" fill={color} opacity="0.5" letterSpacing="6">STCH</text>
    case 'monogram':
      return <text x={cx} y={cy + 8} textAnchor="middle" fontSize="28" fontFamily="Georgia, serif" fontStyle="italic" fill={color} opacity="0.55">{customText?.slice(0, 3) || 'AB'}</text>
    case 'custom-text':
      return <text x={cx} y={cy + 5} textAnchor="middle" fontSize="9" fontFamily="Inter, sans-serif" fill={color} opacity="0.5" letterSpacing="1">{customText?.slice(0, 24) || 'Your Message'}</text>
    default:
      return null
  }
}

function getMaterialStyle(material) {
  switch (material) {
    case 'walnut':
      return {
        base: '#5C3D2E',
        bg: '#F0E8DC',
        edge: '#3D2416',
        engrave: '#2A1508',
        pattern: {
          w: 12, h: 8,
          lines: [
            { x1: 0, y1: 0, x2: 12, y2: 8, stroke: '#3D2416', sw: 0.7, op: 0.5 },
            { x1: 0, y1: 4, x2: 12, y2: 12, stroke: '#3D2416', sw: 0.4, op: 0.3 },
          ],
        },
      }
    case 'oak':
      return {
        base: '#C9A87C',
        bg: '#F5EFE4',
        edge: '#A07850',
        engrave: '#5C3D2E',
        pattern: {
          w: 10, h: 6,
          lines: [
            { x1: 0, y1: 0, x2: 10, y2: 6, stroke: '#A07850', sw: 0.6, op: 0.4 },
            { x1: 0, y1: 3, x2: 10, y2: 9, stroke: '#A07850', sw: 0.3, op: 0.25 },
          ],
        },
      }
    case 'bamboo':
      return {
        base: '#D4B896',
        bg: '#F5F0E4',
        edge: '#B8966A',
        engrave: '#5C3D2E',
        pattern: {
          w: 8, h: 40,
          lines: [
            { x1: 0, y1: 0, x2: 0, y2: 40, stroke: '#B8966A', sw: 0.8, op: 0.3 },
            { x1: 8, y1: 0, x2: 8, y2: 40, stroke: '#B8966A', sw: 0.4, op: 0.2 },
          ],
        },
      }
    case 'leather-tan':
      return {
        base: '#C19A6B',
        bg: '#F0E8D8',
        edge: '#A07850',
        engrave: '#5C3D2E',
        pattern: null,
      }
    case 'leather-brown':
      return {
        base: '#5C3D2E',
        bg: '#EDE0D0',
        edge: '#3D2416',
        engrave: '#1C0A00',
        pattern: null,
      }
    case 'leather-black':
      return {
        base: '#1C1C1E',
        bg: '#E8E4DC',
        edge: '#0A0A0A',
        engrave: '#3D3D3D',
        pattern: null,
      }
    default:
      return { base: '#C9A87C', bg: '#F5EFE4', edge: '#A07850', engrave: '#5C3D2E', pattern: null }
  }
}
