"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [movieName, setMovieName] = useState("");
  const [trailerEmbed, setTrailerEmbed] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `/api/search-trailer?movie=${encodeURIComponent(movieName)}`
      );
      const data = await response.json();

      if (data.embedCode) {
        setTrailerEmbed(data.embedCode);
      } else {
        setTrailerEmbed("<p>No trailer found</p>");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setTrailerEmbed("<p>Error fetching trailer</p>");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Trailer Search</h1>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Enter movie name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {trailerEmbed && (
        <div
          className="aspect-w-16 aspect-h-9"
          dangerouslySetInnerHTML={{ __html: trailerEmbed }}
        ></div>
      )}
    </div>
  );
}
