require("dotenv").config()
const path = require("path")
const fs = require("fs")
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")

const app = express()

connectDB()

app.use(cors())
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads")
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir)

// Serve uploaded images statically
app.use("/uploads", express.static(uploadsDir))

app.use("/api/auth", authRoutes)

const dashboardRoutes = require("./routes/dashboardRoutes")
app.use("/api/dashboard", dashboardRoutes)


const websiteRoutes = require("./routes/websiteRoutes")
app.use("/api/websites", websiteRoutes)





const uploadRoutes = require("./routes/uploadRoutes")
app.use("/api/upload", uploadRoutes)

app.listen(5000, () => console.log("Server running on 5000"))