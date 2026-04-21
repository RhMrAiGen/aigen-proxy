export default async function handler(req, res) {
  // 1. Ambil kunci rahsia dari Settings Vercel
  const apiKey = process.env.RUNWARE_API_KEY;

  // Cek kalau kunci tak wujud
  if (!apiKey) {
    return res.status(200).json({ 
      error: "Konfigurasi", 
      message: "Kunci RUNWARE_API_KEY tiada dalam Settings Vercel!" 
    });
  }

  if (req.method !== 'POST') return res.status(405).send("Guna POST bos");

  try {
    // 2. Cara selamat baca data dari fon (Fix TypeError: invalid parameter)
    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch (e) {
      body = req.body;
    }

    const userPrompt = body?.prompt || "A high quality car";

    // 3. Ketuk pintu Runware
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([
        {
          "action": "imageInference",
          "apiKey": apiKey,
          "prompt": userPrompt,
          "modelId": "runware:100@1"
        }
      ])
    });

    const data = await response.json();
    
    // Hantar jawapan Runware ke telefon
    return res.status(200).json(data);

  } catch (error) {
    // Jika Vercel sendiri yang bermasalah
    return res.status(200).json({ 
      error: "Vercel Crash", 
      message: error.message 
    });
  }
}
