export default async function handler(req, res) {
  const RUNWARE_API_KEY = process.env.RUNWARE_API_KEY;

  if (req.method === 'POST') {
    try {
      // Runware biasanya guna format JSON untuk bagitahu model apa nak guna
      const response = await fetch('https://api.runware.ai/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            "action": "generateVideo",
            "apiKey": RUNWARE_API_KEY,
            "prompt": req.body.prompt, // Ini ambil dari button app kau
            "modelId": "runware:1@flux", // Contoh model, kau boleh tukar ikut docs mereka
            "steps": 25
          }
        ])
      });

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Runware Error bos!' });
    }
  } else {
    res.status(405).json({ message: 'Guna POST saja!' });
  }
}
