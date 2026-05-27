// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function POST(req) {
//   try {
//     const { message, courseContext } = await req.json();

//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const systemInstruction = `
// You are Askie — an AI tutor for an online learning platform.

// RULES:
// - Keep answers very short (8-20 lines).
// - Use bullet points when helpful.
// - If the user asks about the course/chapter/topic, use the provided courseContext.
// - If unsure, say "I'm not fully sure about that."

// COURSE CONTEXT:
// ${courseContext ? JSON.stringify(courseContext, null, 2) : "No course context provided."}
//     `;

//     const result = await model.generateContent({
//       contents: [
//         {
//           role: "user",
//           parts: [
//             { text: `${systemInstruction}\nUser Query: ${message}` }
//           ],
//         },
//       ],
//     });

//     const reply = result.response.text();

//     return NextResponse.json({ reply });
//   } catch (error) {
//     console.error("Chat error:", error);
//     return NextResponse.json(
//       { error: "Something went wrong with the chat." },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function POST(req) {
//   try {
//     const { message, courseContext } = await req.json();

//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const systemInstruction = `
// You are Askie — an AI tutor for an online learning platform.

// RULES:
// - Keep answers very short (8-20 lines).
// - Use bullet points when helpful.
// - Use the provided courseContext to answer course questions.
// - If unsure, say "I'm not fully sure about that."

// COURSE CONTEXT:
// ${JSON.stringify(courseContext, null, 2)}
//     `;

//     const result = await model.generateContent({
//       systemInstruction: systemInstruction,    // ✔ Fixed
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: message }],
//         },
//       ],
//     });

//     const reply = result.response.text();
//     return NextResponse.json({ reply });

//   } catch (error) {
//     console.error("Chat error:", error);
//     return NextResponse.json(
//       { error: "Something went wrong with the chat." },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { message, courseContext } = await req.json();

    // Debug log
    console.log("🔍 RECEIVED courseContext:", courseContext);
    console.log("🔍 USER MESSAGE:", message);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const systemInstruction = `
You are Askie — an AI tutor for an online learning platform.

RULES:
- Keep answers very short (8-20 lines).
- Use bullet points when helpful.
- Do NOT use Markdown, stars (*), or other symbols.
- Format the response as plain text paragraphs with clear headings and line breaks.
- Use simple numbered or dash lists if needed, but avoid symbols like '*'.
- Use the provided courseContext to answer course questions.
- If unsure, say "I'm not fully sure about that."

COURSE CONTEXT:
${JSON.stringify(courseContext, null, 2)}
    `;

    const result = await model.generateContent({
      systemInstruction: systemInstruction,  // ✔ correct key
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    const reply = result.response.text();

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("🔥 SERVER ERROR in /api/chat:", error);

    return NextResponse.json(
      { error: error.message || "Something went wrong with the chat." },
      { status: 500 }
    );
  }
}
