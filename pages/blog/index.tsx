import { PhoneIcon } from '@/components/icons';
import { title } from '@/components/primitives';
import { PHONE_NUMBER } from '@/data';
import DefaultLayout from '@/layouts/default';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import Link from 'next/link';

export default function App() {
  return (
    <DefaultLayout>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <div className='inline-block w-full text-center justify-center'>
          <h1 className={title()}>เบอร์ติดต่อความช่วยเหลือ</h1>
          <Table
            aria-label='contact helper phone number table'
            className='mt-2'
            isStriped
          >
            <TableHeader>
              <TableColumn>ชื่อ</TableColumn>
              <TableColumn>เบอร์โทรศัพท์</TableColumn>
              <TableColumn> </TableColumn>
            </TableHeader>
            <TableBody>
              {PHONE_NUMBER.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phoneNo}</TableCell>
                  <TableCell>
                    <Link href={`tel:${item.phoneNo}`} passHref>
                      <PhoneIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </DefaultLayout>
  );
}
