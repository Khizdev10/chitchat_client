import { useState } from "react";
import { FiSend, FiSearch, FiMoreVertical } from "react-icons/fi";

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: "Alice", lastMessage: "Hey, how are you?" },
    { id: 2, name: "Bob", lastMessage: "Let’s meet tomorrow." },
    { id: 3, name: "Charlie", lastMessage: "Typing..." },
  ];

  const messages = [
    { from: "Alice", text: "Hello!" },
    { from: "You", text: "Hey Alice, what's up?" },
    { from: "Alice", text: "All good, you?" },
  ];

  return (
    <div className="h-screen flex bg-gray-900 text-gray-200 font-inter">
      {/* Sidebar */}
      <aside className="w-1/4 border-r border-gray-800 flex flex-col">
        {/* Sidebar header */}
        <div className="p-4 bg-gray-800/80 backdrop-blur-lg border-b border-gray-800 flex justify-between items-center">
          <span className="font-bold text-lg">Chats</span>
          <FiSearch className="text-gray-400 hover:text-gray-200 cursor-pointer" />
        </div>

        {/* User list */}
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`p-4 border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer transition ${
                selectedUser?.id === user.id ? "bg-gray-800/70" : ""
              }`}
            >
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-gray-400 truncate">
                {user.lastMessage}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat area */}
      <main className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="p-4 bg-gray-800/80 backdrop-blur-lg border-b border-gray-800 flex justify-between items-center">
          <span className="font-semibold">
            {selectedUser ? selectedUser.name : "Select a chat"}
          </span>
          <FiMoreVertical className="text-gray-400 hover:text-gray-200 cursor-pointer" />
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-3 bg-gray-900">
          {selectedUser ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-xs px-4 py-2 rounded-2xl shadow-sm ${
                  msg.from === "You"
                    ? "bg-blue-600 text-white self-end ml-auto rounded-br-none"
                    : "bg-gray-800 text-gray-200 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center mt-20">
              👈 Select a conversation to start messaging
            </div>
          )}
        </div>

        {/* Message input */}
        {selectedUser && (
          <div className="p-4 border-t border-gray-800 bg-gray-800/80 backdrop-blur-lg flex items-center gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-gray-700/60 border border-gray-600 rounded-full px-4 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-md transition">
              <FiSend />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
