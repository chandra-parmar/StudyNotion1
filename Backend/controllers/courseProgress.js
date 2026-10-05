const SubSection = require("../models/SubSection")
const CourseProgress = require('../models/CourseProgress')


const updateCourseProgress = async(req,res)=>{

    const { courseId, subSectionId} = req.body

    const userId = req.user.id

    try{
        //check if the subSection valid 
        const subSection = await  SubSection.findById(subSectionId)

        if(!subSection)
        {
            return res.status(404).json({
                error:"Invalid subsection"
            })
        }

        //check for old entry
        let courseProgress = await CourseProgress.findOne({
            courseID:courseId,
            userId:userId
        })

        if(!courseProgress)
        {
            return res.status(404).json({
                success:false,
                message:"Course progress does not exist"
            })
        }
        else{
            //check for re-completing video /subSection
            if(courseProgress.completedVideos.includes(subSectionId))
            {
                return res.status(400).json({
                    error:"subSection already marked"
                })
            }
            
            //push into completed video
            courseProgress.completedVideos.push(subSectionId)
        }
        await courseProgress.save()

        console.log("Course progress save call done")
        return res.status(200).json({
            success:true
            ,message:"Course progress updated successfully"
        })

    }catch(err)
    {
        console.error("course progress error",err)
        return res.status(500).json({
            success:false,
            message:"internal server error",
            error:err
        })
    }
}

module.exports ={
    updateCourseProgress
}