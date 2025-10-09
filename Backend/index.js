
import app from "./src/app.js";
import dotenv from 'dotenv'
import dpConnection from "./src/config/db.js";
dotenv.config(
    { path: './.env' }
)

dpConnection();


app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})


