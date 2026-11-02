import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { resetCourseState } from '../../../../../reducer/slices/courseSlice'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI'
import { COURSE_STATUS } from '../../../../../utils/constants'
import IconBtn from '../../../../common/IconBtn'
import { setStep } from '../../../../../reducer/slices/courseSlice'

const PublishCourse = () => {

    const { register, handleSubmit, setValue, getValues } = useForm()
    const { course} = useSelector((state)=> state.course)
    const dispatch = useDispatch()
    const { token } = useSelector((state)=> state.auth)
    const [loading, setLoading ] = useState(false)

    useEffect(()=> {
        if(course?.status === COURSE_STATUS.PUBLISHED)
        {
            setValue('public',true)
        }
    })

    const goToCourses = ()=>{
        dispatch(resetCourseState())
        //navigate to dashboard my course
    }

    const handleCoursePublish = async () => {
    if (
        (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
        (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
        // No updation in form
        // No need to make API call
        goToCourses()
        return
    }

    // If form is updated
    const formData = new FormData()
    formData.append("courseId", course._id)

    const courseStatus = getValues("public")
        ? COURSE_STATUS.PUBLISHED
        : COURSE_STATUS.DRAFT

    formData.append("status", courseStatus)

    setLoading(false)
    const result = await editCourseDetails(formData, token)

    if (result) {
        goToCourses()
    }

    setLoading(false)
     }
     
    const onSubmit = ()=>{
        handleCoursePublish()

    }

    // go back
    const goBack= ()=>{
         dispatch(setStep(2))
    }

  return (

    <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700 text-white'>
      <p>Publish course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
         <div>
            <label htmlFor='public'>
            <input type='checkbox' id='public' className='rounded h-4 w-4' {...register('public')}></input>
             <span className='ml-3'>Make this course as public</span>
            </label>
         </div>

         {/* buttons */}
         <div className='flex justify-end gap-x-3'>
            <button disabled={ loading }
             type='button'
             onClick={goBack}
             className='flex items-center rounded-md bg-richblack-30 p-6'
             >Back</button>
            <IconBtn disabled={loading} text='save changes'></IconBtn>
         </div>
      </form>
    </div>
  )
}

export default PublishCourse
