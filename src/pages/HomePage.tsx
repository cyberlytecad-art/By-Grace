import React from 'react';
import {
  ArrowRight,
  Tent,
  Armchair,
  Package,
  Popcorn,
  Sparkles,
  Truck,
  ShieldCheck,
  HeartHandshake,
  CalendarCheck,
  Instagram,
  PartyPopper,
} from 'lucide-react';
import { PageId } from '../types';
import { SmartImage } from '../components/SmartImage';
import { HERO, INSTAGRAM_GALLERY, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/siteImages';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const go = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryCards = [
    {
      id: 'inflatables',
      title: 'Inflatables',
      desc: 'Bounce houses, combos, water slides & more.',
      icon: Sparkles,
      iconStyle: 'from-[#087BF5] to-[#20BEEF]',
      targetPage: 'rentals' as PageId,
    },
    {
      id: 'tents',
      title: 'Tents',
      desc: 'Tents for any size event.',
      icon: Tent,
      iconStyle: 'from-[#FF6B4A] to-[#FF9F43]',
      targetPage: 'rentals' as PageId,
    },
    {
      id: 'tables-chairs',
      title: 'Tables & Chairs',
      desc: 'Everything you need for your party.',
      icon: Armchair,
      iconStyle: 'from-[#10B981] to-[#5DD39E]',
      targetPage: 'rentals' as PageId,
    },
    {
      id: 'concessions',
      title: 'Concessions',
      desc: 'Popcorn, cotton candy and more.',
      icon: Popcorn,
      iconStyle: 'from-[#EF4444] to-[#FF7EB6]',
      targetPage: 'rentals' as PageId,
    },
    {
      id: 'packages',
      title: 'Packages',
      desc: 'Save with our bundles.',
      icon: Package,
      iconStyle: 'from-[#8B5CF6] to-[#C056E0]',
      targetPage: 'packages' as PageId,
    },
  ];

  const reasons = [
    {
      icon: Truck,
      title: 'Delivered & set up',
      desc: 'We drop off, anchor, and pick up. You just enjoy the party.',
      tint: 'bg-blue-50 text-[#087BF5]',
    },
    {
      icon: ShieldCheck,
      title: 'Cleaned every time',
      desc: 'Every inflatable, table, and chair is sanitized before it reaches you.',
      tint: 'bg-emerald-50 text-[#10B981]',
    },
    {
      icon: HeartHandshake,
      title: 'Family-owned',
      desc: 'A local Haines City family serving neighbors across Central Florida.',
      tint: 'bg-rose-50 text-[#EF4444]',
    },
    {
      icon: CalendarCheck,
      title: 'Easy booking',
      desc: 'Build your order, see the estimate instantly, and reserve your date.',
      tint: 'bg-amber-50 text-[#F59E0B]',
    },
  ];

  const steps = [
    { n: '1', title: 'Pick your fun', desc: 'Browse slides, bounce houses, tents and more, or grab a bundle.' },
    { n: '2', title: 'Get your estimate', desc: 'See pricing instantly with delivery to your city included.' },
    { n: '3', title: 'We handle the rest', desc: 'We arrive early, set everything up safely, and pick it all up after.' },
  ];

  const galleryTones = ['blue', 'sunset', 'berry', 'lagoon', 'lime', 'sunset'] as const;

  return (
    <div className="w-full bg-white">
      {/* HERO */}
      <section className="relative w-full">
        <div className="relative w-full h-[640px] sm:h-[680px] lg:h-[740px] flex items-center overflow-hidden">
          <SmartImage
            image={HERO}
            tone="blue"
            quiet
            eager
            className="absolute inset-0"
            imgClassName="scale-105"
          >
            {/* Floating balloons, shown only until a hero photo is added */}
            <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
              <div className="absolute right-[8%] top-[14%] w-24 h-28 rounded-[50%] bg-[#FF9F43]/80 animate-float shadow-lg" />
              <div className="absolute right-[18%] top-[32%] w-16 h-20 rounded-[50%] bg-[#FF7EB6]/80 animate-float-slow shadow-lg" />
              <div className="absolute right-[5%] top-[48%] w-14 h-16 rounded-[50%] bg-[#FFD166]/90 animate-float-slow shadow-lg" />
            </div>
          </SmartImage>

          {/* Readability overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#071326]/90 via-[#071326]/60 to-[#071326]/5 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071326]/50 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-24">
            <div className="max-w-2xl lg:max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/25 backdrop-blur-sm px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white mb-5">
                <PartyPopper className="w-4 h-4 text-[#FFD166]" />
                Haines City's family-owned party rentals
              </p>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold tracking-tight leading-[0.95] text-white mb-6 drop-shadow-sm">
                Fun for
                <br />
                <span className="bg-gradient-to-r from-[#20BEEF] via-[#7DE3FF] to-[#FFD166] bg-clip-text text-transparent">
                  every event
                </span>
              </h1>

              <p className="text-base sm:text-lg text-white/90 max-w-lg leading-relaxed mb-8">
                Bounce houses, water slides, tents, tables, chairs and more, delivered and set up across
                Haines City and all of Central Florida.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => go('rentals')}
                  className="h-[52px] px-7 bg-gradient-to-r from-[#087BF5] to-[#20BEEF] hover:from-[#076edc] hover:to-[#14ADE0] text-white font-bold text-sm sm:text-base rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-[#087BF5]/30 transition-all hover:translate-y-[-2px]"
                >
                  <span>View Rentals</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  onClick={() => go('estimator')}
                  className="h-[52px] px-7 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base rounded-full ring-1 ring-white/70 inline-flex items-center justify-center backdrop-blur-sm transition-all hover:translate-y-[-2px]"
                >
                  Get a Quote
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#7DE3FF]" />
                  Cleaned & inspected every rental
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#7DE3FF]" />
                  Free delivery in Haines City
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Category bar overlapping the hero */}
        <div className="relative -mt-14 sm:-mt-16 z-20 max-w-[1250px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {categoryCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <button
                  key={card.id}
                  onClick={() => go(card.targetPage)}
                  className="text-left bg-white rounded-2xl p-3.5 sm:p-5 min-h-[124px] flex flex-col justify-between shadow-[0_10px_30px_-12px_rgba(7,19,38,0.25)] ring-1 ring-[#E8ECF1] hover:ring-[#087BF5]/40 transition-all hover:translate-y-[-4px] hover:shadow-[0_18px_40px_-14px_rgba(8,123,245,0.35)] group last:col-span-2 md:last:col-span-1"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${card.iconStyle} text-white flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-[-6deg]`}
                    >
                      <IconComponent className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="font-display font-semibold text-[15px] sm:text-lg text-[#071326] group-hover:text-[#087BF5] transition-colors leading-tight">
                      {card.title}
                    </span>
                  </div>
                  <p className="mt-3 text-xs sm:text-[13px] text-[#64748B] leading-snug line-clamp-2">
                    {card.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY BY GRACE */}
      <section className="max-w-[1250px] mx-auto px-4 sm:px-6 mt-20 sm:mt-28">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#087BF5] mb-2">
            Why By Grace
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#071326]">
            Party planning, <span className="text-[#087BF5]">made easy</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="rounded-2xl bg-white ring-1 ring-[#E8ECF1] p-6 hover:ring-[#CBD5E1] hover:shadow-lg hover:shadow-slate-200/60 transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl ${r.tint} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#071326] mb-1.5">{r.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-[1250px] mx-auto px-4 sm:px-6 mt-20 sm:mt-28">
        <div className="relative overflow-hidden rounded-[28px] bg-[#F3F8FF] ring-1 ring-[#E1ECFB] px-6 py-12 sm:px-12 sm:py-16">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#20BEEF]/15 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-[#FF9F43]/15 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#087BF5] mb-2">
              How it works
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#071326] mb-10">
              Three steps to an unforgettable party
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <div className="font-display w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-[#087BF5] to-[#20BEEF] text-white text-xl font-bold flex items-center justify-center shadow-md shadow-[#087BF5]/25">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#071326] mb-1">{s.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => go('estimator')}
              className="mt-10 h-12 px-6 bg-[#071326] hover:bg-[#13233F] text-white font-bold text-sm rounded-full inline-flex items-center gap-2 transition-all hover:translate-y-[-1px]"
            >
              Start your estimate
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* INSTAGRAM GALLERY */}
      <section className="max-w-[1250px] mx-auto px-4 sm:px-6 mt-20 sm:mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#E1306C] mb-2">
              Recent parties
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#071326]">
              See us in action
            </h2>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#E1306C] to-[#FF9F43] text-white px-5 py-3 text-sm font-bold shadow-md hover:shadow-lg hover:translate-y-[-1px] transition-all"
          >
            <Instagram className="w-4 h-4" />
            Follow @{INSTAGRAM_HANDLE}
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {INSTAGRAM_GALLERY.map((img, i) => (
            <a
              key={img.src}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden"
            >
              <SmartImage
                image={img}
                tone={galleryTones[i % galleryTones.length]}
                icon={Instagram}
                className="aspect-square"
                imgClassName="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#071326]/0 group-hover:bg-[#071326]/35 transition-colors flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-[1250px] mx-auto px-4 sm:px-6 mt-20 sm:mt-28">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#087BF5] via-[#1A9BF0] to-[#20BEEF] px-6 py-12 sm:px-12 sm:py-14 text-white">
          <div className="absolute inset-0 confetti-dots opacity-30" aria-hidden="true" />
          <div className="absolute -right-10 -bottom-16 w-64 h-64 rounded-full bg-[#FFD166]/30 blur-2xl" aria-hidden="true" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white/80 mb-2">
                Local & family-owned in Haines City, FL
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                Planning a birthday, school event, or church gathering?
              </h2>
              <p className="text-white/85">
                We deliver, set up, and inspect every inflatable, tent, and table so your event runs seamlessly.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => go('rentals')}
                className="h-12 px-6 bg-white text-[#087BF5] hover:bg-[#F3F8FF] font-bold text-sm rounded-full shadow-md transition-all hover:translate-y-[-1px]"
              >
                Browse Catalog
              </button>
              <a
                href="tel:8632804175"
                className="h-12 px-6 inline-flex items-center ring-1 ring-white/70 hover:bg-white/10 text-white font-bold text-sm rounded-full transition-colors"
              >
                863-280-4175
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
