import { useEffect, useState, useRef } from "react";
import {
  Card,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Button,
} from "@nextui-org/react";
import ReporterCardComponent from "@/components/report-card";
import { fetchGoogleSheet } from "@/src/util/fetchGoogleSheet";

const MANUAL_REPORT_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRu0Bu9a_SkOpteuNyXkkiLwYb-Bs6A9Um25m8lOdB48DV9OWhYOeX3uifKQbE_OV4wvYHMLAwx3Tm5/pub?output=csv";

interface ManualReporterComponentProps {
  max?: number; // Limit the number of items displayed
  showSearchFilters?: boolean; // Show search and filters
}

const ManualReporterComponent: React.FC<ManualReporterComponentProps> = ({
  max,
  showSearchFilters = true,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("จังหวัดทั้งหมด");
  const [visibleItems, setVisibleItems] = useState(max || 0);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetData = await fetchGoogleSheet(MANUAL_REPORT_SHEET_URL);

        const processedData = sheetData.map((row: any) => ({
          ...row,
          timestamp: new Date(row["ประทับเวลา"]).getTime(),
        }));

        setData(processedData);
        setFilteredData(processedData);
      } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    let filtered = data.filter(
      (row: any) =>
        (selectedProvince === "จังหวัดทั้งหมด" ||
          row["จังหวัดที่อยู่"] === selectedProvince) &&
        Object.values(row).join(" ").toLowerCase().includes(lowerSearchTerm)
    );

    if (max) {
      filtered = filtered.slice(0, max); // Apply max limit only if max is provided
    }

    setFilteredData(filtered);
  }, [searchTerm, selectedProvince, data, max]);

  // Infinite Scroll
  useEffect(() => {
    if (!max) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setVisibleItems((prev) => Math.min(prev + 10, filteredData.length));
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
      <div className="flex justify-center items-center my-4">
        <Spinner label="กำลังโหลดข้อมูล..." size="lg" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      {showSearchFilters && (
        <Card className="mb-4 p-4">
          <div className="flex flex-col w-50 gap-4 md:flex-row md:items-center md:justify-between">
            <Input
              placeholder="ค้นหา..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
            <div className="flex gap-4">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="flat">{selectedProvince}</Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="เลือกจังหวัด"
                  onAction={(key: any) => setSelectedProvince(key)}
                >
                  {[
                    "จังหวัดทั้งหมด",
                    ...new Set(data.map((row: any) => row["จังหวัดที่อยู่"])),
                  ]
                    .filter(Boolean)
                    .map((province) => (
                      <DropdownItem key={province} textValue={province}>
                        {province}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.slice(0, visibleItems).map((row: any, index: number) => (
          <ReporterCardComponent
            key={index}
            title={row["ชื่อข่าวสาร"]}
            content={row["เนื้อหาข่าวสาร"]}
            contact={row["ข้อมูลติดต่อ"]}
            province={row["จังหวัดที่อยู่"]}
            createdAt={row["ประทับเวลา"]}
          />
        ))}
      </div>

      {!max && visibleItems < filteredData.length && (
        <div ref={loaderRef} className="flex justify-center mt-8">
          <Spinner size="sm" />
        </div>
      )}
    </div>
  );
};

export default ManualReporterComponent;
