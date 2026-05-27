"use client"
import React from 'react'
import GameCard from '../_components/GameCard'

function MindGamesPage() {

  const games = [
    {
      id: 1,
      name: "Memory Flip",
      description: "Test your short-term memory with card flips.",
      banner: "/games/memory.png",
      path: "/workspace/mind-games/memory-flip",
    },
    {
      id: 2,
      name: "Number Puzzle",
      description: "Guess the missing number in a logical sequence.",
      banner: "/games/number.png",
      path: "/workspace/mind-games/number-puzzle",
    },
    {
      id: 3,
      name: "Word Scramble",
      description: "Unscramble the word before time runs out.",
      banner: "/games/word.png",
      path: "/workspace/mind-games/word-scramble",
    },
    {
      id: 4,
      name: "Reaction Time Test",
      description: "Measure how quickly you can react!",
      banner: "/games/reaction.png",
      path: "/workspace/mind-games/reaction-test",
    }
  ]

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Mind Games</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}

export default MindGamesPage
