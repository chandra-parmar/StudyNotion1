
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Player } from 'video-react'
import 'video-react/dist/video-react.css'
import {updateCompletedLectures} from '../../../reducer/slices/viewCourseSlice'

import IconBtn from '../../common/IconBtn'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI'


const VideoDetails = () => {

    const { courseId, sectionId, subSectionId } = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const playerRef = useRef(null)

    const { token } = useSelector((state) => state.auth)

    const {
        courseSectionData,
        courseEntireData,
        completedLectures
    } = useSelector((state) => state.viewCourse)

    const [videoData, setVideoData] = useState(null)
    const [videoEnded, setVideoEnded] = useState(false)
    const [loading, setLoading] = useState(false)


    // ================= VIDEO DATA =================

    useEffect(() => {

        const setVideoSpecificDetails = async () => {

            if (!courseSectionData?.length) {
                return
            }

            if (!courseId || !sectionId || !subSectionId) {
                navigate('/dashboard/enrolled-courses')
                return
            }


            const selectedSection = courseSectionData.find(
                (course) => course._id === sectionId
            )

            if (!selectedSection) {
                setVideoData(null)
                return
            }


            const selectedVideo = selectedSection.subSection?.find(
                (data) => data._id === subSectionId
            )

            if (!selectedVideo) {
                setVideoData(null)
                return
            }


            setVideoData(selectedVideo)
            setVideoEnded(false)
        }

        setVideoSpecificDetails()

    }, [
        courseSectionData,
        courseId,
        sectionId,
        subSectionId,
        location.pathname,
        navigate
    ])


    // ================= CURRENT VIDEO INDEX =================

    const getCurrentVideoIndexes = () => {

        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        if (currentSectionIndex === -1) {
            return {
                currentSectionIndex: -1,
                currentSubSectionIndex: -1
            }
        }


        const currentSubSectionIndex =
            courseSectionData[currentSectionIndex]?.subSection?.findIndex(
                (data) => data._id === subSectionId
            )


        return {
            currentSectionIndex,
            currentSubSectionIndex
        }
    }


    // ================= FIRST VIDEO =================

    const isFirstVideo = () => {

        const {
            currentSectionIndex,
            currentSubSectionIndex
        } = getCurrentVideoIndexes()

        return (
            currentSectionIndex === 0 &&
            currentSubSectionIndex === 0
        )
    }


    // ================= LAST VIDEO =================

    const isLastVideo = () => {

        const {
            currentSectionIndex,
            currentSubSectionIndex
        } = getCurrentVideoIndexes()

        if (currentSectionIndex === -1) {
            return false
        }


        const noOfSubSections =
            courseSectionData[currentSectionIndex]?.subSection?.length || 0


        return (
            currentSectionIndex === courseSectionData.length - 1 &&
            currentSubSectionIndex === noOfSubSections - 1
        )
    }


    // ================= NEXT VIDEO =================

    const goToNextVideo = () => {

        const {
            currentSectionIndex,
            currentSubSectionIndex
        } = getCurrentVideoIndexes()


        if (currentSectionIndex === -1) {
            return
        }


        const currentSection =
            courseSectionData[currentSectionIndex]


        const noOfSubSections =
            currentSection?.subSection?.length || 0


        // Next video in same section
        if (currentSubSectionIndex < noOfSubSections - 1) {

            const nextSubSectionId =
                currentSection.subSection[
                    currentSubSectionIndex + 1
                ]._id


            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
            )

            return
        }


        // First video of next section
        const nextSection =
            courseSectionData[currentSectionIndex + 1]


        if (!nextSection) {
            return
        }


        const nextSubSectionId =
            nextSection.subSection?.[0]?._id


        if (!nextSubSectionId) {
            return
        }


        navigate(
            `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSubSectionId}`
        )
    }


    // ================= PREVIOUS VIDEO =================

    const goToPrevVideo = () => {

        const {
            currentSectionIndex,
            currentSubSectionIndex
        } = getCurrentVideoIndexes()


        if (currentSectionIndex === -1) {
            return
        }


        // Previous video in same section
        if (currentSubSectionIndex > 0) {

            const prevSubSectionId =
                courseSectionData[currentSectionIndex]
                    .subSection[currentSubSectionIndex - 1]._id


            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
            )

            return
        }


        // Last video of previous section
        const previousSection =
            courseSectionData[currentSectionIndex - 1]


        if (!previousSection) {
            return
        }


        const previousSubSections =
            previousSection.subSection || []


        const prevSubSectionId =
            previousSubSections[
                previousSubSections.length - 1
            ]?._id


        if (!prevSubSectionId) {
            return
        }


        navigate(
            `/view-course/${courseId}/section/${previousSection._id}/sub-section/${prevSubSectionId}`
        )
    }


    // ================= MARK COMPLETE =================

    const handleLectureCompletion = async () => {

        setLoading(true)

        const res = await markLectureAsComplete(
            {
                courseId: courseId,
                subSectionId: subSectionId
            },
            token
        )


        if (res) {
            dispatch(updateCompletedLectures(subSectionId))
        }

        setLoading(false)
    }


    // ================= REWATCH =================

    const handleRewatch = () => {

        if (playerRef.current) {

            playerRef.current.seek(0)

            setVideoEnded(false)
        }
    }


    // ============== === UI =================

    if (!videoData) {

        return (
            <div className="
                flex min-h-full
                items-center justify-center
                bg-richblack-900
                p-6
            ">
                <p className="text-richblack-300">
                    No video data found.
                </p>
            </div>
        )
    }


    return (
        <div className="
            min-h-full
            bg-richblack-900
            px-6 py-8
            lg:px-10
        ">

            {/* ================= VIDEO ================= */}

            <div className="
                mx-auto
                w-full
                max-w-[1100px]
            ">

                <div className="
                    overflow-hidden
                    rounded-lg
                    border border-richblack-700
                    bg-black
                    shadow-lg
                ">

                    <Player
                        ref={playerRef}
                        aspectRatio="16:9"
                        playsInline
                        onEnded={() => setVideoEnded(true)}
                        src={videoData?.videoUrl}
                    />

                </div>


                {/* ================= VIDEO CONTROLS ================= */}

                {
                    videoEnded && (

                        <div className="
                            mt-5
                            flex flex-col
                            gap-4
                            rounded-lg
                            border border-richblack-700
                            bg-richblack-800
                            p-4
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        ">

                            {/* Completion + Rewatch */}
                            <div className="
                                flex
                                flex-wrap
                                items-center
                                gap-3
                            ">

                                {
                                    !completedLectures?.includes(
                                        subSectionId
                                    ) && (

                                        <IconBtn
                                            disabled={loading}
                                            onclick={handleLectureCompletion}
                                            text={
                                                !loading
                                                    ? "Mark as completed"
                                                    : "Loading..."
                                            }
                                        />

                                    )
                                }


                                <IconBtn
                                    disabled={loading}
                                    onclick={handleRewatch}
                                    text="Rewatch"
                                    customClasses="text-sm"
                                />

                            </div>


                            {/* Previous / Next */}
                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                {
                                    !isFirstVideo() && (

                                        <button
                                            disabled={loading}
                                            onClick={goToPrevVideo}
                                            className="
                                                rounded-md
                                                bg-richblack-700
                                                px-5 py-2
                                                text-sm font-medium
                                                text-richblack-5
                                                transition-all
                                                hover:bg-richblack-600
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                        >
                                            Previous
                                        </button>

                                    )
                                }


                                {
                                    !isLastVideo() && (

                                        <button
                                            disabled={loading}
                                            onClick={goToNextVideo}
                                            className="
                                                rounded-md
                                                bg-yellow-50
                                                px-5 py-2
                                                text-sm font-semibold
                                                text-richblack-900
                                                transition-all
                                                hover:bg-yellow-100
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                        >
                                            Next
                                        </button>

                                    )
                                }

                            </div>

                        </div>

                    )
                }


                {/* ================= VIDEO INFORMATION ================= */}

                <div className="
                    mt-6
                    border-b border-richblack-700
                    pb-6
                ">

                    <h1 className="
                        text-2xl
                        font-semibold
                        text-richblack-5
                        lg:text-3xl
                    ">
                        {videoData?.title}
                    </h1>


                    {
                        videoData?.description && (

                            <p className="
                                mt-3
                                max-w-4xl
                                text-sm
                                leading-6
                                text-richblack-300
                            ">
                                {videoData.description}
                            </p>

                        )
                    }

                </div>

            </div>

        </div>
    )
}

export default VideoDetails
