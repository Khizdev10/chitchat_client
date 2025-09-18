import { useState, useEffect } from "react";
import { FaComments, FaCommentDots, FaRegCopyright, FaTimes, FaLock, FaTrash, FaPaperclip } from "react-icons/fa";
import socket from "../../socket"; // ✅ import socket client
import axios from "axios";

const Content = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]); // ✅ chat messages state
  const [text, setText] = useState(""); // ✅ input message text

  // Fetch all users for new chat modal
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    } catch (e) {
      console.log("error fetching the users", e);
    }
  };

  // Add friend logic
  const addUserToChat = async (userToBeAdded) => {
    try {
      let currentUser = props.user;
      const res = await axios.post("http://localhost:3000/add-friend", { userToBeAdded, currentUser });
      props.setUser(res.data.currentUser);
    } catch (e) {
      console.log("error adding user to chat", e);
    }
  };

  // ✅ Socket listeners
  useEffect(() => {
    socket.on("receive-message", (msg) => {
      console.log("📩 New message received:", msg);

      // Show only messages for the current selected chat
      if (
        (msg.senderId === props.selectedUser?._id && msg.receiverId === props.user?._id) ||
        (msg.senderId === props.user?._id && msg.receiverId === props.selectedUser?._id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receive-message");
    };
  }, [props.selectedUser, props.user]);

  // ✅ Send message
  const sendMessage = () => {
    if (!text.trim() || !props.user?._id || !props.selectedUser?._id) return;

    const newMsg = {
      senderId: props.user._id,
      receiverId: props.selectedUser._id,
      chatId: "temporaryChatId", // later we’ll generate real chat IDs
      text,
    };

    // send to server
    socket.emit("send-message", newMsg);

    // show instantly in UI
    setMessages((prev) => [...prev, newMsg]);
    setText("");
  };

  // Filtered users for search
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 w-100vh" style={{ width: "90%" }}>
      {/* ✅ Active Chat */}
      {props.selectedUser ? (
        <div className="flex flex-col h-screen w-full bg-gray-950 text-white">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
            <div className="flex items-center">
              <img
                src={props.selectedUser.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                className="w-10 h-10 rounded-full border border-gray-700"
                alt=""
              />
              <h1 className="ml-3 font-semibold text-lg">{props.selectedUser.username}</h1>
            </div>
            <div className="text-green-400 text-sm flex items-center">
              <span>● Online</span>
              <span className="text-red-500 ml-2 cursor-pointer"><FaTrash /></span>
            </div>
          </div>

          {/* Encryption Banner */}
          <div className="flex justify-center my-4">
            <div className="bg-gray-800 text-gray-300 text-xs px-4 py-2 rounded-full flex items-center shadow-md">
              <FaLock className="mr-2 text-gray-400" size={12} />
              <span>All chats are end-to-end encrypted</span>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.senderId === props.user._id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-xs shadow ${
                    m.senderId === props.user._id ? "bg-blue-600 rounded-tr-sm" : "bg-gray-800 rounded-tl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-800 flex items-center bg-gray-900">
            <input
              type="text"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none"
            />
            <button className="ml-4 cursor-pointer"><FaPaperclip /></button>
            <button
              onClick={sendMessage}
              className="ml-4 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full shadow cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        // ✅ No Chat Selected (welcome screen)
        <div className="flex flex-col items-center justify-center h-full text-center">
          <FaComments className="text-8xl m-2 cursor-pointer" style={{ opacity: "0.5" }} />
          <p className="text-2xl font-bold opacity-50">Welcome to Chit-Chat!</p>
          <p className="opacity-50 font-semibold">Safe & Secure</p>

          {/* New Chat Button */}
          <button
            className="flex items-center cursor-pointer gap-2 bg-blue-900 text-white text-sm mt-2 px-4 py-2 rounded-full hover:bg-blue-800 transition animate-pulse"
            onClick={() => {
              setIsModalOpen(true);
              getUsers();
            }}
          >
            <FaCommentDots /> New Chat
          </button>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-106 p-6 relative border border-gray-700">
                <button
                  className="absolute top-3 right-3 text-gray-300 hover:text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  <FaTimes size={18} />
                </button>

                <h2 className="text-lg font-bold mb-4">Start a New Chat</h2>

                <input
                  type="text"
                  placeholder="Search user..."
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg mb-4 
                  focus:outline-none focus:ring focus:ring-blue-500 bg-gray-900 text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="max-h-40 overflow-y-auto">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-800 rounded-md flex items-center justify-between gap-2"
                        onClick={() => {
                          console.log("Start chat with:", user.username);
                          setIsModalOpen(false);
                          // later: props.setActiveChat(user)
                        }}
                      >
                        <img
                          className="w-10 h-10 rounded-full"
                          src={user.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                          alt=""
                        />
                        <span>{user.username}</span>
                        <a className="btn bg-gray-800" onClick={() => addUserToChat(user)}>Add</a>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No users found</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <footer className="text-gray-400 py-3 text-center text-sm absolute bottom-2 text-center">
            <div className="flex items-center justify-center gap-1">
              <FaRegCopyright className="text-gray-400" />
              <span> Chit-Chat. All rights reserved.</span>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Content;
