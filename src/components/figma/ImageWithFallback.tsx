import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  // Extract fetchPriority (camelCase) if provided and map to the
  // correct lowercase DOM attribute `fetchpriority` to avoid React warning.
  const { src, alt, style, className, /* @ts-expect-error - allow non-typed prop */ fetchPriority, ...rest } = props as any

  // Provide sensible defaults for non-critical images without changing visuals.
  // Callers can override by passing explicit props.
  const normalizedRest: any = { ...rest }
  if (normalizedRest.loading === undefined) normalizedRest.loading = 'lazy'
  if (normalizedRest.decoding === undefined) normalizedRest.decoding = 'async'

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={ERROR_IMG_SRC}
          alt="Error loading image"
          {...normalizedRest}
          // Map camelCase prop to lowercase attribute for the DOM
          {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
          data-original-url={src}
        />
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...normalizedRest}
      // Map camelCase prop to lowercase attribute for the DOM
      {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
      onError={handleError}
    />
  )
}
