const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const authEndpoints = {
    SENDOTP_API: `${BASE_URL}/auth/sendotp`,
    SIGNUP_API: `${BASE_URL}/auth/signup`,
    LOGIN_API: `${BASE_URL}/auth/login`,
    RESETPASSWORDTOKEN_API: `${BASE_URL}/auth/reset-password-token`,
    RESETPASSWORD_API: `${BASE_URL}/auth/reset-password`
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_ENROLLED_COURSES_API: `${BASE_URL}/profile/enrolledCourses`,
    GET_INSTRUCTOR_DASHBOARD_API: `${BASE_URL}/profile/instructorDashboard`
};

// COURSE ENDPOINTS
export const courseEndpoints = {
    GET_ALL_COURSE_API: `${BASE_URL}/course/getAllCourses`,
    COURSE_DETAILS_API: `${BASE_URL}/course`,
    EDIT_COURSE_API: `${BASE_URL}/course/`,
    COURSE_CATEGORIES_API: `${BASE_URL}/category/`,
    CREATE_COURSE_API: `${BASE_URL}/course/`,
    GET_ALL_INSTRUCTOR_COURSES_API: `${BASE_URL}/course`,
    GET_FULL_COURSE_DETAIL_API: `${BASE_URL}/course/getFullCourse`,
    DELETE_COURSE_API: `${BASE_URL}/course/`,
    LECTURE_COMPLETION_API: `${BASE_URL}/course/updateCourseProgress`
};

// CATEGORY ENDPOINTS
export const categoryEndpoints = {
    CATEGORY_PAGE_DATA_API: `${BASE_URL}/category/getCategoryDetails`,
    COURSE_CATEGORIES_API: `${BASE_URL}/category/`
};

// SECTION ENDPOINTS
export const sectionEndpoints = {
    CREATE_SECTION_API: `${BASE_URL}/section/`,
    UPDATE_SECTION_API: `${BASE_URL}/section/`,
    DELETE_SECTION_API: `${BASE_URL}/section/`
};

// SUBSECTION ENDPOINTS
export const subSectionEndpoints = {
    CREATE_SUB_SECTION_API: `${BASE_URL}/subSection/`,
    UPDATE_SUB_SECTION_API: `${BASE_URL}/subSection/`,
    DELETE_SUB_SECTION_API: `${BASE_URL}/subSection/`
};

// PAYMENT ENDPOINTS
export const paymentApiEndpoints = {
    COURSE_PAYMENT_API: `${BASE_URL}/payment/capturePayment`,
    PAYMENT_VERIFY_API: `${BASE_URL}/payment/verifyPayment`,
    PAYMENT_SUCCESS_EMAIL_API: `${BASE_URL}/payment/sendPaymentSuccessEmail`
};

// COURSE RATING ENDPOINTS
export const ratingApiEndpoints = {
    CREATE_RATING_API: `${BASE_URL}/courseRating/rating`,
    REVIEWS_DETAILS_API: `${BASE_URL}/courseRating/rating`
};