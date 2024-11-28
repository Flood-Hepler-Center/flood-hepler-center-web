import DefaultLayout from "@/layouts/default";
import { useState, useEffect } from "react";

const FloodRequests = ({ initialRequests }: any) => {
  const [requests, setRequests] = useState(initialRequests);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Fetch updated requests dynamically on the client side
    fetch("/api/feature-requests")
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);

  const addRequest = async () => {
    if (!title.trim() || !description.trim()) {
      alert("กรุณากรอกชื่อและคำอธิบายให้ครบถ้วน");
      return;
    }

    const res = await fetch("/api/feature-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      const newRequest = await res.json();
      setRequests((prev: any) => [...prev, newRequest]);
      setTitle("");
      setDescription("");
    } else {
      alert("ไม่สามารถเพิ่มคำขอได้");
    }
  };

  const deleteRequest = async (id: any) => {
    const res = await fetch("/api/feature-requests", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setRequests((prev: any) => prev.filter((req: any) => req.id !== id));
    } else {
      alert("ไม่สามารถลบคำขอได้");
    }
  };

  return (
    <DefaultLayout>
      <div className="p-6 max-w-5xl mx-auto bg-blue-50 min-h-screen">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700">
          คำร้องขอเกี่ยวกับสถานการณ์น้ำท่วม
        </h1>

        {/* Add Feature Request Form */}
        <div className="mb-8 bg-white p-6 rounded shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            เพิ่มคำร้องใหม่
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              หัวข้อ
            </label>
            <input
              type="text"
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="หัวข้อคำร้อง เช่น น้ำท่วมสูงในพื้นที่..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              รายละเอียด
            </label>
            <textarea
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="รายละเอียดเพิ่มเติม เช่น ระดับน้ำ, พื้นที่, ความช่วยเหลือที่ต้องการ"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            ></textarea>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={addRequest}
          >
            เพิ่มคำร้อง
          </button>
        </div>

        {/* Display Feature Requests */}
        <div>
          {requests.length === 0 ? (
            <p className="text-center text-gray-600">ยังไม่มีคำร้องขณะนี้</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {requests.map((req: any) => (
                <div
                  key={req.id}
                  className="bg-white rounded shadow-md border p-4 relative"
                >
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">
                    {req.title}
                  </h3>
                  <p className="text-gray-700">{req.description}</p>
                  <button
                    className="text-red-600 absolute top-4 right-4 hover:underline"
                    onClick={() => deleteRequest(req.id)}
                  >
                    ลบ
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

// For Static Generation
export async function getStaticProps() {
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(process.cwd(), "feature-requests.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");

  return {
    props: {
      initialRequests: data,
    },
  };
}

export default FloodRequests;
