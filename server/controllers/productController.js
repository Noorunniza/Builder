const Product = require("../models/Product")
const Website = require("../models/Website")
const Category = require("../models/Category")

// Helper — ensure website belongs to user
const ownWebsite = async (websiteId, userId) => {
    console.log(`Checking ownership for site ${websiteId} and user ${userId}`);
    const site = await Website.findOne({ _id: websiteId, owner: userId })
    if (!site) console.log("Site check failed - site not found or not owned by user");
    return site
}

// GET /api/websites/:id/products
exports.getProducts = async (req, res) => {
    console.log(`GET products for website: ${req.params.id}`);
    try {
        const site = await ownWebsite(req.params.id, req.userId)
        if (!site) return res.status(404).json({ message: "Website not found" })

        // Populate category to get the category name along with the product
        const products = await Product.find({ websiteId: site._id })
            .populate("category", "name _id")
            .sort({ order: 1, createdAt: 1 })
            
        res.json({ products })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

// POST /api/websites/:id/products
exports.addProduct = async (req, res) => {
    console.log(`POST product for website: ${req.params.id}`);
    try {
        const site = await ownWebsite(req.params.id, req.userId)
        if (!site) return res.status(404).json({ message: "Website not found" })

        const { name, category, subcategory, price, offerPrice, image, status } = req.body
        
        if (!name || !price || !category) {
            return res.status(400).json({ message: "Name, price and category are required" })
        }

        // Verify category exists
        const catExists = await Category.findOne({ _id: category, websiteId: site._id })
        if (!catExists) return res.status(404).json({ message: "Category not found" })

        const count = await Product.countDocuments({ websiteId: site._id })
        
        let productData = {
            websiteId: site._id,
            name,
            category,
            subcategory: subcategory || "",
            price: Number(price),
            image: image || "",
            status: status || "shown",
            order: count
        }

        if (offerPrice) productData.offerPrice = Number(offerPrice)

        let product = await Product.create(productData)
        product = await product.populate("category", "name _id")

        res.status(201).json({ product })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

// PUT /api/websites/:id/products/:prodId
exports.updateProduct = async (req, res) => {
    try {
        const site = await ownWebsite(req.params.id, req.userId)
        if (!site) return res.status(404).json({ message: "Website not found" })

        const { name, category, subcategory, price, offerPrice, image, status } = req.body

        let updateData = { name, subcategory: subcategory || "", image: image || "", status: status || "shown" }
        
        if (price !== undefined) updateData.price = Number(price)
        if (offerPrice !== undefined) {
             updateData.offerPrice = offerPrice ? Number(offerPrice) : null
        }
        
        if (category) {
            const catExists = await Category.findOne({ _id: category, websiteId: site._id })
            if (!catExists) return res.status(404).json({ message: "Category not found" })
            updateData.category = category
        }

        const product = await Product.findOneAndUpdate(
            { _id: req.params.prodId, websiteId: site._id },
            { $set: updateData },
            { new: true }
        ).populate("category", "name _id")

        if (!product) return res.status(404).json({ message: "Product not found" })
        
        res.json({ product })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

// DELETE /api/websites/:id/products/:prodId
exports.deleteProduct = async (req, res) => {
    try {
        const site = await ownWebsite(req.params.id, req.userId)
        if (!site) return res.status(404).json({ message: "Website not found" })

        await Product.findOneAndDelete({ _id: req.params.prodId, websiteId: site._id })
        res.json({ message: "Product deleted" })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

// PATCH /api/websites/:id/products/reorder
exports.reorderProducts = async (req, res) => {
    try {
        const site = await ownWebsite(req.params.id, req.userId)
        if (!site) return res.status(404).json({ message: "Website not found" })

        const { orderedIds } = req.body
        if (!Array.isArray(orderedIds)) return res.status(400).json({ message: "orderedIds must be an array" })

        const updates = orderedIds.map((prodId, index) =>
            Product.findOneAndUpdate(
                { _id: prodId, websiteId: site._id },
                { $set: { order: index } }
            )
        )
        await Promise.all(updates)

        res.json({ message: "Reordered" })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}
