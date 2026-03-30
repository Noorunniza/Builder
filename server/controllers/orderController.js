const Order = require("../models/Order")
const { ORDER_STATUSES, buildPublicOrder, formatOrderResponse, ownWebsite } = require("../services/orderService")

exports.createPublicOrder = async (req, res) => {
    try {
        const order = await buildPublicOrder({ subdomain: req.params.sub, body: req.body })
        res.status(201).json({ message: "Order placed successfully", order: formatOrderResponse(order) })
    } catch (err) {
        const status = ["Website not found"].includes(err.message) ? 404 : err.message.includes("required") || err.message.includes("provided") || err.message.includes("unavailable") ? 400 : 500
        res.status(status).json(status === 500 ? { message: "Server error", error: err.message } : { message: err.message })
    }
}

exports.getWebsiteOrders = async (req, res) => {
    try {
        const site = await ownWebsite(req.params.id, req.userId)
        if (!site) return res.status(404).json({ message: "Website not found" })
        const orders = await Order.find({ websiteId: site._id }).sort({ createdAt: -1 }).lean()
        res.json({ orders: orders.map(formatOrderResponse) })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

exports.updateWebsiteOrdersStatus = async (req, res) => {
    try {
        const site = await ownWebsite(req.params.id, req.userId)
        if (!site) return res.status(404).json({ message: "Website not found" })

        const orderIds = Array.isArray(req.body.orderIds) ? [...new Set(req.body.orderIds.filter(Boolean))] : []
        const status = String(req.body.status || "").toLowerCase().trim()
        if (!orderIds.length) return res.status(400).json({ message: "Select at least one order" })
        if (!ORDER_STATUSES.has(status)) return res.status(400).json({ message: "Invalid order status" })

        const result = await Order.updateMany({ websiteId: site._id, _id: { $in: orderIds } }, { $set: { orderStatus: status } })
        if (!result.matchedCount) return res.status(404).json({ message: "Selected orders were not found" })

        const updatedOrders = await Order.find({ websiteId: site._id, _id: { $in: orderIds } }).lean()
        res.json({ message: "Order status updated successfully", updatedCount: result.modifiedCount, orders: updatedOrders.map(formatOrderResponse) })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}
