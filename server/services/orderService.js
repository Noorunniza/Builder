const Config = require("../models/Config")
const Order = require("../models/Order")
const Product = require("../models/Product")
const Website = require("../models/Website")

const ORDER_STATUSES = new Set(["pending", "confirmed", "shipped", "delivered", "cancelled"])
const defaultShippingConfig = {
    enablePickup: true,
    pickupLabel: "Pick up",
    pickupFee: 0,
    enableDelivery: true,
    deliveryLabel: "Delivery",
    shippingFee: 99,
    freeShippingThreshold: 999,
    deliveryTimeline: "3-5 business days"
}

const toNumber = value => Number.isFinite(Number(value)) ? Number(value) : 0
const ownWebsite = (websiteId, userId) => Website.findOne({ _id: websiteId, owner: userId })
const getCategoryName = product => !product?.category ? "General" : typeof product.category === "object" ? product.category.name || "General" : product.categoryName || "General"

function getShippingConfig(configData = {}) {
    const checkout = configData?.orderBuilder?.checkout || {}
    const shipping = configData?.orderBuilder?.shipping || {}
    return {
        ...defaultShippingConfig,
        ...(typeof checkout.enablePickup === "boolean" ? { enablePickup: checkout.enablePickup } : {}),
        ...(typeof checkout.pickupLabel === "string" ? { pickupLabel: checkout.pickupLabel } : {}),
        ...(checkout.pickupFee !== undefined ? { pickupFee: checkout.pickupFee } : {}),
        ...(typeof checkout.enableDelivery === "boolean" ? { enableDelivery: checkout.enableDelivery } : {}),
        ...(typeof checkout.deliveryLabel === "string" ? { deliveryLabel: checkout.deliveryLabel } : {}),
        ...(checkout.deliveryFee !== undefined ? { shippingFee: checkout.deliveryFee } : {}),
        ...shipping
    }
}

function getShippingOptions(shippingConfig, subtotal) {
    const freeShippingThreshold = toNumber(shippingConfig.freeShippingThreshold)
    const deliveryFee = freeShippingThreshold > 0 && subtotal >= freeShippingThreshold ? 0 : toNumber(shippingConfig.shippingFee)
    const options = []
    if (shippingConfig.enablePickup) options.push({ code: "pickup", fee: toNumber(shippingConfig.pickupFee) })
    if (shippingConfig.enableDelivery) options.push({ code: "delivery", fee: deliveryFee })
    return options.length ? options : [{ code: "delivery", fee: deliveryFee }]
}

async function generateOrderId() {
    while (true) {
        const candidate = `ORD-${Date.now().toString().slice(-8)}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
        const existing = await Order.findOne({ orderId: candidate }).select("_id")
        if (!existing) return candidate
    }
}

function formatOrderResponse(orderDoc) {
    const order = typeof orderDoc.toObject === "function" ? orderDoc.toObject() : orderDoc
    return {
        ...order,
        customerName: `${order.customer?.firstName || ""} ${order.customer?.lastName || ""}`.trim(),
        customerPhone: order.customer?.phone || "",
        itemCount: order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0,
        itemSummary: order.items?.map(item => item.name).join(", ") || ""
    }
}

async function buildPublicOrder({ subdomain, body }) {
    const website = await Website.findOne({ subdomain: subdomain.toLowerCase(), published: true })
    if (!website) throw new Error("Website not found")

    const { customer = {}, shippingAddress = {}, items = [], paymentMethod = "cod", shippingMethod = "" } = body
    if (!customer.firstName || !customer.phone) throw new Error("Customer first name and phone are required")
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.state || !shippingAddress.pincode) throw new Error("Complete shipping address is required")
    if (!Array.isArray(items) || items.length === 0) throw new Error("At least one item is required")

    const normalizedItems = items.map(item => ({ productId: item?.productId || item?.id, quantity: Math.max(1, parseInt(item?.quantity, 10) || 1) })).filter(item => item.productId)
    if (!normalizedItems.length) throw new Error("No valid items were provided")

    const products = await Product.find({ _id: { $in: normalizedItems.map(item => item.productId) }, websiteId: website._id, status: "shown" }).populate("category", "name")
    if (products.length !== normalizedItems.length) throw new Error("One or more products are unavailable")

    const productMap = new Map(products.map(product => [String(product._id), product]))
    const orderItems = normalizedItems.map(item => {
        const product = productMap.get(String(item.productId))
        const unitPrice = toNumber(product.offerPrice || product.price)
        return { productId: product._id, name: product.name, image: product.image || "", categoryName: getCategoryName(product), quantity: item.quantity, unitPrice, lineTotal: unitPrice * item.quantity }
    })

    const subtotal = orderItems.reduce((sum, item) => sum + item.lineTotal, 0)
    const configDoc = await Config.findOne({ websiteId: website._id }).lean()
    const shippingOptions = getShippingOptions(getShippingConfig(configDoc?.data || {}), subtotal)
    const selectedShipping = shippingOptions.find(option => option.code === String(shippingMethod || "").toLowerCase().trim()) || shippingOptions[0]
    const shipping = subtotal > 0 ? toNumber(selectedShipping?.fee) : 0

    return Order.create({
        websiteId: website._id,
        ownerId: website.owner,
        orderId: await generateOrderId(),
        customer: { firstName: customer.firstName, lastName: customer.lastName || "", email: customer.email || "", phone: customer.phone },
        shippingAddress: { address: shippingAddress.address, city: shippingAddress.city, state: shippingAddress.state, pincode: shippingAddress.pincode, country: shippingAddress.country || "India" },
        items: orderItems,
        subtotal,
        shipping,
        total: subtotal + shipping,
        paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
        orderStatus: "pending",
        source: "public-site"
    })
}

module.exports = {
    ORDER_STATUSES,
    buildPublicOrder,
    formatOrderResponse,
    ownWebsite
}
