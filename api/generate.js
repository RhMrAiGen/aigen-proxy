export default async function handler(req, res) {
  const MY_KEY = process.env.RUNWARE_API_KEY;

  if (req.method !== 'POST') return res.status(405).json({ error: 'Guna POST' });

  try {
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{
        "action": "imageInference", // Test guna imej dulu sebab paling murah
        "apiKey": MY_KEY,
        "prompt": req.body.prompt || "A high quality portrait",
        "modelId": "runware:100@1"
      }])
    });

    const result = await response.json();

    // Kalau Runware balas sukses, hantar data tu
    // Kalau Runware balas error (sebab baki sikit), kita tetap hantar supaya app tak crash
    return res.status(200).json(result);

  } catch (err) {
    // Kalau Vercel sendiri yang bermasalah
    return res.status(200).json({ error: "Sangkut", message: err.message });
  }
}
