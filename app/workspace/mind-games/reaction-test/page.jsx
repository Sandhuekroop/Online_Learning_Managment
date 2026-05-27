// "use client";

// import { useState, useEffect, useRef } from "react";

// export default function ReactionTest() {
//   const [status, setStatus] = useState("waiting"); // waiting, ready, now
//   const [message, setMessage] = useState("Click to start!");
//   const [reactionTime, setReactionTime] = useState(null);
//   const timeoutRef = useRef(null);
//   const startTimeRef = useRef(null);

//   const startTest = () => {
//     if (status === "waiting") {
//       setStatus("ready");
//       setMessage("Wait for green...");
//       // random delay between 2-5 seconds
//       const delay = Math.floor(Math.random() * 3000) + 2000;
//       timeoutRef.current = setTimeout(() => {
//         setStatus("now");
//         setMessage("Click now!");
//         startTimeRef.current = Date.now();
//       }, delay);
//     } else if (status === "ready") {
//       // clicked too early
//       clearTimeout(timeoutRef.current);
//       setStatus("waiting");
//       setMessage("Too soon! Click to try again.");
//     } else if (status === "now") {
//       // user clicked in time
//       const endTime = Date.now();
//       const time = endTime - startTimeRef.current;
//       setReactionTime(time);
//       setStatus("waiting");
//       setMessage("Click to start!");
//     }
//   };

//   const resetTest = () => {
//     setStatus("waiting");
//     setMessage("Click to start!");
//     setReactionTime(null);
//     clearTimeout(timeoutRef.current);
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto text-center">
//       <h1 className="text-3xl font-bold mb-6">🖱 Reaction Test</h1>

//       <div
//         className={`h-40 flex items-center justify-center rounded-xl cursor-pointer select-none text-white text-2xl font-bold mb-4 ${
//           status === "waiting" ? "bg-gray-400" :
//           status === "ready" ? "bg-red-500" :
//           "bg-green-500"
//         }`}
//         onClick={startTest}
//       >
//         {message}
//       </div>

//       {reactionTime !== null && (
//         <p className="text-xl mb-4">
//           Your reaction time: <span className="font-bold">{reactionTime} ms</span>
//         </p>
//       )}

//       <button
//         onClick={resetTest}
//         className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//       >
//         Reset
//       </button>
//     </div>
//   );
// }

"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function ReactionTest() {
  const [status, setStatus] = useState("waiting"); // waiting, ready, now
  const [message, setMessage] = useState("Click to start!");
  const [reactionTime, setReactionTime] = useState(null);
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(null);

  const startTest = () => {
    if (status === "waiting") {
      setStatus("ready");
      setMessage("Wait for green...");
      const delay = Math.floor(Math.random() * 3000) + 2000;
      timeoutRef.current = setTimeout(() => {
        setStatus("now");
        setMessage("Click now!");
        startTimeRef.current = Date.now();
      }, delay);
    } else if (status === "ready") {
      clearTimeout(timeoutRef.current);
      setStatus("waiting");
      setMessage("Too soon! Click to try again.");
    } else if (status === "now") {
      const endTime = Date.now();
      const time = endTime - startTimeRef.current;
      setReactionTime(time);
      setStatus("waiting");
      setMessage("Click to start!");
    }
  };

  const resetTest = () => {
    setStatus("waiting");
    setMessage("Click to start!");
    setReactionTime(null);
    clearTimeout(timeoutRef.current);
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">🖱 Reaction Test</h1>

      <div
        className={`h-40 flex items-center justify-center rounded-xl cursor-pointer select-none text-white text-2xl font-bold mb-4 ${
          status === "waiting" ? "bg-gray-400" :
          status === "ready" ? "bg-red-500" :
          "bg-green-500"
        }`}
        onClick={startTest}
      >
        {message}
      </div>

      {reactionTime !== null && (
        <p className="text-xl mb-4">
          Your reaction time: <span className="font-bold">{reactionTime} ms</span>
        </p>
      )}

      <div className="flex justify-center gap-4">
        <button
          onClick={resetTest}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Reset
        </button>

        <Link href="/workspace/mind-games">
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}

