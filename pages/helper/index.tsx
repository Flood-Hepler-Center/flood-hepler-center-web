import { useEffect, useState, useRef } from 'react';
import {
  Card,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Button,
} from '@nextui-org/react';
import DefaultLayout from '@/layouts/default';
import { title } from '@/components/primitives';
import HelpCardComponent from '@/components/help-card';
import { fetchGoogleSheet } from '@/src/util/fetchGoogleSheet';
import dayjs from 'dayjs';

const GOOGLE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTkvS_fgba8jb9gz8AjNmvrTPKNNX7bQ3rLiRazabOnvW8tFAkRYlkJmMvUvXfeRGBca5BlowiZJEhG/pub?output=csv';
const SUCCESS_GOOGLE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2sg3qEUtJ8mgBXt3PLT5zY89dSRahhiWmCtRvjk78IFvP2rwg-K7PWwYA9bVcLTEiv5egjQIjmdWQ/pub?output=csv';

const ITEMS_PER_PAGE = 12;

const GoogleSheetPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [successData, setSuccessData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('จังหวัดทั้งหมด');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetData = await fetchGoogleSheet(GOOGLE_SHEET_URL);
        const successData = await fetchGoogleSheet(SUCCESS_GOOGLE_SHEET_URL);

        const processedData = sheetData.map((row: any, index) => ({
          ...row,
          fullAddress: `${row['ที่อยู่ ที่ต้องการความช่วยเหลือ'] || ''} ${
            row['ตำบล ที่ต้องการความช่วยเหลือ'] || ''
          } ${row['อำเภอ ที่ต้องการความช่วยเหลือ'] || ''} ${
            row['จังหวัด ที่ต้องการความช่วยเหลือ'] || ''
          }`,
          timestamp: new Date(row['ประทับเวลา']).getTime(),
          id: index + 1,
        }));

        const processedSuccessData = successData.map(
          (row: any) =>
            row['ชื่อที่ได้รับความช่วยเหลือ (ต้องตรงกับที่แจ้งขอความช่วยเหลือ)']
        );

        setSuccessData(processedSuccessData);
        setData(processedData);
        setFilteredData(processedData);
      } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = data.filter(
      (row: any) =>
        (selectedProvince === 'จังหวัดทั้งหมด' ||
          row['จังหวัด ที่ต้องการความช่วยเหลือ'] === selectedProvince) &&
        Object.values(row)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    // Ensure timestamp parsing for sorting
    filtered = filtered
      .map((row) => {
        // Parse the date manually
        const [datePart, timePart] = row['ประทับเวลา'].split(', ');
        const [day, month, year] = datePart.split('/').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        const parsedDate = new Date(
          year,
          month - 1,
          day,
          hours,
          minutes,
          seconds
        );

        return {
          ...row,
          timestamp: isNaN(parsedDate.getTime()) ? null : parsedDate, // Check for invalid dates
        };
      })
      .filter((row) => row.timestamp !== null) // Exclude rows with invalid dates
      .sort((a, b) =>
        sortOrder === 'asc'
          ? a.timestamp.getTime() - b.timestamp.getTime()
          : b.timestamp.getTime() - a.timestamp.getTime()
      );

    setFilteredData(filtered);
  }, [searchTerm, selectedProvince, data, sortOrder]);
  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleItems((prev) =>
            Math.min(prev + ITEMS_PER_PAGE, filteredData.length)
          );
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [filteredData]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner label='กำลังโหลดข้อมูล...' size='lg' />
      </div>
    );
  }

  return (
    <DefaultLayout>
      <div className='w-full mx-auto'>
        <div className='text-center mb-2'>
          <h1 className={title()}>ผู้ขอความช่วยเหลือ</h1>
        </div>
        <div className='text-center w-full mb-12'>
          <h2 className='text-sm md:text-lg font-semibold'>
            (ได้รับความช่วยเหลือแล้ว{' '}
            <span className={title({ color: 'green' })}>
              {successData.length}
            </span>{' '}
            เคส)
          </h2>
        </div>
        {/* Search and Filter Section */}
        <Card className='mb-4 p-4'>
          <div className='flex flex-col w-50 gap-4 md:flex-row md:items-center md:justify-between'>
            <Input
              placeholder='ค้นหา...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
            <div className='flex gap-4'>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant='flat'>{selectedProvince}</Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='เลือกจังหวัด'
                  onAction={(key: any) => setSelectedProvince(key)}
                >
                  {[
                    'จังหวัดทั้งหมด',
                    ...new Set(
                      data.map(
                        (row: any) => row['จังหวัด ที่ต้องการความช่วยเหลือ']
                      )
                    ),
                  ]
                    .filter((province) => province) // Exclude null/undefined values
                    .map((province) => (
                      <DropdownItem key={province} textValue={province}>
                        {province}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
              <Button
                variant='flat'
                onClick={() =>
                  setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                }
              >
                {sortOrder === 'asc'
                  ? 'เรียงจากเก่าไปใหม่'
                  : 'เรียงจากใหม่ไปเก่า'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Data Display */}
        <div className='text-center md:text-end w-full'>
          <h2 className='text-sm md:text-lg font-semibold'>
            จำนวนเคสจาก
            <span className='underline'>{selectedProvince}</span>{' '}
            <span className={title({ color: 'yellow' })}>
              {filteredData.length}
            </span>{' '}
            เคส
          </h2>
        </div>
        {!data.length ? (
          <div className='flex justify-center'>
            <Card>
              <p className='text-lg text-center p-6'>ไม่พบข้อมูลในตอนนี้</p>
            </Card>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filteredData
              ?.slice(0, visibleItems)
              // .filter(
              //   (row: any) =>
              //     !successData.includes(row["ชื่อ"]) && !!row["ชื่อ"]
              // )
              .map((row: any, index: number) => (
                <HelpCardComponent
                  key={index}
                  id={row['id']}
                  tel={row['เบอร์โทรติดต่อ']}
                  need={row['สิ่งที่ต้องการให้ช่วยเหลือ']}
                  createdAt={row['ประทับเวลา']}
                  name={row['ชื่อ']}
                  address={row['ที่อยู่ ที่ต้องการความช่วยเหลือ']}
                  province={row['จังหวัด ที่ต้องการความช่วยเหลือ']}
                  isSuccess={!!successData.includes(row['ชื่อ'])}
                />
              ))}
          </div>
        )}

        {/* Infinite Loader */}
        {visibleItems < filteredData.length && (
          <div ref={loaderRef} className='flex justify-center mt-8'>
            <Spinner size='sm' />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default GoogleSheetPage;
