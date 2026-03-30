const router = require("express").Router({ mergeParams: true })
const auth = require("../middleware/authMiddleware")
const {
    getWebsiteOrders,
    updateWebsiteOrdersStatus
} = require("../controllers/orderController")

router.get("/", auth, getWebsiteOrders)
router.patch("/status", auth, updateWebsiteOrdersStatus)

module.exports = router
