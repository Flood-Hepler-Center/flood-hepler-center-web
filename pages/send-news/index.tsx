import { title } from '@/components/primitives';
import ReporterForm from '@/components/report-form';
import CustomGoogleForm from '@/components/request-form';
import DefaultLayout from '@/layouts/default';
import { Card, Button } from '@nextui-org/react';

const RequestHelperPage = () => {
  return (
    <DefaultLayout>
      <div className='w-full md:max-w-4xl mx-auto text-center mb-'>
        <h1 className={title()}>แจ้งข่าวสารจากประชาชน</h1>
        <div className='text-center mt-12 mb-8'>
          <h2 className='text-xl md:text-3xl font-semibold mb-2'>
            ข้อมูลสำคัญเกี่ยวกับการแจ้งข่าวสารจากประชาชน
          </h2>
          <p className='text-md bg-background/80'>
            หากคุณต้องการแจ้งข่าวที่เป็นประโยช์นต่อเหตุการณ์ในครั้งนี้ คุณสามารถแจ้งได้ที่นี่เพื่อร่วมช่วยกันเป็นหนึ่งกระบอกเสียงให้แก่ผู้ประสบภัย ทางเราจะเร่งช่วยเหลือและนำข่าวสารไปเผยแพร่โดยเร็วที่สุด
          </p>
        </div>
        <Card className='px-4 py-8 shadow-md w-full text-center my-8'>
          <h2 className='text-2xl font-semibold mb-8'>
            แบบฟอร์มแจ้งข่าวสารจากประชาชน
          </h2>
          <ReporterForm />
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default RequestHelperPage;
