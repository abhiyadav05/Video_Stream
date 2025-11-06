import FoodPartner from "../models/foodPartner.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
export const foodPartnerLogin = async(req,res) =>{
    try {
        const {fullName,email,password}=req.body;
        const foodPartnerExist= await foodPartner.findOne({email});
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