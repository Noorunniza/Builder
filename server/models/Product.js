const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({

    websiteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Website",
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    subcategory: {
        type: String,
        default: ""
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true
    },

    offerPrice: {
        type: Number
    },

    image: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: ["shown", "hidden", "coming_soon", "sold_out"],
        default: "shown"
    },

    order: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

module.exports = mongoose.model("Product", ProductSchema)
