export default function handler(req, res) {
  // Kita tak payah panggil Runware, kita cuma nak tengok Vercel hidup ke tak
  res.status(200).json({ 
    message: "HELLO BOS! Vercel saya sudah hidup!",
    status: "Success"
  });
}
