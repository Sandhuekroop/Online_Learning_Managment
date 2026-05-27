// "use client";
// import React, { useState } from "react";

// function ChatBox({ courseInfo, selectedChapterIndex }) {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Start chatting with Askie..." },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const course = courseInfo?.courses;
//   const chapter = courseInfo?.courses?.courseContent?.[selectedChapterIndex];
//   const topics = chapter?.courseData?.topics || [];

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = input.trim();

//     setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           message: userMessage,
//           courseContext: {
//             courseName: course?.courseName,
//             chapterName: chapter?.courseData?.chapterName,
//             topics: topics.map((t) => ({
//               title: t.topic,
//               content: t.content.replace(/<[^>]+>/g, ""),
//             })),
//           },
//         }),
//       });

//       const data = await res.json();

//       setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "⚠️ Server error." },
//       ]);
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       {/* Floating Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="fixed bottom-5 right-5 bg-primary  hover:bg-[oklch(0.60_0.22_308.05)]  text-white p-4 rounded-full shadow-lg text-2xl z-50"
//       >
//         💬
//       </button>

//       {/* Chat Box */}
//       {open && (
//         <div className="fixed bottom-20 right-5 w-72 bg-gray-50 rounded-2xl shadow-xl flex flex-col h-[60vh] text-sm z-50">
//           {/* Header */}
//           <div className="p-3 bg-primary rounded-t-2xl flex justify-between items-center shadow-2xl shadow-md-black/10 border-white-500 border-b">
//             {/* <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-t-2xl flex justify-between items-center"></div> */}
//             <span className="text-lg text-white font-semibold">Askie</span>

//             <div className="flex items-center gap-1">
//               <button
//                 onClick={() =>
//                   setMessages([{ sender: "bot", text: "Start chatting with Askie..." }])
//                 }
//                 className="w-8 h-8 flex items-center justify-center text-white text-lg font-semibold rounded-md hover:bg-gray-500"
//               >
//                 ↻
//               </button>

//               <button
//                 onClick={() => setOpen(false)}
//                 className="w-8 h-8 flex items-center justify-center text-white text-xl font-bold rounded-md hover:bg-gray-500"
//               >
//                 ×
//               </button>
//             </div>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-3 space-y-3">
//             {messages.map((msg, idx) => (
//               <div key={idx} className={msg.sender === "user" ? "text-right" : "text-left"}>
//                 <div
//                   className={`p-2 rounded-xl max-w-[80%] inline-block ${
//                     msg.sender === "user"
//                       ? "bg-[oklch(0.70_0.22_308.05)] text-white ml-auto"
//                       : "bg-primary text-white"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}

//             {loading && (
//               <div className="text-left">
//                 <div className="bg-primary p-2 rounded-xl inline-block text-white">
//                   Askie is typing...
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Input */}
//           <form onSubmit={sendMessage} className="p-3 flex items-center space-x-2 border-t border-purple-200">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="flex-1 p-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-200"
//               placeholder="Type your message..."
//             />
//             <button className="bg-primary  hover:bg-[oklch(0.60_0.22_308.05)] text-white  px-3 py-2 rounded-lg font-semibold">
//               Send
//             </button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// }

// export default ChatBox;

"use client";
import React, { useState } from "react";

function ChatBox({ courseInfo, selectedChapterIndex }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Start chatting with Askie..." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

const course = courseInfo?.courses; // object directly
 // FIXED
const chapter = course?.courseContent?.[selectedChapterIndex];

const topics = chapter?.courseData?.topics || [];


console.log("🔥 FRONTEND courseInfo:", courseInfo);
console.log("🔥 FRONTEND course:", course);
console.log("🔥 FRONTEND chapters:", course?.courseContent);



  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    console.log("📤 Sending courseContext:", {
  courseName: course?.name,
  courseDescription: course?.description,
  totalChapters: course?.courseContent?.length,
  chapters: course?.courseContent,
  currentChapter: chapter
});

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
    courseContext: {
  courseName: course?.name || "",
  courseDescription: course?.description || "",
  totalChapters: course?.courseContent?.length || 0,

  chapters: course?.courseContent?.map((c) => ({
    chapterName: c?.courseData?.chapterName,
    topics: c?.courseData?.topics?.map((t) => ({
      title: t.topic,
      content: t.content.replace(/<[^>]+>/g, "")
    }))
  })) || [],

  currentChapter: {
    chapterName: chapter?.courseData?.chapterName,
    topics: topics.map((t) => ({
      title: t.topic,
      content: t.content.replace(/<[^>]+>/g, "")
    }))
  }
}

,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-primary  hover:bg-[oklch(0.60_0.22_308.05)]  text-white p-4 rounded-full shadow-lg text-2xl z-50"
      >
      <img 
        src="/Ai.png" // Using the correct root path (based on previous conversation)
        alt="AI Icon" 
        style={{ width: '24px', height: '24px', display: 'block' }} 
    />
      </button>

      

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-20 right-5 w-72 bg-gray-50 rounded-2xl shadow-xl flex flex-col h-[60vh] text-sm z-50">
          {/* Header */}
          <div className="p-3 bg-primary rounded-t-2xl flex justify-between items-center shadow-2xl shadow-md-black/10 border-white-500 border-b">
            {/* <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-t-2xl flex justify-between items-center"></div> */}
            <span className="text-lg text-white font-semibold">Askie</span>

            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setMessages([{ sender: "bot", text: "Start chatting with Askie..." }])
                }
                className="w-8 h-8 flex items-center justify-center text-white text-lg font-semibold rounded-md hover:bg-gray-500"
              >
                ↻
              </button>

              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white text-xl font-bold rounded-md hover:bg-gray-500"
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.sender === "user" ? "text-right" : "text-left"}>
                <div
                  className={`p-2 rounded-xl max-w-[80%] inline-block ${
                    msg.sender === "user"
                      ? "bg-[oklch(0.70_0.22_308.05)] text-white ml-auto"
                      : "bg-primary text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-left">
                <div className="bg-primary p-2 rounded-xl inline-block text-white">
                  Askie is typing...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 flex items-center space-x-2 border-t border-purple-200">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-200"
              placeholder="Type your message..."
            />
            <button className="bg-primary  hover:bg-[oklch(0.60_0.22_308.05)] text-white  px-3 py-2 rounded-lg font-semibold">
              Send
            </button>
            
          </form>
        </div>
      )}
    </>
  );
}

export default ChatBox;

