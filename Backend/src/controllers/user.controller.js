import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
export const userRegister = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log(req.body)
    const userExits=await User.findOne({email});
    if(userExits){
        return (res.status(400).json({
            success : false,
            message : "User already exits"
        }))
    }

    
    if (
        [fullName, email, password].some((field) => field?.trim() === "")
    ) {
        res.status(400).json({
            success : false ,
            message : "all field should not empty fill it .."
        })
    }
    const hashPassword=await bcrypt.hash(password,10);
    const user=await User.create({
        fullName,
        password:hashPassword,
        email,
    })

    res.status(200).json({
        success: true,
        message : "User Creater"
    })

  }
    catch (error) {
    res.status(500).json({
        success : false,
        message: error.message
     });
    }
};

