const Order = require("../models/Order")
const Product = require("../models/Product")
const Website = require("../models/Website")

const toNum = (v) => Number(v) || 0

const startOfDay = (d) => {
    const dt = new Date(d)
    dt.setHours(0, 0, 0, 0)
    return dt
}

const isoDay = (d) => d.toISOString().slice(0, 10)

const ownWebsite = (websiteId, userId) =>
    Website.findOne({ _id: websiteId, owner: userId })

// Build a map of { "YYYY-MM-DD" -> { revenue, orders } } for the last N days
const buildDailyTrend = (orders, days) => {
    const map = {}
    const today = startOfDay(new Date())
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(d.getDate() - i)
        map[isoDay(d)] = { date: isoDay(d), revenue: 0, orders: 0 }
    }
    for (const o of orders) {
        const key = isoDay(startOfDay(o.createdAt))
        if (map[key]) {
            map[key].revenue += toNum(o.total)
            map[key].orders += 1
        }
    }
    return Object.values(map)
}

exports.getAnalytics = async (req, res) => {
    try {
        const site = await ownWebsite(req.params.id, req.userId)
        if (!site) return res.status(404).json({ message: "Website not found" })

        // fetch all orders for this site
        const orders = await Order.find({ websiteId: site._id }).lean()

        // fetch products
        const products = await Product.find({ websiteId: site._id }).lean()

        const totalOrders = orders.length
        const totalRevenue = orders.reduce((s, o) => s + toNum(o.total), 0)
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

        // today / this week / this month boundaries
        const now = new Date()
        const todayStart = startOfDay(now)
        const weekStart = new Date(todayStart)
        weekStart.setDate(weekStart.getDate() - 6)
        const monthStart = new Date(todayStart)
        monthStart.setDate(1)

        const ordersToday = orders.filter(o => new Date(o.createdAt) >= todayStart).length
        const revenueToday = orders.filter(o => new Date(o.createdAt) >= todayStart).reduce((s, o) => s + toNum(o.total), 0)
        const ordersThisWeek = orders.filter(o => new Date(o.createdAt) >= weekStart).length
        const revenueThisWeek = orders.filter(o => new Date(o.createdAt) >= weekStart).reduce((s, o) => s + toNum(o.total), 0)
        const ordersThisMonth = orders.filter(o => new Date(o.createdAt) >= monthStart).length
        const revenueThisMonth = orders.filter(o => new Date(o.createdAt) >= monthStart).reduce((s, o) => s + toNum(o.total), 0)

        // order status distribution
        const statusCounts = {}
        for (const o of orders) {
            statusCounts[o.orderStatus] = (statusCounts[o.orderStatus] || 0) + 1
        }

        // payment method distribution
        const paymentCounts = {}
        for (const o of orders) {
            paymentCounts[o.paymentMethod] = (paymentCounts[o.paymentMethod] || 0) + 1
        }

        // top products by revenue
        const productRevMap = {}
        for (const o of orders) {
            for (const item of (o.items || [])) {
                const key = item.name
                if (!productRevMap[key]) {
                    productRevMap[key] = { name: item.name, image: item.image || "", revenue: 0, quantity: 0, orders: 0 }
                }
                productRevMap[key].revenue += toNum(item.lineTotal)
                productRevMap[key].quantity += toNum(item.quantity)
                productRevMap[key].orders += 1
            }
        }
        const topProducts = Object.values(productRevMap)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 8)

        // 30-day daily trend
        const dailyTrend = buildDailyTrend(orders, 30)

        // 7-day trend (last 7 days)
        const weeklyTrend = buildDailyTrend(orders, 7)

        // pending orders
        const pendingOrders = orders.filter(o => o.orderStatus === "pending").length

        res.json({
            summary: {
                totalOrders,
                totalRevenue,
                avgOrderValue,
                pendingOrders,
                totalProducts: products.length,
                ordersToday,
                revenueToday,
                ordersThisWeek,
                revenueThisWeek,
                ordersThisMonth,
                revenueThisMonth
            },
            statusDistribution: statusCounts,
            paymentDistribution: paymentCounts,
            topProducts,
            dailyTrend,
            weeklyTrend
        })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}
