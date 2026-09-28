import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import toast from 'react-hot-toast'
import { addToCart } from '../../../reducer/slices/cartSlice'
import { buyCourse} from '../../../services/operations/paymentAPI'



const CourseDetailsCard = ({
    course
}) => {

    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)

    const [confirmationModal, setConfirmationModal] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { courseId } = useParams()


    const handleAddToCart = () => {

        if (
            user &&
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
        ) {
            toast.error("You are Instructor cannot buy course")
            return
        }

        if (token) {

            dispatch(addToCart(course))

            toast.success("Added to cart")

            return
        }

        setConfirmationModal({

            text1: "You are not logged in",
            text2: "Login to add to cart",

            btn1Text: "Login",
            btn2Text: "Cancel",

            btn1Handler: () =>
                navigate('/login'),

            btn2Handler: () =>
                setConfirmationModal(null)

        })
    }


    // share button
    const handleShare = () => {

        copy(window.location.href)

        toast.success("Link copied to clipboard")
    }


    // buy now
    const handleBuyCourse = () => {

        if (token) {

            buyCourse(
                token,
                [courseId],
                user,
                navigate,
                dispatch
            )

        } else {

            setConfirmationModal({

                text1: "You are not logged in",
                text2: "Please login to purchase the course",

                btn1Text: "Login",
                btn2Text: "Cancel",

                btn1Handler: () =>
                    navigate("/login"),

                btn2Handler: () =>
                    setConfirmationModal(null)

            })
        }
    }

   // if user is enrolled in course  and logged in 
    const isEnrolled =
        user &&
        course?.studentsEnrolled?.includes(user?._id)


    return (

        <div className="overflow-hidden rounded-md border border-richblack-700 bg-richblack-800 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">

            <div className="w-full">

                <img
                    src={course?.thumbnail}
                    alt="course"
                    className="h-[220px] w-full object-cover"
                />

            </div>


            <div className="p-5">

                <div className="mb-5">

                    <span className="text-3xl font-semibold text-richblack-5">
                        ₹{course?.price}
                    </span>

                </div>


                <button
                    onClick={
                        isEnrolled
                            ? () =>
                                navigate(
                                    "/dashboard/enrolled-courses"
                                )
                            : handleBuyCourse
                    }
                    className="w-full rounded-md bg-yellow-50 px-6 py-3 font-semibold text-richblack-900 transition-all duration-200 hover:scale-[0.98] hover:bg-yellow-100"
                >
                    {
                        isEnrolled
                            ? "Go to Course"
                            : "Buy Now"
                    }
                </button>


                {
                    !isEnrolled && (

                        <button
                            onClick={handleAddToCart}
                            className="mt-3 w-full rounded-md border border-richblack-600 bg-richblack-700 px-6 py-3 font-semibold text-richblack-5 transition-all duration-200 hover:bg-richblack-600"
                        >
                            Add to Cart
                        </button>

                    )
                }


                <button
                    onClick={handleShare}
                    className="mt-4 w-full py-2 text-sm font-medium text-yellow-50 hover:text-yellow-100"
                >
                    Share
                </button>


                <div className="mt-5 border-t border-richblack-600 pt-5">

                    <p className="mb-3 text-sm font-semibold text-richblack-5">
                        This course includes:
                    </p>

                    <ul className="space-y-2 text-sm text-richblack-300">

                        <li>• Lifetime access</li>
                        <li>• Course videos</li>
                        <li>• Access on mobile and desktop</li>

                    </ul>

                </div>

            </div>

        </div>
    )
}

export default CourseDetailsCard