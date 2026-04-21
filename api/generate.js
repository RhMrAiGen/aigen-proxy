export default async function handler(req, res) {
  // Ambil kunci dari Vercel
  const MY_KEY = process.env.RUNWARE_API_KEY; 

  // 1. Cek kalau kunci wujud. Kalau tak wujud, bagi mesej jelas.
  if (!MY_KEY || MY_KEY === "") {
    return res.status(200).json({ 
      error: "Kunci Hilang", 
      message: "Bos, kau belum setup RUNWARE_API_KEY kat Vercel Settings!" 
    });
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Guna POST' });

  try {
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{
        "action": "imageInference",
        "apiKey": MY_KEY,
        "prompt": req.body.prompt || "A red cat",
        "modelId": "runware:100@1"
      }])
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    // Kalau ada masalah internet/connection, dia takkan 500, tapi keluar mesej ni
    return res.status(200).json({ 
      error: "Jambatan Putus", 
      message: error.message 
    });
  }
}
