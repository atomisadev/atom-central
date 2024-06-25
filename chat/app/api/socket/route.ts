import { Server } from "socket.io";
import { NextApiResponse } from "next";
import { Server as NetServer } from "http";

export const dynamic = "force-dynamic";

const SocketHandler = (req: Request, res: NextApiResponse) => {
  if (!(res.socket as any).server.io) {
    console.log("Socket is initializing");
    const httpServer: NetServer = (res.socket as any).server as any;
    const io = new Server(httpServer, {
      path: "/api/socket",
    });
    (res.socket as any).server.io = io;

    io.on("connection", (socket) => {
      socket.on("join", (room: string) => {
        socket.join(room);
      });

      socket.on(
        "message",
        ({ room, message }: { room: string; message: string }) => {
          io.to(room).emit("message", message);
        }
      );
    });
  } else {
    console.log("Socket is already running");
  }

  res.end();
};

export { SocketHandler as GET, SocketHandler as POST };
