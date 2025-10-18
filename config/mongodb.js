import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("DB connected"));

  // Connect to the database named "prescripto"
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "prescripto", // ✅ Set database name here instead of appending to URI
  });
};

export default connectDB;