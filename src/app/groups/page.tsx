"use client";

import { connectWS } from "@/helpers/connectWs";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import type { Socket } from "socket.io-client";

interface ChatMessage {
  username: string;
  message: string;
}

export default function Groups() {
  const socket = useRef<Socket | null>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [joined, setJoined] = useState(false);

  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    if (!joined) return;

    socket.current = connectWS();

    socket.current.emit("joinRoom", { username, roomName });

    socket.current.on("roomNotice", (name: string) => {
      setMessages((prev) => [...prev, `${name} joined the room`]);
      toast.success(`${name} Join the chat!`)
    });

    socket.current.on("chatMessage", (data: ChatMessage) => {
      setMessages((prev) => [
        ...prev,
        `${data.username}: ${data.message}`,
      ]);
    });

    socket.current.on("typing", (name: string) => {
      setTypingUser(name);
    });

    socket.current.on("stopTyping", () => {
      setTypingUser("");
    });

    return () => {
      socket.current?.off();
      socket.current?.disconnect();
    };
  }, [joined, roomName, username]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.current?.emit("chatMessage", {
      roomName,
      message,
    });

    setMessages((prev) => [...prev, `You: ${message}`]);
    setMessage("");
    socket.current?.emit("stopTyping");
  };

  const handleTyping = () => {
    socket.current?.emit("typing");

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      socket.current?.emit("stopTyping");
    }, 1000);
  };

  /* ---------- JOIN SCREEN ---------- */
  if (!joined) {
    return (
      <div className="flex min-h-[90vh] items-center justify-center">
        <div className="p-6 rounded-xl shadow w-80 space-y-4">
          <h2 className="text-xl font-bold text-center">Join Chat</h2>

          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />

          <button
            onClick={() => username && roomName && setJoined(true)}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 cursor-pointer"
          >
            Join Room
          </button>
        </div>
      </div>
    );
  }

  /* ---------- CHAT UI ---------- */
  return (
    <div className="flex flex-col h-[80vh] rounded-2xl m-5 max-w-md border">
      {/* Header */}
      <div className="p-4 border-b font-bold text-center rounded-t-2xl bg-black text-white">
        Room: {roomName}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-700">
        {messages.map((msg, i) => (
          <div key={i} className="p-2 bg-stone-600 rounded">
            {msg}
          </div>
        ))}

        {typingUser && (
          <p className="text-sm italic text-gray-400">
            {typingUser} is typing...
          </p>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 rounded cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );
}