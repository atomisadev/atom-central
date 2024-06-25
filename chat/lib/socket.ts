import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket | null = null;

export const useSocket = () => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    const initSocket = async () => {
      await fetch("/api/socket");
      if (!socket) {
        socket = io();
        setSocketInstance(socket);
      }
    };

    initSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return socketInstance;
};
