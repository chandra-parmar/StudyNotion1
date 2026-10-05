const BASE_URL = process.env.BASE_URL
//auth endpoints
export const authEndpoints ={

    SENDOTP_API : "http://localhost:4000/api/v1/auth/sendotp",
    SIGNUP_API : "http://localhost:4000/api/v1/auth/signup",
    LOGIN_API : "http://localhost:4000/api/v1/auth/login",
    RESETPASSWORDTOKEN_API :  "http://localhost:4000/api/v1/auth/reset-password-token",
    RESETPASSWORD_API : "http://localhost:4000/api/v1/auth/reset-password"
} 

export const profileEndpoints ={
    GET_USER_ENROLLED_COURSES_API : "http://localhost:4000/api/v1/profile/enrolledCourses",

}

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: "http://localhost:4000/api/v1/course",
  EDIT_COURSE_API:  "http://localhost:4000/api/v1/course/",
  COURSE_CATEGORIES_API:  "http://localhost:4000/api/v1/category/",
  CREATE_COURSE_API:  "http://localhost:4000/api/v1/course/",
  GET_ALL_INSTRUCTOR_COURSES_API: "http://localhost:4000/api/v1/course",
  GET_FULL_COURSE_DETAIL_API : 'http://localhost:4000/api/v1/course/getFullCourse',
  DELETE_COURSE_API:"http://localhost:4000/api/v1/course/",
  LECTURE_COMPLETION_API:"http://localhost:4000/api/v1/course/updateCourseProgress",
  
  
 
}

// catgory endpoints
export const categoryEndpoints={
    CATEGORY_PAGE_DATA_API : "http://localhost:4000/api/v1/category/getCategoryDetails",
    COURSE_CATEGORIES_API : 'http://localhost:4000/api/v1/category/'
}


//section endpoints
export const sectionEndpoints ={

   CREATE_SECTION_API:  "http://localhost:4000/api/v1/section/" ,
   UPDATE_SECTION_API : "http://localhost:4000/api/v1/section/",
   DELETE_SECTION_API : "http://localhost:4000/api/v1/section/"


}

//subsection api endpoints
export const subSectionEndpoints ={

    CREATE_SUB_SECTION_API :"http://localhost:4000/api/v1/subSection/",
    UPDATE_SUB_SECTION_API: "http://localhost:4000/api/v1/subSection/",
    DELETE_SUB_SECTION_API : "http://localhost:4000/api/v1/subSection/"
}


//payment api endpoints
export const paymentApiEndpoints ={

    COURSE_PAYMENT_API : "http://localhost:4000/api/v1/payment/capturePayment",
    PAYMENT_VERIFY_API :"http://localhost:4000/api/v1/payment/verifyPayment",
    PAYMENT_SUCCESS_EMAIL_API :"http://localhost:4000/api/v1/payment/sendPaymentSuccessEmail"
}


//course rating 
export const ratingApiEndpoints ={

    CREATE_RATING_API: "http://localhost:4000/api/v1/courseRating/rating"
}