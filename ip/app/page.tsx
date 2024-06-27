"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

export default function Home() {
  const [ipAddress, setIpAddress] = useState("");
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {});

  const fetchIpAndLocation = async () => {
    try {
      const ipResponse = await axios.get("https://api.ipify.org?format=json");
      setIpAddress(ipResponse.data.ip);

      const locationResponse = await axios.get(
        `https://ipapi.co/${ipResponse.data.ip}/json/`
      );
      setLocation({
        lat: locationResponse.data.latitude,
        lng: locationResponse.data.longitude,
      });

      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [
          locationResponse.data.longitude,
          locationResponse.data.latitude,
        ],
        zoom: 10,
      });

      new mapboxgl.Marker()
        .setLngLat([
          locationResponse.data.longitude,
          locationResponse.data.latitude,
        ])
        .addTo(map);
    } catch (error) {
      console.error("Error fetching IP and location:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>IP Address Locator</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your IP Address: {ipAddress}</p>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
          <Button onClick={fetchIpAndLocation} className="mt-2">
            Refresh
          </Button>
        </CardContent>
      </Card>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
}
