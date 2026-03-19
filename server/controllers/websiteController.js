const Website = require("../models/Website")
const Config = require("../models/Config")
const Category = require("../models/Category")
const Product = require("../models/Product")

// Helper: turn a name into a URL-safe subdomain slug
function nameToSubdomain(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")   // strip special chars
        .replace(/\s+/g, "-")            // spaces → dashes
        .replace(/-+/g, "-")             // collapse multiple dashes
}

// Helper: ensure the subdomain is unique, appending a number if needed
async function uniqueSubdomain(base, excludeId = null) {
    let candidate = base
    let counter = 1
    while (true) {
        const query = { subdomain: candidate }
        if (excludeId) query._id = { $ne: excludeId }
        const existing = await Website.findOne(query)
        if (!existing) return candidate
        candidate = `${base}-${counter}`
        counter++
    }
}

exports.createWebsite = async (req, res) => {

    try {

        const { name, type, industry } = req.body

        if (!name || !type) {
            return res.status(400).json({ message: "Name and type are required" })
        }

        // Auto-generate a unique subdomain from the website name
        const baseSlug = nameToSubdomain(name)
        const subdomain = await uniqueSubdomain(baseSlug)

        const website = await Website.create({
            name,
            type,
            industry: industry || null,
            owner: req.userId,
            subdomain,
            published: false
        })

        // Also create an empty config document alongside it
        await Config.create({
            websiteId: website._id,
            data: {}
        })

        // Return a shape the frontend expects (with embedded config) for first load
        const websiteResponse = website.toObject()
        websiteResponse.config = {}

        res.status(201).json({ message: "Website created", website: websiteResponse })

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }

}

exports.getWebsites = async (req, res) => {

    try {

        const websites = await Website.find({ owner: req.userId }).sort({ createdAt: -1 })

        res.json({ websites })

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }

}

exports.getWebsiteById = async (req, res) => {

    try {

        let websiteObj = await Website.findOne({ _id: req.params.id, owner: req.userId }).lean()

        if (!websiteObj) {
            return res.status(404).json({ message: "Website not found" })
        }

        // ── Backfill subdomain for existing websites that were created before this field existed ──
        if (!websiteObj.subdomain) {
            const baseSlug = nameToSubdomain(websiteObj.name)
            const subdomain = await uniqueSubdomain(baseSlug, websiteObj._id)
            await Website.updateOne({ _id: websiteObj._id }, { $set: { subdomain } })
            websiteObj.subdomain = subdomain
        }

        const [configDoc, categories, products] = await Promise.all([
            Config.findOne({ websiteId: websiteObj._id }).lean(),
            Category.find({ websiteId: websiteObj._id }).sort({ order: 1, createdAt: 1 }).lean(),
            Product.find({ websiteId: websiteObj._id }).populate("category", "name _id").sort({ order: 1, createdAt: 1 }).lean()
        ])

        // Merge config data and inject categories and products so every preview has them on load
        const formattedProducts = products.map(p => ({
            ...p,
            id: p._id,
            categoryName: p.category ? p.category.name : "Unknown",
            categoryId: p.category ? p.category._id : null
        }))
        
        websiteObj.config = configDoc 
            ? { ...configDoc.data, categories, products: formattedProducts } 
            : { categories, products: formattedProducts }

        res.json({ website: websiteObj })

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }

}

exports.updateConfig = async (req, res) => {

    try {

        // First, ensure the website belongs to this user before updating the config
        const website = await Website.findOne({ _id: req.params.id, owner: req.userId })
        
        if (!website) {
            return res.status(404).json({ message: "Website not found" })
        }

        // Upsert the config document so it creates one if it's an old website missing a config doc
        const configDoc = await Config.findOneAndUpdate(
            { websiteId: website._id },
            { $set: { data: req.body } },
            { new: true, upsert: true }
        )

        // Return the combined response just like the frontend expects
        const websiteResponse = website.toObject()
        websiteResponse.config = configDoc.data

        res.json({ message: "Config saved", website: websiteResponse })

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }

}

// ── Public endpoint — no auth required ──
// Returns full site data (config + categories + products) only if published
exports.getWebsiteBySubdomain = async (req, res) => {

    try {

        const websiteObj = await Website.findOne({
            subdomain: req.params.sub.toLowerCase()
        }).lean()

        if (!websiteObj) {
            return res.status(404).json({ message: "Website not found" })
        }

        if (!websiteObj.published) {
            return res.status(403).json({ message: "This website is not live yet" })
        }

        const [configDoc, categories, products] = await Promise.all([
            Config.findOne({ websiteId: websiteObj._id }).lean(),
            Category.find({ websiteId: websiteObj._id }).sort({ order: 1, createdAt: 1 }).lean(),
            Product.find({ websiteId: websiteObj._id }).populate("category", "name _id").sort({ order: 1, createdAt: 1 }).lean()
        ])

        const formattedProducts = products.map(p => ({
            ...p,
            id: p._id,
            categoryName: p.category ? p.category.name : "Unknown",
            categoryId: p.category ? p.category._id : null
        }))

        websiteObj.config = configDoc
            ? { ...configDoc.data, categories, products: formattedProducts }
            : { categories, products: formattedProducts }

        res.json({ website: websiteObj })

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }

}

// ── Auth-protected publish/unpublish toggle ──
exports.publishWebsite = async (req, res) => {

    try {

        const website = await Website.findOne({ _id: req.params.id, owner: req.userId })

        if (!website) {
            return res.status(404).json({ message: "Website not found" })
        }

        // Toggle between published and draft
        website.published = !website.published
        await website.save()

        res.json({
            message: website.published ? "Website is now live 🎉" : "Website set to draft",
            published: website.published
        })

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }

}

