import express from "express";

const app = express();
const PORT = 5000;

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
