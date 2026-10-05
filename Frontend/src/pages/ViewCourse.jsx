
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'

import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI'

import {
    setCourseSectionData,
    setEntireCourseData,
    setCompletedLectures,
    setTotalNoOfLectures
} from '../reducer/slices/viewCourseSlice'

import VideoSidebar from '../components/core/ViewCourse/VideoSidebar'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false)

    const { courseId } = useParams()
    const { token } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    

    // Course data API call
    useEffect(() => {

        const fetchCourseSpecificDetails = async () => {

            const courseData = await getFullDetailsOfCourse(courseId, token)
              
            console.log("courseData in viewcourse",courseData)
            
            dispatch(
                setCourseSectionData(
                    courseData.courseDetails.courseContent
                )
            )

            dispatch(
                setEntireCourseData(
                    courseData.courseDetails
                )
            )

            dispatch(
                setCompletedLectures(
                    courseData.completedVideos
                )
            )

            let lectures = 0

            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
            })

            dispatch(setTotalNoOfLectures(lectures))
        }

        fetchCourseSpecificDetails()

    }, [courseId, token, dispatch])


    return (
        <div className="flex h-screen w-screen overflow-hidden bg-richblack-900">

            {/* Course Sidebar */}
            <div className="w-[320px] shrink-0 border-r border-richblack-700 bg-richblack-800">
                <VideoSidebar setReviewModal={setReviewModal} />
            </div>


            {/* Video / Course Content */}
            <div className="flex-1 overflow-y-auto bg-richblack-900">

                <div className="min-h-full w-full">
                    <Outlet />
                </div>

            </div>


            {/* Review Modal */}
            {reviewModal && (
                <CourseReviewModal
                    setReviewModal={setReviewModal}
                />
            )}

        </div>
    )
}

export default ViewCourse

