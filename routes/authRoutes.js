import express from "express";
import dotenv from "dotenv"; // ✅ load env vars
dotenv.config()
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
// ✅ Setup Nodemailer

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
    secure: true, // ⚠️ This allows self-signed certs (use with caution)
  },
 });
 console.log("📨 Transporter is defined:", transporter);

// ✅ Register Route
const router = express.Router();
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("📩 Incoming registration:", req.body);

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Hashed password:", hashedPassword);

    // Save new user
    const user = new User({ name, email, password: hashedPassword });
    const savedUser = await user.save();
    console.log("✅ User saved:", savedUser);

    // Generate email verification token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    
    const verificationLink = `http://localhost:3000/verify-email/${verificationToken}`;
    console.log("🔗 Verification link:", verificationLink);

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });      

    res.status(201).json({
      message: "User registered. Check your email for verification.",
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});
router.get('/verify-email/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email successfully verified!' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
});

export default router;
