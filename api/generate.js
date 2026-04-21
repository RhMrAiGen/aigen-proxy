export default async function handler(req, res) {
  const MY_KEY = process.env.RUNWARE_API_KEY; 

  if (req.method !== 'POST') return res.status(405).json({ error: 'Guna POST bos' });

  const { type, prompt, inputImage, voiceId } = req.body;

  // Sediakan template task untuk Runware
  let task = {
    "apiKey": MY_KEY,
    "prompt": prompt || "A high quality product review"
  };

  // Tentukan 'action' berdasarkan apa yang app kau minta
  if (type === 'tts') {
    task.action = "textToSpeech";
    task.voiceId = voiceId || "charles"; // Senarai suara ada kat dashboard Runware
  } else if (type === 'img2vid') {
    task.action = "imageToVideo";
    task.inputImage = inputImage; // URL imej yang mahu digerakkan
  } else if (type === 'extend') {
    task.action = "videoControlNet"; // Untuk video extender
    task.videoAssetId = req.body.videoAssetId;
  } else {
    task.action = "imageInference";
    task.modelId = "runware:100@1";
  }

  try {
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([task])
    });

    const data = await response.json();
    
    // Kita hantar jawapan Runware terus ke app kau
    return res.status(200).json(data);

  } catch (error) {
    return res.status(200).json({ 
      error: "Vercel Connection Error", 
      message: error.message 
    });
  }
}
