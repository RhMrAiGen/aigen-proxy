export default async function handler(req, res) {
  // Sekarang kita panggil kunci secara rahsia dari Vercel Settings
  const MY_KEY = process.env.RUNWARE_API_KEY; 

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Guna POST bos' });
  }

  try {
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([
        {
          "action": "imageInference",
          "apiKey": MY_KEY,
          "prompt": req.body.prompt || "A high quality portrait",
          "modelId": "runware:100@1"
        }
      ])
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(200).json({ 
      error: "Vercel Connect", 
      message: error.message 
    });
  }
}
