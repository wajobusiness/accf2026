import React from 'react';
import type { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { OrgChart } from '@/components/governance/OrgChart';
import type { Locale } from '@/lib/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'zh' ? 'zh' : 'en';
  return {
    title: locale === 'zh' ? '治理架构' : 'Governance & Leadership',
    description: 'ACCBCF institutional governance structure, Board of Directors, and committees.',
  };
}

export default async function GovernancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'zh' ? 'zh' : 'en';
  const isZh = locale === 'zh';

  return (
    <div className="pt-24 pb-20">
      <section className="bg-accbcf-blue-deep text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-accbcf-gold/30">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-accbcf-gold/20 text-accbcf-gold border border-accbcf-gold/40">
            <Shield className="w-3.5 h-3.5" />
            <span>{isZh ? '治理体系' : 'Governance Framework'}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold">
            <span className="inline-block bg-accbcf-gold text-accbcf-charcoal px-5 py-1.5 sm:px-7 sm:py-2 font-serif font-bold shadow-md">
              {isZh ? '组织领导集体与治理架构' : 'Leadership & Governance Structure'}
            </span>
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {isZh
              ? '严密的顶层制度设计，统筹推进中非高层对话与跨国产业落地'
              : 'Rigorous institutional structure ensuring sovereign alignment, high-level policy dialogue, and flawless execution.'}
          </p>
        </div>
      </section>

      <OrgChart locale={locale} />
    </div>
  );
}
