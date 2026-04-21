export default async function handler(req, res) {
  const RUNWARE_API_KEY = process.env.RUNWARE_API_KEY;

  if (req.method === 'POST') {
    try {
      // Kita hantar format yang paling simple & direct
      const response = await fetch('https://api.runware.ai/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "action": "generateVideo",
          "apiKey": RUNWARE_API_KEY,
          "prompt": req.body.prompt,
          "modelId": "runware:1@flux", // Guna model standard
          "steps": 10 // Rendahkan steps supaya baki $0.05 kau cukup
        })
      });

      const data = await response.json();
      
      // Kalau Runware bagi error dalam JSON dia
      if (data.error) {
        return res.status(400).json(data);
      }

      return res.status(200).json(data);
      
    } catch (error) {
      return res.status(500).json({ error: 'Server Error bos!', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Hanya POST dibenarkan' });
  }
}
