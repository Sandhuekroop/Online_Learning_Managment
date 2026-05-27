// import { Book, Clock, Loader2Icon, PlayCircleIcon, Settings, TrendingUp } from 'lucide-react';
// import Image from 'next/image';
// import React, { useState } from 'react'
// import {Button} from '@/@/components/ui/button'
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { toast } from "sonner"
// import Link from 'next/link';

// function CourseInfo({ course, viewCourse }) {
//     const courseLayout = course?.courseJson?.course;
//     const [loading,setLoading]=useState(false);
//     const router=useRouter();

//     const GenerateCourseContent=async()=>{
//         //call api to generate content

//         setLoading(true)
//        try{
//         const result=await axios.post('/api/generate-course-content',{
//             courseJSON:courseLayout,
//             courseTitle:course?.name,
//             courseId:course?.cid
//         });
//         console.log(result.data);
//         setLoading(false);
//         router.replace('/workspace')
//         toast.success('Course Generated successfully')
//         }
//         catch(e){
//             console.log(e);
//         setLoading(false);
//         toast.error("Server Side Error, Try Again!")
//         }
        
//     }
//     return (
//         <div className=' md:flex gap-5 justify-between p-5 rounded-2xl shadow'>
//             <div className='flex flex-col gap-3'>
//                 <h2 className='font-bold text-3xl'>{courseLayout?.name}</h2>
//                 <p className='line-clamp-2 text-gray-500'> {courseLayout?.description}</p>

//                 <div className='grid grid-cols-1 md:grid-cols-3 gap-5 '>
//                     <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
//                         <Clock className='text-blue-500' />
//                         <section>
//                             <h2 className='font-bold'>Duration</h2>
//                             <h2> 2 Hours</h2>
//                         </section>
//                     </div>
//                     <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
//                         <Book className='text-green-500' />
//                         <section>
//                             <h2 className='font-bold'>Chapters</h2>
//                             <h2> 2 Hours</h2>
//                         </section>
//                     </div>
//                    <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
//                     <TrendingUp className='text-red-500'/>
//                     <section>
//                         <h2 className='font-bold'>Difficulty Level</h2>
//                         <h2> {course?.level}</h2>
//                     </section>
//                 </div>
//                 </div>
              
//             {!viewCourse ?
//              <Button className={'max-w-lg'} onClick={GenerateCourseContent}
//               disabled={loading}>
//               {loading? <Loader2Icon className='animate-spin'/> : <Settings/>}
//               Generate Content</Button> 
//               : <Link href={'/course/'+course?.cid}> <Button> <PlayCircleIcon/> Continue Learning </Button></Link>}
              
//             </div>
//             {/* <Image src={course?.bannerImageUrl} alt={'banner Image'}
//             width={400}
//             height={400}
//             className='w-full mt-5 md:mt-0 object-cover aspect-auto h-[240px] rounded-2xl '
//             /> */}
//             {course?.bannerImageUrl ? (
//   <Image
//     src={course.bannerImageUrl}
//     alt="banner Image"
//     width={400}
//     height={400}
//     className="w-full mt-5 md:mt-0 object-cover h-[240px] rounded-2xl"
//   />
// ) : (
//   <div className="w-full mt-5 md:mt-0 h-[240px] rounded-2xl bg-gray-200 flex items-center justify-center">
//     <span className="text-gray-500">No Image Available</span>
//   </div>
// )}
//         </div>
//     )
// }

// export default CourseInfo

"use client";
import { Book, Clock, Loader2Icon, PlayCircleIcon, Settings, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import Link from 'next/link';
import { Progress } from '@/components/ui/progress'; // ✅ import Progress bar

function CourseInfo({ course, viewCourse, enrollCourse }) {
  const [btnLoading, setBtnLoading] = useState(false);  //new added

  const courseLayout = course?.courseJson?.course;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Progress Calculation (like EnrollCourseCard)
 // ✅ Correct progress calculation
// 1.12.25 old 
  // const CalculatePerProgress = () => {
  //   let completedChapters = [];

  //   try {
  //     if (typeof enrollCourse?.completedChapters === 'string') {
  //       completedChapters = JSON.parse(enrollCourse.completedChapters);
  //     } else if (Array.isArray(enrollCourse?.completedChapters)) {
  //       completedChapters = enrollCourse.completedChapters;
  //       console.log("Completed Chapters Array 1:", completedChapters);
  //     }
  //   } catch (e) {
  //     console.error('Error parsing completedChapters:', e);
  //     completedChapters = [];
  //   }

  //   const completed = completedChapters?.length ?? 0;
  //   const total = Array.isArray(course?.courseContent)
  //     ? course.courseContent.length
  //     : Object.keys(course?.courseContent || {}).length || 1;

  //   const percentage = ((completed / total) * 100).toFixed(0);
  //   return percentage;
  // };
//   const CalculatePerProgress = () => {
//   let completedChapters = [];

//   try {
//     if (typeof enrollCourse?.completedChapters === "string") {
//       completedChapters = JSON.parse(enrollCourse.completedChapters);
//     } else if (Array.isArray(enrollCourse?.completedChapters)) {
//       completedChapters = enrollCourse.completedChapters;
//     }
//   } catch (e) {
//     console.error("completedChapters parse error:", e);
//   }

//   const completed = completedChapters.length ?? 0;

//   const total = Array.isArray(course?.courseContent)
//     ? course.courseContent.length
//     : Object.keys(course?.courseContent || {}).length || 1;

//   return ((completed / total) * 100).toFixed(0);
// };
const CalculatePerProgress = () => {
  let completedChapters = [];

  try {
    if (typeof enrollCourse?.completedChapters === 'string') {
      completedChapters = JSON.parse(enrollCourse.completedChapters);
    } else if (Array.isArray(enrollCourse?.completedChapters)) {
      completedChapters = enrollCourse.completedChapters;
    }
  } catch (e) {
    completedChapters = [];
  }

  // deduplicate just in case
  completedChapters = Array.from(new Set(completedChapters));

  const completed = completedChapters.length;
  const total = Array.isArray(course?.courseContent)
    ? course.courseContent.length
    : Object.keys(course?.courseContent || {}).length || 1;

  return ((completed / total) * 100).toFixed(0);
};


//   const CalculatePerProgress = () => {
//   let completedChapters = [];

//   try {
//     if (typeof enrollCourse?.completedChapters === "string") {
//       completedChapters = JSON.parse(enrollCourse.completedChapters);
//     } else if (Array.isArray(enrollCourse?.completedChapters)) {
//       completedChapters = enrollCourse.completedChapters;
//     }
//   } catch {
//     completedChapters = [];
//   }

//   const completed = completedChapters.length;

//   // ✅ Correct total
//   const total = courseLayout?.chapters?.length || 1;

//   return ((completed / total) * 100).toFixed(0);
// };


  const progress = CalculatePerProgress();
  console.log("CourseInfo enrollCourse:", enrollCourse);

  const GenerateCourseContent = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/generate-course-content', {
        courseJSON: courseLayout,
        courseTitle: course?.name,
        courseId: course?.cid
      });
      console.log(result.data);
      setLoading(false);
      router.replace('/workspace');
      toast.success('Course Generated successfully');
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error("Server Side Error, Try Again!");
    }
    

  };
console.log("DEBUG >>>");
console.log("CourseInfo course:", course);
console.log("CourseInfo enrollCourse:", enrollCourse);
console.log("CourseInfo courseContent:", course?.courseContent);
console.log("EnrollCourse completedChapters raw:", enrollCourse?.completedChapters);


  return (
    <div className='md:flex gap-5 justify-between p-5 rounded-2xl shadow'>
      <div className='flex flex-col gap-3'>
        <h2 className='font-bold text-3xl'>{courseLayout?.name}</h2>
        <p className='line-clamp-2 text-gray-500'>{courseLayout?.description}</p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
            <Clock className='text-blue-500' />
            <section>
              <h2 className='font-bold'>Duration</h2>
              <h2>2 Hours</h2>
            </section>
            
          </div>
          <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
            <Book className='text-green-500' />
            <section>
              <h2 className='font-bold'>Chapters</h2>
              <h2>{courseLayout?.chapters?.length ?? 0}</h2>
            </section>
          </div>
          <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
            <TrendingUp className='text-red-500' />
            <section>
              <h2 className='font-bold'>Difficulty Level</h2>
              <h2>{course?.level}</h2>
            </section>
          </div>
        </div>

        {/* ✅ Show Progress only when viewing course */}
        {/* {viewCourse && (
          <div className='mt-4'>
            <h2 className="flex justify-between text-sm text-primary">
                       Progress <span>{progress}%</span>
                     </h2>
                     <Progress value={progress} />
          </div>
        )} */}
       {/* old */}
        {/* {!viewCourse ? (
          <Button className='max-w-lg' onClick={GenerateCourseContent} disabled={loading}>
            {loading ? <Loader2Icon className='animate-spin' /> : <Settings />}
            Generate Content
          </Button>
        ) : (
          <Link href={'/course/' + course?.cid}>
            <Button className='mt-3'>
              <PlayCircleIcon /> Continue Learning
            </Button>
          </Link>
        )} */}

        {/* new */}
        {!viewCourse ? (
  <Button className='max-w-lg' onClick={GenerateCourseContent} disabled={loading}>
    {loading ? <Loader2Icon className='animate-spin' /> : <Settings />}
    Generate Content
  </Button>
) : (
  <Link 
    href={'/course/' + course?.cid}
    onClick={() => setBtnLoading(true)}
  >
    {/* <Button className='mt-3' disabled={btnLoading}>
      {btnLoading ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <>
          <PlayCircleIcon /> Continue Learning
        </>
      )}
    </Button> */}
    <Button className='mt-3 flex items-center gap-2' disabled={btnLoading}>
  {btnLoading ? (
    <>
      <Loader2Icon className="animate-spin" />
      Continue Learning
    </>
  ) : (
    <>
      <PlayCircleIcon />
      Continue Learning
    </>
  )}
</Button>

  </Link>
)}

      </div>

      {course?.bannerImageUrl ? (
        <Image
          src={course.bannerImageUrl}
          alt='banner Image'
          width={400}
          height={400}
          className='w-full mt-5 md:mt-0 object-cover h-[240px] rounded-2xl'
        />
      ) : (
        <div className='w-full mt-5 md:mt-0 h-[240px] rounded-2xl bg-gray-200 flex items-center justify-center'>
          <span className='text-gray-500'>No Image Available</span>
        </div>
      )}
    </div>
  );
}

export default CourseInfo;
