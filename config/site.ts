export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'ศูนย์ข้อมูลน้ำท่วมภาคใต้ปี 2568 | Southern Flood Information Center 2024',
  description: 'รวบรวมข้อมูลและทราบข่าวสารเกี่ยวกับน้ำท่วมภาคใต้ 2568',
  navItems: [
    {
      label: 'หน้าแรก',
      href: '/',
    },
    {
      label: 'ขอความช่วยเหลือ',
      href: 'https://jitasa.care',
    },
    {
      label: 'ผู้ต้องการความช่วยเหลือ',
      href: '/helper',
    },
    {
      label: 'แจ้งข่าวสาร',
      href: '/send-news',
    },
    {
      label: 'ข่าวจากประชาชน',
      href: '/reporter',
    },
    {
      label: 'เบอร์ติดต่อ',
      href: '/phone',
    },
    {
      label: 'ข่าวจากสำนักข่าว',
      href: '/news',
    },
    {
      label: 'แผนที่ระดับน้ำ',
      href: '/water-level',
    },
    {
      label: 'บริจาค',
      href: '/donate',
    },
    {
      label: 'เกี่ยวกับเรา',
      href: '/about',
    },
  ],
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
};
