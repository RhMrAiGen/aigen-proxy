export default async function (req, res) {
  // 1. TAMPAL API KEY RUNWARE KAU DI SINI
  const apiKey = "ERekFEky4sKbRvJFzgqRC8q3kT45z2iP";

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Guna POST bos' });
  }

  const payload = [
    {
      "action": "imageInference",
      "apiKey": apiKey,
      "prompt": req.body.prompt || "A sunny day",
      "modelId": "runware:100@1"
    }
  ];

  try {
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    
    // Hantar terus hasil Runware ke telefon
    return res.status(200).json(result);

  } catch (err) {
    // Kalau ada error, kita hantar mesej yang boleh dibaca
    return res.status(200).json({ 
      status: "Error tapi Vercel hidup",
      info: err.message 
    });
  }
}
