import express from 'express'
import  { foodPartnerLogin, foodPartnerLogout, foodPartnerRegister } from "../controllers/foodPartner.controller.js"

const foodPartnerRouter= express.Router();

foodPartnerRouter.post('/register',foodPartnerRegister);
foodPartnerRouter.post('/login',foodPartnerLogin);
foodPartnerRouter.post('/logout',foodPartnerLogout);

export default foodPartnerRouter;