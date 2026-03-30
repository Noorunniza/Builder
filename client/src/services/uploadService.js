import api from "./api"

/**
 * Upload a single image file to the server.
 * Returns the public URL string (e.g. http://localhost:5000/uploads/xxxx.jpg)
 */
export const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append("image", file)

  const res = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })

  return res.data.url
}
