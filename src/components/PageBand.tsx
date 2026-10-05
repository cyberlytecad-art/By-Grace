import React from 'react';

/**
 * Full-width header band for inner pages in the footer's night-sky style,
 * white text, and a rounded bottom edge that sits over the page backdrop.
 */
export const PageBand: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}> = ({ eyebrow, title, children }) => (
  <section className="night-band relative overflow-hidden rounded-b-[32px] sm:rounded-b-[48px] shadow-xl shadow-[#0B1430]/25">
    <div className="max-w-[1250px] mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-14 md:pb-20">
      <p className="text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#FDE047] mb-2">
        {eyebrow}
      </p>
      <h1 className="text-4xl sm:text-5xl md:text-[54px] font-black tracking-tight leading-tight text-white mb-4 drop-shadow-sm">
        {title}
      </h1>
      {children && (
        <div className="text-base sm:text-[17px] text-white/90 max-w-[800px] leading-relaxed">{children}</div>
      )}
    </div>
  </section>
);
