import type { GlobalConfig } from 'payload';

export const SeoSettings: GlobalConfig = {
  slug: 'seoSettings',
  label: 'SEO & Search Optimization',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Administration & System',
    description: 'Manage search engine optimization (SEO), social media cards, webmaster verification tags, and page-specific metadata across the entire website.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // TAB 1: Global Site Metadata
        {
          label: 'Global Meta & Social Graph',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              localized: true,
              required: true,
              label: 'Website / Brand Name',
              defaultValue: 'Africa China Chairmen of Business Forum (ACCBCF)',
              admin: {
                placeholder: 'e.g. Africa China Chairmen of Business Forum (ACCBCF)',
              },
            },
            {
              name: 'titleTemplate',
              type: 'text',
              label: 'Browser Tab Title Template',
              defaultValue: '%s | Africa China Chairmen of Business Forum',
              admin: {
                description: 'Format used across browser tabs and search snippets. %s is replaced by the current page title.',
              },
            },
            {
              name: 'defaultMetaDescription',
              type: 'textarea',
              localized: true,
              required: true,
              label: 'Default Meta Description',
              defaultValue: 'Official platform connecting African and Chinese governments, business leadership, and capital. Headquartered at the Federal Ministry of Industry, Trade and Investment in Abuja, Nigeria.',
              admin: {
                description: '150-160 character snippet displayed on Google, Bing, and Baidu search results.',
              },
            },
            {
              name: 'defaultKeywords',
              type: 'text',
              localized: true,
              label: 'Global Search Keywords',
              defaultValue: 'ACCBCF, Africa China Chairmen of Business Forum, 非洲中国会长论坛, China Africa Trade, Abuja HQ, FMITI Nigeria, G2G, G2B, B2B, Investment in Africa',
              admin: {
                description: 'Comma-separated keywords for search engine indexing.',
              },
            },
            {
              name: 'canonicalBaseUrl',
              type: 'text',
              required: true,
              label: 'Canonical Base URL',
              defaultValue: 'https://www.africachinachairmenforum.com',
              admin: {
                description: 'Primary production domain used for canonical links and OpenGraph URLs.',
              },
            },
            {
              name: 'ogImage',
              type: 'relationship',
              relationTo: 'media',
              hasMany: false,
              label: 'Default Social Media Image (Upload)',
              admin: {
                description: 'Primary preview photo when sharing links on WhatsApp, LinkedIn, Facebook, and X (Recommended size: 1200x630px).',
              },
            },
            {
              name: 'ogImageUrl',
              type: 'text',
              label: 'Default Social Media Image URL (Fallback)',
              defaultValue: '/images/accbcf-emblem.jpg',
              admin: {
                description: 'Direct fallback image URL if no file is uploaded to Media library.',
              },
            },
            {
              name: 'twitterCardType',
              type: 'select',
              options: [
                { label: 'Summary with Large Image (summary_large_image)', value: 'summary_large_image' },
                { label: 'Standard Summary Card (summary)', value: 'summary' },
              ],
              defaultValue: 'summary_large_image',
              label: 'Twitter / X Card Format',
            },
            {
              name: 'twitterHandle',
              type: 'text',
              label: 'Twitter / X Official Handle',
              defaultValue: '@accbcf_official',
              admin: {
                placeholder: 'e.g. @accbcf_official',
              },
            },
          ],
        },

        // TAB 2: Search Engine Verification & Webmaster Tools
        {
          label: 'Webmaster Verification',
          fields: [
            {
              name: 'googleVerification',
              type: 'text',
              label: 'Google Search Console Verification Token',
              admin: {
                placeholder: 'e.g. google-site-verification=abc123xyz456...',
                description: 'Paste your Google Search Console HTML tag or verification string.',
              },
            },
            {
              name: 'bingVerification',
              type: 'text',
              label: 'Bing Webmaster Tools Verification Code',
              admin: {
                placeholder: 'e.g. msvalidate.01=...',
                description: 'Paste your Bing Webmaster verification code.',
              },
            },
            {
              name: 'baiduVerification',
              type: 'text',
              label: 'Baidu Search Engine Verification Token (百度站长验证)',
              admin: {
                placeholder: 'e.g. baidu-site-verification=...',
                description: 'Token for Chinese Baidu Search Engine indexing and site validation.',
              },
            },
            {
              name: 'yandexVerification',
              type: 'text',
              label: 'Yandex Webmaster Verification Token',
              admin: {
                placeholder: 'e.g. yandex-verification=...',
              },
            },
            {
              name: 'googleAnalyticsId',
              type: 'text',
              label: 'Google Analytics 4 Measurement ID (GA4)',
              admin: {
                placeholder: 'e.g. G-XXXXXXXXXX',
                description: 'Optional Google Analytics tag ID for tracking website traffic.',
              },
            },
            {
              name: 'baiduTongjiId',
              type: 'text',
              label: 'Baidu Tongji Analytics ID (百度统计)',
              admin: {
                placeholder: 'e.g. 1a2b3c4d5e6f...',
                description: 'Optional Baidu Tongji web analytics tracking token.',
              },
            },
          ],
        },

        // TAB 3: Page-Specific Meta Overrides
        {
          label: 'Page Metadata Overrides',
          fields: [
            // Home Page SEO
            {
              name: 'homeSeo',
              type: 'group',
              label: 'Homepage SEO',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: 'Custom Home Title',
                  admin: {
                    placeholder: 'Africa China Chairmen of Business Forum · Abuja HQ',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  label: 'Custom Home Description',
                },
                {
                  name: 'keywords',
                  type: 'text',
                  localized: true,
                  label: 'Home Keywords',
                },
              ],
            },

            // About Page SEO
            {
              name: 'aboutSeo',
              type: 'group',
              label: 'About Page SEO',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: 'Custom About Title',
                  admin: {
                    placeholder: 'About ACCBCF · Vision, Mandate & Strategic Positioning',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  label: 'Custom About Description',
                },
                {
                  name: 'keywords',
                  type: 'text',
                  localized: true,
                  label: 'About Keywords',
                },
              ],
            },

            // Founders Page SEO
            {
              name: 'foundersSeo',
              type: 'group',
              label: 'Founders Page SEO',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: 'Custom Founders Title',
                  admin: {
                    placeholder: 'Founders & Diplomatic Leadership · ACCBCF',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  label: 'Custom Founders Description',
                },
              ],
            },

            // Governance Page SEO
            {
              name: 'governanceSeo',
              type: 'group',
              label: 'Governance Page SEO',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: 'Custom Governance Title',
                  admin: {
                    placeholder: 'Institutional Governance & Leadership Council · ACCBCF',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  label: 'Custom Governance Description',
                },
              ],
            },

            // Programs Page SEO
            {
              name: 'programsSeo',
              type: 'group',
              label: 'Programs & Services SEO',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: 'Custom Programs Title',
                  admin: {
                    placeholder: 'Programs & Core Services · ACCBCF',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  label: 'Custom Programs Description',
                },
              ],
            },

            // Priority Sectors Page SEO
            {
              name: 'sectorsSeo',
              type: 'group',
              label: 'Priority Sectors SEO',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: 'Custom Sectors Title',
                  admin: {
                    placeholder: '12 Priority Economic Sectors · ACCBCF',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  label: 'Custom Sectors Description',
                },
              ],
            },

            // Events Page SEO
            {
              name: 'eventsSeo',
              type: 'group',
              label: 'Events & Summits SEO',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: 'Custom Events Title',
                  admin: {
                    placeholder: 'Summits, Business Dialogues & Events · ACCBCF',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  label: 'Custom Events Description',
                },
              ],
            },

            // News Page SEO
            {
              name: 'newsSeo',
              type: 'group',
              label: 'News Page SEO',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: 'Custom News Title',
                  admin: {
                    placeholder: 'Official News & Strategic Dispatches · ACCBCF',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  label: 'Custom News Description',
                },
              ],
            },

            // Contact Page SEO
            {
              name: 'contactSeo',
              type: 'group',
              label: 'Contact Page SEO',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: 'Custom Contact Title',
                  admin: {
                    placeholder: 'Connect with Secretariat · ACCBCF Abuja',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  label: 'Custom Contact Description',
                },
              ],
            },
          ],
        },

        // TAB 4: Schema.org & JSON-LD Structured Data
        {
          label: 'Structured Data (JSON-LD)',
          fields: [
            {
              name: 'orgLegalName',
              type: 'text',
              label: 'Organization Legal Name',
              defaultValue: 'Africa China Chairmen of Business Forum',
            },
            {
              name: 'orgAlternateName',
              type: 'text',
              label: 'Organization Alternate / Chinese Name',
              defaultValue: '非洲中国会长论坛 (ACCBCF)',
            },
            {
              name: 'orgType',
              type: 'select',
              options: [
                { label: 'GovernmentOrganization', value: 'GovernmentOrganization' },
                { label: 'NGO / International Organization', value: 'NGO' },
                { label: 'Organization (General)', value: 'Organization' },
              ],
              defaultValue: 'GovernmentOrganization',
              label: 'Schema.org Entity Classification',
            },
            {
              name: 'contactPointTelephone',
              type: 'text',
              label: 'Official Contact Phone',
              defaultValue: '+234 916 016 6906',
            },
            {
              name: 'contactPointEmail',
              type: 'text',
              label: 'Official Contact Email',
              defaultValue: 'africachinachairmenforum@gmail.com',
            },
          ],
        },

        // TAB 5: Crawling & Indexing
        {
          label: 'Crawling & Robots Directives',
          fields: [
            {
              name: 'indexingDirective',
              type: 'select',
              options: [
                { label: 'Allow All Search Engines (index, follow)', value: 'index, follow' },
                { label: 'Disallow Indexing / Staging Mode (noindex, nofollow)', value: 'noindex, nofollow' },
              ],
              defaultValue: 'index, follow',
              label: 'Global Robots Directive',
              admin: {
                description: 'Control whether Google, Bing, Baidu, and other crawlers should index the site.',
              },
            },
            {
              name: 'enableSitemap',
              type: 'checkbox',
              defaultValue: true,
              label: 'Enable Automated XML Sitemap',
            },
          ],
        },
      ],
    },
  ],
};

