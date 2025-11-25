'use client';

import { title } from '@/components/primitives';
import CustomGoogleForm from '@/components/request-form';
import DefaultLayout from '@/layouts/default';
import { Card, Button } from '@nextui-org/react';
import { useState } from 'react';

const RequestHelperPage = () => {
  const [showBackupForm, setShowBackupForm] = useState(false);

  return (
    <DefaultLayout>
      <div className='w-full md:max-w-4xl mx-auto text-center mb-12'>
        <h1 className={title()}>ส่งคำขอความช่วยเหลือ</h1>
        <div className='text-center mt-8 mb-8'>
          <p className='text-md text-default-600'>
            หากคุณหรือบุคคลใกล้ชิดต้องการความช่วยเหลือในสถานการณ์ฉุกเฉิน
            <br />
            โปรดเลือกช่องทางการแจ้งความช่วยเหลือด้านล่าง
          </p>
        </div>

        {!showBackupForm ? (
          <>
            {/* Primary Option - Official Government Website */}
            <Card className='px-6 py-8 shadow-lg w-full mb-6 border-2 border-success'>
              <div className='mb-4'>
                <div className='inline-block px-4 py-1 bg-success/20 rounded-full mb-4'>
                  <span className='text-success font-semibold text-sm'>
                    ✓ แนะนำ
                  </span>
                </div>
                <h2 className='text-2xl md:text-3xl font-bold mb-3'>
                  ขอความช่วยเหลือจากเว็บทางการ
                </h2>
                <p className='text-default-600 mb-6'>
                  ศูนย์รวมข้อมูลผู้ประสบภัยจากหน่วยงานราชการ
                  <br />
                  <span className='text-sm'>
                    (ข้อมูลจะถูกส่งไปยังหน่วยงานที่เกี่ยวข้องโดยตรง)
                  </span>
                </p>
              </div>
              <a
                href='https://jitasa.care'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button
                  size='lg'
                  color='success'
                  className='w-full md:w-auto px-12 py-6 text-lg font-semibold'
                >
                  เปิดเว็บ jitasa.care →
                </Button>
              </a>
            </Card>

            {/* Divider */}
            <div className='flex items-center gap-4 my-8'>
              <div className='flex-1 h-px bg-divider' />
              <span className='text-default-400 text-sm'>หรือ</span>
              <div className='flex-1 h-px bg-divider' />
            </div>

            {/* Secondary Option - Backup Form */}
            <Card className='px-6 py-8 shadow-md w-full border border-default-200'>
              <div className='mb-4'>
                <div className='inline-block px-4 py-1 bg-warning/20 rounded-full mb-4'>
                  <span className='text-warning font-semibold text-sm'>
                    ⚠ สำรอง
                  </span>
                </div>
                <h2 className='text-xl md:text-2xl font-bold mb-3'>
                  ใช้แบบฟอร์มสำรอง
                </h2>
                <p className='text-default-600 text-sm mb-6'>
                  กรณีที่เว็บ jitasa.care ล่ม หรือเข้าไม่ได้
                  <br />
                  สามารถใช้แบบฟอร์มสำรองของเราได้
                </p>
              </div>
              <Button
                size='lg'
                variant='bordered'
                className='w-full md:w-auto px-12 py-6 text-base font-semibold'
                onPress={() => setShowBackupForm(true)}
              >
                เปิดแบบฟอร์มสำรอง
              </Button>
            </Card>
          </>
        ) : (
          <>
            {/* Backup Form View */}
            <div className='mb-6 flex items-center justify-center gap-2'>
              <Button
                size='sm'
                variant='light'
                onPress={() => setShowBackupForm(false)}
                className='text-default-600'
              >
                ← กลับไปเลือกช่องทางอื่น
              </Button>
            </div>

            <Card className='px-6 py-8 shadow-md w-full text-center'>
              <div className='mb-6'>
                <div className='inline-block px-4 py-1 bg-warning/20 rounded-full mb-4'>
                  <span className='text-warning font-semibold text-sm'>
                    แบบฟอร์มสำรอง
                  </span>
                </div>
                <h2 className='text-2xl font-semibold mb-2'>
                  แบบฟอร์มขอความช่วยเหลือ
                </h2>
                <p className='text-sm text-default-500 mb-6'>
                  โปรดกรอกข้อมูลให้ถูกต้องและครบถ้วนที่สุด
                </p>
              </div>
              <CustomGoogleForm />
              <div className='mt-8 pt-6 border-t border-divider'>
                <p className='text-sm text-default-500 mb-4'>หรือ</p>
                <a
                  href='https://forms.gle/5JWL4qatByTEbBMw5'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button variant='bordered' size='md'>
                    แจ้งเมื่อได้รับความช่วยเหลือแล้ว
                  </Button>
                </a>
              </div>
            </Card>
          </>
        )}

        <div className='mt-8 text-center'>
          <a
            href='/helper'
            className='text-default-600 hover:text-default-900 underline underline-offset-4'
          >
            ดูรายชื่อผู้ขอความช่วยเหลือ →
          </a>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RequestHelperPage;
