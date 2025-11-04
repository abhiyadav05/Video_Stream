import express from "express"; 
import cookieParser from 'cookie-parser'
const app =express();
// middlewares 

app.use(express.json());
app.use(cookieParser());





import userRouter from "./routes/user.route.js";




app.use('/api/users',userRouter)





app.get('/',(req,res)=>{
    res.send("server is running");
})

export default app;