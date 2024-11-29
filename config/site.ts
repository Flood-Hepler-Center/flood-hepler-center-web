export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'ศูนย์ข้อมูลน้ำท่วมภาคใต้ปี 2567 | Southern Flood Information Center 2024',
  description: 'รวบรวมข้อมูลและทราบข่าวสารเกี่ยวกับน้ำท่วมภาคใต้ 2567',
  navItems: [
    {
      label: 'หน้าแรก',
      href: '/',
    },
    {
      label: 'แจ้งความช่วยเหลือ',
      href: '/request',
    },
    {
      label: 'รายชื่อผู้ขอความช่วยเหลือ',
      href: '/helper',
    },
    {
      label: 'ข่าวสารจากประชาชน',
      href: '/reporter',
    },
    {
      label: 'เบอร์จำเป็น',
      href: '/phone',
    },
    {
      label: 'บริจาค',
      href: '/donate',
    },
    {
      label: 'ข่าวสาร',
      href: '/news',
    },
    {
      label: 'แผนที่ระดับน้ำ',
      href: '/water-level',
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
