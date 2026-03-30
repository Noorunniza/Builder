const router = require("express").Router()
const auth = require("../middleware/authMiddleware")
const {
    createWebsite,
    getWebsites,
    getWebsiteById,
    updateConfig,
    getWebsiteBySubdomain,
    publishWebsite,
    updateSettings,
    deleteWebsite
} = require("../controllers/websiteController")
const { createPublicOrder } = require("../controllers/orderController")
const { getAnalytics } = require("../controllers/analyticsController")
const categoryRoutes = require("./categoryRoutes")
const productRoutes = require("./productRoutes")
const orderRoutes = require("./orderRoutes")

// Public routes must come before /:id so Express does not treat "subdomain" as a website id.
router.post("/subdomain/:sub/orders", createPublicOrder)
router.get("/subdomain/:sub", getWebsiteBySubdomain)

router.use("/:id/categories", categoryRoutes)
router.use("/:id/products", productRoutes)
router.use("/:id/orders", orderRoutes)

router.post("/", auth, createWebsite)
router.get("/", auth, getWebsites)
router.get("/:id/analytics", auth, getAnalytics)
router.get("/:id", auth, getWebsiteById)
router.patch("/:id/config", auth, updateConfig)
router.patch("/:id/settings", auth, updateSettings)
router.put("/publish/:id", auth, publishWebsite)
router.delete("/:id", auth, deleteWebsite)

module.exports = router

