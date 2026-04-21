export default async function handler(req, res) {
  // 1. TAMPAL API KEY RUNWARE KAU KAT SINI
  const MY_KEY = "TAMPAL_API_KEY_ASLI_KAU_DI_SINI"; 

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
          "prompt": req.body.prompt || "A cute cat",
          "modelId": "runware:100@1"
        }
      ])
    });

    // Cek kalau Runware respon tapi ada masalah (contoh: baki tak cukup)
    const data = await response.json();
    
    // Kita hantar apa saja hasil dari Runware terus ke fon kau
    return res.status(200).json(data);

  } catch (error) {
    // Kalau Vercel crash, dia akan beritahu SEBABNYA kat fon kau
    return res.status(200).json({ 
      error: "Vercel Sangkut", 
      message: error.message 
    });
  }
}
