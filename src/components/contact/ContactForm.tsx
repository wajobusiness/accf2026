'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { SITE_INFO, CORE_SERVICES, PRIORITY_SECTORS } from '@/lib/content';
import { UI_STRINGS } from '@/lib/translations';
import type { Locale } from '@/lib/content';

interface ContactFormProps {
  locale: Locale;
}

export const ContactForm: React.FC<ContactFormProps> = ({ locale }) => {
  const searchParams = useSearchParams();
  const t = UI_STRINGS[locale].contactPage;

  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interestArea, setInterestArea] = useState('government-cooperation');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const sectorParam = searchParams.get('sector');
    if (serviceParam) {
      setInterestArea(serviceParam);
    } else if (sectorParam) {
      setInterestArea(sectorParam);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate diplomatic dispatch transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-md">
          <div className="mb-8 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accbcf-blue/10 text-accbcf-blue">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-accbcf-charcoal">
              {t.title}
            </h2>
            <p className="text-accbcf-gray text-sm leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-emerald-900">
                {locale === 'zh' ? '意向已成功接收' : 'Transmission Confirmed'}
              </h3>
              <p className="text-emerald-800 text-sm leading-relaxed max-w-md mx-auto">
                {t.form.success}
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setMessage('');
                }}
                className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
              >
                {locale === 'zh' ? '提交另一份意向' : 'Submit Another Inquiry'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-accbcf-charcoal">
                    {t.form.fullName} <span className="text-accbcf-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.form.fullNamePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accbcf-blue focus:border-transparent transition-all"
                  />
                </div>

                {/* Organization */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-accbcf-charcoal">
                    {t.form.organization} <span className="text-accbcf-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder={t.form.organizationPlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accbcf-blue focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Country */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-accbcf-charcoal">
                    {t.form.country} <span className="text-accbcf-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder={t.form.countryPlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accbcf-blue focus:border-transparent transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-accbcf-charcoal">
                    {t.form.email} <span className="text-accbcf-red">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.form.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accbcf-blue focus:border-transparent transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-accbcf-charcoal">
                    {t.form.phone} <span className="text-accbcf-red">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.form.phonePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accbcf-blue focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Interest Area */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-accbcf-charcoal">
                  {t.form.interestArea}
                </label>
                <select
                  value={interestArea}
                  onChange={(e) => setInterestArea(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accbcf-blue focus:border-transparent transition-all"
                >
                  <optgroup label={locale === 'zh' ? '核心服务项目' : 'Core Programs & Services'}>
                    {CORE_SERVICES.map((srv) => (
                      <option key={srv.slug} value={srv.slug}>
                        {srv.name[locale]}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={locale === 'zh' ? '十二大重点产业' : '12 Priority Sectors'}>
                    {PRIORITY_SECTORS.map((sec) => (
                      <option key={sec.slug} value={sec.slug}>
                        {sec.name[locale]}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-accbcf-charcoal">
                  {t.form.message} <span className="text-accbcf-red">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.form.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-accbcf-blue focus:border-transparent transition-all"
                />
              </div>

              {/* Submit Button with Gold Sheen Sweep */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="sheen-sweep w-full flex items-center justify-center gap-2 py-4 px-8 rounded-full text-sm font-bold uppercase tracking-wider bg-accbcf-gold text-accbcf-charcoal hover:bg-accbcf-gold-light hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{t.form.sending}</span>
                ) : (
                  <>
                    <span>{t.form.submit}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Diplomatic Coordinates & Secretariat Details */}
        <div className="lg:col-span-5 space-y-8">
          {/* Official Secretariat Card */}
          <div className="bg-accbcf-blue text-white rounded-3xl p-8 sm:p-10 border border-accbcf-gold/30 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-accbcf-gold border border-white/20">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-accbcf-gold">
                  {locale === 'zh' ? '常设办事处' : 'Permanent Secretariat'}
                </span>
                <h3 className="font-serif text-xl font-bold">
                  {SITE_INFO.hqCity[locale]}
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-white/90 border-t border-white/15 pt-6">
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-widest text-accbcf-gold">
                  {locale === 'zh' ? '官方驻地地址' : 'Official Headquarters Address'}
                </p>
                <p className="leading-relaxed text-white/95">
                  {SITE_INFO.hqAddress[locale]}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-widest text-accbcf-gold">
                  {locale === 'zh' ? '公函收发邮箱' : 'Diplomatic Mailbox'}
                </p>
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="hover:text-accbcf-gold transition-colors block underline underline-offset-4"
                >
                  {SITE_INFO.email}
                </a>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-widest text-accbcf-gold">
                  {locale === 'zh' ? '商务总机电话' : 'Secretariat Hotline'}
                </p>
                <a
                  href={`tel:${SITE_INFO.phone}`}
                  className="hover:text-accbcf-gold transition-colors block"
                >
                  {SITE_INFO.phone}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={SITE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  <span>WhatsApp Direct Chat (+234 916 016 6906)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center gap-2 text-xs text-white/70">
              <Clock className="w-4 h-4 text-accbcf-gold flex-shrink-0" />
              <span>{t.visitingHours}</span>
            </div>
          </div>

          {/* Interactive Map Embed / Secretariat Coordinates */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm space-y-4">
            <h4 className="font-serif font-bold text-sm text-accbcf-charcoal">
              {locale === 'zh' ? '阿布贾联邦秘书处地理位置' : 'Federal Secretariat Complex Map'}
            </h4>
            <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-gray-200">
              <iframe
                title="ACCBCF Headquarters Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.384594639992!2d7.4871465!3d9.0371452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b0800b6736d%3A0x8e8eb4fb90e8c89c!2sFederal%20Ministry%20of%20Industry%2C%20Trade%20and%20Investment!5e0!3m2!1sen!2s!4v1709800000000!5m2!1sen!2s"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
