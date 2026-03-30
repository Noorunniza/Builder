const Config = require("../models/Config")
const Website = require("../models/Website")
const {
    createWebsiteForOwner,
    deleteWebsiteResources,
    ensureWebsiteSubdomain,
    loadWebsiteConfig,
    saveWebsiteSettings,
    syncBannerFields
} = require("../services/websiteService")

exports.createWebsite = async (req, res) => {
    try {
        const { name, type, industry } = req.body
        if (!name || !type) return res.status(400).json({ message: "Name and type are required" })
        const website = await createWebsiteForOwner({ name, type, industry, owner: req.userId })
        res.status(201).json({ message: "Website created", website })
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
        const found = await Website.findOne({ _id: req.params.id, owner: req.userId }).lean()
        if (!found) return res.status(404).json({ message: "Website not found" })
        const website = await ensureWebsiteSubdomain(found)
        website.config = await loadWebsiteConfig(website._id)
        res.json({ website })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

exports.updateConfig = async (req, res) => {
    try {
        const website = await Website.findOne({ _id: req.params.id, owner: req.userId })
        if (!website) return res.status(404).json({ message: "Website not found" })
        if (req.body?.banner) await syncBannerFields(website, req.body.banner)
        const configDoc = await Config.findOneAndUpdate({ websiteId: website._id }, { $set: { data: req.body } }, { new: true, upsert: true })
        res.json({ message: "Config saved", website: { ...website.toObject(), config: configDoc.data } })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

exports.getWebsiteBySubdomain = async (req, res) => {
    try {
        const website = await Website.findOne({ subdomain: req.params.sub.toLowerCase() }).lean()
        if (!website) return res.status(404).json({ message: "Website not found" })
        if (!website.published) return res.status(403).json({ message: "This website is not live yet" })
        website.config = await loadWebsiteConfig(website._id)
        res.json({ website })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

exports.publishWebsite = async (req, res) => {
    try {
        const website = await Website.findOne({ _id: req.params.id, owner: req.userId })
        if (!website) return res.status(404).json({ message: "Website not found" })
        website.published = !website.published
        await website.save()
        res.json({ message: website.published ? "Website is now live" : "Website set to draft", published: website.published })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

exports.updateSettings = async (req, res) => {
    try {
        const website = await Website.findOne({ _id: req.params.id, owner: req.userId })
        if (!website) return res.status(404).json({ message: "Website not found" })
        const updatedWebsite = await saveWebsiteSettings(website, req.body)
        res.json({ message: "Settings saved", website: updatedWebsite })
    } catch (err) {
        const status = err.message === "That subdomain is already taken" ? 409 : err.message.includes("invalid") || err.message.includes("empty") ? 400 : 500
        res.status(status).json({ message: status === 500 ? "Server error" : err.message, ...(status === 500 ? { error: err.message } : {}) })
    }
}

exports.deleteWebsite = async (req, res) => {
    try {
        const website = await Website.findOne({ _id: req.params.id, owner: req.userId })
        if (!website) return res.status(404).json({ message: "Website not found" })
        await deleteWebsiteResources(website._id)
        res.json({ message: "Website deleted" })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}
