"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import "./style.css";

// Each level must have pairs that form total cards as multiples of 6
const LEVEL_EMOJIS = {
  easy: ["🦊", "🐼", "🐸"], // 3 pairs → 6 cards
  medium: ["🦁", "🐵", "🐯", "🦄", "🐨", "🐣"], // 6 pairs → 12 cards
  hard: ["🐶","🐱","🐻","🐰","🐙","🐳","🦄","🐯","🦁"], // 9 pairs → 18 cards
};

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createDeck(pairs) {
  const cards = pairs.flatMap((emoji, index) => [
    { id: `${index}-a`, value: emoji, matched: false },
    { id: `${index}-b`, value: emoji, matched: false },
  ]);
  return shuffleArray(cards);
}

export default function MemoryFlipPage() {
  const [level, setLevel] = useState("easy"); // NEW
  const [deck, setDeck] = useState([]);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  // Generate deck based on selected level
  useEffect(() => {
    setDeck(createDeck(LEVEL_EMOJIS[level]));
  }, [level]);

  // Timer logic
  useEffect(() => {
    if (started) {
      timerRef.current = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [started]);

  const resetGame = () => {
    clearInterval(timerRef.current);
    setDeck(createDeck(LEVEL_EMOJIS[level]));
    setFirst(null);
    setSecond(null);
    setDisabled(false);
    setMoves(0);
    setMatches(0);
    setStarted(false);
    setTime(0);
  };

  const handleFlip = (card) => {
    if (disabled) return;
    if (!started) setStarted(true);
    if (first && first.id === card.id) return;

    if (!first) {
      setFirst(card);
      setDeck((d) =>
        d.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
      );
    } else if (!second) {
      setSecond(card);
      setDisabled(true);

      setDeck((d) =>
        d.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
      );

      setMoves((m) => m + 1);

      setTimeout(() => {
        setDeck((d) => {
          if (first.value === card.value) {
            const newDeck = d.map((c) =>
              c.value === first.value ? { ...c, matched: true } : c
            );
            setMatches((m) => m + 1);
            setFirst(null);
            setSecond(null);
            setDisabled(false);

            if (newDeck.every((c) => c.matched)) setStarted(false);
            return newDeck;
          } else {
            const newDeck = d.map((c) =>
              c.id === first.id || c.id === card.id
                ? { ...c, flipped: false }
                : c
            );
            setFirst(null);
            setSecond(null);
            setDisabled(false);
            return newDeck;
          }
        });
      }, 700);
    }
  };

  const formatTime = (s) => {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const matchedPairs = useMemo(
    () => deck.filter((c) => c.matched).length / 2,
    [deck]
  );
  const totalPairs = deck.length / 2;

  if (deck.length === 0) {
    return <div className="p-6">Loading game...</div>;
  }

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Memory Flip</h1>
          <p className="text-sm text-gray-500">Find all matching pairs</p>
        </div>

        <div className="flex gap-3 items-center">
          <div className="text-sm">
            <div>
              Moves: <span className="font-medium">{moves}</span>
            </div>
            <div>
              Matches:{" "}
              <span className="font-medium">
                {matchedPairs}/{totalPairs}
              </span>
            </div>
            <div>
              Time: <span className="font-medium">{formatTime(time)}</span>
            </div>
          </div>

          <button
            className="px-3 py-1 rounded-md border hover:bg-gray-100"
            onClick={resetGame}
          >
            Restart
          </button>

          <Link href="/workspace/mind-games">
            <button className="px-3 py-1 rounded-md border hover:bg-gray-100">
              Back
            </button>
          </Link>
        </div>
      </div>

      {/* LEVEL SELECTOR */}
      <div className="flex gap-3 mb-5">
        {["easy", "medium", "hard"].map((l) => (
          <button
            key={l}
            onClick={() => {
              setLevel(l);
              resetGame();
            }}
            className={`px-3 py-1 rounded-md border ${
              level === l ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </button>
        ))}
      </div>

      {/* GAME BOARD */}
      <div className="game-board">
        <div
          className="grid gap-4 board-grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
          }}
        >
          {deck.map((card) => (
            <button
              key={card.id}
              className={`card ${
                card.flipped || card.matched ? "is-flipped" : ""
              }`}
              onClick={() =>
                !card.flipped && !card.matched && handleFlip(card)
              }
              aria-label={`Card ${card.id}`}
            >
              <div className="card-inner">
                <div className="card-front flex items-center justify-center text-4xl">
                  🎴
                </div>
                <div className="card-back flex items-center justify-center text-5xl">
                  {card.value}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* WIN MODAL */}
      {matchedPairs === totalPairs && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-6">
          <div className="bg-white p-6 rounded-lg text-black shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Well done! 🎉</h2>
            <p className="mb-4">
              You finished in {moves} moves — {formatTime(time)}
            </p>
            <button
              className="px-4 py-2 rounded-md bg-black text-white"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
