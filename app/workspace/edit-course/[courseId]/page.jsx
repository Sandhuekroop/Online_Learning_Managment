// "use client"
// import axios from 'axios';
// import { useParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import CourseInfo from '../_components/CourseInfo'
// import ChapterTopicList from '../_components/ChapterTopicList'

// function EditCourse({viewCourse=false}) {
//     const {courseId}=useParams();
//     const [loading,setLoading]=useState(false);
//     const [course,setCourse]=useState();
    
//     // console.log(courseId);

//     useEffect(()=>{
//       GetCourseInfo();
//     },[])

//     const GetCourseInfo=async()=>{
//         setLoading(true);
//         const result= await axios.get('/api/courses?courseId='+courseId);
//         console.log(result.data);
//         setLoading(false);
//         setCourse(result.data)
//     }

//   return (
//     <div>
//         <CourseInfo course={course} viewCourse={viewCourse} />
//         <ChapterTopicList course={course}/>
        
//     </div>
//   )
// }

// export default EditCourse

"use client";
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CourseInfo from '../_components/CourseInfo';
import ChapterTopicList from '../_components/ChapterTopicList';

function EditCourse({ viewCourse = false }) {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [enrollCourse, setEnrollCourse] = useState(null);

  useEffect(() => {
    GetCourseInfo();
  }, []);

  const GetCourseInfo = async () => {
    const { data } = await axios.get(`/api/courses?courseId=${courseId}`);
    console.log("API returned:", data);

    setCourse(data.course);
    setEnrollCourse(data.enrollCourse);
  };
    // ✅ If courseJson exists → Content already generated
  // const isContentGenerated = course?.courseJson?.course ? true : false;

  return (
    <div>
      <CourseInfo 
        course={course}
        enrollCourse={enrollCourse}
        viewCourse={viewCourse}
      />

      <ChapterTopicList course={course}/>
    </div>
  );
}

export default EditCourse;
