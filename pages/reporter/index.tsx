import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import ManualReporterComponent from "@/components/report";

const ManualReportPage = () => {
  return (
    <DefaultLayout>
      <div className="text-center mb-12">
        <h1 className={title()}>ข่าวสารจากประชาชน</h1>
      </div>
      <ManualReporterComponent showSearchFilters={true} />
    </DefaultLayout>
  );
};

export default ManualReportPage;
