import { useState } from "react"
import { useSelector } from "react-redux"
import { FaPlus } from "react-icons/fa";
import  CourseList  from './InstructorCourses/CourseList'
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";

const MyCourses = ()=>{

    const { token } = useSelector((state)=> state.auth)
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()

    //fetch instructor course
    useEffect(()=>{
        const fetchCourses = async()=>{
            const result = await fetchInstructorCourses(token)

            if(result)
            {
                setCourses(result)
            }
        }
        fetchCourses()

    },[token])


    return(
        <div className="text-white">
            <div className="flex justify-between">
                <h1>My Courses</h1>

                {/* Add course button */}
                <IconBtn 
                   text="Add Course"
                    onclick ={()=> navigate("/dashboard/add-course")}>
                     <FaPlus />   
                    </IconBtn>
            </div>

            {courses && <CourseList courses={courses} setCourses={setCourses} ></CourseList>}
        </div>
    )
}

export default MyCourses