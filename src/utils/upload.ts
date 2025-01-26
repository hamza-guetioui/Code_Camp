"use server";

import fs from "fs";
import path from "path";

export const uploadImage = async (file: File, id: string): Promise<string> => {
  // Convert the file to a buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Generate a unique filename using the `id`
  const filename = `${id}.${file.name.split(".").pop()}`; // e.g., "123.jpg"

  // Define the path to the public folder
  const publicPath = path.join(process.cwd(), "public", "uploads", filename);

  // Ensure the uploads directory exists
  fs.mkdirSync(path.dirname(publicPath), { recursive: true });

  // Write the file to the public folder
  fs.writeFileSync(publicPath, buffer);

  // Return the URL of the uploaded image
  return `/uploads/${filename}`;
};