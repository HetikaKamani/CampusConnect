import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

const admins = [
  {
    name: "Technical Admin",
    email: "technical@campusconnect.com",
    password: "admin123",
    committeeId: "technical",
  },
  {
    name: "Cultural Admin",
    email: "cultural@campusconnect.com",
    password: "admin123",
    committeeId: "cultural",
  },
  {
    name: "Literary Admin",
    email: "literary@campusconnect.com",
    password: "admin123",
    committeeId: "literary",
  },
  {
    name: "Sports Admin",
    email: "sports@campusconnect.com",
    password: "admin123",
    committeeId: "sports",
  },
  {
    name: "Entrepreneur Admin",
    email: "entrepreneur@campusconnect.com",
    password: "admin123",
    committeeId: "entrepreneurship",
  },
];

const seedAdmins = async () => {
  await Admin.deleteMany();

  for (let admin of admins) {
    admin.password = await bcrypt.hash(admin.password, 10);
    await Admin.create(admin);
  }

  console.log("✅ Admins seeded successfully");
  process.exit();
};

seedAdmins();
