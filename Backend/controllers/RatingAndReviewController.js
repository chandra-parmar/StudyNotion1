
const Course = require('../models/Course')
const RatingAndReview = require('../models/RatingAndReview')


//create rating 
const createRating = async(req,res)=>{
    try{

        //get user id 
        const userId = req.user.id
        //fetch data from  req body
        const { rating , review , courseId} = req.body
        //check user is enrolled or not 
        const userEnrolled = await Course.findOne({_id:courseId,studentsEnrolled:{$elemMatch:{$eq:userId}}})
         
        if(!userEnrolled)
        {
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in course"
            })
        }

        //only one review allowed check already reviewd or not
         const alreadyReviewed = await RatingAndReview.findOne({
                                                         user:userId,
                                                         course:courseId
         })

         if(alreadyReviewed)
         {
            return res.status(403).json({
                success:false,
                message:"already reviewed"
            })
         }
        // create rating and review
        const newRatingReview = await RatingAndReview.create({
                                      review:review,
                                      rating:rating,
                                      course:courseId,
                                      user:userId
        })
        //update course with this rating review
       const updatedCourseDetails =  await Course.findByIdAndUpdate(courseId,
                                {
                                    $push:{
                                        ratingAndReviews:newRatingReview._id
                                    }   
                                },{new:true})
        //return response

        return res.status(200).json({
            success:true,
            message:"rating review created successfully",
            data:newRatingReview
        })



    }catch(err)
    {
       console.error(err)
       return res.status(500).json({
        message:"Internal server error",
        success:false,
        error:err
        
       })
    }
}

//getaveragerating
const getAverageRating = async(req,res)=>{
    try{
        //get course id 
        const courseId = req.body.courseId

        //calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)

                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{ $avg:"$rating"}
                }
            }
        ])

        //return rating

        if(result.length>0)
        {
           return res.status(200).json({
            success:true,
             averageRating : result[0].averageRating
           }) 
        }

        // if no rating exist 
        return res.status(200).json({
            success:true,
            message:"Average rating 0 no rating avaible",
            averageRating:0
        })
    }catch(err)
    {
     console.error(err)
       return res.status(500).json({
        message:"Internal server error",
        success:false,
    
       })
    }
}

//getallrating
const getAllRating = async(req,res)=>{
    try{
       
        const allReviews = await RatingAndReview.find({})
                                 .sort({rating:"desc"})
                                 .populate({
                                    path:"user",
                                    select:"firstName lastName email image"
                                 })
                                 .populate({
                                    path:"course",
                                    select:"courseName"
                                 }).exec()
          
        return res.status(200).json({
            success:true,
            message:"All review fetched successfully",
            data:allReviews
        })



    }catch(err)
    {
      console.error(err)
      return res.status(500).json({
        success:false,
        message:"internal server error"
      })
    }
}

module.exports ={
    createRating,
    getAllRating,
    getAverageRating
}


