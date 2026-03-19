const router = require("express").Router()
const auth = require("../middleware/authMiddleware")
const { createWebsite, getWebsites, getWebsiteById, updateConfig, getWebsiteBySubdomain, publishWebsite } = require("../controllers/websiteController")
const categoryRoutes = require("./categoryRoutes")
const productRoutes = require("./productRoutes")

router.use("/:id/categories", categoryRoutes)
router.use("/:id/products", productRoutes)

// Public route — MUST come before /:id so Express doesn't treat "subdomain" as an ObjectId
router.get("/subdomain/:sub", getWebsiteBySubdomain)

router.post("/", auth, createWebsite)
router.get("/", auth, getWebsites)
router.get("/:id", auth, getWebsiteById)
router.patch("/:id/config", auth, updateConfig)
router.put("/publish/:id", auth, publishWebsite)

module.exports = router

