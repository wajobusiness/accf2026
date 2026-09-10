'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ArrowRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  User,
  Sparkles,
  FileText,
} from 'lucide-react';
import { UI_STRINGS } from '@/lib/translations';
import { getFallbackArticles, NewsArticleItem } from '@/lib/newsTypes';
import type { Locale } from '@/lib/content';

interface LatestNewsProps {
  locale: Locale;
  initialNews?: NewsArticleItem[];
}

export const LatestNews: React.FC<LatestNewsProps> = ({ locale, initialNews }) => {
  const t = UI_STRINGS[locale].news;
  const isRtl = locale === 'ar';

  const articles: NewsArticleItem[] =
    initialNews && initialNews.length > 0 ? initialNews : getFallbackArticles(locale);

  // Carousel index state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  // Dynamically calculate visible items per slide based on window width
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, articles.length - visibleCount);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay interval every 5.5 seconds
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex, nextSlide]);

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Strip with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accbcf-blue/10 border border-accbcf-blue/20 text-xs font-bold uppercase tracking-wider text-accbcf-blue">
              <Sparkles className="w-3.5 h-3.5 text-accbcf-gold" />
              <span>{t.badge}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-accbcf-charcoal font-bold leading-tight">
              {t.title}
            </h2>
            <p className="text-accbcf-gray text-base leading-relaxed">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Navigation Controls & View All */}
          <div className="flex items-center gap-4">
            {/* Slider Prev/Next Chevrons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous News Slide"
                className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-accbcf-gold hover:border-accbcf-gold hover:text-accbcf-charcoal text-accbcf-charcoal flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer"
              >
                {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next News Slide"
                className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-accbcf-gold hover:border-accbcf-gold hover:text-accbcf-charcoal text-accbcf-charcoal flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer"
              >
                {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>

            <Link
              href={`/${locale}/news`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accbcf-blue text-white hover:bg-accbcf-blue-dark transition-colors shadow-sm"
            >
              <span>{t.viewAll}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Sliding Carousel Track */}
        <div className="relative overflow-hidden py-2">
          <motion.div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {articles.map((post) => (
              <div
                key={post.id}
                className="flex-shrink-0 px-3 sm:px-4"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <article className="h-full bg-[#F8FAFC] rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm hover:bg-white hover:border-accbcf-blue/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Featured Image Frame */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-accbcf-blue/90 text-white backdrop-blur-sm shadow-sm">
                          {post.category}
                        </span>
                      </div>

                      {/* Live Editorial Indicator */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white font-medium">
                        <span className="flex items-center gap-1.5 backdrop-blur-md bg-black/40 px-2.5 py-0.5 rounded-full">
                          <Calendar className="w-3 h-3 text-accbcf-gold" />
                          <span>{post.date}</span>
                        </span>
                        <span className="flex items-center gap-1.5 backdrop-blur-md bg-black/40 px-2.5 py-0.5 rounded-full">
                          <Clock className="w-3 h-3 text-accbcf-gold" />
                          <span>{post.readTime}</span>
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-3.5">
                      <h3 className="font-serif text-lg font-bold text-accbcf-charcoal group-hover:text-accbcf-blue transition-colors line-clamp-2 leading-snug">
                        <Link href={`/${locale}/news/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-accbcf-gray text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Editor / Author Badge with Total Post Count */}
                      <div className="pt-3 border-t border-gray-200/80 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-full overflow-hidden bg-accbcf-blue/10 border border-accbcf-gold/50 flex items-center justify-center flex-shrink-0">
                            {post.author?.avatar ? (
                              <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={28}
                                height={28}
                                className="object-cover"
                              />
                            ) : (
                              <User className="w-3.5 h-3.5 text-accbcf-blue" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <span className="block text-xs font-bold text-accbcf-charcoal truncate">
                              {post.author?.name || 'ACCBCF Secretariat'}
                            </span>
                            <span className="block text-[10px] text-accbcf-gray truncate">
                              {post.author?.designation || 'Contributing Editor'}
                            </span>
                          </div>
                        </div>

                        {/* Total Posts by Editor Badge */}
                        <span
                          title={`${post.author?.name} has published ${post.author?.totalPosts || 1} posts`}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-accbcf-gold/15 text-accbcf-charcoal border border-accbcf-gold/40 flex-shrink-0"
                        >
                          <FileText className="w-3 h-3 text-accbcf-gold-dark" />
                          <span>
                            {post.author?.totalPosts || 1}{' '}
                            {locale === 'zh' ? '篇要闻' : 'Posts'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Read Article Link */}
                  <div className="px-6 pb-6 pt-1">
                    <Link
                      href={`/${locale}/news/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accbcf-blue group-hover:text-accbcf-orange transition-colors"
                    >
                      <span>{t.readArticle}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Pagination Dots */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 bg-accbcf-gold'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
