import React, { useState, useEffect } from "react";
import { Card, Input, Textarea, Button } from "@nextui-org/react";
import { fetchGoogleSheet } from "@/src/util/fetchGoogleSheet";

const ReporterForm = () => {
  const [formData, setFormData] = useState({
    "entry.278650788": "", // News Title
    "entry.1003588841": "", // News Content
    "entry.587512804": "", // Contact Information
    "entry.1200525869": "", // Province
    "entry.817660779": "", // About
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [sheetData, setSheetData] = useState<any>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<any>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const sheetData = await fetchGoogleSheet(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vRu0Bu9a_SkOpteuNyXkkiLwYb-Bs6A9Um25m8lOdB48DV9OWhYOeX3uifKQbE_OV4wvYHMLAwx3Tm5/pub?output=csv"
        );
        setSheetData(sheetData);
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
    };

    fetchSheetData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Filter suggestions for "เกี่ยวกับ" (entry.817660779)
    if (name === "entry.817660779") {
      const uniqueSuggestions = [
        ...new Set(sheetData.map((item: any) => item["เกี่ยวกับ"] || "").filter(Boolean)),
      ];
      setFilteredSuggestions(uniqueSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setFormData({ ...formData, "entry.817660779": suggestion });
    setFilteredSuggestions([]);
    setIsDropdownVisible(false);
  };

  const handleFocus = () => {
    // Show dropdown when the field is clicked
    const uniqueSuggestions = [
      ...new Set(sheetData.map((item: any) => item["เกี่ยวกับ"] || "").filter(Boolean)),
    ];
    setFilteredSuggestions(uniqueSuggestions);
    setIsDropdownVisible(true);
  };

  const handleBlur = () => {
    // Hide dropdown when the field loses focus
    setTimeout(() => setIsDropdownVisible(false), 100); // Delay to allow click on suggestion
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
          "entry.817660779": "",
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

          <div className="mb-4 relative">
            <Input
              label="เกี่ยวกับ"
              name="entry.817660779"
              fullWidth
              value={formData["entry.817660779"]}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {isDropdownVisible && filteredSuggestions.length > 0 && (
              <ul className=" border rounded shadow w-full">
                {filteredSuggestions.map((suggestion: any, index: any) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 cursor-pointer"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
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
