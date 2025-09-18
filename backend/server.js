require('dotenv').config();
import express from 'express';
import supabase from './supabaseClient.js';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Backend running ✅');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
