const mongoose = require("mongoose")
const { instance } = require("../config/razorpay")
const Course = require('../models/Course')
const User = require('../models/User')
const mailSender = require('../utils/mailSender')
const { courseEnrollmentEmail } = require('../mails/courseEnrollmentEmail')
const { paymentSuccessEmail } = require("../mails/paymentSuccessEmail")
const crypto = require('crypto')
const Payment = require('../models/payment')
const CourseProgress = require("../models/CourseProgress")




//creating order for razorpay
const capturePayment = async(req,res)=>{

    const { courses} = req.body
    const userId = req.user.id

  

    if(courses.length ===0)
    {
        return res.json({
            success:false,
            message:"please proivde course id"
        })
    }

    //calculate totalamount for payment of multple course
    let totalAmount =0
     
    
    for(const course_id of courses)
    {
        let course
        try{
            course = await Course.findById(course_id)
            if(!course)
            {
                return res.status(403).json({
                    success:false,
                    message:"Could not find the course"
                })
            }
            //check user already enrolled or not 
            const uid = new mongoose.Types.ObjectId(userId)
            if(course.studentsEnrolled.includes(uid))
            {
                return res.status(403).json({
                    success:false,
                    message:"Students already enrolled"
                })
            }

            //calculate total amount of mutple course
            totalAmount += course.price
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
     
    //create optons
    const options ={
        amount : totalAmount *100,
        currency : "INR",
        receipt : Math.random(Date.now()).toString()

    }

    //create order
    try{
        const orderId = await instance.orders.create(options)

        //save it in database
         const payment = new Payment({
            userID: req.user.id,
            orderId : orderId.id,
            status: orderId.status,
            amount : orderId.amount,
            currency: orderId.currency,
            receipt: orderId.receipt,
            
         })

         const savedPayment = await payment.save()

       //return res to frontend
        return res.json({
            success:true,
            data:orderId,
            message:"order created successfully",
            ...savedPayment.toJSON()
        })
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"could not initiate order"
        })
    }


}


//verify payment 
const verifyPayment = async(req,res)=>{

    try{
        const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature

    const courses = req.body?.courses
    const userId = req.user.id

    

    if(!razorpay_order_id ||!razorpay_payment_id||!razorpay_signature
        ||!courses ||!userId)
        {
            return res.status(400).json({
                success:false,
                message:"something is missing"
            })
        }
    
    let body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
                                  .update(body.toString())
                                  .digest("hex")

         if(expectedSignature === razorpay_signature)
            {
                await enrollStudents(courses, userId,res)
                return res.status(200).json({
                    success:true,
                    message:"payment verifyed successfully"
                })
            } 
    } catch(error)
    {
        return res.status(400).json({
            success:false,
            message:"payment verification failed"
        })
    }                       
}

//enrolle students
const enrollStudents = async(courses, userId)=>{

     

    if(!courses || !userId)
    {
        return res.status(400).json({
            success:false,
            message:"userId or courses missing "
        })
    }

    for(const courseId of courses)
    {

        try{
            //enroll students in selected course
        const enrolledCourse = await Course.findOneAndUpdate({
                    _id : courseId
                },{$push :{studentsEnrolled:userId}},
                {new:true}
            )

          if(!enrolledCourse)
            {
                return res.status(500).json({
                    success:false,
                    message:"Could not found course"
                })
            } 
            
            //coureprogress
            const courseProgress = await CourseProgress.create({
                courseID:courseId,
                userId:userId,
                completedVideos :[]
            })

        // find the student and add the course to their list of enrolledcourse
        const enrolledStudent = await User.findByIdAndUpdate(userId,{
            $push:{
                courses : courseId,
                courseProgress : courseProgress._id
            }
        }, {new:true})

        console.log("ENROLLED STUDENT:", enrolledStudent)
console.log("ENROLLED COURSES:", enrolledStudent?.courses)

        //send email to enroll student 
        const emailResponse = await mailSender(
            enrolledStudent.email,
            `successfully enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
        )
        console.log("Email sent successfully")
        }

          catch(error)
            {
                console.log(error)
                return res.status(500).json({
                    success:false,
                    message:error.message
                })
            }

    }
    
}

//send payment success email
const sendPaymentSuccessEmail = async(req,res)=>{
    const {orderId , paymentId , amount} = req.body

    const userId = req.user.id

    if(!orderId || !paymentId || !amount ||!userId)
    {
        return res.status(400).json({
            success:false,
            message:"Please provide all fields"
        })
    }

    try{
        //find students
        const enrolledStudent = await User.findById(userId)

        //send email
        await mailSender(
            enrolledStudent.email,
            `payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
                amount/100, orderId, paymentId
            )

        )
    }catch(error)
    {
        console.log("error in sending email",error)
        return res.status(500).json({
            success:false,
            message:"Could not send email"
        })
    }
}


module.exports ={
    capturePayment,
    verifyPayment,
    sendPaymentSuccessEmail
}

