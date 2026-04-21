// api/generate.js
export default async function handler(req, res) {
  const apiKey = process.env.RUNWARE_API_KEY;
  
  if (!apiKey) {
    return res.status(200).json({ error: 'Konfigurasi', message: 'Kunci tiada di Vercel!' });
  }

  try {
    // 1. Parse data dari app Android kau
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // 2. Runware API mahu KEY dalam BODY, bukan dalam Header!
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([
        {
          "action": "imageInference", // Boleh tukar kpd textToSpeech nanti
          "apiKey": apiKey,           // <-- SINI KUNCI DIA!
          "prompt": body?.prompt || "A high quality image",
          "modelId": "runware:100@1"
        }
      ])
    });

    const data = await response.json();

    // Jika Runware balas ralat, hantar mesej tu ke fon
    if (data.error || (data[0] && data[0].error)) {
        return res.status(200).json({ 
            error: "Runware Reject", 
            message: data.error?.message || data[0]?.error?.message 
        });
    }

    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(200).json({ error: 'Vercel Crash', message: error.message });
  }
}
