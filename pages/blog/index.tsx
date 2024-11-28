import { useEffect } from 'react';
import { debounce } from 'lodash';
import { FilterIcon, PhoneIcon } from '@/components/icons';
import { title } from '@/components/primitives';
import { PHONE_NUMBER } from '@/data';
import DefaultLayout from '@/layouts/default';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from '@nextui-org/react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function App() {
  const [selectedKeys, setSelectedKeys] = useState('ทั้งหมด');

  const uniqueLocation = PHONE_NUMBER.map((item) => item.location).filter(
    (value, index, self) => self.indexOf(value) === index
  );

  const filteredPhoneNumber = useMemo(() => {
    if (selectedKeys === 'ทั้งหมด') {
      return PHONE_NUMBER;
    }
    return PHONE_NUMBER.filter((item) => item.location === selectedKeys);
  }, [selectedKeys]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const filteredByName = useMemo(() => {
    if (!searchTerm) return filteredPhoneNumber;
    return filteredPhoneNumber.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, filteredPhoneNumber]);

  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, []);

  const handleInputChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <DefaultLayout>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <div className='inline-block w-full text-center justify-center'>
          <h1 className={title()}>ติดต่อความช่วยเหลือ</h1>
        </div>
        <div className='flex w-full justify-center'>
          <div className='w-3/4'>
            <Input
              onChange={handleInputChange}
              type='email'
              label='ค้นหาเบอร์โทรศัพท์'
            />
          </div>
          <div className='flex ml-3 items-center'>
            <FilterIcon />
            <Dropdown>
              <DropdownTrigger>
                <Button variant='bordered' className='capitalize'>
                  {selectedKeys}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label='Single selection example'
                variant='flat'
                disallowEmptySelection
                selectionMode='single'
                selectedKeys={selectedKeys}
                onSelectionChange={(keys) =>
                  setSelectedKeys(Array.from(keys).join(', '))
                }
              >
                {uniqueLocation.map((item, index) => (
                  <DropdownItem key={item}>{item}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
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
            {filteredByName.map((item, index) => (
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
      </section>
    </DefaultLayout>
  );
}
