import express from "express";
import { adminLogin } from "../controllers/authController.js";

const router = express.Router();

// ADMIN LOGIN
router.post("/login", adminLogin);

export default router;
