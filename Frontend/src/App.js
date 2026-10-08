
import {Route,Routes} from 'react-router-dom'
import Navbar from '../src/components/common/Navbar'
import Login from './components/core/Auth/LoginForm'
import Signup from './pages/Signup'
import PublicRoute from './components/core/Auth/PublicRoute'
import Home from './pages/Home'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import MyProfile from './components/core/Dashboard/MyProfile'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Error from './pages/Error'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import Cart from './components/core/Dashboard/Cart'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/constants'
import AddCourse from './components/core/Dashboard/AddCourse'
import MyCourses from './components/core/Dashboard/MyCourses'
import Category from './pages/Category'
import CourseDetails from './pages/CourseDetails'
import ViewCourse from './pages/ViewCourse'
import VideoDetails from './components/core/ViewCourse/VideoDetails'
import InstructorDash from './components/core/Dashboard/InstructorDashboard/InstructorDash'


function App()
{

   const { user } = useSelector((state) => state.profile)

    return(

        <div className="w-full min-h-screen bg-richblack-900 flex flex-col font-inter">
          
          <Navbar></Navbar>
           <Routes>
             <Route path='/' element={<Home></Home>}></Route>
             <Route path='/category/:categoryName' element={<Category></Category>}></Route>
              <Route path="courses/:courseId" element={<CourseDetails/>} />
             

             {/* login route */}
             <Route path='/login' element={
                  <PublicRoute>
                    <Login></Login>
                  </PublicRoute>
             }></Route>
               
               {/* signup route */}
             <Route path='/signup' element={
                  <PublicRoute>
                    <Signup></Signup>
                  </PublicRoute>
             }></Route>

             {/* verify email */}
              <Route path='/verify-email' element={
                  <PublicRoute>
                    <VerifyEmail></VerifyEmail>
                  </PublicRoute>
             }></Route>


              {/* forgot password */}
             <Route path='forgot-password' element={
                <PublicRoute>
                  <ForgotPassword></ForgotPassword>
                </PublicRoute>
             }></Route> 

             {/* update password  */}
                  <Route path='update-password/:id' element={
                    <PublicRoute>
                      <UpdatePassword></UpdatePassword>
                    </PublicRoute>
                }></Route> 

                {/* error page */}
               <Route path='*' element={<Error></Error>}></Route> 

               

              {/* contact us  */}
              {/*               
              <Route path='/contact' element={<Contact></Contact>}></Route> */}


              {/*Private routes dashboard  */}

               <Route element={
                   <PrivateRoute>
                     <Dashboard></Dashboard>
                   </PrivateRoute>
                   
                   }>

                   <Route path='dashboard/my-profile' element={<MyProfile></MyProfile>}></Route>
                   {/* <Route path='dashboard/Settings' element={<Settings></Settings>}></Route> */}

                  {/* student routes */}
                   {
                      user?.accountType === ACCOUNT_TYPE.STUDENT && (

                        <>
                         <Route path='dashboard/enrolled-courses' element={<EnrolledCourses></EnrolledCourses>}></Route>
                          <Route path='dashboard/cart' element={<Cart></Cart>}></Route>
                        </>
                            
                      )
                   }

                   {/* instructor routes */}
                   {
                    user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                      <>
                        <Route path='dashboard/add-course' element={<AddCourse></AddCourse> }></Route>
                        <Route path='dashboard/my-courses' element={<MyCourses></MyCourses>}></Route>
                        <Route path="dashboard/instructor-dashboard" element ={<InstructorDash></InstructorDash>}></Route>
                      </>
                    )
                   }
                   
                   
                </Route>

                {/* view course routes */}
                <Route element={
                    <PrivateRoute>
                      <ViewCourse></ViewCourse>
                    </PrivateRoute> }>

                    {
                      user?.accountType === ACCOUNT_TYPE.STUDENT && (
                        <>
                          <Route
                           path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId'
                           element={<VideoDetails></VideoDetails>}
                           >
                            
                          </Route>
                        </>
                      )
                    }
               </Route>
               
              

              


           </Routes>

        </div>
    )
}


export default App 