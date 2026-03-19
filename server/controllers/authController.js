const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {
  OAuth2Client
} = require("google-auth-library")

const client =
  new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
  )


// ================= REGISTER =================

exports.register = async (req, res) => {

  try {

    const { email, password } = req.body

    const exist =
      await User.findOne({ email })

    if (exist) {

      return res.status(400)
        .json({ message: "User exists" })

    }

    const hashed =
      await bcrypt.hash(password, 10)

    await User.create({

      email,

      password: hashed,

      provider: "local"

    })


    res.json({

      message: "User created"

    })

  } catch (err) {

    res.status(500).json(err)

  }

}




// ================= LOGIN =================

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body

    const user =
      await User.findOne({ email })

    if (!user)

      return res.status(400)
        .json({

          message: "User not found"

        })


    // GOOGLE USER PASSWORD BLOCK

    if (user.provider === "google") {

      return res.status(400).json({

        message:
          "Use Google Login"

      })

    }


    const match =
      await bcrypt.compare(

        password,
        user.password

      )

    if (!match)

      return res.status(401)
        .json({

          message: "Wrong password"

        })


    const token = jwt.sign(

      { id: user._id },

      process.env.JWT_SECRET,

      { expiresIn: "7d" }

    )


    res.json({

      token

    })


  } catch (err) {

    res.status(500).json(err)

  }

}

exports.googleAuth =
  async (req, res) => {

    try {

      const { token } =
        req.body


      // VERIFY TOKEN FROM GOOGLE

      const ticket =
        await client.verifyIdToken({

          idToken: token,

          audience:
            process.env.GOOGLE_CLIENT_ID

        })


      const payload =
        ticket.getPayload()


      const {

        email,
        sub

      } = payload



      let user =
        await User.findOne({ email })


      // CREATE ACCOUNT IF NEW

      if (!user) {

        user =
          await User.create({

            email,

            googleId: sub,

            provider: "google",

            plan: "free"

          })

      }


      // LOGIN EXIST USER

      const jwtToken =
        jwt.sign(

          { id: user._id },

          process.env.JWT_SECRET,

          { expiresIn: "7d" }

        )


      res.json({

        token: jwtToken

      })


    } catch (err) {

      console.log(err)

      res.status(401).json({

        message: "Google auth failed"

      })

    }

  }