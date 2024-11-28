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

export default function App() {
  return (
    <DefaultLayout>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <div className='inline-block max-w-lg text-center justify-center'>
          <h1 className={title()}>เบอร์ติดต่อความช่วยเหลือ</h1>
          <Table aria-label='contact helper phone number table'>
            <TableHeader>
              <TableColumn>ชื่อ</TableColumn>
              <TableColumn>เบอร์โทรศัพท์</TableColumn>
              <TableColumn>จังหวัด</TableColumn>
            </TableHeader>
            <TableBody>
              {PHONE_NUMBER.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phoneNo}</TableCell>
                  <TableCell>{item.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </DefaultLayout>
  );
}
