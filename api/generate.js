export default async function handler(req, res) {
  // Kita letak terus kunci kat sini supaya Vercel tak pening cari
  const MY_REAL_KEY = "ERekFEky4sKbRvJFzgqRC8q3kT45z2iP"; 

  if (req.method === 'POST') {
    try {
      const response = await fetch('https://api.runware.ai/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([
          {
            "action": "imageInference",
            "apiKey": MY_REAL_KEY,
            "prompt": req.body.prompt || "A cute cat",
            "modelId": "runware:100@1",
            "numberResults": 1
          }
        ])
      });

      const data = await response.json();
      return res.status(200).json(data);
      
    } catch (error) {
      return res.status(500).json({ error: 'Crash!', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Guna POST bos' });
  }
}
