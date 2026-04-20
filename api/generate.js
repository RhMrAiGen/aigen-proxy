export default async function handler(req, res) {
  // Key ini nanti kita sorok dalam Settings Vercel
  const LUMA_API_KEY = process.env.LUMA_API_KEY;

  if (req.method === 'POST') {
    try {
      const response = await fetch('https://api.lumalabs.ai/v1/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LUMA_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
      });

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Server Error bos!' });
    }
  } else {
    res.status(405).json({ message: 'Guna POST request saja!' });
  }
}
