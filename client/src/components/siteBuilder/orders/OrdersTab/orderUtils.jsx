const toNumber = (value) => Number(value) || 0

const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(toNumber(amount))

const formatDateTime = (value) => {
    if (!value) return "-"
    return new Date(value).toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })
}

const startOfDay = (date) => {
    const value = new Date(date)
    value.setHours(0, 0, 0, 0)
    return value
}

const getAgeBucket = (value) => {
    if (!value) return "older"
    const created = startOfDay(value)
    const today = startOfDay(new Date())
    const diffDays = Math.round((today - created) / 86400000)
    if (diffDays <= 0) return "today"
    if (diffDays === 1) return "yesterday"
    return "older"
}

const matchesRange = (value, range) => {
    if (!value || range === "All Time") return true
    const created = startOfDay(value)
    const today = startOfDay(new Date())
    const diffDays = Math.round((today - created) / 86400000)

    if (range === "Today") return diffDays === 0
    if (range === "Yesterday") return diffDays === 1
    if (range === "Last 7 Days") return diffDays >= 0 && diffDays < 7
    return true
}

const getOrderKey = (order) => order._id || order.orderId

const formatStatusLabel = (value) => {
    if (!value) return "-"
    return value.charAt(0).toUpperCase() + value.slice(1)
}

export {
    toNumber,
    formatINR,
    formatDateTime,
    getAgeBucket,
    matchesRange,
    getOrderKey,
    formatStatusLabel
}
