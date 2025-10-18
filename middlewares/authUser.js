import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to req object (safe)
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error("User Auth error:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
