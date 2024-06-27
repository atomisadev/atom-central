"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<any>(null);

  const fetchWeather = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    console.log(data);
    setWeather(data);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button onClick={fetchWeather}>Get Weather</Button>
      </div>
      {weather && (
        <Card>
          <CardHeader>
            <CardTitle>{weather.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
