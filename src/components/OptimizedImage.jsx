/**
 * OptimizedImage.jsx
 * Drop-in <picture> wrapper yang mengutamakan WebP, fallback ke JPEG/PNG.
 * Mendukung srcset untuk responsive images & native lazy loading.
 *
 * Props:
 *   srcWebp   – string | string[]  path WebP (satu atau array untuk srcset)
 *   srcFallback – string           path JPEG/PNG fallback (terbesar)
 *   sizes     – string             nilai atribut sizes (default: "100vw")
 *   alt, width, height, className, loading, fetchPriority
 */
export default function OptimizedImage({
  srcWebp,
  srcFallback,
  sizes = '100vw',
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  fetchPriority,
}) {
  // srcWebp bisa berupa string tunggal atau array [{ src, width }]
  const webpSrcset = Array.isArray(srcWebp)
    ? srcWebp.map(({ src, w }) => `${src} ${w}w`).join(', ')
    : srcWebp

  return (
    <picture>
      {webpSrcset && (
        <source type="image/webp" srcSet={webpSrcset} sizes={sizes} />
      )}
      <img
        src={srcFallback}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        decoding="async"
        {...(fetchPriority && { fetchPriority })}
      />
    </picture>
  )
}
