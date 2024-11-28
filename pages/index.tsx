import { Link } from '@nextui-org/link';
import { Snippet } from '@nextui-org/snippet';
import { Code } from '@nextui-org/code';
import { button as buttonStyles } from '@nextui-org/theme';

import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import { GithubIcon } from '@/components/icons';
import DefaultLayout from '@/layouts/default';
import LongdoMap from '@/components/map';

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <div className='inline-block max-w-xl text-center justify-center'>
          <span className={title()}>ศูนย์&nbsp;</span>
          <span className={title({ color: 'violet' })}>ช่วยเหลือ&nbsp;</span>
          <br />
          <span className={title()}>น้ำท่วมภาคใต้ 2567</span>
          <div className={subtitle({ class: 'mt-4' })}>
            รวบรวมข้อมูลและทราบข่าวสารเกี่ยวกับน้ำท่วมภาคใต้ 2567
          </div>
        </div>

        <div className='flex w-full'>
          <LongdoMap />
        </div>
      </section>
    </DefaultLayout>
  );
}
