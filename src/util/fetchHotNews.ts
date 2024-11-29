import { fetchGoogleSheet } from "@/src/util/fetchGoogleSheet";

const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR8SfzA9K-Q81oKWxu7j5GcnZrfA3McriCa3ZZ3dnzwrPCXJUaTKtQoleUqt9-c8w0BbNZ-xvVUpJ8A/pub?output=csv";

export const fetchHotNews = async () => {
  const sheetData = await fetchGoogleSheet(GOOGLE_SHEET_URL);

  const processedData = sheetData.map((row: any) => ({
    data: row["ข่าวด่วน"],
  }));

  return processedData;
};
