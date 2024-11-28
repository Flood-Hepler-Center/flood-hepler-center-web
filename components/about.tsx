import { title } from '@/components/primitives';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import DefaultLayout from '@/layouts/default';
import Link from 'next/link';

export default function AboutComponent() {
  const info = [
    {
      name: 'Tanapon Meesat',
      location: 'ปัตตานี',
      role: 'Developer',
      image: 'nui.png',
      fb: 'https://www.facebook.com/nuiisan',
    },
    {
      name: 'Rommadon Teedo',
      location: 'ยะลา',
      role: 'Developer',
      image: 'rom.jpg',
      fb: 'https://www.facebook.com/SuckkseedRom',
    },
    {
      name: 'Saharat Thongvun',
      location: 'ปัตตานี',
      role: 'Copywriter',
      image: 'friend.jpg',
      fb: 'https://www.facebook.com/friend.kira1',
    },
    {
      name: 'Kittipot Sawetsud',
      location: 'ปัตตานี',
      role: 'Graphic Designer',
      image: 'paul.jpg',
      fb: 'https://www.facebook.com/paulikittipot.sawedsud',
    },
    {
      name: 'Santa Cruz',
      location: 'ปัตตานี',
      role: 'Graphic Designer',
      image: 'pao.jpg',
      fb: 'https://www.facebook.com/santaluciferpao',
    },
  ];
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
      <div className='inline-block w-full text-center justify-center'>
        <h1 className={title()}>เกี่ยวกับเรา</h1>
        <div>
          <h2 className='text-default-500 italic mt-4 md:text-medium text-start'>
            "เราเกิดและโตใน 3 จังหวัดชายแดนภาคใต้...
            <div className='mt-2' />
            และถึงแม้ตอนนี้จะทำงานอยู่ต่างจังหวัด
            แต่เมื่อเห็นบ้านเกิดของเราได้รับความเดือดร้อนจากภัยน้ำท่วม
            เราก็ไม่อาจนิ่งนอนใจได้ <div className='mt-2' />
            ความรักและผูกพันกับบ้านเกิดทำให้เราตัดสินใจร่วมมือกับเพื่อนๆ พี่ๆ
            น้องๆ ที่มีความสามารถหลากหลาย เพื่อสร้างเว็บไซต์นี้ขึ้นมา
            แม้เราอยู่ห่างกัน แต่หัวใจของเรายังคงอยู่ใกล้กันเสมอ
            พร้อมที่จะช่วยเหลือและสนับสนุนกันในทุกวิกฤต
            <div className='mt-2' />
            ขอบคุณครับ..."
          </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
          {info.map((item, index) => (
            <Card key={index} className='py-4'>
              <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
                <p className='text-tiny uppercase font-bold'>{item.location}</p>
                <small className='text-default-500'>{item.role}</small>
                <Link href={item.fb} passHref>
                  <h4 className='font-bold text-large'>{item.name}</h4>
                </Link>
              </CardHeader>
              <CardBody className='overflow-visible py-2'>
                <Image
                  alt='Card background'
                  className='object-cover w-full h-full rounded-xl'
                  src={item.image}
                />
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
