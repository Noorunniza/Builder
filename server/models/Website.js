const mongoose = require("mongoose")

const WebsiteSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    type: {
        type: String,
        enum: ["online-store", "portfolio", "blog", "restaurant", "booking", "business"],
        required: true
    },

    industry: {
        type: String,
        default: null
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    subdomain: {
        type: String,
        unique: true,
        sparse: true,   // allows multiple docs with no subdomain (old websites)
        lowercase: true,
        trim: true
    },

    published: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model("Website", WebsiteSchema)
