'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, Maximize2, Shield } from 'lucide-react';
import type { Locale } from '@/lib/content';
import { ImageLightboxModal, type LightboxImage } from '@/components/common/ImageLightboxModal';

interface DiplomaticArchiveGalleryProps {
  locale: Locale;
}

export const DiplomaticArchiveGallery: React.FC<DiplomaticArchiveGalleryProps> = ({ locale }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const isZh = locale === 'zh';

  const diplomaticGallery = [
    {
      image: '/images/founder/founder_img_28.jpg',
      caption: isZh ? '与尼日利亚阿南布拉州州长查尔斯·索卢多教授阁下' : 'With Anambra State Governor Prof. Charles Soludo',
      tag: 'G2B Economic Dialogue',
      title: isZh ? '阿南布拉州高层经贸对话' : 'Anambra State Economic Dialogue',
      desc: isZh ? '就次区域基础设施投资、现代农业园区及工业园区建设进行高层会谈。' : 'High-level bilateral strategic consultation on sub-national infrastructure and industrial park development.',
    },
    {
      image: '/images/founder/founder_img_29.jpg',
      caption: isZh ? '与前中国驻尼日利亚特命全权大使崔建春阁下' : 'With Former Chinese Ambassador to Nigeria H.E. Cui Jianchun',
      tag: 'Bilateral Diplomatic Mission',
      title: isZh ? '中尼双边外交战略协同' : 'Bilateral Diplomatic Alignment',
      desc: isZh ? '在驻地使馆就中非经贸互联互通、重大合资项目落地与民间友谊发展深入沟通。' : 'Consultation on bilateral trade corridors and landmark enterprise joint ventures.',
    },
    {
      image: '/images/founder/founder_img_37.jpg',
      caption: isZh ? '与尼日利亚联邦众议院副议长本杰明·卡卢阁下' : 'With Deputy Speaker, Federal House of Representatives Rt. Hon. Benjamin Kalu',
      tag: 'Legislative Cooperation',
      title: isZh ? '联邦众议院立法政策协同' : 'Parliamentary Legislative Policy',
      desc: isZh ? '在联邦议会大厦就外商投资保护法案、贸易便利化政策及双边产业走廊协同座谈。' : 'Strategic legislative dialogue on foreign direct investment protection and trade facilitation.',
    },
    {
      image: '/images/founder/founder_img_38.jpg',
      caption: isZh ? '与前执政党全国主席、前参议员亚当斯·奥希奥姆霍尔阁下' : 'With Senator Adams Oshiomhole (Former APC National Chairman)',
      tag: 'National Leadership',
      title: isZh ? '国家执政领导层战略会晤' : 'National Leadership Dialogue',
      desc: isZh ? '围绕重大产业合资、就业赋能及跨国商会协作进行深入探讨。' : 'High-level deliberation on national industrialization, job creation, and bilateral trade synergy.',
    },
    {
      image: '/images/founder/founder_img_40.jpg',
      caption: isZh ? '与约鲁巴传统最高王领伊费皇城奥尼大帝阁下' : 'With His Imperial Majesty The Ooni of Ife, Oba Adeyeye Enitan Ogunwusi',
      tag: 'Royal Cultural Sovereignty',
      title: isZh ? '传统王室最高顾问与文化主权' : 'Royal Patronage & Cultural Sovereignty',
      desc: isZh ? '传统王领与社会共识构筑中非民间友谊与重大投资长期安全基石。' : 'Traditional royal patronage anchoring cultural diplomacy and security for bilateral investments.',
    },
    {
      image: '/images/founder/founder_img_18.jpg',
      caption: isZh ? '与尼日利亚联邦众议院非中关系委员会主席贾法鲁·雅库布议员' : 'With Hon. Ja’afaru Yakubu, Chairman House Committee on Nigeria-China Relations',
      tag: 'Parliamentary Ties',
      title: isZh ? '众议院非中关系委员会对接' : 'House Committee on Nigeria-China Relations',
      desc: isZh ? '深化双边议会定期交流机制与重点投资项目立法支持。' : 'Strengthening parliamentary exchange mechanisms and institutional support for strategic ventures.',
    },
    {
      image: '/images/founder/founder_img_21.jpg',
      caption: isZh ? '与塔拉巴州副州长阿尔哈吉·阿米努·阿尔卡利阁下' : 'With Taraba State Deputy Governor Alhaji Aminu Alkali',
      tag: 'Sub-National Investment',
      title: isZh ? '次国家级地方产业投资对接' : 'Sub-National Investment Accord',
      desc: isZh ? '推动农业现代化、固态矿产勘探开发与双边产业转移。' : 'Advancing agricultural modernization, solid mineral extraction, and bilateral industrial transfer.',
    },
    {
      image: '/images/founder/founder_img_25.jpg',
      caption: isZh ? '与印度尼西亚驻尼日利亚特命全权大使阁下' : 'With H.E. The Ambassador of the Republic of Indonesia to Nigeria',
      tag: 'Multilateral Diplomacy',
      title: isZh ? '多边外交使团南南合作' : 'Multilateral South-South Cooperation',
      desc: isZh ? '拓展亚非多边经贸网络、跨区域供应链协同与联合投资。' : 'Expanding Asia-Africa trade networks and multi-country supply chain corridors.',
    },
  ];

  const lightboxImages: LightboxImage[] = diplomaticGallery.map((item) => ({
    image: item.image,
    alt: item.caption,
    title: item.title,
    caption: item.caption,
    description: item.desc,
    tag: item.tag,
    category: isZh ? '外交档案' : 'Diplomatic Archive',
  }));

  const openLightbox = (index: number) => {
    setSelectedIdx(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {diplomaticGallery.map((item, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(idx)}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-accbcf-gold/50 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-accbcf-blue-deep/90 text-white backdrop-blur-sm shadow-sm">
                    {item.tag}
                  </span>
                </div>

                {/* Zoom In Overlay Hint on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 text-xs font-bold text-accbcf-charcoal transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn className="w-3.5 h-3.5 text-accbcf-gold-dark" />
                    <span>{isZh ? '查看大图' : 'Preview'}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs sm:text-sm font-medium text-accbcf-charcoal group-hover:text-accbcf-blue transition-colors leading-snug">
                  {item.caption}
                </p>
              </div>
            </div>

            <div className="px-4 pb-3 pt-0 flex items-center justify-between text-[11px] text-accbcf-gold font-bold">
              <span className="flex items-center gap-1 group-hover:underline">
                <Maximize2 className="w-3 h-3" />
                <span>{isZh ? '全屏大图' : 'Full Preview'}</span>
              </span>
              <span className="text-gray-400 font-mono text-[10px]">0{idx + 1} / 08</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        initialIndex={selectedIdx}
        locale={locale}
      />
    </>
  );
};

