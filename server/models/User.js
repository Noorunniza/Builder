const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    default: null
  },

  provider: {
    type: String,
    enum: ["local","google"],
    default: "local"
  },

  googleId: {
    type: String,
    default: null
  },

  plan: {
    type: String,
    default: "free"
  }

},
{ timestamps:true })

module.exports =
mongoose.model("User",UserSchema)