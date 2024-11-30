import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from '@nextui-org/react';

interface ReporterCardProps {
  title: string;
  content: string;
  contact: string;
  province?: string;
  createdAt: string;
  category?: string;
}

export default function ReporterCardComponent({
  title,
  content,
  contact,
  province,
  createdAt,
  category,
}: ReporterCardProps) {
  let textColor, bgColor;
  switch (category) {
    case 'ประชาสัมพันธ์':
      textColor = 'text-primary';
      bgColor = 'border-l-8 border-r-8 border-primary';
      break;
    case 'การให้ความช่วยเหลือ':
      textColor = 'text-success';
      bgColor = 'border-l-8 border-r-8 border-success';
      break;
    case 'เตือนภัย':
      textColor = 'text-warning';
      bgColor = 'border-l-8 border-r-8 border-warning';
      break;
    case 'การบริจาค':
      textColor = 'text-secondary';
      bgColor = 'border-l-8 border-r-8 border-secondary';
      break;
    default:
      bgColor = 'border-l-8 border-r-8 border-surface';
      break;
  }
  return (
    <Card className={`w-full py-2 justify-between ${bgColor}`}>
      <CardHeader className={`justify-between`}>
        <div className='flex gap-5'>
          <div className='flex flex-col gap-1 items-start justify-center'>
            <h4 className='text-small font-semibold leading-none text-default-600'>
              {title || 'ไม่ระบุ'}
            </h4>
            <div className='text-small text-default-400 text-ellipsis overflow-hidden tracking-tight w-full'>
              ติดต่อ: {contact || 'ไม่ระบุช่องทางการติดต่อ'}
            </div>
          </div>
        </div>
        <Button
          className='bg-transparent text-foreground border-default-200'
          radius='full'
          size='sm'
          color='default'
          variant='bordered'
        >
          #{province || 'ไม่ระบุจังหวัด'}
        </Button>
      </CardHeader>
      <CardBody className='px-3 py-2 text-small'>
        <p>{content || '-'}</p>
      </CardBody>
      <CardFooter className='justify-between'>
        <div className='flex gap-1 text-start justify-start'>
          <p
            className={`text-start text-default-400 italic ${textColor} text-tiny`}
          >
            #{category || 'อื่นๆ'}
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
