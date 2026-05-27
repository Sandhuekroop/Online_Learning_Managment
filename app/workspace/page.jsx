import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'
import EnrollCourseList from './_components/EnrollCourseList'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react";

function Workspace() {
  return (
    <div className="p-1">
      {/* 🔵 Your new Home button */}
      <Link href="/">
        <Button className="flex items-center gap-2 mb-4 text-primary hover:underline">
          <Home size={20} />Landing Page</Button>
      </Link>
      <WelcomeBanner/>
      <EnrollCourseList/>
      <CourseList/>
    </div>
  )
}

export default Workspace