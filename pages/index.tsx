import { LogoIcon } from '@/components/icons';
import { Card, CardBody, Image, Button, Slider, Link } from '@nextui-org/react';
import { title, subtitle } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';
import FloodNews from './news';
import axios from 'axios';
import FloodComponent from '@/components/flood';
import DonateComponent from '@/components/donate';
import LongdoMap from '@/components/map';
import PhoneComponent from '@/components/phone';

export const getStaticProps = async () => {
  let articles = [];

  try {
    const { data: html } = await axios.get(
      'https://www.thaipbs.or.th/tags?q=%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%97%E0%B9%88%E0%B8%A7%E0%B8%A1%E0%B9%83%E0%B8%95%E0%B9%89'
    );

    const articleRegex =
      /<article class="ContentCardstyle__Container-sc-odesfa-0[^>]*>(.*?)<\/article>/gs;
    const titleRegex = /<a[^>]*title="([^"]+)"[^>]*>/;
    const descriptionRegex =
      /<p class="ContentInformationLayoutAstyle__Description-sc-1ut12ee-3[^>]*>(.*?)<\/p>/;
    const urlRegex = /<a[^>]*href="([^"]+)"[^>]*>/;
    const dateRegex =
      /<span class="ContentInformationLayoutAstyle__DateText-sc-1ut12ee-5[^>]*>(.*?)<\/span>/;
    const imageRegex = /<img[^>]*src="([^"]+)"[^>]*>/;

    let match;
    while ((match = articleRegex.exec(html)) !== null) {
      const articleHtml = match[1];

      const titleMatch = titleRegex.exec(articleHtml);
      const descriptionMatch = descriptionRegex.exec(articleHtml);
      const urlMatch = urlRegex.exec(articleHtml);
      const dateMatch = dateRegex.exec(articleHtml);
      const imageMatch = imageRegex.exec(articleHtml);

      const cleanTitle = titleMatch
        ? titleMatch[1].replace(/&quot;/g, '"')
        : 'No title';

      articles.push({
        title: cleanTitle,
        description: descriptionMatch
          ? descriptionMatch[1].replace(/&quot;/g, '"')
          : 'ไม่มีรายละเอียดเพิ่มเติม',
        url: urlMatch ? `https://www.thaipbs.or.th${urlMatch[1]}` : 'No URL',
        date: dateMatch ? dateMatch[1] : 'No date',
        image: imageMatch ? imageMatch[1] : null,
      });
    }
  } catch (error) {
    console.error('Error scraping articles:', error);
  }

  return {
    props: {
      articles,
    },
    revalidate: 3600,
  };
};

export default function IndexPage({ articles }: any) {
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
          <div className={subtitle({ class: 'mt-4 font-semibold' })}>
            รวบรวมข้อมูลและทราบข่าวสารเกี่ยวกับน้ำท่วมภาคใต้ปี 2567
          </div>
          <Card
            isBlurred
            className='border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] mt-4 mb-2'
            shadow='sm'
          >
            <CardBody>
              <div className='grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center'>
                <div className='relative col-span-6 md:col-span-4'>
                  <Image
                    alt='Album cover'
                    className='object-cover'
                    height={200}
                    shadow='md'
                    src='cover.png'
                    width='100%'
                  />
                </div>
                <div className='flex flex-col col-span-6 md:col-span-8'>
                  <div className='flex justify-between items-start'>
                    <div className='flex flex-col gap-0'>
                      <h3 className='font-semibold italic text-foreground/90 text-center md:text-start'>
                        ที่ผ่านมาเราเคยเผชิญกับสถานการณ์ที่คาดไม่ถึง
                        ทั้งภัยพิบัติ น้ำท่วม และปัญหาต่างๆ ที่เกิดขึ้นในภาคใต้
                        ทีมงานของเรามุ่งมั่นที่จะตอบสนองต่อสถานการณ์เหล่านี้ได้ทันท่วงที
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <div className='text-sm items-start justify-start text-start mb-4'>
            "เว็บไซต์นี้สร้างขึ้นเพื่อเป็นพื้นที่ของความหวังสำหรับผู้ประสบภัยน้ำท่วมในภาคใต้
            เรารวบรวมข้อมูลสำคัญ
            <br />
            เช่น เบอร์โทรสำหรับขอความช่วยเหลือ
            พร้อมทั้งเปิดพื้นที่ให้คุณได้แชร์สถานการณ์น้ำท่วมในพื้นที่ของคุณ
            และติดตามข่าวสารล่าสุด เราเชื่อว่าด้วยความร่วมมือและกำลังใจจากทุกคน
            เราจะผ่านพ้นวิกฤตนี้ไปด้วยกัน"
          </div>
        </div>
      </section>
      <FloodComponent articles={articles} max={3} />
      <div className="text-center mb-5">
        <Link
          href={`/news`}
          target="_blank"
        >
          <Button className='mb-5'>ดูข่าวเพิ่มเติม</Button>
        </Link>
      </div>
      <PhoneComponent max={10} />
      <div className="text-center my-5">
        <Link
          href={`/phone`}
          target="_blank"
        >
          <Button>ดูความช่วยเหลือเพิ่มเติม</Button>
        </Link>
      </div>
      <DonateComponent max={10}/>
      <div className="text-center my-5">
        <Link
          href={`/donate`}
          target="_blank"
        >
          <Button>ดูศูนย์รับบริจาคเพิ่มเติม</Button>
        </Link>
      </div>
      <LongdoMap />
    </DefaultLayout>
  );
}
