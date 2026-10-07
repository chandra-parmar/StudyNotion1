import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import Button from "../components/core/HomePage/Button";
import Banner from '../assets/Images/banner.mp4'
import CodeBlockAnimation from "../components/core/HomePage/CodeBlockAnimation";
import Logo1 from '../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../assets/TimeLineLogo/Logo4.svg'
import Timeline from '../components/core/HomePage/Timeline'
import TimelineImg from '../assets/Images/TimelineImage.png'
import bgGrid from '../assets/Images/bghome.svg'
import kyp from '../assets/Images/Know_your_progress.png'
import pyl from '../assets/Images/Plan_your_lessons.png'
import cwo from '../assets/Images/Compare_with_others.png'
import InstructorImg from '../assets/Images/Instructor.png'
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";


const Home = () => {
    return (
        <div>

            {/* section 1  */}
            <div className=" mt-10 relative mx-auto flex w-11/12 flex-col items-center gap-4 text-white">

                

                    
                      {/* <div className="rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95">
                        <div className="mt-12 flex flex-row items-center gap-1 rounded-full px-6 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 sm:mt-16 sm:px-8 lg:mt-20 lg:px-10">
                        <Link to={'/signup'} className="group mx-auto w-fit">
                             Become an Instructor
                           <FaArrowRight />
                        </Link>
                         
                        </div>
                      </div> */}
                    {/* become instructor button */}

                     <Link
                          to="/signup"
                          className="group mt-12 inline-flex items-center gap-2 rounded-full bg-richblack-800 px-6 py-[6px] font-bold text-richblack-200 transition-all duration-200 hover:scale-95 hover:bg-richblack-900 sm:mt-16 sm:px-8 lg:mt-20 lg:px-10"
                        >
                          <span>Become an Instructor</span>
                          <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                    
                

                <h2 className="mt-7 text-center text-3xl font-semibold sm:text-4xl">Empower your future with 
                <HighlightText text={"Coding Skills"}></HighlightText></h2>

                <p className="text-center text-sm sm:text-base">With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a <br></br> wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors</p>

                <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">

                    <Button active={true} linkto={"/signup"} text={"Learn More"}></Button>

                    <Button active={false} linkto={"/login"} text={"Book a demo"}></Button>
                </div>

                {/* video */}

                <div className="mx-auto my-12 mt-10 max-w-4xl overflow-hidden rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                    <video
                        muted
                        loop
                        autoPlay
                        className="w-full h-auto object-cover"
                    >
                     <source src={Banner} type='video/mp4'></source>
                    </video>
                </div>

                {/* code section 1 animation html */}

                <div className="flex w-full flex-col justify-between lg:flex-row">
                  <CodeBlockAnimation

                     heading ={
                      <div className="text-4xl font-semibold">
                        Unlock your 
                        <HighlightText text={"coding potential"}></HighlightText>
                        
                        with our online courses.
                      </div>
                     }
                      
                      subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                      button1={
                        {
                          button1Text :"Try it yourself",
                          linkto: "/signup",
                          active: true
                        }
                      }

                      button2={
                        {
                          button2Text :"Learn more",
                          linkto: "/login",
                          active: false
                        }
                      }

                      htmlCodeBlock= {`<!DOCTYPE html> \n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a>\n<ahref="three/">Three</a>\n/nav>`}
                      codeColor = {"text-yellow-25"}
                  ></CodeBlockAnimation>

                </div>



                 


            </div>

            {/* section 2  */}
            <div className="bg-pure-greys-5 text-richblack-700">
               
               <div className="h-auto min-h-[260px] sm:min-h-[310px]" style={{ backgroundImage : `url(${bgGrid})`}}>
                   
                   <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between mt-10 ">
                      
                      {/* buttons TODO: catalog*/}
                     <div className="mt-20 flex flex-col items-center justify-center gap-8 text-white sm:mt-24 lg:mt-28">

                        <div className="flex h-auto flex-col items-center justify-center gap-4 sm:gap-6 lg:h-[250px] lg:flex-row lg:gap-9">

                          
                              <Button active={true} text={"Explore Courses"} >

                                <div className="flex flex-row items-center gap-3 ">Explore all Courses
                                  <FaArrowRight></FaArrowRight>
                                </div>
                              
                              </Button>

                              <Button active={false} linkto={'/signup'} text={"Learn more"}>
                              
                              </Button>

                          </div>
                      </div>
                   </div>
               </div>
               
               {/* get skills get section  */}

               <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
                 
                 <div className="mt-14 mb-10 flex flex-col gap-8 md:mt-[95px] md:flex-row md:items-start">
                    
                    <div className="w-full md:ml-[50px] md:w-1/2">
                       <h1 className="w-full text-3xl font-semibold sm:text-4xl md:w-[65%]">Get the skills you need for a 
                         <HighlightText text={"job that is in demand"}></HighlightText>
                       </h1>
                    </div>
                    

                    <div className="flex w-full flex-col gap-6 md:w-[40%] md:gap-10">
                       <p className="text-richblack-900 text-[16px]">The modern StudyNotion is the dictates its own terms. Today, to be a
                       competitive specialist requires more than professional skills.</p>

                       <Button active={true} linkto={'/signup'} text={"Learn more"} ></Button>
                    </div>

                 </div>
               </div>

               {/* timeline section */}

               <div className="mx-auto mt-9 flex w-11/12 max-w-maxContent flex-col items-center gap-10 py-12 lg:flex-row">

                  <div className="flex w-full flex-col gap-8 md:gap-11 lg:ml-12 lg:w-[45%]">
                  
                      <Timeline logo={Logo1} heading={"Leadership"}
                      para={"Fully commited to the success company"}
                      ></Timeline>

                      <Timeline logo={Logo2} heading={"Responsibilty"}
                      para={"Students will always be our top priority"}
                      ></Timeline>

                      <Timeline logo={Logo3} heading={"Flexibilty"}
                      para={"The ability to switch is an important skills"}
                      ></Timeline>

                      <Timeline logo={Logo4} heading={"Solve the problem"}
                      para={"Code your way to a solution"}
                      ></Timeline>
                  </div>

                  {/*   Insert image  */}

                  <div className="relative w-full max-w-xl shadow-blue-200">
                    <img src={TimelineImg} alt="timelineimg" className="h-fit w-full object-cover shadow-white"></img>

                  {/* green box */}
                    <div className="relative bottom-0 left-0 mt-6 flex flex-col bg-caribbeangreen-700 px-4 py-6 text-white uppercase sm:px-6 md:flex-row md:items-center md:justify-center lg:absolute lg:bottom-[-8%] lg:left-[20%] lg:mt-0 lg:px-0 lg:py-10">
                       <div className="flex flex-row items-center gap-5 border-b border-caribbeangreen-300 px-4 pb-4 md:border-b-0 md:border-r md:px-7 md:pb-0">
                          <p className="text-3xl font-bold">10</p>
                          <p className="text-caribbeangreen-300 text-sm">Years <br></br> experience</p>
                       </div>

                          <div className="flex items-center gap-5 px-4 pt-4 md:px-7 md:pt-0">
                              <p className="text-3xl font-bold">250</p>
                              <p className="text-caribbeangreen-300 text-sm">types <br></br> of Courses</p>
                          </div>

                    </div>

                 


                  </div>

                  
                   
               </div>

                  {/* section 2 */}
               
               {/* swiss knife */}
                  <div className="mt-16 flex w-11/12 flex-col gap-5">
                    
                    <div>
                           <h1 className="text-center text-3xl font-semibold sm:text-4xl">Your swiss Knife  
                           <HighlightText text="for learning any Tech skills"></HighlightText></h1>

                           <p className="mt-3 text-center text-richblack-600">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over,
                            <br></br> progress tracking, custom schedule and more.</p>
                    </div>
                 
                      {/* imges */}
                     <div className="mt-7 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-0">
                         <img src={kyp} alt="know your progress" className="w-full max-w-xs object-contain md:-mr-20"></img>
                         <img src={cwo} alt="compare with other" className="w-full max-w-xs object-contain md:-mx-16" ></img>
                          <img src={pyl} alt="plan your lessons" className="w-full max-w-xs object-contain md:-ml-20"></img>
                     </div>

                  </div>



                {/* section 3 instructor and review slider */}
                <div className="w-full bg-richblack-900 py-16">
                   
                   {/* Instructor section */}
                    <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-10 lg:flex-row lg:gap-12">

                         <div className="w-full lg:w-[45%]">
                          <img src={InstructorImg} alt="instructor" className="w-full rounded-lg object-cover shadow-lg"></img>
                         </div>

                          <div className="flex w-full flex-col gap-6 text-white lg:w-[55%]">
                            <h2 className="text-center text-3xl font-semibold sm:text-4xl lg:text-left">Become an <br></br>
                            <HighlightText text={" instructor"}></HighlightText></h2>

                            <p className="text-center text-[16px] text-richblack-200 lg:text-left">Instructors from around the world teach millions of students on <br></br>StudyNotion. We provide the tools and skills to teach what you <br></br> love</p>

                            <Link to={'/signup'} className="mx-auto lg:mx-0">
                              <Button active={true} text={"Start Teaching Today"}></Button>
                            </Link>
                          </div>
                    </div>
                        
                        {/* TOD review slider */}
                        <div>
                          <h1 className="mt-11 text-center text-3xl font-bold text-white sm:text-4xl">Review from other learers</h1>
                          <ReviewSlider></ReviewSlider>
                        </div>

                     

                </div>

                {/* section 4 Footer */}
                 
                <Footer></Footer>


            </div>

         


        </div>
    )
}


export default Home
