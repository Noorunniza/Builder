const router = require("express").Router({ mergeParams: true })
const auth = require("../middleware/authMiddleware")
const {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    reorderProducts
} = require("../controllers/productController")

router.get("/", auth, getProducts)
router.post("/", auth, addProduct)
router.patch("/reorder", auth, reorderProducts)
router.put("/:prodId", auth, updateProduct)
router.delete("/:prodId", auth, deleteProduct)

module.exports = router
