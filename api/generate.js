export default async function handler(req, res) {
  // Ambil key rahsia yang kau sudah save di Vercel tadi (ERekFEky...)
  const apiKey = process.env.RUNWARE_API_KEY;

  if (!apiKey) {
    return res.status(200).json({ error: "Config Error", message: "Key tiada di Vercel!" });
  }

  if (req.method !== 'POST') return res.status(405).send("Guna POST bos");

  try {
    // 1. Parse data dari app (prompt, type, dll)
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const type = body?.type || 'image'; 

    // 2. Bina task ikut format RASMI Runware
    let task = {
      "apiKey": apiKey,
      "prompt": body?.prompt || "A high quality review"
    };

    if (type === 'tts') {
      task.action = "textToSpeech";
      task.voiceId = body?.voiceId || "charles"; // Suara Runware, bukan ElevenLabs!
    } else if (type === 'img2vid') {
      task.action = "imageToVideo";
      task.inputImage = body?.inputImage;
    } else {
      task.action = "imageInference";
      task.modelId = "runware:100@1";
    }

    // 3. Hantar ke URL Runware yang betul (.ai bukan .com)
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([task]) // Runware wajibkan dalam Array []
    });

    const data = await response.json();

    // Hantar hasil terus ke telefon
    return res.status(200).json(data);

  } catch (error) {
    return res.status(200).json({ error: "Vercel Crash", message: error.message });
  }
}
