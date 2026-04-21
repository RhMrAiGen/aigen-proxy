export default async function handler(req, res) {
  const MY_REAL_KEY = "ERekFEky4sKbRvJFzgqRC8q3kT45z2iP"; 

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Guna POST bos' });
  }

  try {
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([
        {
          "action": "imageInference", // Kita test gambar dulu sebab kredit $0.05 sikit sangat
          "apiKey": MY_REAL_KEY,
          "prompt": req.body.prompt || "A red cat",
          "modelId": "runware:100@1",
          "numberResults": 1
        }
      ])
    });

    const data = await response.json();
    
    // Kalau Runware balas ada error (contoh: baki tak cukup), kita hantar ke fon
    if (data.error) {
      return res.status(200).json({ 
        message: "Runware kata: " + data.error.message 
      });
    }

    return res.status(200).json({ 
      message: "Berjaya! Runware sedang proses.",
      data: data 
    });

  } catch (error) {
    return res.status(500).json({ message: "Error: " + error.message });
  }
}
