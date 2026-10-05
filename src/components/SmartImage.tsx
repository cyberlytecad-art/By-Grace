import React, { useEffect, useRef, useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { SiteImage } from '../data/siteImages';

type Tone = 'blue' | 'sunset' | 'lagoon' | 'berry' | 'lime';

const TONES: Record<Tone, string> = {
  blue: 'from-[#087BF5] via-[#20BEEF] to-[#7DE3FF]',
  sunset: 'from-[#FF6B4A] via-[#FF9F43] to-[#FFD166]',
  lagoon: 'from-[#0EA5A4] via-[#22C3B5] to-[#9BF0E1]',
  berry: 'from-[#8B5CF6] via-[#C056E0] to-[#FF7EB6]',
  lime: 'from-[#10B981] via-[#5DD39E] to-[#C7F59B]',
};

interface SmartImageProps {
  image: SiteImage;
  className?: string;
  imgClassName?: string;
  tone?: Tone;
  /** Short label shown on the placeholder until a real photo is added. */
  label?: string;
  icon?: React.ComponentType<{ className?: string }>;
  /** Hide the placeholder label and icon (for small or decorative slots). */
  quiet?: boolean;
  eager?: boolean;
  /** Extra decoration rendered only until the photo loads. */
  children?: React.ReactNode;
}

/**
 * Renders a photo from `public/images`. A colorful branded panel sits underneath
 * and stays visible until the photo loads, so a missing or slow file never looks broken.
 */
export const SmartImage: React.FC<SmartImageProps> = ({
  image,
  className = '',
  imgClassName = '',
  tone = 'blue',
  label,
  icon: Icon = ImageIcon,
  quiet = false,
  eager = false,
  children,
}) => {
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

  return (
    <div className={`${/\babsolute\b/.test(className) ? '' : 'relative'} overflow-hidden ${className}`}>
      {!loaded && (
        <div
          role={failed ? 'img' : undefined}
          aria-label={failed ? image.alt : undefined}
          className={`absolute inset-0 bg-gradient-to-br ${TONES[tone]} ${imgClassName}`}
        >
          <div className="absolute inset-0 confetti-dots opacity-40" aria-hidden="true" />
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/20 blur-2xl" aria-hidden="true" />
          <div className="absolute -left-8 -top-8 w-28 h-28 rounded-full bg-white/25 blur-xl" aria-hidden="true" />
          {!quiet && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white text-center px-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/40 flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              {label && (
                <span className="font-display text-lg sm:text-xl font-semibold drop-shadow-sm">{label}</span>
              )}
            </div>
          )}
          {children}
        </div>
      )}
      {!failed && (
        <img
          ref={imgRef}
          src={image.src}
          alt={image.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  );
};
