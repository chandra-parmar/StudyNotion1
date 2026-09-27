const mongoose = require('mongoose')

//payment schema 
const paymentSchema = new mongoose.Schema(
{
    userID:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
     orderId:{
        type:String,
        required:true
     },
     paymentId:{
        type:String,
        
     },
     status:{
        type:String,
        required:true
     },
    
     amount:{
        type:Number,
        required:true
     },
     currency:{
        type:String,
        required:true
     },
     recipt:{
        type:String,
     }

},{ timestamps:true})

module.exports = new mongoose.model("Payment",paymentSchema)
