import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'


export const userRegister = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log(req.body);
    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(400).json({
        success: false,
        message: "User already exits",
      });
    }

    if ([fullName, email, password].some((field) => field?.trim() === "")) {
      res.status(400).json({
        success: false,
        message: "all field should not empty fill it ..",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      password: hashPassword,
      email,
    });
    

    // generate the token 

    jwt.sign(
      {id : user._id},
      process.env.JWT_SECRET_KEY
    )

    res.status(200).json({
      success: true,
      message: "User Created",
      user : {
        id : user._id,
        fullName : user.fullName,
        email : user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "All field should be filled",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token=jwt.sign({id : user._id},
      process.env.JWT_SECRET_KEY
    );
    
    res.cookie("token",token);
    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userLogout= async (req,res)=>{
  req.clearCookie("token");
  res.status(201).json({
    success : true,
    message : "User logout successfully"
  })
}
