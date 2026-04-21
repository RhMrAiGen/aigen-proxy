export default async function handler(req, res) {
  const apiKey = process.env.RUNWARE_API_KEY;

  // Cek kalau Vercel nampak kunci tu
  if (!apiKey) {
    return res.status(200).json({ error: "Key Tiada", message: "Sila isi RUNWARE_API_KEY di Vercel Settings dan REDEPLOY!" });
  }

  if (req.method !== 'POST') return res.status(405).send("Guna POST");

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{
        "action": "imageInference",
        "apiKey": apiKey,
        "prompt": body?.prompt || "A red cat",
        "modelId": "runware:100@1"
      }])
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(200).json({ error: "Crash", message: err.message });
  }
}
