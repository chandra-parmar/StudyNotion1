
const Course = require('../models/Course')
const uploadImageToCloudinary = require('../utils/imageUploader')
const Category = require('../models/Category')
const User = require('../models/User')
const Section = require('../models/Section')
const SubSection = require('../models/SubSection')
const CourseProgress = require('../models/CourseProgress')



//creat course
const createCourse = async(req,res)=>{
    try{

        //fetch data and file
        const {courseName,courseDescription,whatYouWillLearn,price,category} = req.body

        //thumbnail
        const thumbnail = req.files.thumbnailImage

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail)
        {
            return  res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //check for instructor to push instructor id in course
        const userId = req.user?.id 

        const instructorDetails = await User.findById(userId)
        console.log(instructorDetails)

        if(!instructorDetails)
        {
            return res.status(401).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        //check for category 
        const categoryDetails = await Category.findById(category)

         if(!categoryDetails)
        {
            return res.status(401).json({
                success:false,
                message:"category details not found"
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)
        
        //entry for newcourse
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url

        })

        //update instructor user add 
        await User.findByIdAndUpdate(instructorDetails._id,
                                     {
                                        $push:{
                                            courses:newCourse._id
                                        }
                                     },{returnDocument: 'after'}
        )

       //update category schema
       await Category.findByIdAndUpdate(categoryDetails._id,
                                       {$push:{courses:newCourse._id}},
                                        {returnDocument: 'after'}
       )

       return res.status(200).json({
        success:true,
        message:"course created successfully",
        data:newCourse
       })

    }catch(err)
    {
      console.error(err)
      return res.status(500).json({
        success:false,
        message:"Failed to create course"
      })
    }
}

//get all courses

const showAllCourses = async(req,res)=>{
    try{
   
        const allCourses = await Course.find({},{courseName:true,price:true,thumbnail:true,instructor:true,ratingAndReviews:true,studentsEnrolled:true})
                                            .populate("instructor").exec()

        return res.status(200).json({
            success:true
            ,data:allCourses
        })
    }catch(err)
    {
        console.error(err)
      return res.status(500).json({
        success:false,
        message:"cannot fetch course data"
      })  
    }
}

// get instructor course those are created
const getInstructorCourses = async(req,res)=>{
     try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

//get full details of course
const getFullCourseDetails= async(req,res)=>{

    
    try {
    const { courseId } = req.params
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    // Helper function to convert total seconds to the duration format
    function convertSecondsToDuration(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = Math.floor((totalSeconds % 3600) % 60)
      
        if (hours > 0) {
          return `${hours}h ${minutes}m`
        } else if (minutes > 0) {
          return `${minutes}m ${seconds}s`
        } else {
          return `${seconds}s`
        }
      }

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// get course details by id 
const getCourseDetails = async(req,res)=>{
    try{
       const {courseId} = req.params

       const courseDetails = await Course.findById(courseId)
                                      .populate(
                                        {
                                            path:"instructor",
                                            populate:{
                                                path:"additionalDetails"
                                            }
                                        }
                                      ).populate("category")
                                      .populate({
                                        path:"courseContent",
                                        populate:{
                                            path:"subSection"
                                        }
                                      }).exec()

                console.log(courseDetails)                      

            if(!courseDetails)
                {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the course with ${courseId}`,
                        
                    })
                } 
                
              //return res
              return res.status(200).json({
                success:true,
                message:"course details fetched successfully",
                data:courseDetails
              })  

                                      
      
    }catch(error)
    {
     console.log(error)
     return res.status(500).json({
        success:false,
        message:error.message
     })
    }
}


//edit course api 
const editCourse = async( req,res)=>{

    try{
        const { courseId }= req.body
        const updates = req.body
        const course = await Course.findById(courseId)

        if(!course)
        {
            return res.status(404).json({
                error:"Course not found"
            })
        }

        //if thumbnail image is found update it
        if(req.files)
        {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME 
            )
            course.thumbnail = thumbnailImage.secure_url
        }

        //update only the fields that are present in the request body
       for (const key in updates) {
            if (Object.prototype.hasOwnProperty.call(updates, key)) {

                // Don't update courseId itself
                if (key === "courseId") {
                    continue
                }

                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
   }

        await course.save()

        const updatedCourse = await Course.findOne({
            _id : courseId
        }).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            }
        }).populate("category")
        .populate("ratingAndReviews").
        populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec()

        res.json({
            success:true,
            message:"Course updated successfully",
            data: updatedCourse
        })

    }catch(error)
    {
        console.error(error)
         res.status(500).json({
            success:false,
            message:"Internal server error"
         })
    }
}

// delete course api
const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body

        // Find the course
        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        // Remove course from category
        await Category.findByIdAndUpdate(
            course.category,
            {
                $pull: {
                    courses: courseId
                }
            }
        )

        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled

        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull: {
                    courses: courseId
                }
            })
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent

        for (const sectionId of courseSections) {

            // Find section
            const section = await Section.findById(sectionId)

            if (section) {

                // Delete sub-sections
                const subSections = section.subSection

                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete section
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}

module.exports ={
    createCourse,
    showAllCourses,
    getCourseDetails,
    editCourse,
    getInstructorCourses
    ,getFullCourseDetails,
    deleteCourse

}