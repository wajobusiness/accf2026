import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Administration & System',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      localized: true,
      defaultValue: 'Africa China Chairmen of Business Forum',
    },
    {
      name: 'slogan',
      type: 'text',
      localized: true,
      defaultValue: 'Connecting Governments · Empowering Business · Creating Shared Prosperity',
    },
    {
      name: 'email',
      type: 'text',
      defaultValue: 'africachinachairmenforum@gmail.com',
    },
    {
      name: 'phone',
      type: 'text',
      defaultValue: '+234 916 016 6906',
    },
    {
      name: 'whatsapp',
      type: 'text',
      defaultValue: '+2349160166906',
    },
    {
      name: 'address',
      type: 'textarea',
      localized: true,
      defaultValue: 'Block D, Federal Ministry of Industry, Trade and Investment, Old Federal Secretariat, Area 1, Garki, Abuja, Nigeria',
    },
  ],
};
