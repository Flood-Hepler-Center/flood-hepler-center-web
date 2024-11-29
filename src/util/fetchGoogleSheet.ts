import Papa from "papaparse";

export async function fetchGoogleSheet(url: string) {
  try {
    const response = await fetch(url);
    const csvData = await response.text();

    // Parse the CSV using PapaParse
    const parsed = Papa.parse(csvData, {
      header: true, // Ensure the first row is treated as headers
      skipEmptyLines: true, // Skip empty lines
    });

    if (parsed.errors.length) {
      console.error("Error parsing CSV:", parsed.errors);
      throw new Error("Error parsing CSV data.");
    }

    return parsed.data; // Return the parsed rows as an array of objects
  } catch (error) {
    console.error("Error fetching Google Sheet data:", error);
    throw error;
  }
}
