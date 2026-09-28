import { useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { buyCourse } from "../../../../services/operations/paymentAPI"


const TotalAmount = () => {

    const { total, cart } = useSelector((state) => state.cart)
    const { token } = useSelector((state) => state.auth)
      const { user } = useSelector((state) => state.profile)
      const navigate = useNavigate()
      const dispatch = useDispatch()


    //   const handleBuyCourse = () => {
        
    //             if (token) {
        
    //                 buyCourse(
    //                     token,
    //                     [courseId],
    //                     user,
    //                     navigate,
    //                     dispatch
    //                 )
        
    //             } else {
        
    //                 setConfirmationModal({
        
    //                     text1: "You are not logged in",
    //                     text2: "Please login to purchase the course",
        
    //                     btn1Text: "Login",
    //                     btn2Text: "Cancel",
        
    //                     btn1Handler: () =>
    //                         navigate("/login"),
        
    //                     btn2Handler: () =>
    //                         setConfirmationModal(null)
        
    //                 })
    //             }
    //         }

    //buy course button for mutliple course 
    const handleBuyCourse = () => {

        const courses = cart.map((course) => course._id)

        console.log("bought these courses", courses)
        buyCourse(token, courses, user, navigate, dispatch)
    }



    return (

        <div className="sticky top-10 rounded-md border border-richblack-700 bg-richblack-800 p-6">

            {/* Heading */}

            <p className="text-sm font-medium text-richblack-300">
                Total
            </p>


            {/* Total price */}

            <p className="mt-2 text-3xl font-semibold text-richblack-5">

                ₹{total}

            </p>


            {/* Divider */}

            <div className="my-5 h-px bg-richblack-600" />


            {/* Buy button mutiple course in cart */}

            <button
                onClick={handleBuyCourse}
                className="w-full rounded-md bg-yellow-50 px-6 py-3 font-semibold text-richblack-900 transition-all duration-200 hover:scale-[0.98] hover:bg-yellow-100"
            >
                Buy Now
            </button>

        </div>

    )
}

export default TotalAmount