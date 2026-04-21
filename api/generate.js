export default async function handler(req, res) {
  // Ambil key dari Vercel
  const apiKey = process.env.RUNWARE_API_KEY;

  if (!apiKey) {
    return res.status(200).json({ error: "Key Tiada", message: "Cek Settings Vercel bos!" });
  }

  // Benarkan request masuk
  if (req.method !== 'POST') return res.status(405).send("Guna POST");

  try {
    // Ambil prompt dari fon
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const userPrompt = body?.prompt || "A high quality image";

    // Request ke Runware
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
    
    // Kalau Runware bagi 401, kita hantar mesej ni supaya kau tahu key tu problem
    if (data.error || (data[0] && data[0].error)) {
       return res.status(200).json({ 
         status: "Runware Tolak", 
         info: "Key mungkin salah atau tak aktif lagi." 
       });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(200).json({ error: "Sangkut", message: error.message });
  }
}
