const dotenv = require('dotenv')

// load environment variables first
dotenv.config()

const express = require('express')
const dbConnect= require('./config/database')
const cloudinaryConnect = require('./config/cloudinary')

const app = express()
const port=4000
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')

// Database connectivity
dbConnect()



// MIDDLEWARES
app.use(express.json())
app.use(cookieParser())
app.use(cors({
           origin:"http://localhost:3000",
           credentials:true
        }))
//for fileupload image video
app.use(fileUpload({
      useTempFiles:true,
      tempFileDir:"/tmp"
}))

// CLOUDINARY CONNECTION
// defer invocation to avoid potential initialization/circular issues
setImmediate(() => cloudinaryConnect());


//Routes mounting
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const courseRoutes = require('./routes/courseRoutes')
const sectionRoutes = require('./routes/sectionRoutes')
const subSectionRoutes = require('./routes/subSectionRoutes')
const profileRoutes = require('./routes/profileRoutes')
const ratingRoutes = require('./routes/ratingReviewRoutes')
const paymentRoutes = require('./routes/paymentRoutes')

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/profile',profileRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/course',courseRoutes)
app.use('/api/v1/section',sectionRoutes)
app.use('/api/v1/subSection',subSectionRoutes)
app.use('/api/v1/courseRating',ratingRoutes)
app.use('/api/v1/payment',paymentRoutes)


app.listen(port,()=>{
    console.log("server is listing at port",port)

})