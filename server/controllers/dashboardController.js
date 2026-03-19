const User = require("../models/User")
const Website = require("../models/Website")

exports.getDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const websites = await Website.find({ owner: req.userId }).sort({ createdAt: -1 })

        res.json({
            message: "Dashboard data fetched",
            user: {
                email: user.email,
                plan: user.plan
            },
            websites
        })
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message })
    }
}
