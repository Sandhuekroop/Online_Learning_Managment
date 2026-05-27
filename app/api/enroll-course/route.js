import { db } from "../../../config/db";
import { courseTable, enrollCourseTable } from "../../../config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { courseId } = await req.json();
    const user = await currentUser();

    //if course already enrolled
    const enrollCourses = await db
    .select()
    .from(enrollCourseTable)
    .where(
        and(
           eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress),
           eq(enrollCourseTable.cid, courseId)
           )
        );

    if (enrollCourses?.length == 0) {
        const result = await db
        .insert(enrollCourseTable)
        .values({
            cid: courseId,
            userEmail: user.primaryEmailAddress?.emailAddress,
          completedChapters: JSON.stringify([]),
            })
            .returning(enrollCourseTable);

        return NextResponse.json(result);
    }

    return NextResponse.json({ 'resp': 'Already Enrolled' })

}

// export async function GET(req) {

//     const user = await currentUser();
//     const { searchParams } = new URL(req.url);
//     const courseId = searchParams?.get("courseId");

//     if (courseId) {
//         const result = await db.select().from(courseTable)
//             .innerJoin(enrollCourseTable, eq(courseTable.cid, enrollCourseTable.cid))
//             .where(and(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress),
//                 eq(enrollCourseTable.cid, courseId)))
//             .orderBy(desc(enrollCourseTable.id, courseId));

//         return NextResponse.json(result[0]);

//     } else {
//         const result = await db.select().from(courseTable)
//             .innerJoin(enrollCourseTable, eq(courseTable.cid, enrollCourseTable.cid))
//             .where(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress))
//             .orderBy(desc(enrollCourseTable.id));

//         return NextResponse.json(result);
//     }
// }

// export async function GET(req) {
//   const user = await currentUser();
//   const { searchParams } = new URL(req.url);
//   const courseId = searchParams?.get("courseId");

//   const query = db
//     .select()
//     .from(courseTable)
//     .innerJoin(enrollCourseTable, eq(courseTable.cid, enrollCourseTable.cid))
//     .where(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress))
//     .orderBy(desc(enrollCourseTable.id));

//   const result = courseId
//     ? await query.where(eq(enrollCourseTable.cid, courseId))
//     : await query;

//   // ✅ Normalize JSON
//   const normalized = result.map((item) => ({
//     ...item,
//     enrollCourses: {
//       ...item.enrollCourses,
//       completedChapters: item.enrollCourses.completedChapters || [],
//     },
//   }));

//   return NextResponse.json(courseId ? normalized[0] : normalized);
// }
// 2.12.25 old
// export async function GET(req) {
//   const user = await currentUser();
//   const { searchParams } = new URL(req.url);
//   const courseId = searchParams?.get("courseId");

//   const query = db
//     .select()
//     .from(courseTable)
//     .innerJoin(enrollCourseTable, eq(courseTable.cid, enrollCourseTable.cid))
//     .where(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress))
//     .orderBy(desc(enrollCourseTable.id));

//   const result = courseId
//     ? await query.where(eq(enrollCourseTable.cid, courseId))
//     : await query;

//   // ✅ Normalize and parse JSON
//   const normalized = result.map((item) => ({
//     ...item,
//     enrollCourses: {
//       ...item.enrollCourses,
//       completedChapters: (() => {
//       try {
//           return typeof item.enrollCourses.completedChapters === "string"
//             ? JSON.parse(item.enrollCourses.completedChapters)
//             : item.enrollCourses.completedChapters || [];
//         } catch {
//           return [];
//         }
//       })(),
//     },
//   }));

//   return NextResponse.json(courseId ? normalized[0] : normalized);
// }
// 2.12.25 new

export async function GET(req) {
  const user = await currentUser();
  const { searchParams } = new URL(req.url);
  const courseId = searchParams?.get("courseId");

  let result;

  if (courseId) {
    // Query for a single course
    result = await db
      .select()
      .from(courseTable)
      .innerJoin(enrollCourseTable, eq(courseTable.cid, enrollCourseTable.cid))
      .where(
        and(
          eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress),
          eq(enrollCourseTable.cid, courseId)
        )
      )
      .orderBy(desc(enrollCourseTable.id));
  } else {
    // Query all enrolled courses
    result = await db
      .select()
      .from(courseTable)
      .innerJoin(enrollCourseTable, eq(courseTable.cid, enrollCourseTable.cid))
      .where(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(enrollCourseTable.id));
  }

  // Normalize completedChapters
  const normalized = result.map((item) => ({
    ...item,
    enrollCourses: {
      ...item.enrollCourses,
      completedChapters: (() => {
        try {
          return typeof item.enrollCourses.completedChapters === "string"
            ? JSON.parse(item.enrollCourses.completedChapters)
            : item.enrollCourses.completedChapters || [];
        } catch {
          return [];
        }
      })(),
    },
  }));

  return NextResponse.json(courseId ? normalized[0] : normalized);
}


// export async function PUT(req) {
//     const { completedChapter, courseId } = await req.json();
//     const user = await currentUser();

//     const result = await db.update(enrollCourseTable).set({
//         completedChapters: completedChapter
//     }).where(and(eq(enrollCourseTable.cid, courseId),
//         eq(enrollCourseTable.userEmail, user?.primaryEmailAddress?.emailAddress)))
//         .returning(enrollCourseTable);

//     return NextResponse.json(result);

// }

export async function PUT(req) {
  const { completedChapter, courseId } = await req.json();
  const user = await currentUser();

  const result = await db
    .update(enrollCourseTable)
    .set({
      completedChapters: JSON.stringify(completedChapter), // ✅ stringify array
    })
    .where(
      and(
        eq(enrollCourseTable.cid, courseId),
        eq(enrollCourseTable.userEmail, user?.primaryEmailAddress?.emailAddress)
      )
    )
    .returning(enrollCourseTable);

  return NextResponse.json(result);
}