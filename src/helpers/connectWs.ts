import { io } from "socket.io-client";

export function connectWS() {
  console.log(process.env.NEXT_PUBLIC_SOCKET_URL);
  return io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
    transports: ["websocket"],
    path: "/socket.io",
  });
}
