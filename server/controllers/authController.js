const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { OAuth2Client } = require("google-auth-library")
const User = require("../models/User")

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

function signToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({ email, password: hashedPassword, provider: "local" })

        res.json({ message: "User created" })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        if (user.provider === "google") {
            return res.status(400).json({ message: "Use Google Login" })
        }

        const passwordMatches = await bcrypt.compare(password, user.password)
        if (!passwordMatches) {
            return res.status(401).json({ message: "Wrong password" })
        }

        res.json({ token: signToken(user._id) })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.googleAuth = async (req, res) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const { email, sub } = ticket.getPayload()
        let user = await User.findOne({ email })

        if (!user) {
            user = await User.create({
                email,
                googleId: sub,
                provider: "google",
                plan: "free"
            })
        }

        res.json({ token: signToken(user._id) })
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: "Google auth failed" })
    }
}
