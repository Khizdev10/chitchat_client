import { useState, useEffect } from "react";
import {
  FaComments,
  FaCommentDots,
  FaRegCopyright,
  FaTimes,
  FaLock,
  FaTrash,
  FaPaperclip,
  FaCloudUploadAlt,
  FaDownload,
  FaSpinner,
} from "react-icons/fa";
import socket from "../../socket";
import axios from "axios";

const Content = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const [previewFile, setPreviewFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch old messages
  useEffect(() => {
    if (!props.user?._id || !props.selectedUser?._id) return;

    const fetchMessages = async () => {
      const chatId = [props.user._id, props.selectedUser._id].sort().join("_");
      const res = await axios.get(`http://localhost:3000/messages/${chatId}`);
      setMessages(res.data);
    };

    fetchMessages();
  }, [props.selectedUser, props.user]);

  // ✅ Fetch all users
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    } catch (e) {
      console.log("error fetching the users", e);
    }
  };

  // ✅ Add friend
  const addUserToChat = async (userToBeAdded) => {
    try {
      let currentUser = props.user;
      const res = await axios.post("http://localhost:3000/add-friend", {
        userToBeAdded,
        currentUser,
      });
      props.setUser(res.data.currentUser);
    } catch (e) {
      console.log("error adding user to chat", e);
    }
  };

  // ✅ Socket listeners
  useEffect(() => {
    socket.on("receive-message", (msg) => {
      if (
        (msg.senderId === props.selectedUser?._id &&
          msg.receiverId === props.user?._id) ||
        (msg.senderId === props.user?._id &&
          msg.receiverId === props.selectedUser?._id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receive-message");
    };
  }, [props.selectedUser, props.user]);

  // ✅ Send text message
  const sendMessage = () => {
    if (!text.trim() || !props.user?._id || !props.selectedUser?._id) return;

    const newMsg = {
      senderId: props.user._id,
      receiverId: props.selectedUser._id,
      chatId: [props.user._id, props.selectedUser._id].sort().join("_"),
      text,
      type: "text",
    };

    socket.emit("send-message", newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setText("");
  };

  // ✅ Send file message after preview confirm
  const sendFileMessage = async () => {
    if (!previewFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", previewFile);

    try {
      const res = await axios.post(
        "http://localhost:3000/upload-message-file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      const fileMessage = {
        senderId: props.user._id,
        receiverId: props.selectedUser._id,
        chatId: [props.user._id, props.selectedUser._id].sort().join("_"),
        text: res.data.url,
        type: res.data.type,
      };

      socket.emit("send-message", fileMessage);
      setMessages((prev) => [...prev, fileMessage]);
      setPreviewFile(null);
    } catch (err) {
      console.error("File upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete a message (local only for now)
  const deleteMessage = (index) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 w-100vh" style={{ width: "90%" }}>
      {props.selectedUser ? (
        <div className="flex flex-col h-screen w-full bg-gray-950 text-white">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
            <div className="flex items-center">
              <img
                src={
                  props.selectedUser.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                className="w-10 h-10 rounded-full border border-gray-700"
                alt=""
              />
              <h1 className="ml-3 font-semibold text-lg">
                {props.selectedUser.username}
              </h1>
            </div>
            <div className="text-green-400 text-sm flex items-center">
              <span>● Online</span>
              <span className="text-red-500 ml-2 cursor-pointer">
                <FaTrash />
              </span>
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
            {messages.map((m, i) => {
              const isMedia =
                m.type === "image" ||
                m.type === "video" ||
                (m.type === "raw" && !m.text.endsWith(".txt"));

              let content;
              if (m.type === "image") {
                content = (
                  <img
                    src={m.text}
                    alt="uploaded"
                    className="max-w-xs rounded-lg"
                  />
                );
              } else if (m.type === "video") {
                content = (
                  <video
                    src={m.text}
                    controls
                    className="max-w-xs rounded-lg"
                  />
                );
              } else if (m.type === "raw" && m.text.endsWith(".pdf")) {
                content = (
                  <a
                    href={m.text}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400"
                  >
                    📄 View PDF
                  </a>
                );
              } else if (m.type === "raw") {
                const filename = m.text.split("/").pop();
                content = (
                  <a
                    href={m.text}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-green-400"
                  >
                    ⬇️ Download {filename}
                  </a>
                );
              } else {
                content = <p>{m.text}</p>;
              }

              return (
                <div
                  key={i}
                  className={`flex ${
                    m.senderId === props.user._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      isMedia
                        ? "" // ✅ no bubble for images/videos/files
                        : `px-4 py-2 rounded-2xl max-w-xs shadow ${
                            m.senderId === props.user._id
                              ? "bg-blue-600 rounded-tr-sm"
                              : "bg-gray-800 rounded-tl-sm"
                          }`
                    }`}
                  >
                    {content}

                    {/* ✅ Action buttons */}
                    {m.type !== "text" && (
                      <div className="flex justify-end gap-3 mt-2 text-xs text-gray-300">
                        <a href={m.text} download className="hover:text-white">
                          <FaDownload />
                        </a>
                        <button
                          onClick={() => deleteMessage(i)}
                          className="hover:text-red-400"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
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

            {/* File Input (hidden) */}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setPreviewFile(file);
              }}
            />

            <button
              className="ml-4 cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <FaPaperclip />
            </button>

            <button
              onClick={sendMessage}
              className="ml-4 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full shadow cursor-pointer flex items-center gap-2"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Send"}
            </button>
          </div>
        </div>
      ) : (
        // ✅ No Chat Selected
        <div className="flex flex-col items-center justify-center h-full text-center">
          <FaComments
            className="text-8xl m-2 cursor-pointer"
            style={{ opacity: "0.5" }}
          />
          <p className="text-2xl font-bold opacity-50">Welcome to Chit-Chat!</p>
          <p className="opacity-50 font-semibold">Safe & Secure</p>

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
                        }}
                      >
                        <img
                          className="w-10 h-10 rounded-full"
                          src={
                            user.profilePic ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          }
                          alt=""
                        />
                        <span>{user.username}</span>
                        <a
                          className="btn bg-gray-800"
                          onClick={() => addUserToChat(user)}
                        >
                          Add
                        </a>
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

      {/* ✅ File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl shadow-xl max-w-md text-center relative">
            <button
              onClick={() => setPreviewFile(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-lg font-bold mb-4">Preview File</h2>

            <div className="mb-4">
              {previewFile.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(previewFile)}
                  alt="preview"
                  className="max-h-60 mx-auto rounded-lg"
                />
              ) : previewFile.type.startsWith("video/") ? (
                <video
                  src={URL.createObjectURL(previewFile)}
                  controls
                  className="max-h-60 mx-auto rounded-lg"
                />
              ) : (
                <p className="text-gray-300">
                  📄 {previewFile.name} (
                  {(previewFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setPreviewFile(null)}
                className="px-4 py-2 rounded-full bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={sendFileMessage}
                className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaCloudUploadAlt /> Send
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// things to add and improve : :
// 1. add delete message option.
// 2. add remove friend opiton.
// 3. add group feature.
// 4. improve the design 
// 5. add download option and add pdf
export default Content;
