import { RoomJoin } from "@/components/room-join";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Chat App</h1>
      <RoomJoin />
    </main>
  );
}
