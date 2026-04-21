export default async function handler(req, res) {
  // 1. TAMPAL KEY ASLI KAU KAT SINI
  const MY_REAL_KEY = "ERekFEky4sKbRvJFzgqRC8q3kT45z2iP"; 

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Guna POST bos' });
  }

  try {
    // 2. Kita guna struktur yang paling selamat untuk Node.js
    const runwarePayload = [
      {
        "action": "imageInference",
        "apiKey": MY_REAL_KEY,
        "prompt": req.body.prompt || "A beautiful cat",
        "modelId": "runware:100@1"
      }
    ];

    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(runwarePayload)
    });

    const data = await response.json();
    
    // 3. Kita hantar balik apa saja yang Runware jawab
    return res.status(200).json(data);

  } catch (error) {
    // 4. Kalau error, kita nak tengok SEBABNYA kat fon kau
    return res.status(500).json({ 
      error: 'Vercel Terhenti!', 
      sebab: error.message 
    });
  }
}
