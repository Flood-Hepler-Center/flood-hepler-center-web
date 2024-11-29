import React, { useState } from "react";
import { Card, Input, Textarea, Button } from "@nextui-org/react";

const ReporterForm = () => {
  const [formData, setFormData] = useState({
    "entry.278650788": "", // News Title
    "entry.1003588841": "", // News Content
    "entry.587512804": "", // Contact Information
    "entry.1200525869": "", // Province
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formUrl =
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeQqINd8raV75EWVtamJjCUnbdZWvq9724lOnLkvwB4bI_Cwg/formResponse";

    try {
      const formDataEncoded = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        formDataEncoded.append(key, value);
      });

      const response = await fetch(formUrl, {
        method: "POST",
        mode: "no-cors", // Google Forms requires this
        body: formDataEncoded,
      });

      if (response.ok || response.type === "opaque") {
        setSuccessMessage("ส่งข้อมูลสำเร็จ! ขอบคุณสำหรับการแจ้งข่าว");
        setFormData({
          "entry.278650788": "",
          "entry.1003588841": "",
          "entry.587512804": "",
          "entry.1200525869": "",
        });
      } else {
        throw new Error("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage("เกิดข้อผิดพลาด! โปรดลองอีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {successMessage ? (
        <p className="text-center text-lg font-semibold text-green-600">
          {successMessage}
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="ชื่อข่าวสาร"
              name="entry.278650788"
              fullWidth
              value={formData["entry.278650788"]}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <Textarea
              label="เนื้อหาข่าวสาร"
              name="entry.1003588841"
              fullWidth
              value={formData["entry.1003588841"]}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <Input
              label="ข้อมูลติดต่อ"
              name="entry.587512804"
              fullWidth
              value={formData["entry.587512804"]}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <Input
              label="จังหวัดที่อยู่"
              name="entry.1200525869"
              fullWidth
              value={formData["entry.1200525869"]}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-surface"
            disabled={isSubmitting}
          >
            {isSubmitting ? "กำลังส่ง..." : "ส่งข้อมูล"}
          </Button>
        </form>
      )}
    </>
  );
};

export default ReporterForm;
