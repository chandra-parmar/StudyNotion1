import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import {MdAddCircleOutline} from "react-icons/md"

import { useDispatch, useSelector } from 'react-redux';
import {BiRightArrow} from "react-icons/bi"
import { setCourse, setEditCourse, setStep } from '../../../../../reducer/slices/courseSlice';
import { toast } from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {

  const {register, handleSubmit, setValue, formState:{errors} } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("UPDATED");
  }, [course])


// onsubmit
  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if(editSectionName) {
      //we are editing the secgtion name
      result = await updateSection(
        editSectionName,
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token
      )
    }
    else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      },token)
    }

    console.log("update result", result)

    //update values
    if(result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    //loading false
    setLoading(false);
  }

  // cancel edit button
  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  // go back button
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }


  // go to next button
  const goToNext= () => {
    if(course?.courseContent?.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    //if everything is good
    dispatch(setStep(3));
  }


  //change edit section
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId ){
      cancelEdit();
      return;
    }
    
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }


  return (

    <div className='text-white'>
      <p>Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='sectionName'>Section name <sup>*</sup></label>
          <input 
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName", {required:true})}
            className='w-full text-black'
          />
          {errors.sectionName && (
            <span>Section Name is required</span>
          )}
        </div>
        <div className='mt-10 flex w-full'>
          <IconBtn 
            type="Submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-white"}
          >
            <MdAddCircleOutline className='text-yellow-50' size={20}/>

          </IconBtn>
          {editSectionName && (
            <button
            type='button'
            onClick={cancelEdit}
            className='text-sm text-richblack-300 underline ml-10'
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>


      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className='flex justify-end gap-x-3 mt-10'>

        {/* go back button */}

        <button
            onClick={goBack}
            className='rounded-md cursor-pointer flex items-center '>
          Back
        </button>

        {/* go to next  */}
        <IconBtn text="Next" onclick={goToNext}>
          <BiRightArrow />
        </IconBtn>

      </div>
      



    </div>

  )
}

export default CourseBuilderForm
