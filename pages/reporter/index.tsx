import DefaultLayout from '@/layouts/default';
import { title } from '@/components/primitives';
import ManualReporterComponent from '@/components/report';
import { fetchGoogleSheet } from '@/src/util/fetchGoogleSheet';
import { GetStaticProps } from 'next';

const MANUAL_REPORT_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRu0Bu9a_SkOpteuNyXkkiLwYb-Bs6A9Um25m8lOdB48DV9OWhYOeX3uifKQbE_OV4wvYHMLAwx3Tm5/pub?output=csv';

interface ManualReportPageProps {
  initialData: any[];
}

export const getStaticProps: GetStaticProps<ManualReportPageProps> = async () => {
  try {
    const sheetData = await fetchGoogleSheet(MANUAL_REPORT_SHEET_URL);

    const processedData = sheetData.map((row: any) => {
      const [datePart, timePart] = row['ประทับเวลา']?.split(', ') ?? [];
      const [day, month, year] = datePart?.split('/')?.map(Number) ?? [];
      const [hours, minutes, seconds] = timePart?.split(':')?.map(Number) ?? [];
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

    return {
      props: {
        initialData: processedData,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    return {
      props: {
        initialData: [],
      },
      revalidate: 60,
    };
  }
};

const ManualReportPage = ({ initialData }: ManualReportPageProps) => {
  return (
    <DefaultLayout>
      <div className='text-center mb-12'>
        <h1 className={title()}>ข่าวสารจากประชาชน</h1>
      </div>
      <ManualReporterComponent showSearchFilters={true} initialData={initialData} />
    </DefaultLayout>
  );
};

export default ManualReportPage;
