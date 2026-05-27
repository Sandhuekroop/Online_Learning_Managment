// import { NextResponse } from "next/server";
// import {ai} from "../generate-course-layout/route"
// import axios from "axios";

// const PROMPT=`Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.
// Schema:{
// chapterName:<>,
// {
// topic:<>,
// content:<>
// }
// : User Input:
// `

// export async function POST(req) {
//     const {courseJSON,courseTitle,courseId}=await req.json();

//     const promises=courseJSON?.chapters?.map(async(chapter)=>{
//           const config = {
//     responseMimeType: 'text/plain',
//   };
//   const model = 'gemini-2.0-flash';
//   const contents = [
//     {
//       role: 'user',
//       parts: [
//         {
//           text: PROMPT+JSON.stringify(chapter),
//         },
//       ],
//     },
//   ];

//   const response = await ai.models.generateContent({
//     model,
//     config,
//     contents,
//   });
//   //  console.log(response.candidates[0].content.parts[0].text);
//     const RawResp=response?.candidates[0]?.content?.parts[0]?.text
//      const RawJson=RawResp.replace('```json','').replace('```','');
//   const JSONResp=JSON.parse(RawJson);

//   //Get youtube video 

//   const youtubeData=await GetYoutubeVideo(chapter?.chapterName);
//    console.log({
//    youtubeVideo:youtubeData,
//    courseData:JSONResp
//   })

//   return {
//    youtubeVideo:youtubeData,
//    courseData:JSONResp
//   };
//     })

//     const CourseContent=await Promise.all(promises);

//     return NextResponse.json({
//         courseName:courseTitle,
//         CourseContent:CourseContent
//     })
// }

// const YOUTUBE_BASE_URL='https://www.googleapis.com/youtube/v3/search'
// const GetYoutubeVideo=async(topic)=>{
//   const params={
//     part:'snippet',
//     q:topic,
//     maxResults:4,
//     type:'video',
//     key: process.env.YOUTUBE_API_KEY  //Youtube API KEY
//   }
//   const resp=await axios.get(YOUTUBE_BASE_URL,{params});
//   const youtubeVideoListResp=resp.data.items;
//   const youtubeVideoList=[];
//   youtubeVideoListResp.forEach(item=>{
//     const data={
//       videoId:item.id?.videoId,
//       title:item?.snippet?.title
//     }
//     youtubeVideoList.push(data);
//   })
//   console.log("youtubeVideoList",youtubeVideoList)
//   return youtubeVideoList;
// }




import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { db } from "../../../config/db";
import { courseTable } from "../../../config/schema";
import { eq } from "drizzle-orm";

const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.
Schema:{
chapterName:<>,
{
topic:<>,
content:<>
}
: User Input:
`;

export async function POST(req) {
  try {
    const { courseJSON, courseTitle, courseId } = await req.json();

    if (!courseJSON?.chapters?.length) {
      return NextResponse.json(
        { error: "No chapters found in courseJSON" },
        { status: 400 }
      );
    }

    const promises = courseJSON.chapters.map(async (chapter) => {
      try {
        const config = { responseMimeType: "text/plain" };
        const model = "gemini-2.0-flash";
        const contents = [
          {
            role: "user",
            parts: [{ text: PROMPT + JSON.stringify(chapter) }],
          },
        ];

        const response = await ai.models.generateContent({ model, config, contents });
        const RawResp = response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        let RawJson = RawResp;
        if (RawJson.includes("```")) {
          RawJson = RawJson.replace(/```json|```/g, "").trim();
        }

        let JSONResp = {};
        try {
          JSONResp = JSON.parse(RawJson);
        } catch (err) {
          console.error("❌ Failed to parse Gemini JSON:", RawJson);
          JSONResp = { error: "Invalid JSON from Gemini", raw: RawJson };
        }

        const youtubeData = await GetYoutubeVideo(chapter?.chapterName);

        return {
          youtubeVideo: youtubeData,
          courseData: JSONResp,
        };
      } catch (err) {
        console.error("❌ Error in chapter processing:", err);
        return {
          youtubeVideo: [],
          courseData: { error: "Failed to generate content" },
        };
      }
    });

    const CourseContent = await Promise.all(promises);

    //save to DB
    const dbResp=await db.update(courseTable).set({
      courseContent: CourseContent 
    }).where(eq(courseTable.cid,courseId));

    return NextResponse.json({
      courseName: courseTitle,
      CourseContent,
    });
  } catch (err) {
    console.error("❌ API Route Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const GetYoutubeVideo = async (topic) => {
  try {
    const params = {
      part: "snippet",
      q: topic,
      maxResults: 4, // ✅ fixed typo
      type: "video",
      key: process.env.YOUTUBE_API_KEY,
    };

    const resp = await axios.get(YOUTUBE_BASE_URL, { params });
    return resp.data.items.map((item) => ({
      videoId: item.id?.videoId,
      title: item?.snippet?.title,
      thumbnail: item?.snippet?.thumbnails?.high?.url,
      channel: item?.snippet?.channelTitle,
    }));
  } catch (err) {
    console.error("❌ YouTube API Error:", err.response?.data || err.message);
    return [];
  }
};
