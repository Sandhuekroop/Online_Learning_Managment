import React, { useContext, useState } from 'react'
import { SelectedChapterIndexContext } from '../../../context/SelectedChapterIndexContext';
import Youtube from 'react-youtube';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";


// import { Button } from '@/components/ui/Button';
import { CheckCircle, Cross, Loader2Icon, X } from "lucide-react";
import axios from 'axios';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
// import ReactMarkdown from 'react-markdown';

function ChapterContent({ courseInfo = {}, refreshData }) {
    const { courseId } = useParams();
    const { courses, enrollCourses } = courseInfo ?? {};
    const courseContent = courseInfo?.courses?.courseContent;
    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext)
    const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
    const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics || [];
    let completedChapter = enrollCourses?.completedChapters ?? [];
    const [loading, setLoading] = useState(false);

    const markChapterCompleted = async () => {
        setLoading(true);
        if (!completedChapter.includes(selectedChapterIndex)) {
  completedChapter.push(selectedChapterIndex);
}

        const result = await axios.put('/api/enroll-course', {
            courseId: courseId,
            completedChapter: completedChapter
        });
        console.log(result);
        refreshData();
        toast.success('Chapter marked as completed!');
        setLoading(false);

    }

    const markIncompleteChapter = async () => {
        setLoading(true);
        const completedChap = completedChapter.filter((item) => item != selectedChapterIndex);
        const result = await axios.put('/api/enroll-course', {
            courseId: courseId,
            completedChapter: completedChap
        });
        console.log(result);
        refreshData();
        toast.success('Chapter Marked Incompleted!');
        setLoading(false);
    }



    return (
        <div className='p-10 flex-1 ml-80  '>
            {/* <div className='flex justify-between items-center'>
                <h2 className='font-bold text-2xl '>{selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}</h2>
                {!completedChapter?.includes(selectedChapterIndex)
                    ? <Button onClick={() => markChapterCompleted()}
                        disabled={loading}
                    > {loading ? <Loader2Icon className='animate-spin' /> : <CheckCircle />}Mark as Completed </Button>
                    : <Button variant='outline' onClick={markIncompleteChapter}
                        disabled={loading}
                    >{loading ? <Loader2Icon className='animate-spin' /> : <X />} Mark Incomplete </Button>}
            </div> */}
            <div className="flex justify-between items-center">
  <h2 className="font-bold text-2xl">
    {selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}
  </h2>

  <div className="flex gap-3">
    {/* 🚀 Dashboard Button */}
   <Link href="/workspace">
  <Button 
    variant="secondary" 
    className="flex items-center gap-2 px-4 py-2 text-sm font-medium"
  >
    <LayoutDashboard size={18} />
    Dashboard
  </Button>
</Link>


    {/* Existing Completed / Incomplete Button */}
    {!completedChapter?.includes(selectedChapterIndex) ? (
      <Button onClick={markChapterCompleted}  disabled={loading}>
        {loading ? <Loader2Icon className="animate-spin" /> : <CheckCircle />}
        Mark as Completed
      </Button>
    ) : (
      <Button variant="outline" onClick={markIncompleteChapter} disabled={loading}>
        {loading ? <Loader2Icon className="animate-spin" /> : <X />}
        Mark Incomplete
      </Button>
    )}
  </div>
</div>


            <h2 className='my-2 font-normal text-lg '> Related Videos 🎬</h2>

            <div className='grid  grid-cols-1 md:grid-cols-2 gap-5'>
                {/* {videoData?.map((video, index) => (
                    <div key={index}>
                     <Youtube
                     videoId={video?.videoId}
                     />
                    </div>
                ))} */}
                {videoData?.map((video, index) => index < 2 && (
                    <div key={index} className="my-4">
                        <iframe
                            width="400"
                            height="250"
                            style={{ borderRadius: "12px" }}
                            src={`https://www.youtube.com/embed/${video.videoId}`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        {/* <p className="mt-2 text-sm text-gray-700">
                            {video.title} — {video.channel}
                        </p> */}
                    </div>
                )
                )}

            </div>

            <div className='mt-7'>
                {topics.map((topic, index) => (
                    <div key={index} className='mt-10 p-5  bg-secondary rounded-2xl'>
                        <h2 className='font-bold text-2xl text-primary'>{index + 1}. {topic?.topic}</h2>
                        {/* <p className='text-gray-600 mt-2'>{topic?.content}</p> */}
                        <div dangerouslySetInnerHTML={{ __html: topic?.content }} style={{
                            lineHeight: '2.5',
                        }}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChapterContent

// import React, { useContext, useState } from 'react';
// import { SelectedChapterIndexContext } from '../../../context/SelectedChapterIndexContext';
// import { Button } from '@/@/components/ui/Button';
// import { CheckCircle, Loader2Icon, X } from "lucide-react";
// import axios from 'axios';
// import { useParams } from 'next/navigation';
// import { toast } from 'sonner';



// function ChapterContent({ courseInfo = {}, refreshData }) {
//   const { courseId } = useParams();
//   const { courses, enrollCourses } = courseInfo ?? {};
//   const courseContent = courseInfo?.courses?.courseContent;
//   const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);
//   const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
//   const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics || [];
//   const [loading, setLoading] = useState(false);

//   // ✅ Normalize completedChapters
//   let completedChapter = [];
//   try {
//     if (typeof enrollCourses?.completedChapters === "string") {
//       completedChapter = JSON.parse(enrollCourses.completedChapters);
//     } else if (Array.isArray(enrollCourses?.completedChapters)) {
    

//       completedChapter = enrollCourses.completedChapters;
//     }
//   } catch (e) {
//     console.error("Error parsing completedChapters:", e);
//   }

//   // ✅ Mark as Completed
//   const markChapterCompleted = async () => {
//     setLoading(true);
//     const updated = [...completedChapter, selectedChapterIndex];
//     try {
//       await axios.put('/api/enroll-course', {
//         courseId,
//         completedChapter: updated,
//       });
//       toast.success('Chapter marked as completed!');
//       refreshData();
//     } catch (error) {
//       toast.error('Error updating progress');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Mark as Incomplete
//   const markIncompleteChapter = async () => {
//     setLoading(true);
//     const updated = completedChapter.filter(item => item !== selectedChapterIndex);
//     try {
//       await axios.put('/api/enroll-course', {
//         courseId,
//         completedChapter: updated,
//       });
//       toast.success('Chapter marked incomplete!');
//       refreshData();
//     } catch (error) {
//       toast.error('Error updating progress');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='p-10 flex-1 ml-80'>
//       <div className='flex justify-between items-center'>
//         <h2 className='font-bold text-2xl'>
//           {selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}
//         </h2>
//         {!completedChapter?.includes(selectedChapterIndex)
//           ? <Button onClick={markChapterCompleted} disabled={loading}>
//               {loading ? <Loader2Icon className='animate-spin' /> : <CheckCircle />} Mark as Completed
//             </Button>
//           : <Button variant='outline' onClick={markIncompleteChapter} disabled={loading}>
//               {loading ? <Loader2Icon className='animate-spin' /> : <X />} Mark Incomplete
//             </Button>}
            
//       </div>

//       <h2 className='my-2 font-normal text-lg'>Related Videos 🎬</h2>
//       <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
//         {videoData?.slice(0, 2)?.map((video, index) => (
//           <div key={index} className='my-4'>
//             <iframe
//               width="400"
//               height="250"
//               style={{ borderRadius: "12px" }}
//               src={`https://www.youtube.com/embed/${video.videoId}`}
//               title={video.title}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
            
//           </div>
//         ))}
//       </div>

//       <div className='mt-7'>
//         {topics.map((topic, index) => (
//           <div key={index} className='mt-10 p-5 bg-secondary rounded-2xl'>
//             <h2 className='font-bold text-2xl text-primary'>{index + 1}. {topic?.topic}</h2>
//             <div dangerouslySetInnerHTML={{ __html: topic?.content }} style={{ lineHeight: '2.5' }}></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ChapterContent;
