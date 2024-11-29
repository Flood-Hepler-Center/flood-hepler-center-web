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
