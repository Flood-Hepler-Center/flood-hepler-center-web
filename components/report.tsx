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
import ReporterCardComponent from '@/components/report-card';
import { fetchGoogleSheet } from '@/src/util/fetchGoogleSheet';

const MANUAL_REPORT_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRu0Bu9a_SkOpteuNyXkkiLwYb-Bs6A9Um25m8lOdB48DV9OWhYOeX3uifKQbE_OV4wvYHMLAwx3Tm5/pub?output=csv';

interface ManualReporterComponentProps {
  max?: number; // Limit the number of items displayed
  showSearchFilters?: boolean; // Show search and filters
  initialData?: any[]; // Pre-fetched data for ISR
}

const ITEMS_PER_PAGE = 10;

const ManualReporterComponent: React.FC<ManualReporterComponentProps> = ({
  max,
  showSearchFilters = true,
  initialData,
}) => {
  const [data, setData] = useState<any[]>(initialData || []);
  const [filteredData, setFilteredData] = useState<any[]>(initialData || []);
  const [loading, setLoading] = useState(!initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('จังหวัดทั้งหมด');
  const [selectedCategory, setSelectedCategory] = useState('ประเภททั้งหมด');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [visibleItems, setVisibleItems] = useState(max || ITEMS_PER_PAGE);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Skip fetching if initialData is provided (ISR mode)
    if (initialData) {
      return;
    }

    const fetchData = async () => {
      try {
        const sheetData = await fetchGoogleSheet(MANUAL_REPORT_SHEET_URL);

        const processedData = sheetData.map((row: any) => {
          const [datePart, timePart] = row['ประทับเวลา']?.split(', ') ?? [];
          const [day, month, year] = datePart?.split('/')?.map(Number) ?? [];
          const [hours, minutes, seconds] =
            timePart?.split(':')?.map(Number) ?? [];
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
            timestamp: isNaN(parsedDate.getTime()) ? null : parsedDate,
          };
        });

        setData(processedData);
        setFilteredData(processedData);
      } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialData]);

  useEffect(() => {
    let filtered = data.filter(
      (row: any) =>
        (selectedProvince === 'จังหวัดทั้งหมด' ||
          row['จังหวัดที่อยู่'] === selectedProvince) &&
        (selectedCategory === 'ประเภททั้งหมด' || row['เกี่ยวกับ'] === selectedCategory) &&
        Object.values(row)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    console.log(filtered)

    filtered = filtered.sort((a, b) =>
      sortOrder === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp
    );

    if (max) {
      filtered = filtered.slice(0, max);
    }

    setFilteredData(filtered);
  }, [searchTerm, selectedProvince, selectedCategory, sortOrder, data, max]);

  useEffect(() => {
    if (!max) {
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
    }
  }, [filteredData, max]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner label='กำลังโหลดข้อมูล...' size='lg' />
      </div>
    );
  }

  return (
    <div className='w-full mx-auto'>
      {showSearchFilters && (
        <Card className='mb-4 p-4'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
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
                    ...new Set(data.map((row: any) => row['จังหวัดที่อยู่'])),
                  ]
                    .filter(Boolean)
                    .map((province) => (
                      <DropdownItem key={province}>{province}</DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant='flat'>{selectedCategory}</Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label='เลือกหมวดหมู่'
                  onAction={(key: any) => setSelectedCategory(key)}
                >
                  {[
                    'ประเภททั้งหมด',
                    ...new Set(data.map((row: any) => row['เกี่ยวกับ'])),
                  ]
                    .filter(Boolean)
                    .map((category) => (
                      <DropdownItem key={category}>{category}</DropdownItem>
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
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredData.slice(0, visibleItems).map((row: any, index: number) => (
          <ReporterCardComponent
            key={index}
            title={row['ชื่อข่าวสาร']}
            content={row['เนื้อหาข่าวสาร']}
            contact={row['ข้อมูลติดต่อ']}
            province={row['จังหวัดที่อยู่']}
            createdAt={row['ประทับเวลา']}
            category={row['เกี่ยวกับ']}
          />
        ))}
      </div>

      {!max && visibleItems < filteredData.length && (
        <div ref={loaderRef} className='flex justify-center mt-8'>
          <Spinner size='sm' />
        </div>
      )}
    </div>
  );
};

export default ManualReporterComponent;
