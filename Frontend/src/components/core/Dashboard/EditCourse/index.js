import { useDispatch, useSelector } from "react-redux"
import { useParams} from 'react-router-dom'
import { setCourse, setEditCourse} from '../../../../reducer/slices/courseSlice'
import { useState , useEffect } from "react"
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI"
import RenderSteps from "../AddCourse/RenderSteps"

export default function EditCourse (){

    const dispatch = useDispatch()
    const {courseId} = useParams()
    const {course} = useSelector((state)=> state.course)
    const [loading, setLoading] = useState(false)
    const { token} = useSelector((state)=> state.auth)

     useEffect(()=>{
        const populateCourseDetails = async()=>{
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId, token)

            console.log("courseId before API call:", courseId);

            if(result?.courseDetails)
            {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
            }
            setLoading(false)
        }
        populateCourseDetails()
     })
    if(loading)
    {
        return(
            <div>
                Loading...
            </div>
        )
    }



    return(
        <div className="text-white">
            <h1>Edit course</h1>
            <div>
                {
                    course ? (<RenderSteps></RenderSteps>) : (<p>Course not found</p>)
                }
            </div>
        </div>
    )
}