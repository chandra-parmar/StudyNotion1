const express = require('express')

const router = express.Router()
const {createCourse,showAllCourses, getCourseDetails, editCourse, getInstructorCourses, getFullCourseDetails,
    deleteCourse
} = require('../controllers/courseController')
const {auth,isInstructor ,isStudent} = require('../middlewares/auth')

const { updateCourseProgress} = require('../controllers/courseProgress')




//create course route
router.post('/',auth,isInstructor,createCourse)

//get all course route
router.get('/',auth,showAllCourses)

//get full course detals
router.get('/getFullCourse/:courseId',auth, getFullCourseDetails)

//get course details by id 
router.get('/:courseId',getCourseDetails)



//edit course
router.put('/',auth, isInstructor,editCourse)

// get instructor course route
router.get('/getInstructorCourses',auth,isInstructor,getInstructorCourses)


//delete course
router.delete('/',auth,isInstructor,deleteCourse)

router.post('/updateCourseProgress',auth, isStudent, updateCourseProgress)


module.exports= router