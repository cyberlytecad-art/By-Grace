import React, { useState } from 'react';
import { LOGO } from '../data/siteImages';

interface LogoProps {
  className?: string;
}

/** Brand mark: uses public/images/logo.png, or a gradient monogram until it exists. */
export const Logo: React.FC<LogoProps> = ({ className = 'w-12 h-12' }) => {
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      <img
        src={LOGO.src}
        alt={LOGO.alt}
        onError={() => setFailed(true)}
        className={`${className} rounded-full object-cover bg-white ring-2 ring-white shadow-md`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={LOGO.alt}
      className={`${className} rounded-full bg-gradient-to-br from-[#087BF5] via-[#20BEEF] to-[#FF9F43] ring-2 ring-white shadow-md flex items-center justify-center`}
    >
      <span className="font-display font-bold text-white text-[0.95em] leading-none tracking-tight drop-shadow-sm">
        BG
      </span>
    </div>
  );
};
