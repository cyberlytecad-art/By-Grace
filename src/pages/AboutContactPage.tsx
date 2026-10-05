import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Calendar, ArrowRight, CheckCircle2, Calculator } from 'lucide-react';
import { PageId, QuoteFormData } from '../types';

interface AboutContactPageProps {
  initialCategory?: string;
  onNavigate?: (page: PageId) => void;
}

export const AboutContactPage: React.FC<AboutContactPageProps> = ({ initialCategory, onNavigate }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    eventDate: '',
    eventType: initialCategory ? `Rental: ${initialCategory}` : '',
    message: initialCategory ? `I am interested in reserving ${initialCategory}. Please let me know availability and pricing.` : '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});

  useEffect(() => {
    if (initialCategory) {
      setFormData(prev => ({
        ...prev,
        eventType: prev.eventType || `Rental: ${initialCategory}`,
        message: prev.message || `I am interested in reserving ${initialCategory}. Please let me know availability and pricing.`,
      }));
    }
  }, [initialCategory]);

  const serviceCities = [
    'Haines City',
    'Lakeland',
    'Davenport',
    'Dundee',
    'Kissimmee',
    'Orlando',
    'Winter Haven',
    'St. Cloud',
    'Dr. Phillips',
    'Poinciana',
    'Auburndale',
    'Lake Wales',
  ];

  const validate = () => {
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) newErrors.phone = 'Please enter your phone number';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Please let us know what items you need';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full pb-20">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 pt-12 md:pt-16">
        {/* 
          2-Column Layout
          LEFT = approx 56-58%
          RIGHT = approx 42-44%
          Gap of 70-100px between columns
          Top edges cleanly aligned
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* ================= LEFT COLUMN: ABOUT US & SERVICE AREA (~57%) ================= */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              {/* Small uppercase blue eyebrow */}
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#087BF5] mb-2.5">
                ABOUT US
              </p>

              {/* Large two-line heading: “By Grace” bright blue, “Party Rentals” dark navy/black */}
              <h1 className="text-4xl sm:text-5xl md:text-[52px] font-black tracking-tight leading-[1.05] mb-6">
                <span className="text-[#087BF5] block">By Grace</span>
                <span className="text-[#071326] block">Party Rentals</span>
              </h1>

              {/* Body Copy */}
              <div className="space-y-4 text-base sm:text-[16.5px] text-[#475569] leading-[1.6]">
                <p>
                  By Grace Party Rentals is a family-owned business based in
                  Haines City, Florida, serving all of Central Florida. We provide
                  clean, high-quality bounce houses, water slides, tents, tables,
                  chairs, concessions and more for birthdays, school events,
                  church events, corporate functions and any special occasion.
                </p>
                <p>
                  Our goal is simple — to make your event easy, stress-free,
                  and memorable. From delivery to setup, we take care of
                  everything so you can focus on enjoying the day.
                </p>
              </div>
            </div>

            {/* Thin light-gray horizontal divider */}
            <hr className="border-t border-[#E8ECF1] my-8" />

            {/* SERVICE AREA SECTION */}
            <div>
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-[#087BF5] mb-2">
                SERVICE AREA
              </p>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071326] mb-3">
                Haines City & All of Central Florida
              </h2>

              <p className="text-base text-[#475569] leading-relaxed mb-5">
                We proudly serve Haines City, Lakeland, Davenport, Dundee,
                Kissimmee, Orlando, Winter Haven, St. Cloud, Dr. Phillips and more!
              </p>

              {/* Service City Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {serviceCities.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#F1F5F9] text-xs font-semibold text-[#334155] border border-[#E2E8F0]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#087BF5] mr-2" />
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Quality Promise Box */}
            <div className="mt-8 p-5 bg-[#F8FAFC] border border-[#E8ECF1] rounded-xl flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-[#087BF5] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#071326]">Cleaned & Sanitized Before Every Event</h4>
                <p className="text-xs text-[#64748B] mt-1 leading-normal">
                  Your children's health and safety are our highest priorities. All inflatables, tents, and party furniture are thoroughly disinfected and inspected prior to delivery.
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: CONTACT CARD (~43%) ================= */}
          <div className="lg:col-span-5">
            <div 
              id="quote-form" 
              className="bg-white border border-[#E5E9EE] rounded-[12px] p-7 sm:p-9 shadow-xs"
            >
              {/* Card Header */}
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087BF5] mb-1.5">
                CONTACT US
              </p>
              <h2 className="text-3xl sm:text-[40px] font-black tracking-tight leading-tight mb-3">
                <span className="text-[#071326]">Get in </span>
                <span className="party-text">Touch</span>
              </h2>
              <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                Have questions or ready to book? Give us a call, send us a
                message, or fill out the form and we’ll get back to you as
                soon as possible.
              </p>

              {/* 3 Stacked Information Rows */}
              <div className="space-y-4 mb-6">
                {/* 1. PHONE */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-[#087BF5] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#071326] uppercase tracking-wider">
                      Phone
                    </span>
                    <div className="text-sm text-[#475569] font-medium space-x-2 mt-0.5">
                      <a href="tel:8632804175" className="hover:text-[#087BF5] transition-colors">
                        863-280-4175
                      </a>
                      <span className="text-[#CBD5E1]">&bull;</span>
                      <a href="tel:3215229690" className="hover:text-[#087BF5] transition-colors">
                        321-522-9690
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. LOCATION */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#071326] uppercase tracking-wider">
                      Location
                    </span>
                    <p className="text-sm text-[#475569] mt-0.5 leading-snug">
                      Haines City, FL<br />
                      <span className="text-xs text-[#64748B]">Serving all of Central Florida</span>
                    </p>
                  </div>
                </div>

                {/* 3. BUSINESS HOURS */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-[#071326] uppercase tracking-wider">
                      Business Hours
                    </span>
                    <p className="text-sm text-[#475569] mt-0.5 leading-snug">
                      Mon – Sun<br />
                      <span className="text-xs text-[#64748B]">8:00 AM – 8:00 PM</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Horizontal Divider */}
              <hr className="border-t border-[#E5E9EE] my-6" />

              {/* Instant Online Estimate & Booking Quick Link */}
              {onNavigate && (
                <div className="mb-6 p-3.5 bg-blue-50/60 border border-blue-200/80 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#087BF5] text-white flex items-center justify-center shrink-0">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#071326] block leading-tight">
                        Need Instant Pricing & Booking?
                      </span>
                      <span className="text-[11px] text-[#64748B]">
                        Estimate all equipment and book your date in real time.
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('estimator');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="shrink-0 text-xs font-bold text-[#087BF5] hover:text-[#076edc] hover:underline flex items-center gap-1"
                  >
                    <span>Instant Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* CONTACT FORM */}
              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center animate-in fade-in duration-300">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-[#071326] mb-1">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-[#475569] mb-4">
                    Thank you, {formData.fullName}. Our team at By Grace Party Rentals will review your event details and get back to you right away.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        eventDate: '',
                        eventType: '',
                        message: '',
                      });
                    }}
                    className="text-xs font-bold text-[#087BF5] hover:underline uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-sm font-bold text-[#071326] tracking-wide">
                    Send Us a Message
                  </h3>

                  {/* ROW 1: Full Name * & Phone Number * */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#071326] mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full h-11 px-3 bg-white border ${
                          errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-[#E5E9EE] focus:border-[#087BF5]'
                        } rounded-[8px] text-sm text-[#071326] focus:outline-none transition-colors`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#071326] mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(863) 000-0000"
                        className={`w-full h-11 px-3 bg-white border ${
                          errors.phone ? 'border-red-400 focus:border-red-500' : 'border-[#E5E9EE] focus:border-[#087BF5]'
                        } rounded-[8px] text-sm text-[#071326] focus:outline-none transition-colors`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* ROW 2: Email * & Event Date [calendar icon] */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#071326] mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className={`w-full h-11 px-3 bg-white border ${
                          errors.email ? 'border-red-400 focus:border-red-500' : 'border-[#E5E9EE] focus:border-[#087BF5]'
                        } rounded-[8px] text-sm text-[#071326] focus:outline-none transition-colors`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#071326] mb-1">
                        Event Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.eventDate}
                          onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                          className="w-full h-11 px-3 pr-9 bg-white border border-[#E5E9EE] focus:border-[#087BF5] rounded-[8px] text-sm text-[#071326] focus:outline-none transition-colors"
                        />
                        <Calendar className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* ROW 3: Type of Event (full width dropdown) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#071326] mb-1">
                      Type of Event
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full h-11 px-3 bg-white border border-[#E5E9EE] focus:border-[#087BF5] rounded-[8px] text-sm text-[#071326] focus:outline-none transition-colors"
                    >
                      <option value="">Select an event type...</option>
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="School / Church Event">School / Church Event</option>
                      <option value="Corporate Gathering">Corporate Gathering</option>
                      <option value="Backyard BBQ / Family Reunion">Backyard BBQ / Family Reunion</option>
                      <option value="Community / Block Party">Community / Block Party</option>
                      {formData.eventType && !['Birthday Party', 'School / Church Event', 'Corporate Gathering', 'Backyard BBQ / Family Reunion', 'Community / Block Party'].includes(formData.eventType) && (
                        <option value={formData.eventType}>{formData.eventType}</option>
                      )}
                      <option value="Other">Other Occasion</option>
                    </select>
                  </div>

                  {/* ROW 4: Message / Tell us what you need * (full width textarea) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#071326] mb-1">
                      Message / Tell us what you need <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="E.g., We need a water slide, 2 tents, and tables for about 30 guests in Haines City on Saturday..."
                      className={`w-full min-h-[85px] max-h-[140px] p-3 bg-white border ${
                        errors.message ? 'border-red-400 focus:border-red-500' : 'border-[#E5E9EE] focus:border-[#087BF5]'
                      } rounded-[8px] text-sm text-[#071326] focus:outline-none transition-colors resize-y`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Bottom: Large full-width blue button: Send Message → (~48px tall) */}
                  <button
                    type="submit"
                    className="w-full h-12 bg-[#087BF5] hover:bg-[#076edc] active:bg-[#065ec0] text-white font-bold text-sm rounded-[8px] flex items-center justify-center gap-2 shadow-xs transition-colors mt-2"
                  >
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
