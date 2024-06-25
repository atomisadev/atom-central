"use client";

import { DirectionalSuspenseListProps, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Movie {
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

const API_KEY = "925e5ed19a8a81ce8acf2b28e5355bd0";

export default function Home() {
  const [movieTitle, setMovieTitle] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          movieTitle
        )}`
      );
      const data = await response.json();

      const movies: Movie[] = data.results.slice(0, 3).map((movie: Movie) => ({
        title: movie.title,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        release_date: movie.release_date,
        overview: movie.overview,
      }));

      setSearchResults(movies);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex space-x-2 mb-8">
          <Input
            type="text"
            placeholder="Enter movie title"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <div className="flex space-x-4">
          {searchResults.map((movie, index) => (
            <Card key={index} className="w-1/3 flex flex-col">
              <div className="h-64 relative overflow-hidden">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="absolute w-full h-full object-cover rounded-lg"
                />
              </div>
              <CardContent className="flex-grow">
                <h3 className="font-bold text-lg mt-2">{movie.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {movie.release_date}
                </p>
                <p className="text-sm">{movie.overview.slice(0, 100)}...</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
