import LongdoMap from "@/components/map";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>แผนที่ระดับน้ำ</h1>
        </div>
        <div className='flex w-full my-5'>
          <LongdoMap />
        </div>
      </section>
    </DefaultLayout>
  );
}
