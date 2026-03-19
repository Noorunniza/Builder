const mongoose = require("mongoose")

const ConfigSchema = new mongoose.Schema({
    websiteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Website",
        required: true,
        unique: true
    },
    data: {
        type: Object,
        default: {}
    }
}, { timestamps: true })

module.exports = mongoose.model("Config", ConfigSchema)
