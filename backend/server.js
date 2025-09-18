require('dotenv').config();
const express = require('express');
console.log('MONGO_URI:', process.env.MONGO_URI);
const connectDB = require('./db');

const app = express();
app.use(express.json());

console.log('🔹 server.js started'); // <-- Add this line

// Connect to MongoDB
connectDB();

// Example API Route
app.get('/', (req, res) => {
  res.send('Backend running ✅');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
