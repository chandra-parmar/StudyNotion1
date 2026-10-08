import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apiEndpoints";

const {
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DASHBOARD_API
} = profileEndpoints;




//getinstructor stats data
export async function getInstructorStatsData(token)
{
   const toastId = toast.loading("loading....")
   let result = []

   try{
     
    const response = await apiConnector("GET",GET_INSTRUCTOR_DASHBOARD_API, null,
      {
        Authorization: `Bearer ${token}`
      }
    )

    console.log("Get instrucotr dashboar api", response)

   result = response?.data?.courses

   }catch(error)
   {
    console.log("Get instrucotr dashboard api eror",error)
    toast.error("Could not get instructor data")


   }
   toast.dismiss(toastId)
   return result 
}








// get user enrooled course
export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}