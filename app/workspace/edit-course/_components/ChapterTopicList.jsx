// import { Gift } from 'lucide-react';
// import React from 'react'

// function ChapterTopicList({ course }) {
//     const courseLayout = course?.courseJson?.course;
//     return (
//         <div>
//             <h2 className='font-bold text-3xl mt-10'>  Chapters & Topics</h2>
//             <div className="flex flex-col items-center justify-center mt-10">
//                 {courseLayout?.chapters.map((chapter, index) => (
//                     <div key={index} className="flex flex-col items-center">
//                         <div className="p-4 border shadow rounded-xl bg-primary text-white">
//                             <h2 className="text-center">Chapter {index + 1}</h2>
//                             <h2 className="font-bold text-lg text-center">
//                                 {chapter.chapterName}
//                             </h2>
//                             <h2 className="text-xs flex justify-between gap-16">
//                                 <span>Duration: {chapter?.duration}</span>
//                                 <span>No. Of Topics: {chapter?.topics?.length}</span>
//                             </h2>
//                         </div>

//                         <div>
//                             {chapter?.topics.map((topic, index) => (
//                                 <div
//                                     className="flex flex-col items-center"
//                                     key={index}
//                                 >
//                                     <div className="h-10 bg-gray-300 w-1"></div>

//                                     <div className="flex items-center gap-5">
//                                         <span
//                                             className={`${index % 2 === 0 && "text-transparent"
//                                                 } max-w-xs`}
//                                         >
//                                             {topic}
//                                         </span>

//                                         <h2 className="text-center rounded-full bg-gray-300 px-6 text-gray-500 p-4">
//                                             {index + 1}
//                                         </h2>

//                                         <span
//                                             className={`${index % 2 !== 0 && "text-transparent"
//                                                 } max-w-xs`}
//                                         >
//                                             {topic}
//                                         </span>
//                                     </div>

//                                     {index === chapter?.topics?.length - 1 && <div className="h-10 bg-gray-300 w-1"></div>}
//                                     {index === chapter?.topics?.length - 1 && <div className="flex flex-col items-center gap-5">

//                                         <Gift className="text-center rounded-full bg-gray-300 h-14 w-14 text-gray-500 p-4" />
//                                     </div>
//                                     }
//                                     {index === chapter?.topics?.length - 1 && <div className="h-10 bg-gray-300 w-1"></div>}

//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}

//                 <div className="p-4 border shadow rounded-xl bg-green-600 text-white mt-6">
//                     <h2>Finish</h2>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ChapterTopicList

"use client";
import { Gift } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';  // ✅ import router

function ChapterTopicList({ course }) {
const courseLayout = course?.courseJson?.course || course;

  const router = useRouter();  // ✅ initialize router

  // ✅ handle navigation
  const handleFinish = () => {
    router.push('/workspace');
  };

  return (
    <div>
      <h2 className='font-bold text-3xl mt-10'>Chapters & Topics</h2>
      <div className="flex flex-col items-center justify-center mt-10">
        {courseLayout?.chapters.map((chapter, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="p-4 border shadow rounded-xl bg-primary text-white">
              <h2 className="text-center">Chapter {index + 1}</h2>
              <h2 className="font-bold text-lg text-center">
                {chapter.chapterName}
              </h2>
              <h2 className="text-xs flex justify-between gap-16">
                <span>Duration: {chapter?.duration}</span>
                <span>No. Of Topics: {chapter?.topics?.length}</span>
              </h2>
            </div>

            <div>
              {chapter?.topics.map((topic, index_) => (
                <div
                  className="flex flex-col items-center"
                  key={index_}
                >
                  {/* Top vertical line */}
                  <div className="h-10 bg-gray-300 w-1"></div>
                   {/* Topic row */}
                  <div className="flex items-center gap-5">
                          {/* Left text (visible only on even index) */}
                    <span
                      className={`${index_ % 2 === 0 && "text-transparent"} max-w-xs`}
                    >
                      {topic}
                    </span>
                      {/* Number circle */}
                    <h2 className="text-center rounded-full bg-gray-300 px-6 text-gray-500 p-4">
                      {index_ + 1}
                    </h2>
                     {/* Right text (visible only on odd index) */}
                    <span
                      className={`${index_ % 2 !== 0 && "text-transparent"} max-w-xs`}
                    >
                      {topic}
                    </span>
                  </div>
                   {/* If this is the last topic → show GIFT ICON */}
                  {index_ === chapter?.topics?.length - 1 && (
                    <>
                      <div className="h-10 bg-gray-300 w-1"></div>
                      <div className="flex flex-col items-center gap-5">
                        <Gift className="text-center rounded-full bg-gray-300 h-14 w-14 text-gray-500 p-4" />
                      </div>
                      <div className="h-10 bg-gray-300 w-1"></div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ✅ Finish button */}
        <div
          onClick={handleFinish}
          className="p-4 border shadow rounded-xl bg-green-600 text-white mt-6 cursor-pointer hover:bg-green-700 transition"
        >
          <h2>Finish</h2>
        </div>
      </div>
    </div>
  );
}

export default ChapterTopicList;
