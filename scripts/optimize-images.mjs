/**
 * scripts/optimize-images.mjs
 * Jalankan: node scripts/optimize-images.mjs
 *
 * Menghasilkan:
 *   public/assets/brand/
 *     relung-jiwa-landscape-186w.webp   (2×) → 372w
 *     relung-jiwa-landscape-186w.png    (fallback)
 *
 *   public/assets/img/optimized/
 *     dewi-kartini-{800,1200,1600}w.webp
 *     dewi-kartini-{800,1200,1600}w.jpg  (fallback)
 *     dewi-kartini-800w.jpg              (juga dipakai sbg placeholder blur)
 */

import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dir = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dir, '..')

// ── Logo ────────────────────────────────────────────────────────────────────
// Ditampilkan h-8 (32px) sm:h-9 (36px) → rasio 186/48 ≈ 3.875
// Max lebar display: 186px; dengan device-pixel-ratio 2 → 372px cukup
const logoSrc   = resolve(root, 'public/assets/brand/relung-jiwa-landscape.png')
const logoDest  = resolve(root, 'public/assets/brand')

// ── Hero / Practitioner photo ────────────────────────────────────────────────
// DSC00490.jpeg (5304×6627) — fallback untuk Coach Dehan (section tim)
// DSC00539.jpeg (besar, dipakai sebagai hero Dewi Kartini)
// Container hero max ~420px wide, 4/5 aspect → 420×525px displayed
// Dengan 2×dpr → butuh 840px, kita buat 800/1200/1600 sbg srcset
const photoSrc490  = resolve(root, 'public/assets/img/Folder Upload All Mentor/Foto mentor/DSC00490.jpeg')
const photoSrc539  = resolve(root, 'public/assets/img/Folder Upload All Mentor/Foto mentor/DSC00539.jpeg')
const photoDest    = resolve(root, 'public/assets/img/optimized')

async function run() {
  await mkdir(logoDest,  { recursive: true })
  await mkdir(photoDest, { recursive: true })

  // ── Logo: WebP + PNG fallback pada 1× (186w) dan 2× (372w) ──
  console.log('📐 Logo: generating WebP + PNG …')
  for (const w of [186, 372]) {
    await sharp(logoSrc)
      .resize(w, null, { withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(resolve(logoDest, `relung-jiwa-landscape-${w}w.webp`))
    await sharp(logoSrc)
      .resize(w, null, { withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true })
      .toFile(resolve(logoDest, `relung-jiwa-landscape-${w}w.png`))
    console.log(`  ✓ ${w}w`)
  }

  // ── Dewi Kartini (DSC00539) — Hero & Practitioner section ──
  console.log('📐 Dewi Kartini (DSC00539): generating WebP + JPEG …')
  for (const w of [800, 1200, 1600]) {
    await sharp(photoSrc539)
      .resize(w, null, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(resolve(photoDest, `dewi-kartini-${w}w.webp`))
    await sharp(photoSrc539)
      .resize(w, null, { withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(resolve(photoDest, `dewi-kartini-${w}w.jpg`))
    console.log(`  ✓ ${w}w`)
  }

  // ── DSC00490 — dipertahankan untuk keperluan tim/tentang ──
  console.log('📐 DSC00490 (supporting photo): generating WebP + JPEG …')
  for (const w of [800, 1200]) {
    await sharp(photoSrc490)
      .resize(w, null, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(resolve(photoDest, `dsc00490-${w}w.webp`))
    await sharp(photoSrc490)
      .resize(w, null, { withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(resolve(photoDest, `dsc00490-${w}w.jpg`))
    console.log(`  ✓ ${w}w`)
  }

  console.log('\n✅ Semua gambar selesai dioptimasi.')
  console.log('   Output: public/assets/brand/ dan public/assets/img/optimized/')
}

run().catch((err) => { console.error(err); process.exit(1) })
