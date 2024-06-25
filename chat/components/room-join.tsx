"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function RoomJoin() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleJoin = () => {
    if (roomId) {
      router.push(`/chat/${roomId}`);
    }
  };

  return (
    <div className="flex space-x-2">
      <Input
        type="text"
        placeholder="Enter room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <Button onClick={handleJoin}>Join Room</Button>
    </div>
  );
}
