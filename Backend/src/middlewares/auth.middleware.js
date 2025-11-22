import FoodPartner from "../models/foodPartner.model.js";
import jwt from 'jsonwebtoken';
export const authFoodPartner= async (req,res,next)=>{
    try {
        const token = req.cookies.token ;
        if(!token){
            return res.status(401).json({message : "Unauthorized , no token"})
        }   
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const foodPartner = await FoodPartner.findById(decoded._id);
        if(!foodPartner){
            return res.status(401).json({message : "Unauthorized , no food partner found"})
        }   
        req.foodPartner = foodPartner;
        next();
    } catch (error) {
        return res.status(401).json({message : "Unauthorized , invalid token"})
    }
}
