export default async function (req, res) {
  // 1. MASUKKAN KEY ASLI KAU KAT SINI
  const MY_REAL_KEY = "KUNCI_ASLI_KAU_DI_SINI"; 

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Guna POST bos' });
  }

  try {
    // Kita guna cara hantar yang paling 'standard' untuk API
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([
        {
          "action": "imageInference",
          "apiKey": MY_REAL_KEY,
          "prompt": req.body.prompt || "A high quality photo of a cat",
          "modelId": "runware:100@1"
        }
      ])
    });

    // Cek kalau Runware sendiri yang bermasalah
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: 'Runware Reject', details: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    // Kalau crash, dia akan tulis SEBAB kat skrin fon kau
    return res.status(500).json({ 
      error: 'Vercel Terhenti!', 
      sebab: error.message 
    });
  }
}
