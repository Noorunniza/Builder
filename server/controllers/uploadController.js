const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" })
  }
  const baseUrl = req.protocol + "://" + req.get("host")
  res.json({
    url: `${baseUrl}/uploads/${req.file.filename}`
  })
}

module.exports = { uploadImage }
