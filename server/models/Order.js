const mongoose = require("mongoose")

const OrderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: ""
    },
    categoryName: {
        type: String,
        default: "General"
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0
    },
    lineTotal: {
        type: Number,
        required: true,
        min: 0
    }
}, { _id: false })

const OrderSchema = new mongoose.Schema({
    websiteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Website",
        required: true,
        index: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    customer: {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, trim: true, default: "" },
        email: { type: String, trim: true, lowercase: true, default: "" },
        phone: { type: String, required: true, trim: true }
    },
    shippingAddress: {
        address: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        pincode: { type: String, required: true, trim: true },
        country: { type: String, trim: true, default: "India" }
    },
    items: {
        type: [OrderItemSchema],
        default: [],
        validate: {
            validator(value) {
                return Array.isArray(value) && value.length > 0
            },
            message: "At least one order item is required"
        }
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0
    },
    shipping: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        default: "INR",
        trim: true,
        uppercase: true
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "card", "upi"],
        default: "cod"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending"
    },
    orderStatus: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    source: {
        type: String,
        default: "public-site",
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Order", OrderSchema)
