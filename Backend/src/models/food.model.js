import mongoose from 'mongoose';
import foodparter from './foodPartner.model.js'

const foodSchema= new mongoose.Schema({
    nams : {
        type : String,
        required : true,
    },
    video : {
        type :String,
        required : true,
    },
    description : {
        type : String,
    },
    foodPartner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'foodpartner'
    }
},{timestamps:true});

const foodModel = mongoose.model('food',foodSchema);

export default foodModel;