import { ChatRoom } from "@/components/chat-room";

export default function ChatPage({ params }: { params: { roomId: string } }) {
  return <ChatRoom roomId={params.roomId} />;
}
