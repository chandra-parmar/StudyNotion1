const mongoose= require('mongoose')

const ratingAndReviewSchema = new mongoose.Schema(
    {
     rating:{
        type:Number
    
     },
     review:{
        type:String
     },
     user:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
     }],
     course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    }
})


module.exports = mongoose.model('RatingAndReview',ratingAndReviewSchema)