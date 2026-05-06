/**
 * Génère public/og-image.jpg — 1200×630
 * Usage : node generate-og.js
 */
const sharp = require('./node_modules/sharp')
const path  = require('path')

const SRC = path.join(__dirname, 'public/assets/photos-client/de (175).jpg')
const OUT = path.join(__dirname, 'public/og-image.jpg')

const W = 1200
const H = 630

// Overlay SVG : gradient sombre + typographie branding
const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gradient principal : couvre les 2/3 bas pour lisibilité du texte -->
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#18364F" stop-opacity="0.30"/>
      <stop offset="42%"  stop-color="#18364F" stop-opacity="0.52"/>
      <stop offset="100%" stop-color="#18364F" stop-opacity="0.80"/>
    </linearGradient>

    <!-- Gradient latéral gauche : zone texte légèrement plus sombre -->
    <linearGradient id="left" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"  stop-color="#18364F" stop-opacity="0.35"/>
      <stop offset="60%" stop-color="#18364F" stop-opacity="0.00"/>
    </linearGradient>
  </defs>

  <!-- Overlays -->
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <rect width="${W}" height="${H}" fill="url(#left)"/>

  <!-- Ligne décorative dorée (trait fin) -->
  <line x1="72" y1="494" x2="232" y2="494"
        stroke="#B8922E" stroke-width="1" opacity="0.70"/>

  <!-- Surtitre localisé -->
  <text
    x="72" y="476"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="11"
    font-weight="400"
    letter-spacing="5"
    fill="#B8922E"
    opacity="0.90"
    text-anchor="start">DAKHLA · MAROC</text>

  <!-- Nom principal — Palm d'Or -->
  <text
    x="72" y="560"
    font-family="Georgia, 'Times New Roman', Times, serif"
    font-size="74"
    font-weight="300"
    font-style="italic"
    fill="#FFFFFF"
    opacity="0.97"
    text-anchor="start">Palm d&#x2019;Or</text>

  <!-- Sous-titre services -->
  <text
    x="72" y="602"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="13"
    font-weight="400"
    letter-spacing="3.5"
    fill="#FFFFFF"
    opacity="0.55"
    text-anchor="start">RÉSIDENCE · RESTAURANT · CAFÉ</text>

  <!-- Losange décoratif doré (coin bas-droit) -->
  <rect
    x="${W - 52}" y="${H - 52}"
    width="20" height="20"
    transform="rotate(45 ${W - 42} ${H - 42})"
    fill="none"
    stroke="#B8922E"
    stroke-width="1"
    opacity="0.35"/>
</svg>
`

async function generate() {
  try {
    await sharp(SRC)
      .resize(W, H, {
        fit: 'cover',
        position: 'centre',
      })
      .composite([{
        input: Buffer.from(svg),
        top: 0,
        left: 0,
      }])
      .jpeg({ quality: 88, progressive: true })
      .toFile(OUT)

    console.log(`✓ og-image.jpg générée → ${OUT}`)
  } catch (err) {
    console.error('✗ Erreur génération OG image :', err)
    process.exit(1)
  }
}

generate()
