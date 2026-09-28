
import toast from 'react-hot-toast'
import {paymentApiEndpoints} from '../apiEndpoints'
import { apiConnector } from '../apiConnector'
import {setPaymentLoading} from '../../reducer/slices/courseSlice'

import { resetCart } from '../../reducer/slices/cartSlice'
const {COURSE_PAYMENT_API,  PAYMENT_VERIFY_API,  PAYMENT_SUCCESS_EMAIL_API} = paymentApiEndpoints

function loadScript(src)
{
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = src

        script.onload = ()=>{
            resolve(true)
        }

        script.onerror =()=>{
            resolve(false)

        }

        document.body.appendChild(script)
    })
}


export async function buyCourse(token, courses,userDetails,navigate,dispatch )
{
    const toastId = toast.loading("loading...")
    try{

        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        
        if(!res)
        {
            toast.error("Razorpay sdk failed to load")
            return
        }

        //inititate the order
        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,
            {courses},
            {Authorization: `Bearer ${token}`}
        )

        if(!orderResponse.data.success)
        {
            throw new Error(orderResponse.data.message)
        }

        //options
        const options ={
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount : `${orderResponse.data.data.amount}`,
            order_id : orderResponse.data.data.id,
            name:"StudyNotion",
            description :"Thank you for purchasing the course",
            
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler : function(response)
            {
                //send successfull wala mail
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token)
                //verify payment 
                verifyPayment({...response,courses}, token,navigate,dispatch)

            }
        }

        const paymentObject = new window.Razorpay(options)

        paymentObject.open()

    
    }
    catch(error)
    {
        console.log("payment api error",error)
        toast.error("could not make payment")
    }
    toast.dismiss(toastId)

}


//send payment success email
async function sendPaymentSuccessEmail(response, amount,token)
{
    try{
        await apiConnector("POST",   PAYMENT_SUCCESS_EMAIL_API,{
            orderId : response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        },{
            Authorization : `Bearer ${token}`
        })

    }
    catch(error)
    {
        console.log("payment success email error",error)
    }
}


//verify payment
 async function verifyPayment(bodyData, token, navigate, dispatch)
{
    const toastId = toast.loading("Verifying payment")
    dispatch(setPaymentLoading(true))

    try{
        const response = await apiConnector("POST", PAYMENT_VERIFY_API ,bodyData,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success)
        {
            throw new Error(response.data.message)
        }

        toast.success("Payment successfull")
        navigate('/dashboard/enrolled-courses')
        dispatch(resetCart())
    }
    catch(error)
    {
        console.log("Payment verfy error ",error)
        toast.error(" payment verification failed")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}