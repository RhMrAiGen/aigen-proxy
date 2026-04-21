export default async function handler(req, res) {
  // Ganti KUNCI_ASLI_KAU dengan kod panjang dari dashboard Runware
  const MY_REAL_KEY = "KUNCI_ASLI_KAU_DI_SINI"; 

  if (req.method === 'POST') {
    try {
      const response = await fetch('https://api.runware.ai/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([
          {
            "action": "imageInference",
            "apiKey": MY_REAL_KEY,
            "prompt": req.body.prompt || "A cute cat",
            "modelId": "runware:100@1"
          }
        ])
      });

      const data = await response.json();
      
      // Kita hantar apa saja jawapan dari Runware terus ke fon kau
      return res.status(200).json(data);
      
    } catch (error) {
      // Kalau Vercel sendiri yang crash, dia akan beritahu kenapa
      return res.status(500).json({ error: 'Vercel Crash!', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Guna POST saja bos' });
  }
}
