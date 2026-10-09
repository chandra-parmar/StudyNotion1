import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

import ConfirmationModal from "../../../common/ConfirmationModal";
import { COURSE_STATUS } from "../../../../utils/constants";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";

const CourseList = ({ setCourses, courses = [] }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleCourseDelete = async (courseId) => {
    setLoading(true);

    try {
      await deleteCourse(courseId, token);

      const result = await fetchInstructorCourses(token);

      if (result) {
        setCourses(result);
      }

      setConfirmationModal(null);
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-white">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-richblack-5">
            My Courses
          </h1>
          <p className="mt-1 text-sm text-richblack-300">
            Manage, edit, and organize your courses.
          </p>
        </div>

        <span className="w-fit rounded-full bg-richblack-700 px-4 py-2 text-sm text-richblack-100">
          {courses.length} {courses.length === 1 ? "Course" : "Courses"}
        </span>
      </div>

      {/* Course List */}
      {courses.length === 0 ? (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-richblack-700 bg-richblack-800 p-8 text-center">
          <p className="text-lg font-medium text-richblack-5">
            No courses found
          </p>
          <p className="mt-2 text-sm text-richblack-300">
            Your created courses will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {courses.map((course) => (
            <div
              key={course._id}
              className="flex flex-col gap-5 rounded-xl border border-richblack-700 bg-richblack-800 p-4 transition-colors duration-200 hover:border-richblack-500 sm:p-5 lg:flex-row lg:items-center"
            >
              {/* Thumbnail */}
              <div className="w-full shrink-0 sm:w-[220px]">
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="h-[180px] w-full rounded-lg object-cover sm:h-[140px]"
                />
              </div>

              {/* Course Information */}
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h2 className="text-lg font-semibold text-richblack-5">
                  {course.courseName}
                </h2>

                <p className="line-clamp-2 text-sm leading-6 text-richblack-300">
                  {course.courseDescription}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="text-sm text-richblack-300">
                    Price:
                    <span className="ml-2 font-semibold text-richblack-5">
                      ₹{course.price}
                    </span>
                  </span>

                  <span className="text-sm text-richblack-300">
                    Duration:
                    <span className="ml-2 text-richblack-100">
                      2 hr 30 min
                    </span>
                  </span>
                </div>

                <div className="mt-1">
                  {course.status === COURSE_STATUS.DRAFT ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-pink-900/30 px-3 py-1 text-xs font-medium text-pink-200">
                      <span className="h-2 w-2 rounded-full bg-pink-300" />
                      DRAFT
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-yellow-900/30 px-3 py-1 text-xs font-medium text-yellow-200">
                      <span className="h-2 w-2 rounded-full bg-yellow-300" />
                      PUBLISHED
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-3 border-t border-richblack-700 pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    navigate(`/dashboard/edit-course/${course._id}`);
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-2.5 text-sm font-medium text-richblack-5 transition-all hover:border-yellow-50 hover:bg-richblack-600 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                  title="Edit course"
                >
                  <FiEdit2 className="text-lg text-yellow-50" />
                  Edit
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Do you want to delete this course?",
                      text2:
                        "All the data related to this course will be deleted.",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleCourseDelete(course._id),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-2.5 text-sm font-medium text-richblack-5 transition-all hover:border-pink-500 hover:bg-pink-900/20 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                  title="Delete course"
                >
                  <MdDelete className="text-xl text-pink-200" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </div>
  );
};

export default CourseList;