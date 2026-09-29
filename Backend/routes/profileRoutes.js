const express = require('express')
const router = express.Router()

const {updateProfile, deleteAccount, getUserDetails, updateDisplayPicture, getEnrolledCourses} = require("../controllers/profileController")
const {auth ,isStudent} = require('../middlewares/auth')


router.get('/enrolledCourses', auth, isStudent, getEnrolledCourses)

router.put('/updateDisplayPicture/:id', auth, updateDisplayPicture)

router.put('/:userId', auth, updateProfile)

router.delete('/:id', auth, deleteAccount)

router.get('/:id', getUserDetails)

module.exports = router