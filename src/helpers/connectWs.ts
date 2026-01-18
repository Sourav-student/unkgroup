import { io } from "socket.io-client";

export function connectWS() {
  return io(process.env.NEXT_PUBLIC_SOCKETIO_URL!, {
    transports: ["websocket"],
    path: "/socket.io",
  });
}
