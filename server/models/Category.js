const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({

    websiteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Website",
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

    subcategories: {
        type: [{ type: String, trim: true }],
        default: []
    },

    order: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

module.exports = mongoose.model("Category", CategorySchema)
