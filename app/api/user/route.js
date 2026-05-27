// import { db } from "@/config/db";

// import { usersTable } from "@/config/schema";

// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//     const {email,name}=await req.json();

//     // if user already exist?
//     const users=await db.select().from(usersTable)
//     .where(eq(usersTable.email,email));

//     // if not then insert new user
//     if(users?.length==0){
//         const result=await db.insert(usersTable).values({
//             name,
//             email
//         }).returning(usersTable);
        
//         console.log(result);
//         return NextResponse.json(result)
//     }

//     return NextResponse.json(users[0])
// }
// import { db } from "@/config/db";
// import { usersTable } from "@/config/schema";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { email, name } = await req.json();

//     const users = await db.select().from(usersTable)
//       .where(eq(usersTable.email, email));

//     if (users?.length == 0) {
//       const result = await db.insert(usersTable).values({
//         name,
//         email
//       }).returning(usersTable);

//       console.log("Inserted user:", result);
//       return NextResponse.json(result);
//     }

//     return NextResponse.json(users[0]);
//   } catch (error) {
//     console.error("❌ API /user error:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error", error: error.message },
//       { status: 500 }
//     );
//   }
// }
// export async function GET() {
//   return NextResponse.json({ message: "✅ User API route works!" });
// }

// import { db } from "@/config/db";
// import { usersTable } from "@/config/schema";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { email, name } = await req.json();

//     const users = await db.select().from(usersTable)
//       .where(eq(usersTable.email, email));

//     if (users.length === 0) {
//       const result = await db.insert(usersTable).values({ name, email }).returning();
//       console.log("Inserted user:", result);
//       return NextResponse.json(result);
//     }

//     return NextResponse.json(users[0]);
//   } catch (error) {
//     console.error("❌ API /user error:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   return NextResponse.json({ message: "✅ User API route works!" });
// }

// import { db } from "@/config/db";
import { db } from "../../../config/db";

// import { usersTable } from "@/config/schema";
import { usersTable } from "../../../config/schema";

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// export async function GET() {
//   return NextResponse.json({ message: "✅ User API route works!" });
// }

export async function POST(req) {
  try {
    const { email, name } = await req.json();

    // Check if user exists
    const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

    // If user doesn’t exist, insert a new one
    if (users.length === 0) {
      await db.insert(usersTable).values({ name, email });
    }

    return NextResponse.json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error in POST /api/user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
