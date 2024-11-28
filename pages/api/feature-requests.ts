import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "feature-requests.json");

export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    // Read and return feature requests from the file
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.status(200).json(data);
  } else if (req.method === "POST") {
    // Add a new feature request
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required." });
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const newRequest = {
      id: Date.now(),
      title,
      description,
      status: "pending",
    };
    data.push(newRequest);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(201).json(newRequest);
  } else if (req.method === "DELETE") {
    // Delete a feature request
    const { id } = req.body;
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const updatedData = data.filter((req: any) => req.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    res.status(200).json({ message: "Request deleted successfully." });
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
