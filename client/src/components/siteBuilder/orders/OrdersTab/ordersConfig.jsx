import {
    Ban,
    CheckCircle2,
    Clock3,
    PackageCheck,
    ShoppingCart,
    SlidersHorizontal,
    Truck,
    CreditCard,
    ReceiptText,
    ClipboardList
} from "lucide-react"

export const mainTabs = [
    { key: "Orders", section: "orders", icon: ShoppingCart },
    { key: "Order Setup", section: "orderSetup", icon: SlidersHorizontal },
    { key: "Shipping", section: "shipping", icon: Truck },
    { key: "Payments", section: "payments", icon: CreditCard },
    { key: "Checkout", section: "checkout", icon: ReceiptText },
    { key: "Order Summary", section: "orderSummary", icon: ClipboardList }
]

export const statusTabs = ["All", "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"]

export const rangeOptions = ["Today", "Yesterday", "Last 7 Days", "All Time"]

export const statusOptions = [
    {
        value: "pending",
        label: "Pending",
        description: "Use when the order is received and waiting for fulfilment.",
        tone: "yellow",
        icon: Clock3
    },
    {
        value: "confirmed",
        label: "Confirmed",
        description: "Use when the order has been reviewed and confirmed.",
        tone: "blue",
        icon: CheckCircle2
    },
    {
        value: "shipped",
        label: "Shipped",
        description: "Use when the package has been dispatched and is on the way.",
        tone: "blue",
        icon: Truck
    },
    {
        value: "delivered",
        label: "Delivered",
        description: "Use when the order has been successfully delivered.",
        tone: "green",
        icon: PackageCheck
    },
    {
        value: "cancelled",
        label: "Cancelled",
        description: "Use when the order should no longer be processed.",
        tone: "red",
        icon: Ban
    }
]

export const paymentTone = {
    paid: "green",
    pending: "yellow",
    failed: "red",
    refunded: "red"
}

export const orderTone = {
    delivered: "green",
    shipped: "green",
    confirmed: "blue",
    pending: "yellow",
    cancelled: "red"
}
