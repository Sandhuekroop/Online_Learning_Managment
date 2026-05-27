// import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react';
// import { Button } from '@/@/components/ui/button'
// import Image from 'next/image'
// import React from 'react'
// import { Progress } from '@/@/components/ui/progress';
// import Link from 'next/link';

// function EnrollCourseCard({ course, enrollCourse }) {
//   const courseJson = course?.courseJson?.course;

//   // const CalculatePerProgress=()=>{
//   //   return (enrollCourse?.completedChapters?.length??0/course?.courseContent?.length)*100
//   // }

//   // const CalculatePerProgress = () => {
//   //   const completed = enrollCourse?.completedChapters?.length ?? 0;
//   //   const total = course?.courseContent?.length ?? 1; // avoid division by zero
//   //   return ((completed / total) * 100).toFixed(0); // rounded percentage
//   // };

//   //  const CalculatePerProgress = () => {
//   //   const completed = enrollCourse?.completedChapters?.length ?? 0;
//   //   const total = Array.isArray(course?.courseContent)
//   //     ? course.courseContent.length
//   //     : Object.keys(course?.courseContent || {}).length || 1;

//   //   return ((completed / total) * 100).toFixed(0);
//   // };
 
// //   const CalculatePerProgress = () => {
// //   // Ensure completedChapters is parsed from JSON
// //   let completedChapters = [];

// //   try {
// //     if (typeof enrollCourse?.completedChapters === "string") {
// //       completedChapters = JSON.parse(enrollCourse.completedChapters);
// //     } else if (Array.isArray(enrollCourse?.completedChapters)) {
// //       completedChapters = enrollCourse.completedChapters;
// //     }
// //   } catch (e) {
// //     console.error("Error parsing completedChapters:", e);
// //   }

// //   const completed = completedChapters?.length ?? 0;

// //   const total = Array.isArray(course?.courseContent)
// //     ? course.courseContent.length
// //     : Object.keys(course?.courseContent || {}).length || 1;

// //   console.log("Completed Chapters:", completed);
// //   console.log("Total Chapters:", total);
// //   console.log("Calculated Progress:", ((completed / total) * 100).toFixed(0));

// //   return ((completed / total) * 100).toFixed(0);
// // };

// //   console.log("Course Content:", course?.courseContent);
// //   console.log("Completed Chapters:", enrollCourse?.completedChapters);
// // console.log("Total Chapters:", course?.courseContent?.length);
// // console.log("Calculated Progress:", CalculatePerProgress());

// const CalculatePerProgress = () => {
//   // Ensure completedChapters is parsed from JSON
//   let completedChapters = [];

//   try {
//     if (typeof enrollCourse?.completedChapters === "string") {
//       completedChapters = JSON.parse(enrollCourse.completedChapters);
//     } else if (Array.isArray(enrollCourse?.completedChapters)) {
//       completedChapters = enrollCourse.completedChapters;
//     }
//   } catch (e) {
//     console.error("Error parsing completedChapters:", e);
//   }

//   const completed = completedChapters?.length ?? 0;

//   const total = Array.isArray(course?.courseContent)
//     ? course.courseContent.length
//     : Object.keys(course?.courseContent || {}).length || 1;

//   console.log("Completed Chapters:", completed);
//   console.log("Total Chapters:", total);
//   console.log("Calculated Progress:", ((completed / total) * 100).toFixed(0));

//   return ((completed / total) * 100).toFixed(0);
// };

//   return (

//     <div className='shadow rounded-xl'>
//       <Image 
//       src={course?.bannerImageUrl} 
//       alt={course?.name}
//       width={400}
//       height={300}
//         className='w-full aspect-video rounded-t-xl object-cover'
//       />

//       <div className='p-3 flex flex-col gap-3'>
//         <h2 className='font-bold text-lg'>{courseJson?.name}</h2>
//         <p className='line-clamp-3 text-gray-400 text-sm'>{courseJson?.description}</p>
//         <div className=''>
//           <h2 className='flex justify-between text-sm text-primary'>
//             Progress <span>{CalculatePerProgress()}%</span>
//           </h2>
//           <Progress value={CalculatePerProgress()} />

//           <Link href={'/workspace/view-course/' + course?.cid}>
//             <Button className={'w-full mt-3'}><PlayCircle /> Continue Learning </Button>
//           </Link>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default EnrollCourseCard


/// this is good 
// import { PlayCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import React from 'react';
// import { Progress } from '@/components/ui/progress';
// import Link from 'next/link';

// function EnrollCourseCard({ course, enrollCourse }) {
//   const courseJson = course?.courseJson?.course;

//   // ✅ Correct progress calculation
//   const CalculatePerProgress = () => {
//     let completedChapters = [];

//     try {
//       if (typeof enrollCourse?.completedChapters === 'string') {
//         completedChapters = JSON.parse(enrollCourse.completedChapters);
//       } else if (Array.isArray(enrollCourse?.completedChapters)) {
//         completedChapters = enrollCourse.completedChapters;
//         // console.log("Completed Chapters Array 1:", completedChapters);
//       }
//     } catch (e) {
//       console.error('Error parsing completedChapters:', e);
//       completedChapters = [];
//     }

//     const completed = completedChapters?.length ?? 0;
//     const total = Array.isArray(course?.courseContent)
//       ? course.courseContent.length
//       : Object.keys(course?.courseContent || {}).length || 1;

//     const percentage = ((completed / total) * 100).toFixed(0);
//     return percentage;
//   };

//   const progress = CalculatePerProgress();

//   return (
//     <div className="shadow rounded-xl">
//       <Image
//         src={course?.bannerImageUrl}
//         alt={course?.name}
//         width={400}
//         height={300}
//         className="w-full aspect-video rounded-t-xl object-cover"
//       />

//       <div className="p-3 flex flex-col gap-3">
//         <h2 className="font-bold text-lg">{courseJson?.name}</h2>
//         <p className="line-clamp-3 text-gray-400 text-sm">{courseJson?.description}</p>

//         <div>
//           <h2 className="flex justify-between text-sm text-primary">
//             Progress <span>{progress}%</span>
//           </h2>
//           <Progress value={progress} />

//           <Link href={`/workspace/view-course/${course?.cid}`}>
//             <Button className="w-full mt-3">
//               <PlayCircle /> Continue Learning
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EnrollCourseCard;

// this is new 
"use client"
import { PlayCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

function EnrollCourseCard({ course, enrollCourse }) {
  const [loading, setLoading] = useState(false);

  const courseJson = course?.courseJson?.course;

  const CalculatePerProgress = () => {
    let completedChapters = [];

    try {
      if (typeof enrollCourse?.completedChapters === 'string') {
        completedChapters = JSON.parse(enrollCourse.completedChapters);
      } else if (Array.isArray(enrollCourse?.completedChapters)) {
        completedChapters = enrollCourse.completedChapters;
      }
    } catch (e) {
      console.error('Error parsing completedChapters:', e);
      completedChapters = [];
    }

    const completed = completedChapters?.length ?? 0;
    const total = Array.isArray(course?.courseContent)
      ? course.courseContent.length
      : Object.keys(course?.courseContent || {}).length || 1;

    return ((completed / total) * 100).toFixed(0);
  };

  const progress = CalculatePerProgress();

  return (
    <div className="shadow rounded-xl">
      <Image
        src={course?.bannerImageUrl}
        alt={course?.name}
        width={400}
        height={300}
        className="w-full aspect-video rounded-t-xl object-cover"
      />

      <div className="p-3 flex flex-col gap-3">
        <h2 className="font-bold text-lg">{courseJson?.name}</h2>
        <p className="line-clamp-3 text-gray-400 text-sm">{courseJson?.description}</p>

        <div>
          <h2 className="flex justify-between text-sm text-primary">
            Progress <span>{progress}%</span>
          </h2>
          <Progress value={progress} />

          <Link
            href={`/workspace/view-course/${course?.cid}`}
            onClick={() => setLoading(true)}
          >
            <Button className="w-full mt-3" disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <PlayCircle /> Continue Learning
                </>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnrollCourseCard;


// import { PlayCircle } from 'lucide-react';
// import { Button } from '@/@/components/ui/button';
// import Image from 'next/image';
// import React from 'react';
// import { Progress } from '@/@/components/ui/progress';
// import Link from 'next/link';

// function EnrollCourseCard({ course, enrollCourse }) {
//   // ✅ Handle completed chapters safely
//   const completedCount = Array.isArray(enrollCourse?.completedChapters)
//     ? enrollCourse.completedChapters.length
//     : 0;

//   // ✅ Total chapters (from courseContent or noOfChapters)
//   const totalCount =
//     Array.isArray(course?.courseContent)
//       ? course.courseContent.length
//       : course?.noOfChapters || 1;

//   // ✅ Calculate percentage
//   const progress = ((completedCount / totalCount) * 100).toFixed(0);

//   return (
//     <div className="shadow rounded-xl">
//       <Image
//         src={course?.bannerImageUrl}
//         alt={course?.name}
//         width={400}
//         height={300}
//         className="w-full aspect-video rounded-t-xl object-cover"
//       />

//       <div className="p-3 flex flex-col gap-3">
//         <h2 className="font-bold text-lg">{course?.name}</h2>
//         <p className="line-clamp-3 text-gray-400 text-sm">{course?.description}</p>

//         <div>
//           <h2 className="flex justify-between text-sm text-primary">
//             Progress <span>{progress}%</span>
//           </h2>
//           <Progress value={progress} />

//           <p className="text-xs text-gray-500 mt-1">
//             {completedCount}/{totalCount} Chapters Completed
//           </p>

//           <Link href={`/workspace/view-course/${course?.cid}`}>
//             <Button className="w-full mt-3">
//               <PlayCircle /> Continue Learning
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EnrollCourseCard;
