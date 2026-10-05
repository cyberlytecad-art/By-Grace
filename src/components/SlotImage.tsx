import React, { useEffect, useRef, useState } from 'react';
import { SiteImage } from '../data/siteImages';

/**
 * Drop inside an image placeholder (which needs `relative`).
 * Covers the placeholder with the photo once it loads; if the file is missing,
 * it stays hidden and the placeholder shows as before.
 */
export const SlotImage: React.FC<{ image: SiteImage; eager?: boolean }> = ({ image, eager = false }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Catch images that finished (or failed) before React attached its handlers.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) {
      if (img.naturalWidth > 0) setLoaded(true);
      else setFailed(true);
    }
  }, [image.src]);

  if (failed) return null;

  return (
    <img
      ref={imgRef}
      src={image.src}
      alt={image.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`absolute inset-0 w-full h-full object-cover rounded-[inherit] ${loaded ? 'slot-loaded opacity-100' : 'opacity-0'}`}
    />
  );
};
