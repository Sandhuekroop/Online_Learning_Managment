"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

/**
 * Word Scramble Game (Next.js client page)
 *
 * - SSR-safe: words are chosen/shuffled on the client inside useEffect
 * - Uses a small built-in word list. Replace or extend `WORDS` as you like.
 * - Saves best score to localStorage
 */

const WORDS = [
  "planet",
  "random",
  "puzzle",
  "react",
  "coding",
  "memory",
  "college",
  "unicorn",
  "graphic",
  "pattern",
  "algorithm",
  "variable",
  "function",
  "browser",
  "network",
  "module",
  "compile",
  "storage",
  "session",
  "element"
];

function shuffleString(str) {
  const a = str.split("");
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.join("");
}

export default function WordScramblePage() {
  const [ready, setReady] = useState(false); // avoid SSR randomness
  const [word, setWord] = useState("");
  const [scrambled, setScrambled] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // seconds per round
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [streak, setStreak] = useState(0);
  const [message, setMessage] = useState("");
  const [best, setBest] = useState(0);
  const timerRef = useRef(null);

  // choose first word on client only
  useEffect(() => {
    setReady(true);
  }, []);

  // initialize game when ready
  useEffect(() => {
    if (!ready) return;
    loadBest();
    nextWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // timer tick
  useEffect(() => {
    if (!ready) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // time up -> treat as fail and move to next
          handleFail();
          return 60; // reset for next round
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word, ready]);

  const loadBest = () => {
    try {
      const v = localStorage.getItem("word-scramble-best");
      if (v) setBest(Number(v));
    } catch {
      /* ignore */
    }
  };

  const saveBest = (newBest) => {
    try {
      localStorage.setItem("word-scramble-best", String(newBest));
    } catch {}
  };

  const pickRandomWord = () => {
    // pick a random word different from current if possible
    if (WORDS.length === 0) return "";
    let w = word;
    let tries = 0;
    while ((w === word) && tries < 6) {
      w = WORDS[Math.floor(Math.random() * WORDS.length)];
      tries++;
    }
    return w;
  };

  const scrambleWord = (w) => {
    // make sure scrambled is not equal to original
    let s = shuffleString(w);
    let attempts = 0;
    while ((s === w || s.length < 2) && attempts < 20) {
      s = shuffleString(w);
      attempts++;
    }
    return s;
  };

  const nextWord = () => {
    const w = pickRandomWord();
    const s = scrambleWord(w);
    setWord(w);
    setScrambled(s);
    setInput("");
    setTimeLeft(60);
    setMessage("");
    setRound((r) => r + 1);
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    const guess = input.trim().toLowerCase();
    if (!guess) return;
    if (guess === word.toLowerCase()) {
      // correct
      setScore((s) => {
        const newScore = s + Math.max(10, Math.floor(timeLeft / 2) + streak * 2);
        if (newScore > best) {
          setBest(newScore);
          saveBest(newScore);
        }
        return newScore;
      });
      setMessage("Correct! 🎉");
      setStreak((st) => st + 1);
      // short delay then next
      setTimeout(() => nextWord(), 800);
    } else {
      // wrong — penalize time and streak
      setMessage("Not quite — try again.");
      setStreak(0);
      setTimeLeft((t) => Math.max(5, t - 10));
    }
  };

  const handleFail = () => {
    setMessage(`Time's up! The word was “${word}”.`);
    setStreak(0);
    // small penalty to score
    setScore((s) => Math.max(0, s - 5));
    // next word after short pause
    setTimeout(() => nextWord(), 1200);
  };

  const giveUp = () => {
    setMessage(`Gave up — the word was “${word}”.`);
    setStreak(0);
    setScore((s) => Math.max(0, s - 5));
    setTimeout(() => nextWord(), 800);
  };

  const reveal = () => {
    setMessage(`Answer: ${word}`);
  };

  const handleShuffle = () => {
    setScrambled(scrambleWord(word));
  };

  if (!ready) return <div className="p-6">Loading game…</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      
      {/* 🔙 Back Button on Top Right */}
      <div className="flex justify-end  mb-6">
        {/* <div>
          <h1 className="text-2xl font-bold">Word Scramble</h1>
          <p className="text-sm text-gray-500">Unscramble the word before time runs out.</p>
        </div> */}

        <Link href="/workspace/mind-games">
          <button className="px-3 py-1 text-sm rounded-md border">
            Back
          </button>
        </Link>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Word Scramble</h1>
          <p className="text-sm text-gray-500">Unscramble the word before time runs out.</p>
        </div>

        <div className="text-right">
          <div className="text-sm">Score: <span className="font-semibold">{score}</span></div>
          <div className="text-sm">Best: <span className="font-semibold">{best}</span></div>
          <div className="text-sm">Streak: <span className="font-semibold">{streak}</span></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-gray-500">Round</div>
            <div className="text-lg font-semibold">#{Math.max(1, round - 1)}</div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-500">Time left</div>
            <div className="text-lg font-mono font-semibold">{String(timeLeft).padStart(2, "0")}s</div>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-500">Word length</div>
            <div className="text-lg font-semibold">{word.length}</div>
          </div>
        </div>

        <div className="mb-4 text-center">
          <div className="inline-block px-4 py-3 text-2xl font-mono bg-gray-50 rounded-md tracking-wider select-none">
            {scrambled}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3 items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-md px-3 py-2 focus:outline-none"
            placeholder="Type your guess..."
            autoComplete="off"
            inputMode="text"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
          <button type="button" onClick={handleShuffle} className="px-3 py-2 border rounded-md">
            Shuffle
          </button>
        </form>

        <div className="mt-3 flex gap-2">
          <button onClick={giveUp} className="px-3 py-1 text-sm rounded-md border">
            Give up
          </button>
          <button onClick={reveal} className="px-3 py-1 text-sm rounded-md border">
            Reveal
          </button>
          {/* <Link href="/workspace/mind-games">
            <button className="px-3 py-1 text-sm rounded-md border ml-auto">Back</button>
          </Link> */}
        </div>

        {message && <div className="mt-3 text-sm text-gray-700">{message}</div>}
      </div>

      <div className="text-sm text-gray-600">
        <strong>Tips:</strong> use <em>Shuffle</em> to re-shuffle the letters. Correct guesses award points based on remaining time and streak. You can edit the <code>WORDS</code> array to add your own words.
      </div>
    </div>
  );
}
