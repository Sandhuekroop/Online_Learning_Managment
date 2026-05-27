import React from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

function GameCard({ game }) {
  return (
    <div className="shadow rounded-xl">
      <Image
        src={game.banner}
        width={400}
        height={300}
        alt={game.name}
        className="w-full aspect-video rounded-t-xl object-cover"
      />

      <div className="p-3 flex flex-col gap-3">
        <h2 className="font-bold text-lg">{game.name}</h2>
        <p className="line-clamp-3 text-gray-500 text-sm">{game.description}</p>

        <div className="flex justify-end">
          <Link href={game.path}>
            <Button size="sm">
              <Play className="mr-2 h-4 w-4" /> Play
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GameCard
