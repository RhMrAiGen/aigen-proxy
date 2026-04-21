export default async function handler(req, res) {
  const RUNWARE_API_KEY = process.env.RUNWARE_API_KEY;

  if (req.method === 'POST') {
    try {
      // Kita cuba generate GAMBAR dulu untuk test connection
      const response = await fetch('https://api.runware.ai/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([
          {
            "action": "imageInference",
            "apiKey": RUNWARE_API_KEY,
            "prompt": req.body.prompt,
            "modelId": "runware:100@1", // Model standard Runware
            "numberResults": 1,
            "outputFormat": "JPG"
          }
        ])
      });

      const data = await response.json();
      return res.status(200).json(data);
      
    } catch (error) {
      return res.status(500).json({ error: 'Crash di Vercel!', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Hanya POST dibenarkan' });
  }
}
