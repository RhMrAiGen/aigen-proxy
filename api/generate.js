export default async function handler(req, res) {
  // PAKSA MASUKKAN KUNCI KAT SINI. JANGAN PAKAI process.env DULU.
  const MY_REAL_KEY = "ERekFEky4sKbRvJFzgqRC8q3kT45z2iP"; 

  if (req.method !== 'POST') return res.status(405).json({ error: 'Guna POST bos' });

  try {
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([
        {
          "action": "imageInference",
          "apiKey": MY_REAL_KEY,
          "prompt": req.body.prompt || "A high quality car",
          "modelId": "runware:100@1"
        }
      ])
    });

    const data = await response.json();
    
    // Kita hantar apa saja jawapan Runware bagi.
    // Kalau dia masih 401, maksudnya API Key tu memang bermasalah dari pihak Runware.
    return res.status(200).json(data);

  } catch (error) {
    return res.status(200).json({ error: "Sangkut", message: error.message });
  }
}
