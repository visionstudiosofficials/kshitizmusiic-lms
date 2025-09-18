import supabase from '../supabaseClient.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const { title, description, content } = req.body;
    const { data, error } = await supabase.from('courses').insert([{ title, description, content }]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  }
}
