
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import IconBtn from '../../common/IconBtn'


const VideoSidebar = ({ setReviewModal }) => {

    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")

    const navigate = useNavigate()
    const { sectionId, subSectionId } = useParams()
    const location = useLocation()

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse)


    useEffect(() => {

        const activeSectionFlag = () => {

            const currentSectionIndex = courseSectionData?.findIndex(
                (data) => data._id === sectionId
            )

            if (currentSectionIndex === -1 || currentSectionIndex === undefined) {
                return
            }

            const currentSubSectionIndex =
                courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
                    (data) => data._id === subSectionId
                )

            const activeSubSectionId =
                courseSectionData?.[currentSectionIndex]
                    ?.subSection?.[currentSubSectionIndex]?._id

            setActiveStatus(
                courseSectionData?.[currentSectionIndex]?._id
            )

            setVideoBarActive(activeSubSectionId)
        }

        activeSectionFlag()

    }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId])


    return (
        <div className="flex h-full flex-col bg-richblack-800 text-richblack-5">

            {/* ================= HEADER ================= */}
            <div className="shrink-0 border-b border-richblack-600">

                {/* Back + Review */}
                <div className="flex items-center justify-between px-4 py-4">

                    <button
                        onClick={() => {
                            navigate('/dashboard/enrolled-courses')
                        }}
                        className="
                            rounded-md
                            bg-richblack-700
                            px-3 py-2
                            text-sm font-medium
                            text-richblack-5
                            transition-all duration-200
                            hover:bg-richblack-600
                        "
                    >
                        ← Back
                    </button>

                    <IconBtn
                        text="Add Review"
                        onclick={() => setReviewModal(true)}
                    />

                </div>


                {/* Course title + progress */}
                <div className="px-4 pb-4">

                    <p className="text-lg font-semibold text-richblack-5">
                        {courseEntireData?.courseName}
                    </p>

                    <div className="mt-2 flex items-center justify-between">

                        <p className="text-xs text-richblack-300">
                            Course Progress
                        </p>

                        <p className="text-xs font-medium text-yellow-50">
                            {completedLectures?.length || 0} / {totalNoOfLectures || 0}
                        </p>

                    </div>

                    {/* Progress bar */}
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-richblack-600">

                        <div
                            className="h-full rounded-full bg-yellow-50 transition-all duration-300"
                            style={{
                                width: `${
                                    totalNoOfLectures
                                        ? (completedLectures.length / totalNoOfLectures) * 100
                                        : 0
                                }%`
                            }}
                        />

                    </div>

                </div>

            </div>


            {/* ================= SECTIONS ================= */}
            <div className="flex-1 overflow-y-auto">

                {
                    courseSectionData?.map((section, index) => (

                        <div
                            key={section?._id || index}
                            className="border-b border-richblack-700"
                        >

                            {/* Section heading */}
                            <button
                                onClick={() => {

                                    if (activeStatus === section?._id) {
                                        setActiveStatus("")
                                    } else {
                                        setActiveStatus(section?._id)
                                    }

                                }}
                                className="
                                    flex w-full items-center justify-between
                                    px-4 py-4
                                    text-left
                                    transition-all duration-200
                                    hover:bg-richblack-700
                                "
                            >

                                <div className="flex items-center gap-3">

                                    <span className="
                                        flex h-7 w-7
                                        items-center justify-center
                                        rounded-full
                                        bg-richblack-600
                                        text-xs
                                        text-richblack-100
                                    ">
                                        {index + 1}
                                    </span>

                                    <p className="text-sm font-medium">
                                        {section?.sectionName}
                                    </p>

                                </div>


                                {activeStatus === section?._id ? (
                                    <IoIosArrowUp className="text-richblack-200" />
                                ) : (
                                    <IoIosArrowDown className="text-richblack-200" />
                                )}

                            </button>


                            {/* ================= SUBSECTIONS ================= */}
                            {
                                activeStatus === section?._id && (

                                    <div className="bg-richblack-900">

                                        {
                                            section?.subSection?.map((topic, subIndex) => (

                                                <div
                                                    key={topic?._id || subIndex}
                                                    onClick={() => {

                                                        navigate(
                                                            `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                                                        )

                                                        setVideoBarActive(topic?._id)
                                                    }}
                                                    className={`
                                                        flex cursor-pointer
                                                        items-start gap-3
                                                        border-l-4
                                                        px-4 py-3
                                                        transition-all duration-200
                                                        ${
                                                            videoBarActive === topic?._id
                                                                ? "border-yellow-50 bg-yellow-50 text-richblack-900"
                                                                : "border-transparent text-richblack-200 hover:bg-richblack-700"
                                                        }
                                                    `}
                                                >

                                                    {/* Completion checkbox */}
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            completedLectures?.includes(topic?._id)
                                                        }
                                                        onChange={() => {}}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="
                                                            mt-1
                                                            h-4 w-4
                                                            cursor-pointer
                                                            accent-yellow-50
                                                        "
                                                    />

                                                    {/* Lecture information */}
                                                    <div className="flex-1">

                                                        <p className="text-sm font-medium">
                                                            {topic?.title}
                                                        </p>

                                                        {
                                                            topic?.timeDuration && (
                                                                <p
                                                                    className={`
                                                                        mt-1 text-xs
                                                                        ${
                                                                            videoBarActive === topic?._id
                                                                                ? "text-richblack-700"
                                                                                : "text-richblack-400"
                                                                        }
                                                                    `}
                                                                >
                                                                    {topic.timeDuration}
                                                                </p>
                                                            )
                                                        }

                                                    </div>

                                                </div>

                                            ))
                                        }

                                    </div>
                                )
                            }

                        </div>

                    ))
                }

            </div>

        </div>
    )
}

export default VideoSidebar
