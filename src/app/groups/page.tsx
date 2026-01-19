"use client";

import { connectWS } from "@/helpers/connectWs";
import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import toast from "react-hot-toast";

interface ChatMessage {
  username: string;
  message: string;
}

interface UIMessage {
  type: "system" | "chat";
  text: string;
}

export default function Groups() {
  const socket = useRef<Socket | null>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [joined, setJoined] = useState(false);

  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [message, setMessage] = useState("");
  const [typingUser, setTypingUser] = useState("");


  useEffect(() => {
    if (!joined) return;

    socket.current = connectWS();
    socket.current.emit("joinRoom", { username, roomName });

    socket.current.on("roomNotice", (text: string) => {
      setMessages((prev) => [...prev, { type: "system", text }]);
      toast.success(text);
    });

    socket.current.on("chatMessage", (data: ChatMessage) => {
      setMessages((prev) => [
        ...prev,
        { type: "chat", text: `${data.username}: ${data.message}` },
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
  }, [joined, username, roomName]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUser]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.current?.emit("chatMessage", { message });

    setMessages((prev) => [
      ...prev,
      { type: "chat", text: `You: ${message}` },
    ]);

    setMessage("");
    socket.current?.emit("stopTyping");
  };

  const handleTyping = (value: string) => {
    setMessage(value);
    socket.current?.emit("typing");

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.current?.emit("stopTyping");
    }, 1000);
  };

  if (!joined) {
    return (
      <div className="flex min-h-[90vh] items-center justify-center">
        <div className="p-6 rounded-xl shadow w-80 space-y-4 border">
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
            disabled={!username.trim() || !roomName.trim()}
            onClick={() => setJoined(true)}
            className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
          >
            Join Room
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[80vh] rounded-2xl m-5 max-w-md border">
      {/* Header */}
      <div className="p-4 font-bold text-center bg-black text-white rounded-t-2xl">
        Room: {roomName}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-800">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded text-sm ${
              msg.type === "system"
                ? "bg-gray-600 text-center italic"
                : "bg-gray-700"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {typingUser && (
          <p className="text-xs italic text-gray-400">
            {typingUser} is typing...
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={message}
          onChange={(e) => handleTyping(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
