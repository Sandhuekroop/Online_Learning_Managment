// import { db } from "@/config/db";
// import { courseTable } from "@/config/schema";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function GET(req) {

//     const {searchParams}= new URL(req.url);
//     const courseId=searchParams.get('courseId')
    

//     const result= await db.select.from(courseTable)
//     .where(eq(courseTable.cid,courseId));

//     console.log(result);

//     return NextResponse.json(result[0]);
    
// }

// import { db } from "@/config/db";
// import { courseTable } from "@/config/schema";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const courseId = searchParams.get("courseId");

//   if (!courseId) {
//     return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
//   }

//   const result = await db
//     .select()
//     .from(courseTable)
//     .where(eq(courseTable.cid, Number(courseId))); // convert to number

//   console.log(result);

//   return NextResponse.json(result[0] ?? {});
// }


// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const courseId = searchParams?.get("courseId");
//   const user= await currentUser();

//   // if (!courseId) {
//   //   return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
//   // }

//   if(courseId ==0){
//     const result = await db
//     .select()
//     .from(courseTable)
//     .where(sql`${courseTable.courseContent}::jsonb != '{}' ::jsonb`); 

//   console.log(result);

//   return NextResponse.json(result);
//   }
//   if(courseId){
//   const result = await db
//     .select()
//     .from(courseTable)
//     .where(eq(courseTable.cid, courseId)); // keep as string (UUID)

//   console.log(result);

//   return NextResponse.json(result[0] ?? {});
//   }
//   else{
//    const result = await db
//     .select()
//     .from(courseTable)
//     .where(eq(courseTable.userEmail,user.primaryEmailAddress?.emailAddress))
//     .orderBy(desc(courseTable.id));

//   // console.log(result);
//   return NextResponse.json(result);
//   }
// }


// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const courseId = searchParams?.get("courseId");
//     const user = await currentUser();

//     if (courseId == 0) {
//       const result = await db
//         .select()
//         .from(courseTable)
//         .where(sql`${courseTable.courseContent}::jsonb != '{}' ::jsonb`);
//       return NextResponse.json(result);
//     }

//     if (courseId) {
//       const result = await db
//         .select()
//         .from(courseTable)
//         .where(eq(courseTable.cid, courseId));
//       return NextResponse.json(result[0] ?? {});
//     }

//     const result = await db
//       .select()
//       .from(courseTable)
//       .where(eq(courseTable.userEmail, user.primaryEmailAddress?.emailAddress))
//       .orderBy(desc(courseTable.id));

//     return NextResponse.json(result);
//   } catch (error) {
//     console.error('API error:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }


// import { db } from "@/config/db";





// import { db } from "../../../config/db";

// import { courseTable } from "../../../config/schema";
// import { currentUser } from "@clerk/nextjs/server";
// import { desc, eq, ne, sql } from "drizzle-orm";
// import { NextResponse } from "next/server";


// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const courseId = searchParams?.get("courseId");
//     const user = await currentUser();

//     // 🟢 Case 1: Get all public courses (courseContent not empty)
//     if (courseId == 0) {
//       const result = await db
//         .select()
//         .from(courseTable)
//         // exclude empty JSON objects by checking for non-null & non-empty banner
        
//         // .where(ne(courseTable.courseContent, {}));
//         .where(sql`${courseTable.courseContent}::text != '{}'`);

//       return NextResponse.json(result);
//     }

//     // 🟢 Case 2: Get specific course by cid
//     if (courseId) {
//       const result = await db
//         .select()
//         .from(courseTable)
//         .where(eq(courseTable.cid, courseId));
//       return NextResponse.json(result[0] ?? {});
//     }

//     // 🟢 Case 3: Get all courses created by current user
//     // const result = await db
//     //   .select()
//     //   .from(courseTable)
//     //   .where(eq(courseTable.userEmail, user.primaryEmailAddress?.emailAddress))
//     //   .orderBy(desc(courseTable.id));

//     if (!user || !user.primaryEmailAddress) {
//   // ✅ User not authenticated → return no courses instead of crashing
//   return NextResponse.json([], { status: 200 });
// }

// const email = user.primaryEmailAddress.emailAddress;

// const result = await db
//   .select()
//   .from(courseTable)
//   .where(eq(courseTable.userEmail, email))
//   .orderBy(desc(courseTable.id));

//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("API error:", error);


//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }


import { db } from "../../../config/db";
import { courseTable, enrollCourseTable } from "../../../config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams?.get("courseId");
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    // 🟢 Case 1: Get all public courses (courseContent not empty)
    if (courseId == 0) {
      const result = await db
        .select()
        .from(courseTable)
        .where(sql`${courseTable.courseContent}::text != '{}'`);

      return NextResponse.json(result);
    }

    // 🟢 Case 2: Get specific course by cid (NOW RETURNS ENROLLCOURSE TOO)
    if (courseId) {
      // Fetch course
      const courseResult = await db
        .select()
        .from(courseTable)
        .where(eq(courseTable.cid, courseId));

      const course = courseResult[0] ?? null;

      // Fetch enrollCourse for current user
      let enrollCourse = null;

      if (userEmail) {
        const enrollResult = await db
          .select()
          .from(enrollCourseTable)
          .where(eq(enrollCourseTable.cid, courseId))
          .where(eq(enrollCourseTable.userEmail, userEmail))
          .limit(1);

        enrollCourse = enrollResult[0] ?? null;
      }

      return NextResponse.json({
        course,
        enrollCourse,
      });
    }

    // 🟢 Case 3: Get all courses created by current user
    if (!userEmail) {
      return NextResponse.json([], { status: 200 });
    }

    const result = await db
      .select()
      .from(courseTable)
      .where(eq(courseTable.userEmail, userEmail))
      .orderBy(desc(courseTable.id));

    return NextResponse.json(result);

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
