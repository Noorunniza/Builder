const router = require("express").Router({ mergeParams: true })
const auth = require("../middleware/authMiddleware")
const {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    reorderCategories
} = require("../controllers/categoryController")

router.get("/", auth, getCategories)
router.post("/", auth, addCategory)
router.patch("/reorder", auth, reorderCategories)
router.put("/:catId", auth, updateCategory)
router.delete("/:catId", auth, deleteCategory)

module.exports = router
