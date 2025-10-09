import express from "express"; 

const app =express();
// middlewares 

app.use(express.json())





import userRouter from "./routes/user.route.js";




app.use('/api/users',userRouter)





app.get('/',(req,res)=>{
    res.send("server is running");
})

export default app;