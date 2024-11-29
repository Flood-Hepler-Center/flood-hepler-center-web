import { useEffect, useState } from 'react';
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
import { fetchGoogleSheet } from '@/src/util/fetchGoogleSheet';
import DefaultLayout from '@/layouts/default';
import { title } from '@/components/primitives';
import HelpCardComponent from '@/components/help-card';

const GOOGLE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTkvS_fgba8jb9gz8AjNmvrTPKNNX7bQ3rLiRazabOnvW8tFAkRYlkJmMvUvXfeRGBca5BlowiZJEhG/pub?output=csv';
const SUCCESS_GOOGLE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2sg3qEUtJ8mgBXt3PLT5zY89dSRahhiWmCtRvjk78IFvP2rwg-K7PWwYA9bVcLTEiv5egjQIjmdWQ/pub?output=csv';

const GoogleSheetPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [successData, setSuccessData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('จังหวัดทั้งหมด');
  const [selectedDistrict, setSelectedDistrict] = useState('อำเภอทั้งหมด');
  const [selectedSubdistrict, setSelectedSubdistrict] = useState('ตำบลทั้งหมด');
  const [provinces, setProvinces] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [subdistricts, setSubdistricts] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetData = await fetchGoogleSheet(GOOGLE_SHEET_URL);
        const successData = await fetchGoogleSheet(SUCCESS_GOOGLE_SHEET_URL);

        // Combine address fields into one column
        const processedData = sheetData.map((row: any) => ({
          ...row,
          fullAddress: `${row['ที่อยู่ ที่ต้องการความช่วยเหลือ'] || ''} ${
            row['ตำบล ที่ต้องการความช่วยเหลือ'] || ''
          } ${row['อำเภอ ที่ต้องการความช่วยเหลือ'] || ''} ${
            row['จังหวัด ที่ต้องการความช่วยเหลือ'] || ''
          }`,
        }));

        const processedSuccessData = successData.map(
          (row: any) =>
            row['ชื่อที่ได้รับความช่วยเหลือ (ต้องตรงกับที่แจ้งขอความช่วยเหลือ)']
        );
        console.log(sheetData);
        setSuccessData(processedSuccessData);

        setData(processedData);
        setFilteredData(processedData);

        // Extract unique provinces, districts, and subdistricts
        const uniqueProvinces = [
          'จังหวัดทั้งหมด',
          ...new Set(
            processedData.map(
              (row: any) => row['จังหวัด ที่ต้องการความช่วยเหลือ']
            )
          ),
        ];
        setProvinces(uniqueProvinces);

        const uniqueDistricts = [
          'อำเภอทั้งหมด',
          ...new Set(
            processedData.map(
              (row: any) => row['อำเภอ ที่ต้องการความช่วยเหลือ']
            )
          ),
        ];
        setDistricts(uniqueDistricts);

        const uniqueSubdistricts = [
          'ตำบลทั้งหมด',
          ...new Set(
            processedData.map((row: any) => row['ตำบล ที่ต้องการความช่วยเหลือ'])
          ),
        ];
        setSubdistricts(uniqueSubdistricts);
      } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = data.filter(
      (row: any) =>
        (selectedProvince === 'จังหวัดทั้งหมด' ||
          row['จังหวัด ที่ต้องการความช่วยเหลือ'] === selectedProvince) &&
        (selectedDistrict === 'อำเภอทั้งหมด' ||
          row['อำเภอ ที่ต้องการความช่วยเหลือ'] === selectedDistrict) &&
        (selectedSubdistrict === 'ตำบลทั้งหมด' ||
          row['ตำบล ที่ต้องการความช่วยเหลือ'] === selectedSubdistrict) &&
        Object.values(row).join(' ').toLowerCase().includes(lowerSearchTerm)
    );
    setFilteredData(filtered);
  }, [
    searchTerm,
    selectedProvince,
    selectedDistrict,
    selectedSubdistrict,
    data,
  ]);

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
        <div className='text-center mb-12'>
          <h1 className={title()}>ผู้ขอความช่วยเหลือ</h1>
        </div>

        {/* Search and Filter Section */}
        <Card className='mb-4 p-4'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <Input
              placeholder='ค้นหา...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
            <div className='flex flex-wrap gap-4'>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant='flat'>{selectedProvince}</Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='เลือกจังหวัด'
                  onAction={(key: any) => setSelectedProvince(key)}
                >
                  {provinces.map((province) => (
                    <DropdownItem key={province}>{province}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Card>
        <div className='text-center md:text-end w-full'>
          <h2 className='text-sm md:text-lg font-semibold'>
            จำนวนเคสที่รอเข้ารับการช่วยเหลือมีอยู่{' '}
            <span className={title({ color: 'yellow' })}>{data.length}</span>{' '}
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
              ?.filter(
                (data: any) =>
                  !successData.includes(data['ชื่อ']) && !!data['ชื่อ']
              )
              .map((row: any, index: number) => (
                <HelpCardComponent
                  key={index}
                  tel={row['เบอร์โทรติดต่อ']}
                  need={row['สิ่งที่ต้องการให้ช่วยเหลือ']}
                  createdAt={row['ประทับเวลา']}
                  name={row['ชื่อ']}
                  address={row['ที่อยู่ ที่ต้องการความช่วยเหลือ']}
                  province={row['จังหวัด ที่ต้องการความช่วยเหลือ']}
                />
              ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default GoogleSheetPage;
