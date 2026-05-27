"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NumberPuzzle() {
  const [sequence, setSequence] = useState([]);
  const [missingIndex, setMissingIndex] = useState(null);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [reveal, setReveal] = useState(false);
  const [hint, setHint] = useState("");
  const [currentHint, setCurrentHint] = useState("");

  const patterns = [
    {
      generate: (start) => Array.from({ length: 6 }, (_, i) => start + i * 2),
      hint: "The sequence increases by +2 each time.",
    },
    {
      generate: (start) => Array.from({ length: 6 }, (_, i) => start + i * 3),
      hint: "The sequence increases by +3 each time.",
    },
    {
      generate: (start) =>
        Array.from({ length: 6 }, (_, i) => start * Math.pow(2, i)),
      hint: "Each number is multiplied by 2.",
    },
    {
      generate: () => [1, 4, 9, 16, 25, 36],
      hint: "These are perfect squares (1², 2², 3²...).",
    },
    {
      generate: () => [1, 8, 27, 64, 125, 216],
      hint: "These are perfect cubes (1³, 2³, 3³...).",
    },
    {
      generate: () => {
        let arr = [1, 1];
        for (let i = 2; i < 6; i++) arr.push(arr[i - 1] + arr[i - 2]);
        return arr;
      },
      hint: "This is the Fibonacci sequence.",
    },
    {
      generate: (start) => {
        let arr = [];
        let inc = 2;
        let n = start;
        for (let i = 0; i < 6; i++) {
          arr.push(n);
          n += inc;
          inc = inc === 2 ? 4 : 2;
        }
        return arr;
      },
      hint: "The sequence alternates between +2 and +4.",
    },
    {
      generate: (start) => {
        let arr = [start];
        for (let i = 1; i < 6; i++) {
          arr.push(i % 2 === 1 ? arr[i - 1] * 2 : arr[i - 1] - 1);
        }
        return arr;
      },
      hint: "The pattern alternates between ×2 and −1.",
    },
  ];

  const generatePuzzle = () => {
    const patternIndex = Math.floor(Math.random() * patterns.length);
    const pattern = patterns[patternIndex];

    const start = Math.floor(Math.random() * 10) + 1;
    const seq = pattern.generate(start);

    const missing = Math.floor(Math.random() * 6);
    const correct = seq[missing];

    const puzzle = [...seq];
    puzzle[missing] = "?";

    setSequence(puzzle);
    setMissingIndex(missing);
    setCorrectAnswer(correct);
    setAnswer("");
    setMessage("");
    setReveal(false);
    setHint("");
    setCurrentHint(pattern.hint);
  };

  useEffect(() => {
    generatePuzzle();
  }, []);

  const checkAnswer = () => {
    if (Number(answer) === correctAnswer) {
      setMessage("🎉 Correct!");
    } else {
      setMessage("❌ Incorrect. Try again.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">🧠 Number Puzzle</h1>
        <Link href="/workspace/mind-games">
          <button className="px-3 py-1 rounded-md border hover:bg-gray-100">Back</button>
        </Link>
      </div>

      <p className="text-lg text-center mb-4">
        Guess the missing number in this aptitude-style sequence:
      </p>

      <div className="flex gap-3 justify-center text-2xl mb-6">
        {sequence.map((num, index) => (
          <div
            key={index}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 shadow"
          >
            {num}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <input
          type="number"
          className="border px-3 py-2 rounded-lg w-35 text-center"
          placeholder="Enter number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={checkAnswer}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Check Answer
          </button>

          <button
            onClick={generatePuzzle}
            className="bg-gray-200 px-5 py-2 rounded-lg"
          >
            New Puzzle
          </button>
        </div>

       <div className="flex gap-2 mt-2">
  <button
    onClick={() => setHint(currentHint)}
    className="bg-purple-600 text-white w-10 h-10 rounded-full text-lg flex items-center justify-center"
    title="Hint"
  >
    💡
  </button>

  <button
    onClick={() => setReveal(true)}
    className="bg-red-500 text-white px-4 py-2 rounded-lg"
  >
    Reveal Answer
  </button>
</div>


        {hint && (
          <div className="mt-3 p-3 bg-purple-100 border border-purple-400 rounded-lg w-full text-center">
            {hint}
          </div>
        )}

        {reveal && (
          <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-center w-full">
            <p className="text-xl font-semibold">
              ✔ Correct Answer: <span className="text-green-700">{correctAnswer}</span>
            </p>
          </div>
        )}

        {message && <p className="text-xl mt-3">{message}</p>}
      </div>
    </div>
  );
}




// "use client";
// import { useState, useEffect } from "react";

// export default function NumberPuzzle() {
//   const [sequence, setSequence] = useState([]);
//   const [missingIndex, setMissingIndex] = useState(null);
//   const [answer, setAnswer] = useState("");
//   const [message, setMessage] = useState("");
//   const [correctAnswer, setCorrectAnswer] = useState(null);
//   const [reveal, setReveal] = useState(false);
//   const [hint, setHint] = useState("");

//   const patterns = [
//     {
//       generate: (start) => Array.from({ length: 6 }, (_, i) => start + i * 2),
//       hint: "The sequence increases by +2 each time.",
//     },
//     {
//       generate: (start) => Array.from({ length: 6 }, (_, i) => start + i * 3),
//       hint: "The sequence increases by +3 each time.",
//     },
//     {
//       generate: (start) =>
//         Array.from({ length: 6 }, (_, i) => start * Math.pow(2, i)),
//       hint: "Each number is multiplied by 2.",
//     },
//     {
//       generate: () => [1, 4, 9, 16, 25, 36],
//       hint: "These are perfect squares (1², 2², 3²...).",
//     },
//     {
//       generate: () => [1, 8, 27, 64, 125, 216],
//       hint: "These are perfect cubes (1³, 2³, 3³...).",
//     },
//     {
//       generate: () => {
//         let arr = [1, 1];
//         for (let i = 2; i < 6; i++) arr.push(arr[i - 1] + arr[i - 2]);
//         return arr;
//       },
//       hint: "This is the Fibonacci sequence.",
//     },
//     {
//       generate: (start) => {
//         let arr = [];
//         let inc = 2;
//         let n = start;
//         for (let i = 0; i < 6; i++) {
//           arr.push(n);
//           n += inc;
//           inc = inc === 2 ? 4 : 2;
//         }
//         return arr;
//       },
//       hint: "The sequence alternates between +2 and +4.",
//     },
//     {
//       generate: (start) => {
//         let arr = [start];
//         for (let i = 1; i < 6; i++) {
//           arr.push(i % 2 === 1 ? arr[i - 1] * 2 : arr[i - 1] - 1);
//         }
//         return arr;
//       },
//       hint: "The pattern alternates between ×2 and −1.",
//     },
//   ];

//   const generatePuzzle = () => {
//     const patternIndex = Math.floor(Math.random() * patterns.length);
//     const pattern = patterns[patternIndex];

//     const start = Math.floor(Math.random() * 10) + 1;
//     const seq = pattern.generate(start);

//     const missing = Math.floor(Math.random() * 6);
//     const correct = seq[missing];

//     const puzzle = [...seq];
//     puzzle[missing] = "?";

//     setSequence(puzzle);
//     setMissingIndex(missing);
//     setCorrectAnswer(correct);
//     setAnswer("");
//     setMessage("");
//     setReveal(false);
//     setHint("");
//     setCurrentHint(pattern.hint);
//   };

//   const [currentHint, setCurrentHint] = useState("");

//   useEffect(() => {
//     generatePuzzle();
//   }, []);

//   const checkAnswer = () => {
//     if (Number(answer) === correctAnswer) {
//       setMessage("🎉 Correct!");
//     } else {
//       setMessage("❌ Incorrect. Try again.");
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h1 className="text-3xl font-bold mb-4 text-center">🧠 Number Puzzle</h1>

//       <p className="text-lg text-center mb-4">
//         Guess the missing number in this aptitude-style sequence:
//       </p>

//       <div className="flex gap-3 justify-center text-2xl mb-6">
//         {sequence.map((num, index) => (
//           <div
//             key={index}
//             className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 shadow"
//           >
//             {num}
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-col items-center gap-3">
//         <input
//           type="number"
//           className="border px-3 py-2 rounded-lg w-32 text-center"
//           placeholder="Enter number"
//           value={answer}
//           onChange={(e) => setAnswer(e.target.value)}
//         />

//         <button
//           onClick={checkAnswer}
//           className="bg-blue-600 text-white px-5 py-2 rounded-lg"
//         >
//           Check Answer
//         </button>

//         <button
//           onClick={generatePuzzle}
//           className="bg-gray-200 px-4 py-2 rounded-lg mt-2"
//         >
//           New Puzzle
//         </button>

//         {/* Hint Button */}
//         <button
//           onClick={() => setHint(currentHint)}
//           className="bg-purple-600 text-white px-4 py-2 rounded-lg mt-2"
//         >
//           Hint
//         </button>

//         {hint && (
//           <div className="mt-3 p-3 bg-purple-100 border border-purple-400 rounded-lg w-full text-center">
//             <p className="text-md">{hint}</p>
//           </div>
//         )}

//         {/* Reveal Button */}
//         <button
//           onClick={() => setReveal(true)}
//           className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2"
//         >
//           Reveal Answer
//         </button>

//         {/* Reveal Box */}
//         {reveal && (
//           <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-center w-full">
//             <p className="text-xl font-semibold">
//               ✔ Correct Answer:{" "}
//               <span className="text-green-700">{correctAnswer}</span>
//             </p>
//           </div>
//         )}

//         {message && <p className="text-xl mt-3">{message}</p>}
//       </div>
//     </div>
//   );
// }

