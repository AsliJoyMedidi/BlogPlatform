const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

dotenv.config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

// Allow frontend (Vercel + localhost)
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

/* ---------------- ROUTES ---------------- */

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

/* ---------------- HEALTH CHECK ---------------- */

app.get("/", (req, res) => {
  res.send("Blog Platform API Running 🚀");
});

/* ---------------- DB CONNECTION ---------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});