"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/lib/socket";

export function ChatRoom({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.emit("join", roomId);
      socket.on("message", (msg: string) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }

    return () => {
      if (socket) {
        socket.off("message");
      }
    };
  }, [socket, roomId]);

  const sendMessage = () => {
    if (message && socket) {
      socket.emit("message", { room: roomId, message });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Room: {roomId}</h1>
      <div className="flex-grow overflow-y-auto mb-4 p-4 border rounded">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
