// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import fs from 'fs';
// import connectDB from './config/mongodb.js';
// import connectCloudinary from './config/cloudinary.js';
// import adminRouter from './routes/adminRoute.js';
// import doctorRouter from './routes/doctorRoute.js';
// import userRouter from './routes/userRoute.js';

// // Load environment variables
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Ensure uploads folder exists
// const uploadPath = './uploads';
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath);
// }

// // Connect to MongoDB and Cloudinary
// connectDB();
// connectCloudinary();

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors()); // For production, specify allowed origins

// // Serve uploaded files statically
// app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/admin', adminRouter);
// app.use('/doctor',doctorRouter)
// app.use('/user',userRouter)


// // Root route
// app.get('/', (req, res) => {
//   res.send('API is running');
// });

// // Global Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error('Global Error:', err.stack);
//   res.status(500).json({
//     success: false,
//     message: err.message || 'Something went wrong on the server',
//   });
// });

// // Handle 404 Not Found
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: 'Route not found' });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });



// ✅ 1️⃣ Load environment variables BEFORE anything else
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import connectDB from './config/mongodb.js';
import './config/cloudinary.js'; // ✅ now env vars are already loaded
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 5000;

// ✅ 2️⃣ Ensure uploads folder exists
const uploadPath = './uploads';
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// ✅ 3️⃣ Connect to MongoDB
connectDB();

// ✅ 4️⃣ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ 5️⃣ Serve uploads statically
app.use('/uploads', express.static('uploads'));

// ✅ 6️⃣ Routes
app.use('/admin', adminRouter);
app.use('/doctor', doctorRouter);
app.use('/user', userRouter);

// ✅ 7️⃣ Root route
app.get('/', (req, res) => res.send('✅ Prescripto API is running...'));

// ✅ 8️⃣ Catch-all 404 handler (after all routes)
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// ✅ 9️⃣ Global error handler (after 404)
app.use((err, req, res, next) => {
  console.error('Global Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong on the server',
  });
});

// ✅ 🔟 Start server
app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
