import { title } from '@/components/primitives';
import CustomGoogleForm from '@/components/request-form';
import DefaultLayout from '@/layouts/default';
import { Card, Button } from '@nextui-org/react';
import Link from 'next/link';

const RequestHelperPage = () => {
  return (
    <DefaultLayout>
      <div className='p-4 max-w-4xl mx-auto text-center mb-4'>
        <h1 className={title()}>ส่งคำขอความช่วยเหลือ</h1>
        <div className='text-center mt-12 mb-8'>
          <h2 className='text-xl md:text-3xl font-semibold mb-2'>
            ข้อมูลสำคัญเกี่ยวกับการขอความช่วยเหลือ
          </h2>
          <p className='text-md bg-background/80'>
            หากคุณหรือบุคคลใกล้ชิดต้องการความช่วยเหลือในสถานการณ์ฉุกเฉิน
            โปรดกรอกแบบฟอร์มด้านล่างโดยให้ข้อมูลที่ถูกต้องและครบถ้วนที่สุด
            เพื่อให้ทีมช่วยเหลือสามารถติดต่อกลับได้อย่างรวดเร็ว
          </p>
        </div>
        {/* Button to Google Form */}
        <Card className='px-4 py-8 shadow-md w-full text-center'>
          <h2 className='text-2xl font-semibold mb-2'>
            แบบฟอร์มขอความช่วยเหลือ
          </h2>
          <CustomGoogleForm />
          <div className='my-4'>หรือ</div>
          <a
            href='https://forms.gle/5JWL4qatByTEbBMw5'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button className='bg-surface'>
              แจ้งเมื่อได้รับความช่วยเหลือแล้ว
            </Button>
          </a>
        </Card>
        <div className='my-5 text-lg text-center underline underline-offset-4'>
          <a href='/helper' rel='noopener noreferrer'>
            ดูรายชื่อผู้ขอความช่วยเหลือ
          </a>
        </div>
      </div>
      {/* Introduction Card */}
    </DefaultLayout>
  );
};

export default RequestHelperPage;
