'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, ZoomIn, Camera, Shield } from 'lucide-react';
import type { Locale } from '@/lib/content';
import { ImageLightboxModal, type LightboxImage } from '@/components/common/ImageLightboxModal';

interface OfficialPhotoArchivesProps {
  locale: Locale;
}

export const OfficialPhotoArchives: React.FC<OfficialPhotoArchivesProps> = ({ locale }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const isZh = locale === 'zh';

  const archives = [
    {
      image: '/images/forum/fmiti-headquarters-handshake.jpg',
      alt: 'Federal Ministry of Industry, Trade and Investment Abuja HQ',
      tag: isZh ? '联邦部委总部' : 'Federal Ministry HQ',
      title: isZh ? '联邦工贸投部高层对接' : 'Federal Ministry of Industry, Trade & Investment',
      desc: isZh
        ? '在尼日利亚总统博拉·提努布官方肖像下举行双边正式握手与会谈。'
        : 'Bilateral audience and protocol handshake directly inside the Federal Ministry HQ in Abuja.',
    },
    {
      image: '/images/forum/leadership-council-assembly.jpg',
      alt: 'Executive Leadership Council Assembly',
      tag: isZh ? '理事会高层合影' : 'Leadership Council',
      title: isZh ? '全国主席张晓鹏与高层理事会' : 'High Chief Zhang Xiaopeng & Leadership Council',
      desc: isZh
        ? '论坛执行委员会在官方肖像墙前举行战略决议合影。'
        : 'Executive Council assembly convened before official portraits of bilateral heads of state.',
    },
    {
      image: '/images/forum/diplomatic-assembly-abuja.jpg',
      alt: 'Plenary Assembly of International Ambassadors and Envoys in Abuja',
      tag: isZh ? '外交使团大会' : 'Diplomatic Plenary',
      title: isZh ? '国际外交使团与理事盛会' : 'Plenary Reception of Ambassadors & Envoys',
      desc: isZh
        ? '各国驻阿布贾外交使节、商务参赞与多边机构领袖全体合影。'
        : 'Continental ambassadors, commercial attachés, and enterprise leaders convened in Abuja.',
    },
    {
      image: '/images/forum/02.jpeg',
      alt: 'His Imperial Majesty The Ooni of Ife and ACCBCF Leadership',
      tag: isZh ? '王室最高顾问' : 'Royal Patronage',
      title: isZh ? '伊费国王陛下与论坛理事长' : 'His Imperial Majesty The Ooni of Ife',
      desc: isZh
        ? '非洲著名传统领袖与论坛高级顾问委员会协同，保障重大投资项目长期稳定性与社会共识。'
        : 'Traditional royal patronage underpinning social consensus and long-term security for investments.',
    },
    {
      image: '/images/forum/12-presidential.jpeg',
      alt: 'Former President Olusegun Obasanjo and ACCBCF Leadership',
      tag: isZh ? '元首级对话' : 'Statesmanship',
      title: isZh ? '前总统奥巴桑乔战略会晤' : 'Presidential Statesman Dialogue',
      desc: isZh
        ? '围绕非洲大陆工业化战略与双边产业对接开展高水平交流。'
        : 'Strategic engagement on continental industrial corridors and high-level bilateral trade channels.',
    },
    {
      image: '/images/forum/ambassadorial-dialogue.jpg',
      alt: 'Ambassadorial Bilateral Dialogue in Abuja',
      tag: isZh ? '使团高层对话' : 'Ambassadorial Accord',
      title: isZh ? '双边大使战略合作握手' : 'Diplomatic Envoy Bilateral Handshake',
      desc: isZh
        ? '深化双边外交协同、南南合作与跨国重大投资落地。'
        : 'Strengthening South-South diplomatic alignment and sovereign-backed trade partnerships.',
    },
  ];

  const lightboxImages: LightboxImage[] = archives.map((item) => ({
    image: item.image,
    alt: item.alt,
    title: item.title,
    caption: item.desc,
    tag: item.tag,
    category: isZh ? '官方纪实' : 'Official Archive',
  }));

  const openLightbox = (index: number) => {
    setSelectedIdx(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-accbcf-blue">
            {isZh ? '官方纪实' : 'Official Photo Archives'}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-accbcf-charcoal">
            {isZh ? '部委协同、双边会见与外交理事大会' : 'Ministerial Synergy, Bilateral Audiences & Diplomatic Envoys'}
          </h3>
          <p className="text-accbcf-gray text-xs sm:text-sm">
            {isZh
              ? '常设机构真实工作场景与高层战略对接实景记录（点击任意照片查看高清大图）'
              : 'Photographic documentation of official ACCBCF leadership engagements. Click any image for full-screen preview.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {archives.map((item, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-accbcf-gold/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  
                  {/* Category Tag on Top Left */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-accbcf-blue/90 text-white backdrop-blur-sm shadow-sm">
                      {item.tag}
                    </span>
                  </div>

                  {/* Zoom In Overlay Hint on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold text-accbcf-charcoal transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn className="w-4 h-4 text-accbcf-gold-dark" />
                      <span>{isZh ? '点击查看大图' : 'Preview Image'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-1.5">
                  <h4 className="font-serif font-bold text-sm text-accbcf-charcoal group-hover:text-accbcf-blue transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-accbcf-gray text-xs leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-4 pt-1 flex items-center justify-between text-[11px] text-accbcf-gold font-bold">
                <span className="flex items-center gap-1 group-hover:underline">
                  <Maximize2 className="w-3 h-3" />
                  <span>{isZh ? '全屏大图预览' : 'Full Screen Preview'}</span>
                </span>
                <span className="text-gray-400 font-mono text-[10px]">0{idx + 1} / 06</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reusable Lightbox Modal */}
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

