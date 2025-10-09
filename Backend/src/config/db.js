import mongoose from "mongoose";

const dpConnection= async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGO_DB_URI}/VideoStream`)
       console.log("db connected succesfully");
    } catch (error) {
        console.log("db connection failed")
    }
}

export default dpConnection;