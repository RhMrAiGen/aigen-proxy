export default async function handler(req, res) {
  // Ambil kunci dari sistem rahsia Vercel
  const apiKey = process.env.RUNWARE_API_KEY;

  // Jika kunci tiada, beritahu app tanpa crash 500
  if (!apiKey) {
    return res.status(200).json({ 
      error: "Konfigurasi Masalah", 
      message: "Kunci RUNWARE_API_KEY tidak dijumpai di Vercel Settings!" 
    });
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Guna POST bos' });

  const { type, prompt, inputImage, voiceId } = req.body;

  // Sediakan tugasan All-in-One untuk Runware
  let task = {
    "apiKey": apiKey,
    "prompt": prompt || "A high quality review video"
  };

  // Logik penukaran fungsi (Suara, Video, atau Imej)
  if (type === 'tts') {
    task.action = "textToSpeech";
    task.voiceId = voiceId || "charles";
  } else if (type === 'img2vid') {
    task.action = "imageToVideo";
    task.inputImage = inputImage;
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
    
    // Jika Runware balas ralat (seperti baki $0.05 tak cukup), hantar ke app
    if (data.error) {
      return res.status(200).json({ error: "Runware Reject", message: data.error.message });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(200).json({ error: "Vercel Error", message: error.message });
  }
}
