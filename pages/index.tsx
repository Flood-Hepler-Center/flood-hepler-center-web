import { LogoIcon } from '@/components/icons';
import { title, subtitle } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <div className='inline-block max-w-xl text-center justify-center'>
          <div className='flex justify-center w-full md:hidden mb-2'>
            <LogoIcon width={150} height={50} />
          </div>
          <div className='hidden md:flex md:justify-center w-full mb-3 '>
            <LogoIcon width={200} height={80} />
          </div>
          <span className={title()}>ศูนย์&nbsp;</span>
          <span className={title({ color: 'pink' })}>ช่วยเหลือ&nbsp;</span>
          <br />
          <span className={title()}>น้ำท่วมภาคใต้ 2567</span>
          <div className={subtitle({ class: 'mt-4' })}>
            รวบรวมข้อมูลและทราบข่าวสารเกี่ยวกับน้ำท่วมภาคใต้ 2567
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
