"use client";
import { useParams } from "next/navigation";

import React, { useContext } from 'react'
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectedChapterIndexContext } from '../../../context/SelectedChapterIndexContext';
import { CheckCircle } from 'lucide-react';

function ChapterListSidebar({ courseInfo }) {
    const course = courseInfo?.courses;
    const enrollCourse = courseInfo?.enrollCourses;
    const courseContent = courseInfo?.courses?.courseContent;
    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext)
    let completedChapter = enrollCourse?.completedChapters ?? [];
    const { courseId } = useParams();  // IMPORTANT
    return (

        <div className=' fixed h-screen top-0 left-0 w-80 bg-secondary  p-5  flex-shrink-0 '>

              {/* 🔙 Back + Title */}
            <div className="flex items-center gap-2 mb-4">
                <Link href={`/workspace/edit-course/${courseId}`}>
                    <button className="flex items-center gap-1 text-md text-primary hover:underline">
                        <ChevronLeft size={20} strokeWidth={3} /> {/* Make it bolder */}
                      
                    </button>
                </Link>

                <h2 className='font-bold text-xl ml-2'>
                    Chapters ({courseContent?.length})
                </h2>
            </div>
            
            <Accordion type="single" collapsible>
                {courseContent?.map((chapter, index) => (
                    <AccordionItem value={chapter?.courseData?.chapterName} key={index}
                        onClick={() => setSelectedChapterIndex(index)}
                    >
                        <AccordionTrigger className={`text-lg font-medium px-5
                             ${completedChapter.includes(index) ? 'bg-green-100 text-green-800' : ''}`}>

                            {index + 1} . {chapter?.courseData?.chapterName}</AccordionTrigger>
                        <AccordionContent asChild>
                            <div className=' '>
                                {/* {chapter?.courseData?.topics.map((topic,index_)=>(
                                    <h2 key={index_} className={`p-3 my-1 rounded-lg
                                        ${completedChapter.includes(index) ?'bg-green-100 text-green-800': 'bg-white'}`} > {}{}{completedChapter.includes(index) }{topic?.topic}</h2>
                                ))} */}
                                {(chapter?.courseData?.topics || chapter?.topics || []).map((topic, index_) => (
                                    <h2
                                        key={index_}
                                        className={`p-3 my-1 rounded-lg ${completedChapter.includes(index)
                                                ? "bg-green-100 text-green-800"
                                                : "bg-white"
                                            }`}
                                    >
                                        {topic?.topic || topic}
                                    </h2>
                                ))}

                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}

            </Accordion>
        </div>
    )
}

export default ChapterListSidebar