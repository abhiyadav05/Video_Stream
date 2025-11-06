import express from 'express'
import foodPartnerLogin from "../controllers/foodPartner.controller.js"

const foodPartnerRouter= express.Router();

foodPartnerRouter.post('/register',foodPartnerLogin);

export default foodPartnerRouter;