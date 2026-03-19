const Category = require("../models/Category")
const Website = require("../models/Website")

// Helper — ensure website belongs to user
const ownWebsite = async (websiteId, userId) => {
    const site = await Website.findOne({ _id: websiteId, owner: userId })
    return site
}

// GET /api/websites/:id/categories
exports.getCategories = async (req, res) => {
    try {
        const site = await ownWebsite(req.params.id, req.userId)
        if (!site) return res.status(404).json({ message: "Website not found" })

        const categories = await Category.find({ websiteId: site._id }).sort({ order: 1, createdAt: 1 })
        res.json({ categories })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

// POST /api/websites/:id/categories
exports.addCategory = async (req, res) => {
    try {
        const site = await ownWebsite(req.params.id, req.userId)
        if (!site) return res.status(404).json({ message: "Website not found" })

        const { name, image, subcategories } = req.body
        if (!name) return res.status(400).json({ message: "Name is required" })

        const count = await Category.countDocuments({ websiteId: site._id })
        const category = await Category.create({
            websiteId: site._id,
            name,
            image: image || "",
            subcategories: subcategories || [],
            order: count
        })

        res.status(201).json({ category })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

// PUT /api/websites/:id/categories/:catId
exports.updateCategory = async (req, res) => {
    try {
        const site = await ownWebsite(req.params.id, req.userId)
        if (!site) return res.status(404).json({ message: "Website not found" })

        const { name, image, subcategories } = req.body
        
        const updateData = { name, image: image || "" }
        if (subcategories !== undefined) {
            updateData.subcategories = subcategories
        }

        const category = await Category.findOneAndUpdate(
            { _id: req.params.catId, websiteId: site._id },
            { $set: updateData },
            { new: true }
        )

        if (!category) return res.status(404).json({ message: "Category not found" })
        res.json({ category })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

// DELETE /api/websites/:id/categories/:catId
exports.deleteCategory = async (req, res) => {
    try {
        const site = await ownWebsite(req.params.id, req.userId)
        if (!site) return res.status(404).json({ message: "Website not found" })

        await Category.findOneAndDelete({ _id: req.params.catId, websiteId: site._id })
        res.json({ message: "Category deleted" })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

// PATCH /api/websites/:id/categories/reorder
exports.reorderCategories = async (req, res) => {
    try {
        const site = await ownWebsite(req.params.id, req.userId)
        if (!site) return res.status(404).json({ message: "Website not found" })

        const { orderedIds } = req.body  // array of category _ids in desired order
        if (!Array.isArray(orderedIds)) return res.status(400).json({ message: "orderedIds must be an array" })

        const updates = orderedIds.map((catId, index) =>
            Category.findOneAndUpdate(
                { _id: catId, websiteId: site._id },
                { $set: { order: index } }
            )
        )
        await Promise.all(updates)

        res.json({ message: "Reordered" })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}
