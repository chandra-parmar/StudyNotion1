const Profile = require('../models/Profile')
const User = require('../models/User')
const Course = require('../models/Course') 
const uploadImageToCloudinary = require('../utils/imageUploader')
require('dotenv').config()


const updateProfile = async(req,res)=>{
    try{
          const {userId} = req.params
          const {gender , contactNumber} = req.body

          //validation
          if(!userId)
          {
            return res.status(400).json({
                success:false,
                message:"User id required"
            })
          }

          //validation for req body
           if(!gender || ! contactNumber)
          {
            return res.status(400).json({
                success:false,
                message:"User data required"
            })
          }

          //update in db 
        // const profileDetails =  await Profile.findById(userId)
        //console.log(profileDetails)

        const userDetails = await User.findById(userId)
        const profileId = userDetails.additionalDetails
        const profileDetails = await Profile.findById(profileId)

        console.log(profileDetails)

        //update profile
        profileDetails.gender = gender
        profileDetails.contactNumber = contactNumber

        await profileDetails.save()

        //retunr res
        return res.status(200).json({
            success:true,
            message:"Profile details updated successfully"
            ,data:profileDetails
        })

    }catch(err)
    {
     console.error(err)
     return res.status(500).json({
        success:false,
        message:"internal sever error"
     })
    }
}


//delete account
const deleteAccount = async(req,res)=>{
    try{
        
        const { id } = req.params
        console.log(id)
        if(!id)
        {
            return res.status(400).json({
                success:false,
                message:"please provide id "
            })
        }

        //delete profile (additional details)
        const userDetails = await User.findById(id)

        if(!userDetails)
        {
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        //unenroll user from all enrolled courses
        for(let courseId of userDetails.courses){
            await Course.findByIdAndUpdate(courseId, {$pull: {studentsEnrolled: id}})
        }

        //clear user's courses
        await User.findByIdAndUpdate(id, {$set: {courses: []}})

        //delete profile
        await Profile.findByIdAndDelete(userDetails.additionalDetails)
         
        

        //delete user
        await User.findByIdAndDelete(id)

        return res.status(200).json({
            success:true,
            message:"Account deleted successfully"
        })

        



    }catch(err)
    {
        console.error(err)
        return res.status(500).json({
            success:false,
            message:"Failed to delete account"
        })
    }
}

//get all user details
const getUserDetails = async(req,res)=>{
    try{
        const { id } = req.params

        if(!id)
        {
            return res.status(400).json({
                success:false,
                message:"Id not provided"
            })
        }

        const userDetails = await User.findById(id).populate("additionalDetails").exec()

        return res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            userDetails
            
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


//update display pictcure 
const updateDisplayPicture = async(req,res)=>{
    try{

        //get user id from params and image file 
        const { id } = req.params

        const displayPicture = req.files.displayPicture

        //upload to cloudinary
        const image = await uploadImageToCloudinary(displayPicture,process.env.FOLDER_NAME)

        console.log(image)

        //update image url in db
        const updatedProfile = await User.findByIdAndUpdate(
                                       {_id:id},
                                       {image:image.secure_url},
                                       {new:true}
        )

        //return res
        return res.status(200).json({
            success:true,
            message:"Image updated successfully",
            data:updatedProfile
        })

    }catch(err)
    {
      console.error(err)
      return res.status(500).json({
        success:true,
        message:"internal server error"
      })
    }
}
// user enrolled coures
const getEnrolledCourses = async(req,res)=>{
    try{
        
        const userId = req.user.id
        const userDetails = await User.findOne({
            _id : userId
        })
        .populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        })
        .exec()

        // course progress percentage to do 
        // userDetails = userDetails.toObject()
        // let SubsectionLength =0
        // for(let i= 0; i< userDetails.courses.length ;i++)
        // {
        //     let totalDurationInSeconds =0
        //     SubsectionLength =0
        //     for(let j=0; j<userDetails.courses[i].courseContent.length;j++)
        //     {
        //         totalDurationInSeconds += userDetails.courses[i].courseContent[j].
        //         subSection.reduce((acc,))
        //     }
        // }

        if(!userDetails)
        {
            return res.status(400).json({
                success:false,
                message: `Could not find user with id ${userDetails}`
            })

        }

        return res.status(200).json({
            success:true,
            data: userDetails.courses
        })
    } catch(error)
    {
        
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

//instructor dashboard 
const instructorDashboard = async(req,res)=>{

    const instructorId = req.user.id

    try{

        const courseDetails = await Course.find({instructor:instructorId})
        
        const courseData = courseDetails.map((course)=>{
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price

            const courseDataWithStats ={
                _id:course._id,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
                 
            }
            return courseDataWithStats
            
        })

        return res.status(200).json({
            success:true,
            courses:courseData
        })

    }catch(err)
    {
        console.error(err)
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:err
        })
    }
}


module.exports ={
    updateProfile,
    deleteAccount,
    getUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
    instructorDashboard
}
