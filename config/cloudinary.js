// import { v2 as cloudinary } from 'cloudinary';

// const connectCloudinary = () => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
// };

// export default connectCloudinary;
// export { cloudinary };

// backend/config/cloudinary.js

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary immediately on import
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,       // make sure your .env variable name matches
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY, // make sure your .env variable name matches
});

console.log("✅ Cloudinary configured successfully");

// Export the configured instance as default
export default cloudinary;
