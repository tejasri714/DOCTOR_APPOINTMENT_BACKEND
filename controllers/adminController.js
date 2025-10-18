// import doctorModel from '../models/doctorModel.js';
// import { v2 as cloudinary } from 'cloudinary';
// import validator from 'validator';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// const addDoctor = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       speciality,
//       degree,
//       experience,
//       about,
//       fees,
//       address,
//     } = req.body;

//     const imageFile = req.file;

//     // ✅ Validate email
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ success: false, message: 'Please enter a valid email' });
//     }

//     // ✅ Validate password
//     if (!password || password.length < 8) {
//       return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
//     }

//     // ✅ Check for duplicate email
//     const existingDoctor = await doctorModel.findOne({ email });
//     if (existingDoctor) {
//       return res.status(409).json({ success: false, message: 'Email already exists' });
//     }

//     // ✅ Encrypt password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // ✅ Upload image to Cloudinary
//     let imageUrl = '';
//     if (imageFile?.path) {
//       const result = await cloudinary.uploader.upload(imageFile.path, {
//         folder: 'doctors',
//       });
//       imageUrl = result.secure_url;
//     }

//     // ✅ Parse address safely
//     let parsedAddress = {};
//     try {
//       parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;
//     } catch (err) {
//       parsedAddress = { raw: address };
//     }

//     // ✅ Create doctor document
//     const newDoctor = new doctorModel({
//       name,
//       email,
//       password: hashedPassword,
//       image: imageUrl,
//       speciality,
//       degree,
//       experience,
//       about,
//       available: true,
//       fees: Number(fees),
//       address: parsedAddress,
//       date: Date.now(),
//       slots_booked: {},
//       role: 'doctor',
//     });

//     await newDoctor.save();

//     return res.status(201).json({
//       success: true,
//       message: 'Doctor added successfully!',
//       doctor: newDoctor,
//     });
//   } catch (error) {
//     console.error('Error in addDoctor:', error);
//     return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
//   }
// };

// const loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // ✅ Log for debugging (optional)
//     console.log('Received:', email, password);
//     console.log('Expected:', process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

//     if (
//       email === process.env.ADMIN_EMAIL?.trim() &&
//       password === process.env.ADMIN_PASSWORD?.trim()
//     ) {
//       const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
//       return res.json({ success: true, token });
//     } else {
//       return res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error('Error in loginAdmin:', error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// export { addDoctor, loginAdmin };


import doctorModel from '../models/doctorModel.js';
import { v2 as cloudinary } from 'cloudinary';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ✅ Add Doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // ✅ Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email' });
    }

    // ✅ Validate password
    if (!password || password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    // ✅ Check for duplicate email
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    // ✅ Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Upload image to Cloudinary (optional)
    let imageUrl = '';
    if (imageFile && imageFile.path) {
      try {
        const result = await cloudinary.uploader.upload(imageFile.path, {
          folder: 'doctors',
        });
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        imageUrl = '';
      }
    }

    // ✅ Parse address safely
    let parsedAddress = {};
    try {
      parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;
    } catch (err) {
      parsedAddress = { line1: '', line2: '' };
    }

    // ✅ Create doctor document
    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      image: imageUrl || '',
      speciality,
      degree,
      experience,
      about,
      available: true,
      fees: Number(fees) || 0,
      address: parsedAddress,
      date: Date.now(),
      slots_booked: {},
      role: 'doctor',
    });

    await newDoctor.save();

    return res.status(201).json({
      success: true,
      message: 'Doctor added successfully!',
      doctor: newDoctor,
    });
  } catch (error) {
    console.error('Error in addDoctor:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// ✅ Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL?.trim() &&
      password === process.env.ADMIN_PASSWORD?.trim()
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.json({ success: true, token });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error in loginAdmin:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all doctors
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password');
    res.json({ success: true, doctors });
  } catch (error) {
    console.error('Error in allDoctors:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, allDoctors };
