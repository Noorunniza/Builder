const Category = require("../models/Category")
const Config = require("../models/Config")
const Order = require("../models/Order")
const Product = require("../models/Product")
const Website = require("../models/Website")

function nameToSubdomain(name) {
    return name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
}

async function uniqueSubdomain(base, excludeId = null) {
    let candidate = base
    let counter = 1

    while (true) {
        const query = { subdomain: candidate }
        if (excludeId) query._id = { $ne: excludeId }
        const existing = await Website.findOne(query)
        if (!existing) return candidate
        candidate = `${base}-${counter}`
        counter += 1
    }
}

function formatProducts(products) {
    return products.map(product => ({
        ...product,
        id: product._id,
        categoryName: product.category ? product.category.name : "Unknown",
        categoryId: product.category ? product.category._id : null
    }))
}

async function loadWebsiteConfig(websiteId) {
    const [configDoc, categories, products] = await Promise.all([
        Config.findOne({ websiteId }).lean(),
        Category.find({ websiteId }).sort({ order: 1, createdAt: 1 }).lean(),
        Product.find({ websiteId }).populate("category", "name _id").sort({ order: 1, createdAt: 1 }).lean()
    ])

    return configDoc
        ? { ...configDoc.data, categories, products: formatProducts(products) }
        : { categories, products: formatProducts(products) }
}

async function ensureWebsiteSubdomain(websiteObj) {
    if (websiteObj.subdomain) return websiteObj
    const subdomain = await uniqueSubdomain(nameToSubdomain(websiteObj.name), websiteObj._id)
    await Website.updateOne({ _id: websiteObj._id }, { $set: { subdomain } })
    return { ...websiteObj, subdomain }
}

async function createWebsiteForOwner({ name, type, industry, owner }) {
    const subdomain = await uniqueSubdomain(nameToSubdomain(name))
    const website = await Website.create({ name, type, industry: industry || null, owner, subdomain, published: false })
    await Config.create({ websiteId: website._id, data: {} })
    return { ...website.toObject(), config: {} }
}

async function syncBannerFields(website, banner = {}) {
    let updated = false
    if (banner.storeName && banner.storeName !== website.name) {
        website.name = banner.storeName
        updated = true
    }
    if (banner.tagline !== undefined && banner.tagline !== website.industry) {
        website.industry = banner.tagline
        updated = true
    }
    if (updated) await website.save()
}

async function saveWebsiteSettings(website, { name, subdomain }) {
    if (name !== undefined) {
        const trimmed = String(name).trim()
        if (!trimmed) throw new Error("Store name cannot be empty")
        website.name = trimmed
    }

    if (subdomain !== undefined) {
        const slug = String(subdomain).toLowerCase().trim().replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "")
        if (!slug) throw new Error("Subdomain is invalid")
        const conflict = await Website.findOne({ subdomain: slug, _id: { $ne: website._id } })
        if (conflict) throw new Error("That subdomain is already taken")
        website.subdomain = slug
    }

    await website.save()
    return website.toObject()
}

async function deleteWebsiteResources(websiteId) {
    await Promise.all([
        Config.deleteOne({ websiteId }),
        Category.deleteMany({ websiteId }),
        Product.deleteMany({ websiteId }),
        Order.deleteMany({ websiteId }),
        Website.deleteOne({ _id: websiteId })
    ])
}

module.exports = {
    createWebsiteForOwner,
    deleteWebsiteResources,
    ensureWebsiteSubdomain,
    loadWebsiteConfig,
    saveWebsiteSettings,
    syncBannerFields
}
