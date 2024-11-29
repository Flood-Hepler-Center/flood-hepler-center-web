import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from '@nextui-org/react';

interface HelpCardProps {
  id: number;
  name: string;
  province: string;
  tel: string;
  need: string;
  address: string;
  createdAt: string;
  isSuccess: boolean;
}

export default function HelpCardComponent({
  id,
  name,
  province,
  tel,
  need,
  address,
  createdAt,
  isSuccess,
}: HelpCardProps) {
  return (
    <Card className='w-full py-3 justify-between'>
      <CardHeader className='gap-2'>
        <div className='flex gap-5 w-3/4'>
          <div className='flex flex-col gap-1 items-start justify-center'>
            <h4 className='text-small font-semibold leading-none text-default-600'>
              {name}
            </h4>
            <div className='text-small text-default-400 text-ellipsis overflow-hidden tracking-tight w-full'>
              โทร {tel}
            </div>
          </div>
        </div>
        <div className='text-end flex justify-end'>
          <Button
            className={
              isSuccess
                ? 'bg-success text-foreground'
                : 'bg-transparent text-foreground border-default-200'
            }
            radius='full'
            size='sm'
            color={isSuccess ? 'success' : 'default'}
            variant={isSuccess ? 'light' : 'bordered'}
          >
            #{isSuccess ? 'ช่วยเหลือแล้ว' : province}
          </Button>
          <div
            className={
              'absolute top-2 right-2 text-end border-default-200 px-1 text-default-400 italic rounded-xl'
            }
          >
            #{id}
          </div>
        </div>
      </CardHeader>
      <div className='px-3 py-2 text-small'>
        <p>{need}</p>
      </div>
      <CardFooter className='justify-between'>
        <div className='flex gap-1 text-start justify-start'>
          <p className='text-start text-default-400 italic text-tiny'>
            {address}
          </p>
        </div>
        <div className='flex gap-1 w-1/4 text-end justify-end'>
          <p className='text-tiny text-default-400 italic text-end'>
            {createdAt}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
