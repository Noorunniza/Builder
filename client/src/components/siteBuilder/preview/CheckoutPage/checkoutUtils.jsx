export const toNumber = value => Number(value) || 0

export const formatINR = amount =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(toNumber(amount))

export const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
}

export function getShippingOptions(shippingSettings = {}, subtotal) {
    const freeThreshold = toNumber(shippingSettings.freeShippingThreshold)
    const deliveryFee = freeThreshold > 0 && subtotal >= freeThreshold ? 0 : toNumber(shippingSettings.shippingFee || 99)
    const options = []

    if (shippingSettings.enablePickup) {
        options.push({
            code: "pickup",
            label: shippingSettings.pickupLabel || "Pick up",
            fee: toNumber(shippingSettings.pickupFee),
            hint: "Collect from your store"
        })
    }

    if (shippingSettings.enableDelivery ?? true) {
        options.push({
            code: "delivery",
            label: shippingSettings.deliveryLabel || "Delivery",
            fee: deliveryFee,
            hint: deliveryFee === 0 && freeThreshold > 0 && subtotal >= freeThreshold
                ? `Free above ${formatINR(freeThreshold)}`
                : shippingSettings.deliveryTimeline || "3-5 business days"
        })
    }

    return options.length
        ? options
        : [{ code: "delivery", label: "Delivery", fee: deliveryFee, hint: shippingSettings.deliveryTimeline || "3-5 business days" }]
}

export function getPaymentOptions(paymentSettings = {}) {
    const options = [
        paymentSettings.enableCod ? { value: "cod", label: "Cash on Delivery" } : null,
        paymentSettings.enableCard ? { value: "card", label: "Card Payment" } : null,
        paymentSettings.enableUpi ? { value: "upi", label: "UPI" } : null
    ].filter(Boolean)

    return options.length ? options : [{ value: "cod", label: "Cash on Delivery" }]
}
