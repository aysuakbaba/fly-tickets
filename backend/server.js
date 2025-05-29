const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const flightRoutes = require("./routes/flight");
const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/fly-tickets", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/flight", flightRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
