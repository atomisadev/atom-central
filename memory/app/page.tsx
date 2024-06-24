"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const gameLetters = [...letters, ...letters];

interface Tile {
  letter: string;
  isRevealed: boolean;
  isMatched: boolean;
}

export default function Home() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledLetters = gameLetters.sort(() => Math.random() - 0.5);
    setTiles(
      shuffledLetters.map((letter) => ({
        letter,
        isRevealed: false,
        isMatched: false,
      }))
    );
    setSelectedTiles([]);
  };

  const handleTileClick = (index: number) => {
    if (tiles[index].isRevealed || selectedTiles.length === 2) return;

    const newTiles = [...tiles];
    newTiles[index].isRevealed = true;
    setTiles(newTiles);

    const newSelectedTiles = [...selectedTiles, index];
    setSelectedTiles(newSelectedTiles);

    if (newSelectedTiles.length === 2) {
      setTimeout(() => checkMatch(newSelectedTiles), 1000);
    }
  };

  const checkMatch = (selected: number[]) => {
    const [first, second] = selected;
    const newTiles = [...tiles];

    if (newTiles[first].letter === newTiles[second].letter) {
      newTiles[first].isMatched = true;
      newTiles[second].isMatched = true;
    } else {
      newTiles[first].isRevealed = false;
      newTiles[second].isRevealed = false;
    }

    setTiles(newTiles);
    setSelectedTiles([]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="grid grid-cols-4 gap-4">
        {tiles.map((tile, index) => (
          <Button
            key={index}
            className="w-24 h-24 text-2xl"
            variant={tile.isRevealed || tile.isMatched ? "default" : "outline"}
            onClick={() => handleTileClick(index)}
          >
            {tile.isRevealed || tile.isMatched ? tile.letter : ""}
          </Button>
        ))}
      </div>
      <Button className="mt-8" onClick={initializeGame}>
        Reset Game
      </Button>
    </main>
  );
}
