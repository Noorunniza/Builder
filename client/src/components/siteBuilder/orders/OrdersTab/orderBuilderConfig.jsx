export const defaultOrderBuilderConfig = {
    orderSetup: {
        prefix: "ORD",
        defaultStatus: "pending",
        allowGuestCheckout: true,
        requirePhone: true,
        adminNote: "New orders appear instantly in the dashboard."
    },
    shipping: {
        enablePickup: true,
        pickupLabel: "Pick up",
        pickupFee: 0,
        enableDelivery: true,
        deliveryLabel: "Delivery",
        shippingFee: 99,
        freeShippingThreshold: 999,
        deliveryTimeline: "3-5 business days",
        policyNote: "Tracking details are shared after dispatch."
    },
    payments: {
        enableCod: true,
        enableCard: true,
        enableUpi: true,
        paymentNote: "Choose the payment method that works best for you."
    },
    checkout: {
        layoutColumns: "2",
        requireEmail: false,
        enableOrderNotes: true,
        buttonLabel: "Place Order",
        helperText: "Enter delivery details and confirm your order.",
        showName: true,
        showEmail: true,
        showPhone: true,
        showAddress: true
    },
    orderSummary: {
        successTitle: "Order Placed Successfully",
        successMessage: "Your order has been confirmed and saved successfully.",
        totalLabel: "Total Paid",
        continueLabel: "Continue Shopping"
    }
}

export const builderSections = {
    "Order Setup": {
        key: "orderSetup",
        title: "Order flow settings",
        description: "Control how order IDs, defaults, and checkout access behave for the store.",
        fields: [
            { key: "prefix", label: "Order Prefix", type: "text" },
            { key: "defaultStatus", label: "Default Status", type: "select", options: ["pending", "confirmed", "shipped"] },
            { key: "allowGuestCheckout", label: "Allow guest checkout", type: "boolean" },
            { key: "requirePhone", label: "Require phone number", type: "boolean" },
            { key: "adminNote", label: "Admin Note", type: "textarea" }
        ]
    },
    "Shipping": {
        key: "shipping",
        title: "Shipping settings",
        description: "Manage the shipping methods, fees, and delivery promise shown at checkout.",
        fields: [
            { key: "enablePickup", label: "Enable Pickup", type: "boolean" },
            { key: "pickupLabel", label: "Pickup Label", type: "text" },
            { key: "pickupFee", label: "Pickup Fee", type: "number" },
            { key: "enableDelivery", label: "Enable Delivery", type: "boolean" },
            { key: "deliveryLabel", label: "Delivery Label", type: "text" },
            { key: "shippingFee", label: "Shipping Fee", type: "number" },
            { key: "freeShippingThreshold", label: "Free Shipping Above", type: "number" },
            { key: "deliveryTimeline", label: "Delivery Timeline", type: "text" },
            { key: "policyNote", label: "Shipping Note", type: "textarea" }
        ]
    },
    "Payments": {
        key: "payments",
        title: "Payment options",
        description: "Choose which payment methods should be available at checkout.",
        fields: [
            { key: "enableCod", label: "Enable Cash on Delivery", type: "boolean" },
            { key: "enableCard", label: "Enable Card Payment", type: "boolean" },
            { key: "enableUpi", label: "Enable UPI", type: "boolean" },
            { key: "paymentNote", label: "Payment Help Text", type: "textarea" }
        ]
    },
    "Checkout": {
        key: "checkout",
        title: "Checkout experience",
        description: "Adjust required fields and copy shown to the customer at checkout.",
        fields: [
            { key: "layoutColumns", label: "Checkout Columns", type: "select", options: ["1", "2"] },
            { key: "requireEmail", label: "Require email address", type: "boolean" },
            { key: "enableOrderNotes", label: "Enable order notes", type: "boolean" },
            { key: "buttonLabel", label: "Checkout Button Label", type: "text" },
            { key: "helperText", label: "Checkout Helper Text", type: "textarea" }
        ]
    },
    "Order Summary": {
        key: "orderSummary",
        title: "Success page content",
        description: "Customize the order-confirmation message buyers see after checkout.",
        fields: [
            { key: "successTitle", label: "Success Title", type: "text" },
            { key: "successMessage", label: "Success Message", type: "textarea" },
            { key: "totalLabel", label: "Total Label", type: "text" },
            { key: "continueLabel", label: "Continue Button Label", type: "text" }
        ]
    }
}

const getLegacyShipping = (checkout = {}) => {
    const legacy = {}

    if (typeof checkout.enablePickup === "boolean") legacy.enablePickup = checkout.enablePickup
    if (typeof checkout.pickupLabel === "string") legacy.pickupLabel = checkout.pickupLabel
    if (checkout.pickupFee !== undefined) legacy.pickupFee = checkout.pickupFee
    if (typeof checkout.enableDelivery === "boolean") legacy.enableDelivery = checkout.enableDelivery
    if (typeof checkout.deliveryLabel === "string") legacy.deliveryLabel = checkout.deliveryLabel
    if (checkout.deliveryFee !== undefined) legacy.shippingFee = checkout.deliveryFee

    return legacy
}

export const createOrderBuilderConfig = (source = {}) => {
    const checkoutSource = source.checkout || {}
    const { enablePickup, pickupLabel, pickupFee, enableDelivery, deliveryLabel, deliveryFee, ...cleanCheckout } = checkoutSource

    return {
        orderSetup: { ...defaultOrderBuilderConfig.orderSetup, ...(source.orderSetup || {}) },
        shipping: { ...defaultOrderBuilderConfig.shipping, ...getLegacyShipping(checkoutSource), ...(source.shipping || {}) },
        payments: { ...defaultOrderBuilderConfig.payments, ...(source.payments || {}) },
        checkout: { ...defaultOrderBuilderConfig.checkout, ...cleanCheckout },
        orderSummary: { ...defaultOrderBuilderConfig.orderSummary, ...(source.orderSummary || {}) }
    }
}
