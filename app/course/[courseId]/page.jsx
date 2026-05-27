// "use client"
// import React, { useEffect, useState } from 'react'
// import AppHeader from '../../workspace/_components/AppHeader'
// import ChapterListSidebar from '../_components/ChapterListSidebar'
// import ChapterContent from '../_components/ChapterContent'
// import ChatBox from "../_components/Chatbox";

// import axios from 'axios'
// import { useParams } from 'next/navigation'
// function Course() {
//     const {courseId}=useParams();
//     const [courseInfo,setCourseInfo]= useState();
//       useEffect(()=>{
//         GetEnrolledCourseById();
//     },[])
 
//      const GetEnrolledCourseById = async() => {
//         const result= await axios.get('/api/enroll-course?courseId='+courseId);
//         console.log(result.data);  // shows correct completed chapters
//         setCourseInfo(result.data);
//     }
//   return (
//     <div>
//         <AppHeader hideSidebar={true}/>
//         <div className='flex gap-10'>
//             <ChapterListSidebar courseInfo={courseInfo} />
//             <ChapterContent courseInfo={courseInfo} refreshData={()=> GetEnrolledCourseById() } />
//         </div>
//         {/* ⭐ Chatbox always available on Course Page */}
//       <ChatBox
//         courseInfo={courseInfo}
//         selectedChapterIndex={selectedChapterIndex}
//       />
//     </div>
//   )
// }

// export default Course

"use client";

import React, { useEffect, useState } from "react";
import AppHeader from "../../workspace/_components/AppHeader";
import ChapterListSidebar from "../_components/ChapterListSidebar";
import ChapterContent from "../_components/ChapterContent";
import ChatBox from "../_components/Chatbox";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useParams } from "next/navigation";

function Course() {
  const { courseId } = useParams();

  const [courseInfo, setCourseInfo] = useState();
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0); // ✅ FIXED

  useEffect(() => {
    GetEnrolledCourseById();
  }, []);

  const GetEnrolledCourseById = async () => {
    const result = await axios.get("/api/enroll-course?courseId=" + courseId);
    console.log(result.data);
    setCourseInfo(result.data);
  };

  return (
    <div>
      <AppHeader hideSidebar={true} />

      <div className="flex gap-10">
        {/* Pass selectedChapterIndex setter to sidebar */}
        <ChapterListSidebar
          courseInfo={courseInfo}
          onChapterSelect={(index) => setSelectedChapterIndex(index)} // ✅ FIXED
        />

        <ChapterContent
          courseInfo={courseInfo}
          selectedChapterIndex={selectedChapterIndex} // OPTIONAL
          refreshData={() => GetEnrolledCourseById()}
        />
      </div>

      {/* ⭐ Chatbox fixed */}
      <ChatBox
        courseInfo={courseInfo}
        selectedChapterIndex={selectedChapterIndex} // ✅ FIXED
      />
    </div>
  );
}

export default Course; // ✅ FIXED: valid React component export
