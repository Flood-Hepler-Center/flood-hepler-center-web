import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, Button } from "@nextui-org/react";
import Link from "next/link";

const RequestHelperPage = () => {
  return (
    <DefaultLayout>
      <div className="p-4 max-w-4xl mx-auto text-center">
        <h1 className={title()}>ส่งคำขอความช่วยเหลือ</h1>

        {/* Introduction Card */}
        <Card className="mb-4 p-4 shadow-md bg-white text-black my-5">
          <h2 className="text-lg font-semibold mb-2">
            ข้อมูลสำคัญเกี่ยวกับการขอความช่วยเหลือ
          </h2>
          <p className="text-sm text-gray-700">
            หากคุณหรือบุคคลใกล้ชิดต้องการความช่วยเหลือในสถานการณ์ฉุกเฉิน
            โปรดกรอกแบบฟอร์มด้านล่างโดยให้ข้อมูลที่ถูกต้องและครบถ้วนที่สุด
            เพื่อให้ทีมช่วยเหลือสามารถติดต่อกลับได้อย่างรวดเร็ว
          </p>
          <p className="text-sm text-gray-700 mt-2">
            คลิกปุ่มด้านล่างเพื่อไปยังแบบฟอร์มขอความช่วยเหลือ
            และกรอกข้อมูลตามที่ระบุไว้ในฟอร์ม
          </p>
        </Card>

        {/* Button to Google Form */}
        <Card className="p-4 shadow-md bg-white text-black text-center">
          <h2 className="text-lg font-semibold mb-2">
            แบบฟอร์มขอความช่วยเหลือ
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            คลิกปุ่มด้านล่างเพื่อกรอกแบบฟอร์มคำขอความช่วยเหลือ
          </p>
          <a
            href="https://forms.gle/M3wxWuUswvVntSmK7"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="text-white">ไปที่แบบฟอร์ม</Button>
          </a>
        </Card>
        <div className="my-5">
          <a href="/helper" rel="noopener noreferrer">
            <Button className="text-white">ดูรายชื่อผู้ขอความช่วยเหลือ</Button>
          </a>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RequestHelperPage;
