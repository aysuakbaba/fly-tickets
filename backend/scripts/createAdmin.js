require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

mongoose.connect("mongodb://localhost:27017/fly-tickets", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createAdmin() {
  const email = "aysuakbaba@gmail.com";
  const password = "1234";
  const name = "aysu123";

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("Admin already exists.");
    return mongoose.disconnect();
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ name, email, password: hashedPassword });
  await admin.save();
  console.log("Admin created successfully");
  mongoose.disconnect();
}

createAdmin();
