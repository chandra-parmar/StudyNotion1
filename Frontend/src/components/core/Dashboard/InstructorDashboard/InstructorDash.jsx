
import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getInstructorStatsData } from '../../../../services/operations/profileAPI'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import InstructorChart from './InstructorChart'

const InstructorDash = () => {

    const [loading, setLoading] = useState(false)
    const [instructorDashData, setInsturctorDashData] = useState(null)
    const [courses, setCourses] = useState([])

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

    // api call
    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true)

            const instructorDashboardData = await getInstructorStatsData(token)

            // instructor courses
            const coursesData = await fetchInstructorCourses(token)

            if (instructorDashboardData.length) {
                setInsturctorDashData(instructorDashboardData)
            }

            if (coursesData) {
                setCourses(coursesData)
            }

            setLoading(false)
        }

        getCourseDataWithStats()
    }, [token])

    const totalAmount = instructorDashData?.reduce(
        (acc, curr) => acc + curr.totalAmountGenerated,
        0
    )

    const totalStudents = instructorDashData?.reduce(
        (acc, curr) => acc + curr.totalStudentsEnrolled,
        0
    )

    return (
        <div className="min-h-screen bg-richblack-900 px-4 py-8 text-white md:px-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-richblack-5">
                    Hi {user?.firstName}
                </h1>

                <p className="mt-1 text-sm text-richblack-300">
                    Let's start something new
                </p>
            </div>

            {loading ? (
                <div className="flex min-h-[400px] items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-richblack-600 border-t-yellow-50"></div>
                </div>
            ) : courses.length > 0 ? (

                <div className="space-y-8">

                    {/* Chart + Statistics */}
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                        {/* Chart */}
                        <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6 xl:col-span-2">
                            <InstructorChart courses={instructorDashData} />
                        </div>

                        {/* Statistics */}
                        <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">

                            <p className="mb-6 text-xl font-semibold text-richblack-5">
                                Statistics
                            </p>

                            <div className="space-y-4">

                                {/* Total Courses */}
                                <div className="rounded-lg bg-richblack-700 p-4">
                                    <p className="text-sm text-richblack-300">
                                        Total Courses
                                    </p>

                                    <p className="mt-1 text-2xl font-semibold text-yellow-50">
                                        {courses.length}
                                    </p>
                                </div>

                                {/* Total Students */}
                                <div className="rounded-lg bg-richblack-700 p-4">
                                    <p className="text-sm text-richblack-300">
                                        Total Students
                                    </p>

                                    <p className="mt-1 text-2xl font-semibold text-yellow-50">
                                        {totalStudents}
                                    </p>
                                </div>

                                {/* Total Income */}
                                <div className="rounded-lg bg-richblack-700 p-4">
                                    <p className="text-sm text-richblack-300">
                                        Total Income
                                    </p>

                                    <p className="mt-1 text-2xl font-semibold text-yellow-50">
                                        Rs {totalAmount}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Your Courses */}
                    <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">

                        {/* Heading */}
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-xl font-semibold text-richblack-5">
                                Your Courses
                            </p>

                            <Link
                                to="/dashboard/my-courses"
                                className="text-sm font-medium text-yellow-50 hover:text-yellow-100"
                            >
                                View all
                            </Link>
                        </div>

                        {/* Courses */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

                            {courses.slice(0, 3).map((course) => (
                                <div
                                    key={course._id}
                                    className="overflow-hidden rounded-lg border border-richblack-700 bg-richblack-900 transition-all duration-200 hover:-translate-y-1 hover:border-richblack-500"
                                >

                                    {/* Thumbnail */}
                                    <img
                                        src={course.thumbnail}
                                        alt={course.courseName}
                                        className="h-48 w-full object-cover"
                                    />

                                    {/* Course Details */}
                                    <div className="p-4">

                                        <p className="truncate text-lg font-medium text-richblack-5">
                                            {course.courseName}
                                        </p>

                                        <div className="mt-3 flex items-center justify-between text-sm text-richblack-300">

                                            <p>
                                                {course.studentsEnrolled.length} students
                                            </p>

                                            <p className="text-yellow-50">
                                                Rs {course.price}
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>

            ) : (

                /* No Courses */
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-richblack-700 bg-richblack-800 px-6 text-center">

                    <p className="text-xl font-semibold text-richblack-5">
                        You have not created any courses yet
                    </p>

                    <p className="mt-2 text-sm text-richblack-300">
                        Create your first course and start teaching students.
                    </p>

                    <Link
                        to="/dashboard/addCourse"
                        className="mt-6 rounded-md bg-yellow-50 px-6 py-3 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95"
                    >
                        Create a Course
                    </Link>

                </div>
            )}

        </div>
    )
}

export default InstructorDash

