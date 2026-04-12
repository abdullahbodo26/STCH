export const materialOptions = [
  {
    id: 'walnut',
    label: 'Walnut Wood',
    group: 'Wood',
    hex: '#4A3728',
    grain: 'dark',
    texture: 'wood',
    price: 0,
    description: 'Deep, rich grain',
  },
  {
    id: 'oak',
    label: 'Oak Wood',
    group: 'Wood',
    hex: '#C19A6B',
    grain: 'light',
    texture: 'wood',
    price: 0,
    description: 'Light golden warmth',
  },
  {
    id: 'bamboo',
    label: 'Bamboo',
    group: 'Wood',
    hex: '#D4B896',
    grain: 'fine',
    texture: 'bamboo',
    price: -50,
    description: 'Eco-friendly & light',
  },
  {
    id: 'leather-tan',
    label: 'Tan Leather',
    group: 'Leather',
    hex: '#C19A6B',
    grain: 'smooth',
    texture: 'leather',
    price: +80,
    description: 'Classic vegetable-tan',
  },
  {
    id: 'leather-brown',
    label: 'Dark Leather',
    group: 'Leather',
    hex: '#5C3D2E',
    grain: 'smooth',
    texture: 'leather',
    price: +80,
    description: 'Rich espresso tones',
  },
  {
    id: 'leather-black',
    label: 'Black Leather',
    group: 'Leather',
    hex: '#1C1C1E',
    grain: 'smooth',
    texture: 'leather',
    price: +80,
    description: 'Matte black prestige',
  },
]

export const slotOptions = [
  { value: 4,  label: '4 Cards',  price: 0   },
  { value: 6,  label: '6 Cards',  price: 0   },
  { value: 8,  label: '8 Cards',  price: +30 },
  { value: 10, label: '10 Cards', price: +60 },
  { value: 12, label: '12 Cards', price: +90 },
]

export const finishOptions = [
  { id: 'natural',  label: 'Natural',      description: 'Raw organic feel, no coating',    price: 0    },
  { id: 'matte',    label: 'Matte',        description: 'Smooth, anti-glare wax finish',   price: +40  },
  { id: 'satin',    label: 'Satin',        description: 'Silky oil finish with soft sheen', price: +60  },
  { id: 'gloss',    label: 'High Gloss',   description: 'Polished lacquer, mirror shine',   price: +80  },
]

export const edgeOptions = [
  { id: 'raw',       label: 'Raw Edge',       description: 'Natural cut edge',       price: 0   },
  { id: 'burnished', label: 'Burnished',      description: 'Hand-rubbed smooth edge', price: +30 },
  { id: 'painted',   label: 'Painted Edge',   description: 'Matched color dye edge',  price: +50 },
]

export const stitchColors = [
  { id: 'natural',  label: 'Natural Linen', hex: '#D4C5A9' },
  { id: 'brown',    label: 'Dark Brown',    hex: '#5C3D2E' },
  { id: 'black',    label: 'Onyx Black',    hex: '#1C1C1E' },
  { id: 'sand',     label: 'Desert Sand',   hex: '#C9A87C' },
  { id: 'red',      label: 'Papyrus Red',   hex: '#8B2020' },
  { id: 'sage',     label: 'Nile Sage',     hex: '#8B9E7E' },
]

export const engravedDesigns = [
  { id: 'none',      label: 'None',          price: 0    },
  { id: 'wave',      label: 'Nile Wave',     price: +50  },
  { id: 'pyramid',   label: 'Step Pyramid',  price: +50  },
  { id: 'lotus',     label: 'Lotus Grid',    price: +50  },
  { id: 'scarab',    label: 'Scarab',        price: +50  },
  { id: 'solar',     label: 'Solar Eye',     price: +50  },
  { id: 'kufic',     label: 'Kufic Script',  price: +50  },
  { id: 'monogram',  label: 'Monogram (+3 chars)', price: +80, customInput: true },
  { id: 'custom-text', label: 'Custom Text (24 chars)', price: +100, customInput: true },
]

export const BASE_PRICE = 350
