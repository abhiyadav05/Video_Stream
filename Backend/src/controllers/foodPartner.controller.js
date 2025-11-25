import FoodPartner from "../models/foodPartner.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
export const foodPartnerRegister = async(req,res) =>{
    try {
        const {fullName,email,password}=req.body;
        const foodPartnerExist= await FoodPartner.findOne({email});
        if(foodPartnerExist) {
            return res.status(400).json({
                success : false,
                message : "Food Partner already exists"
            });
        }
        if([fullName,email,password].some((field)=>field?.trim()==="")){
                res.status(400).json({
                    success : false,
                    message : "all field should not empty.."
                })
        };
    
    const hashPassword=await bcrypt.hash(password,10);
    const foodpartner= await FoodPartner.create({
        fullName,
        password : hashPassword,
        email
    })
    jwt.sign(
          {id : foodpartner._id},
          process.env.JWT_SECRET_KEY
        )

    res.status(200).json({
      success: true,
      message: "FoodPartner Created",
      user : {
        id : foodpartner._id,
        fullName : foodpartner.fullName,
        email : foodpartner.email
      }
    });

    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const foodPartnerLogin = async(req,res)=>{
    try {
        const {email,password}= req.body;
        const foodPartnerExist= await FoodPartner.findOne({email});
        if(!foodPartnerExist){
            return res.status(400).json({
                success : false,
                message : "Food Partner does not exists"
            });
        }
        const isPasswordValid= await bcrypt.compare(password,foodPartnerExist.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success : false,
                message : "Invalid credentials"
            });
        }
        const token= jwt.sign({
            id : foodPartnerExist._id,
        },process.env.JWT_SECRET_KEY
        );
        res.cookie("token",token);
        res.status(200).json({
            success : true,
            message : "Food Partner logged in successfully",
            foodPartner : {
                id : foodPartnerExist._id,
                fullName : foodPartnerExist.fullName,
                email : foodPartnerExist.email
            }
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const foodPartnerLogout = async(req,res)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({
            success : true,
            message : "Food Partner logged out successfully"
        })
    }   
    catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}
