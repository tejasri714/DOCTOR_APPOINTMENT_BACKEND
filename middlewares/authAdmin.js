// import jwt from 'jsonwebtoken';

// // Admin authentication middleware
// const authAdmin = async (req, res, next) => {
//   try {
//     // Get token from headers (custom header: atoken)
//     const { atoken } = req.headers;

//     if (!atoken) {
//       return res.status(401).json({ success: false, message: 'Not authorized. Login again.' });
//     }

//     // Verify token
//     const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

//     // Check if token belongs to admin
//     if (decoded.email !== process.env.ADMIN_EMAIL) {
//       return res.status(403).json({ success: false, message: 'Unauthorized access. Login again.' });
//     }

//     req.admin = decoded; // Optional: attach admin info to request
//     next();
//   } catch (error) {
//     console.error('Auth error:', error);
//     res.status(401).json({ success: false, message: 'Invalid or expired token.' });
//   }
// };

// export default authAdmin;


import jwt from 'jsonwebtoken';

// ✅ Admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authorized. Login again.' });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if it belongs to admin
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: 'Unauthorized access. Login again.' });
    }

    req.admin = decoded; // attach admin info to request
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

export default authAdmin;
