
import React, { useEffect } from 'react'
import { IoMdClose } from "react-icons/io"
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import ReactStars from 'react-rating-stars-component'

import IconBtn from '../../common/IconBtn'
 import { createRating } from '../../../services/operations/courseDetailsAPI'


const CourseReviewModal = ({ setReviewModal }) => {


      

    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { courseEntireData } = useSelector((state) => state.viewCourse)
    
 

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm()


    // Rating change
    const ratingChange = (newRating) => {
        setValue("courseRating", newRating)
    }


    useEffect(() => {

        setValue("courseReview", "")
        setValue("courseRating", 0)

    }, [setValue])


    // Form submit
    const onSubmit = async (data) => {

        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseReview
            },
            token
        )

        setReviewModal(false)
    }


    return (
        <div
            className="
                fixed inset-0 z-[1000]
                flex items-center justify-center
                bg-black/60
                backdrop-blur-sm
                px-4
            "
        >

            {/* Modal */}
            <div
                className="
                    relative
                    w-full max-w-[500px]
                    rounded-lg
                    border border-richblack-700
                    bg-richblack-800
                    shadow-2xl
                "
            >

                {/* Modal Header */}
                <div
                    className="
                        flex items-center justify-between
                        border-b border-richblack-700
                        px-6 py-4
                    "
                >

                    <p className="text-lg font-semibold text-richblack-5">
                        Add Review
                    </p>

                    <button
                        onClick={() => setReviewModal(false)}
                        className="
                            rounded-full p-1
                            text-richblack-300
                            transition-all duration-200
                            hover:bg-richblack-700
                            hover:text-richblack-5
                        "
                    >
                        <IoMdClose size={24} />
                    </button>

                </div>


                {/* Modal Body */}
                <div className="px-6 py-5">

                    {/* User information */}
                    <div className="flex items-center gap-4">

                        <img
                            src={user?.image}
                            alt="user"
                            className="
                                aspect-square
                                w-[50px]
                                rounded-full
                                object-cover
                            "
                        />

                        <div>

                            <p className="font-medium text-richblack-5">
                                {user?.firstName} {user?.lastName}
                            </p>

                            <p className="text-sm text-richblack-300">
                                Posting publicly
                            </p>

                        </div>

                    </div>


                    {/* Review form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-6 flex flex-col gap-5"
                    >

                        {/* Rating */}
                        <div className="flex flex-col items-center gap-2">

                            <p className="text-sm text-richblack-200">
                                How would you rate this course?
                            </p>

                            <ReactStars
                                count={5}
                                onChange={ratingChange}
                                size={28}
                                activeColor="#ffd700"
                            />

                        </div>


                        {/* Review */}
                        <div className="flex flex-col gap-2">

                            <label
                                htmlFor="courseReview"
                                className="text-sm font-medium text-richblack-5"
                            >
                                Add a Review
                            </label>

                            <textarea
                                id="courseReview"
                                placeholder="Add your review here..."
                                {...register("courseReview", {
                                    required: true
                                })}
                                className="
                                    form-style
                                    min-h-[130px]
                                    w-full
                                    resize-none
                                "
                            />

                            {errors.courseReview && (
                                <span className="text-xs text-pink-200">
                                    Please add your review
                                </span>
                            )}

                        </div>


                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-2">

                            <button
                                type="button"
                                onClick={() => setReviewModal(false)}
                                className="
                                    rounded-md
                                    bg-richblack-700
                                    px-5 py-2
                                    text-sm font-medium
                                    text-richblack-5
                                    transition-all
                                    hover:bg-richblack-600
                                "
                            >
                                Cancel
                            </button>

                            <IconBtn
                                text="Save"
                            />

                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default CourseReviewModal

