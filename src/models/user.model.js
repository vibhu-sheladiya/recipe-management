const mongoose = require("mongoose");

const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },password:{
        type :String,
    },
    token: {
      type: String,
    },
    refreshToken: { type: String },
    is_active:{
        type:Boolean,
        default:true,
    },
  },

  { timestamps: true }
);

const User=mongoose.model("users",userScheme);
module.exports= User;

