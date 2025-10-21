import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// 🔐 Replace these with your Cloudinary credentials from the dashboard
cloudinary.config({
  cloud_name: "dterdl2hy", // Your Cloud name
  api_key: "487818496455121",
  api_secret: "xm9sY_kHxwgJg23kjJU9NoYnsQk",
});

// Folder path where your local images are stored
const folderPath = "./public/Images"; // Adjust this to your project structure

// Function to upload all images in the folder
const uploadImages = async () => {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    if (fs.lstatSync(filePath).isFile()) {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: "my_project_images", // Optional: organizes your uploads in Cloudinary
        });
        console.log(`✅ Uploaded: ${file} → ${result.secure_url}`);
      } catch (error) {
        console.error(`❌ Error uploading ${file}:`, error);
      }
    }
  }

  console.log("🎉 All images uploaded successfully!");
};

uploadImages();
