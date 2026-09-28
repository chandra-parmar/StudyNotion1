import React, { useState, useEffect } from 'react'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import GetAvgRating from '../utils/avgRating'
import { useNavigate, useParams } from 'react-router-dom'
import RatingStars from '../components/common/RatingStars'
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard'
import ConfirmationModal from '../components/common/ConfirmationModal'
import Error from '../pages/Error'
import { useSelector } from 'react-redux'
import CourseContent from '../components/core/Course/CourseContent'

const CourseDetails = () => {

    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { loading } = useSelector((state) => state.profile)

    const navigate = useNavigate()
    const { courseId } = useParams()

    const [courseData, setCourseData] = useState(null)
    const [avgReviewCount, setAverageReviewCount] = useState(0)
    const [confirmationModal , setConfirmationModal] = useState(null)

  

    // which sections are open
    const [isActive, setActive] = useState([])


    // fetch course details
    useEffect(() => {

        const getCourseFullDetails = async () => {

            try {

                const result = await fetchCourseDetails(courseId)

                console.log("PRINTING COURSE DETAILS", result)

                setCourseData(result)

            } catch (error) {

                console.log("Could not fetch course details")

            }

        }

        getCourseFullDetails()

    }, [courseId])


    // average rating
    useEffect(() => {

        const count = GetAvgRating(
            courseData?.data?.ratingAndReviews
        )

        setAverageReviewCount(count)

    }, [courseData])


    // // buy course
    // const handleBuyCourse = () => {

    //     setConfirmationModal({

    //         text1: "You are not logged in",
    //         text2: "Please login to purchase the course",

    //         btn1Text: "Login",
    //         btn2Text: "Cancel",

    //         btn1Handler: () => navigate("/login"),

    //         btn2Handler: () =>
    //             setConfirmationModal(null)

    //     })

    // }


    // open / close section
    const handleActive = (id) => {

        setActive((prev) => {

            if (prev.includes(id)) {

                return prev.filter((e) => e !== id)

            }

            return [...prev, id]

        })

    }


    // collapse everything
    const handleCollapseAll = () => {

        setActive([])

    }


    if (loading || !courseData) {

        return (
            <div className="flex min-h-[60vh] items-center justify-center text-white">
                Loading....
            </div>
        )

    }


    if (!courseData.success) {

        return <Error />

    }


    const {
        courseName,
        courseDescription,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled
    } = courseData.data


    return (

        <div className="min-h-screen bg-richblack-900 text-white">

            <div className="mx-auto flex w-11/12 max-w-[1200px] flex-col gap-10 py-10">

                {/* ================= TOP SECTION ================= */}

                <div className="flex flex-col gap-10 lg:flex-row lg:items-start">

                    {/* ================= COURSE CARD ================= */}

                    <div className="w-full lg:sticky lg:top-10 lg:w-[350px] lg:shrink-0">

                        <CourseDetailsCard
                            course={courseData.data}
                            
                            
                        />

                    </div>


                    {/* ================= COURSE INFORMATION ================= */}

                    <div className="flex-1">

                        {/* Course name */}

                        <h1 className="text-3xl font-semibold text-richblack-5 md:text-4xl">

                            {courseName}

                        </h1>


                        {/* Course description */}

                        <p className="mt-4 max-w-[800px] text-base leading-7 text-richblack-200">

                            {courseDescription}

                        </p>


                        {/* Rating */}

                        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">

                            <span className="font-semibold text-yellow-50">

                                {avgReviewCount.toFixed(1)}

                            </span>


                            <RatingStars
                                Review_Count={avgReviewCount}
                                Star_Size={20}
                            />


                            <span className="text-richblack-300">

                                ({ratingAndReviews?.length || 0} reviews)

                            </span>


                            <span className="text-richblack-300">

                                •

                            </span>


                            <span className="text-richblack-300">

                                {studentsEnrolled?.length || 0} students enrolled

                            </span>

                        </div>


                        {/* Instructor */}

                        <div className="mt-5 text-sm text-richblack-200">

                            Created By{" "}

                            <span className="font-medium text-yellow-50">

                                {instructor?.firstName} {instructor?.lastName}

                            </span>

                        </div>


                        {/* ================= WHAT YOU WILL LEARN ================= */}

                        <div className="mt-10 rounded-md border border-richblack-700 bg-richblack-800 p-6">

                            <h2 className="text-2xl font-semibold text-richblack-5">

                                What you will learn

                            </h2>


                            <p className="mt-4 leading-7 text-richblack-200">

                                {whatYouWillLearn}

                            </p>

                        </div>


                        {/* ================= COURSE CONTENT ================= */}

                        <div className="mt-10">

                            <h2 className="text-2xl font-semibold text-richblack-5">

                                Course content

                            </h2>


                            {/* Course content information */}

                            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-richblack-300">

                                <span>

                                    {courseContent?.length || 0} sections

                                </span>


                                <span>

                                    {courseContent?.reduce(
                                        (total, section) =>
                                            total + (section.subSection?.length || 0),
                                        0
                                    )}{" "}
                                    lectures

                                </span>


                                <button
                                    onClick={handleCollapseAll}
                                    className="font-medium text-yellow-50 transition-all hover:text-yellow-100"
                                >

                                    Collapse all sections

                                </button>

                            </div>


                            {/* ================= ACCORDION ================= */}

                            <div className="mt-5">

                                <CourseContent
                                    courseContent={courseContent}
                                    isActive={isActive}
                                    handleActive={handleActive}
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* Confirmation modal */}

            {
                confirmationModal && (

                    <ConfirmationModal
                        modalData={confirmationModal}
                    />

                )
            }

        </div>

    )

}

export default CourseDetails