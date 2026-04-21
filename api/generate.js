export default function handler(req, res) {
  // 1. TAMPAL API KEY ASLI KAU KAT SINI
  const MY_KEY = "ERekFEky4sKbRvJFzgqRC8q3kT45z2iP"; 

  if (req.method !== 'POST') {
    return res.status(405).send("Guna POST bos");
  }

  // Kita buat fetch guna cara manual supaya Vercel tak pening
  fetch('https://api.runware.ai/v1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([
      {
        "action": "imageInference",
        "apiKey": MY_KEY,
        "prompt": req.body.prompt || "A cat",
        "modelId": "runware:100@1"
      }
    ])
  })
  .then(response => response.json())
  .then(data => {
    // Kalau sampai sini, maksudnya BERJAYA tembus ke Runware
    res.status(200).json(data);
  })
  .catch(err => {
    // Kalau ada error teknikal, kita hantar mesej ni
    res.status(200).json({ 
      error: "Sangkut kat jambatan", 
      pesan: err.message 
    });
  });
}
