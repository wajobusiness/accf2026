'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { SAMPLE_NEWS } from '@/lib/content';
import { UI_STRINGS } from '@/lib/translations';
import type { Locale } from '@/lib/content';

interface LatestNewsProps {
  locale: Locale;
}

export const LatestNews: React.FC<LatestNewsProps> = ({ locale }) => {
  const t = UI_STRINGS[locale].news;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-accbcf-light">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accbcf-blue/10 border border-accbcf-blue/20 text-xs font-bold uppercase tracking-wider text-accbcf-blue">
              <span>{t.badge}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-accbcf-charcoal font-bold leading-tight">
              {t.title}
            </h2>
            <p className="text-accbcf-gray text-base leading-relaxed">
              {t.subtitle}
            </p>
          </motion.div>

          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accbcf-blue text-white hover:bg-accbcf-blue-dark transition-colors"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_NEWS.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div>
                {/* Featured Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title[locale]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-accbcf-blue/90 text-white backdrop-blur-sm">
                      {post.category[locale]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-accbcf-gray">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-accbcf-gold" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-accbcf-gold" />
                      {post.readTime[locale]}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-accbcf-charcoal group-hover:text-accbcf-blue transition-colors line-clamp-2 leading-snug">
                    <Link href={`/${locale}/news/${post.slug}`}>
                      {post.title[locale]}
                    </Link>
                  </h3>

                  <p className="text-accbcf-gray text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt[locale]}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/${locale}/news/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accbcf-blue group-hover:text-accbcf-orange transition-colors"
                >
                  <span>{t.readArticle}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
