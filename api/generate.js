export default async function handler(req, res) {
  console.log("LOG: Handler bermula..."); // Akan muncul kat log
  const MY_REAL_KEY = "KUNCI_ASLI_KAU_DI_SINI"; 

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Mesti guna POST bos' });
  }

  try {
    console.log("LOG: Mencuba hantar ke Runware...");
    
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([
        {
          "action": "imageInference",
          "apiKey": MY_REAL_KEY,
          "prompt": req.body.prompt || "A sunny beach",
          "modelId": "runware:100@1"
        }
      ])
    });

    console.log("LOG: Respon diterima dari Runware");
    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.log("LOG: CRASH!", error.message);
    return res.status(500).json({ 
      error: 'Crash kat Vercel bos!', 
      message: error.message 
    });
  }
}
