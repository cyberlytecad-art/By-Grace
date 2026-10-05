import React from 'react';

/**
 * Simple inner-page title: eyebrow, heading and intro text sitting directly
 * on the page background, with no band or pattern behind it.
 */
export const PageBand: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}> = ({ eyebrow, title, children }) => (
  <section className="max-w-[1250px] mx-auto px-4 sm:px-6 pt-10 md:pt-14 pb-8 md:pb-10">
    <p className="text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#087BF5] mb-2">
      {eyebrow}
    </p>
    <h1 className="text-4xl sm:text-5xl md:text-[54px] font-black tracking-tight leading-tight text-[#071326] mb-4">
      {title}
    </h1>
    {children && (
      <div className="text-base sm:text-[17px] text-[#475569] max-w-[800px] leading-relaxed">{children}</div>
    )}
  </section>
);
