const express = require('express')
const { createRating, AverageRating ,AllRating} = require('../controllers/RatingAndReviewController')
const {auth , isStudent} = require('../middlewares/auth')

const router = express.Router()

//create rating 
router.post('/rating',auth,isStudent,createRating)

//get rating and review
router.get('/rating',AllRating )

//get average rating by course id 
router.get('/getAverageRating',auth,AverageRating)


module.exports= router