export const products = [
  {
    id: 'stch-classic',
    name: 'STCH Classic',
    tagline: 'Signature laser-engraved cherry wood card holder',
    description:
      'The original. Precision-cut from solid cherry wood in our Cairo workshop, laser-engraved with the STCH signature. Holds 6–8 cards in a slim 12mm profile. Each piece is hand-finished and individually inspected before leaving our hands.',
    price: 350,
    currency: 'EGP',
    stock: 24,
    tag: 'Bestseller',
    featured: true,
    material: 'Cherry Wood',
    capacity: '6–8 cards',
    dimensions: '85 × 55 × 12mm',
    weight: '35g',
    variant: 'plain',
  },
  {
    id: 'stch-band',
    name: 'STCH Band',
    tagline: 'Cherry wood with a signature elastic card band',
    description:
      'Everything about the Classic, plus a precision-sewn navy elastic band that holds cards with confident grip without a single scratch. Slides into a pocket with no bulk. Made for those who carry more.',
    price: 390,
    currency: 'EGP',
    stock: 18,
    tag: 'New Arrival',
    featured: true,
    material: 'Cherry Wood',
    capacity: '8–10 cards',
    dimensions: '85 × 55 × 14mm',
    weight: '40g',
    variant: 'band',
  },
]

export function getStockStatus(stock) {
  if (stock === 0) return { label: 'Out of Stock', cls: 'stock-out' }
  if (stock <= 5)  return { label: `Only ${stock} left`, cls: 'stock-low' }
  return { label: 'In Stock', cls: 'stock-high' }
}

export function formatPrice(price, currency = 'EGP') {
  return `${currency} ${Number(price).toLocaleString()}`
}
