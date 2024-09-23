const {
  userService
  } = require("../services");
  const path = require("path");
  const bcrypt = require("bcrypt");
  const moment = require("moment");
  const jwt = require("jsonwebtoken");
  const jwtSecrectKey = "cdccsvavsvfssbtybnjnuki";
  const fs = require("fs");
const { User } = require("../models");
  const refreshSecret = process.env.JWT_REFRESH_SECRET_KEY;
  const accessSecret = process.env.JWT_SECRET_KEY;
  
  /* -------------------------- REGISTER/CREATE user ------------------------- */
  
  const registerUser = async (req, res) => {
    const reqBody = req.body;
   
    const existingUser = await userService.findUserByEmail(reqBody.email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }
    const hashPassword = await bcrypt.hash(reqBody.password, 8);
    let option = {
      email: reqBody.email,
      // role: reqBody.role,
      exp: moment().add(5, "minute").unix(),
    };
    const token = await jwt.sign(option, jwtSecrectKey);
  
    /**   generate Refresh Token */
    const generateRefreshToken = (option) => {
      return jwt.sign(option, refreshSecret);
    };
    const refreshToken = generateRefreshToken(option);
    const filter = {
      ...reqBody,
      email: reqBody.email,
      // role: reqBody.role,
      password: hashPassword,
      token,
    };
  
    // const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_PROFILE_PATH;
    const data = await userService.createUser(filter, reqBody);
    res.status(200).json({
      success: true,
      data: data,
      token: token,
      refreshToken: refreshToken,
      // baseUrl:baseUrl,
    });
  };
  
  // /* -------------------------- LOGIN/SIGNIN user -------------------------- */
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw Error("user not not found");
  
      const successPassword = await bcrypt.compare(password, user.password);
      if (!successPassword) throw Error("Incorrect password");
  
      const payload = {
        _id: user._id,
        email: user.email,
        };
  
      const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1m",
      });
  
      user.token = token;
      const refreshToken = await jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET_KEY
      );
      const output = await user.save();
      const baseUrl =
        req.protocol +
        "://" +
        req.get("host") +
        process.env.BASE_URL_PROFILE_PATH;
  
      res.status(200).json({
        data: output,
        token: token,
        refreshToken: refreshToken,
        baseUrl: baseUrl,
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  

  module.exports = {
    registerUser,
    login,
  };