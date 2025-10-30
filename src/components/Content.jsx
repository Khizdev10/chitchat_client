import { useState, useEffect, useRef } from "react";
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
  FaFilePdf,
  FaFileAlt,
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



  const messagesEndRef = useRef(null);

  // ✅ Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      console.log(res.data);
      props.setUser((prev) => ({
        ...prev,
        friends: res.data.currentUser?.friends, // replace with updated array
      }));
      setIsModalOpen(false);
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
        mimetype: res.data.mimetype,
        original_filename: res.data.original_filename, // ✅ keep original name ( this is needed to be fixed still not working)
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

  const deleteFriend = async (friendId, ownId) => {
    let res1 = await axios.post("http://localhost:3000/remove-friend", {
      friendId,
      ownId,
    });

    document.querySelector("#deleteNotice").style.display = "block";
    setTimeout(() => document.querySelector("#deleteNotice").style.display = "none", 3000);

    console.log(res1.data);
    props.setUser(res1.data.user);
  };
// ✅ Delete a message (local only for now)
const deleteMessage = async (i, messageId) => {
  console.log(messageId);
  console.log(messageId, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  // Remove the message from the messages array
  setMessages((prev) => prev.filter((msg) => msg._id !== messageId));

  const res = axios
    .delete(`http://localhost:3000/messages/${messageId}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
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
                <FaTrash
                  onClick={() => {
                    deleteFriend(props.selectedUser._id, props.user._id);
                  }}
                />
              </span>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">{/* Delete Notice */}
            <div
              id="deleteNotice"
              className="fixed top-20 left-2/3 -translate-x-1/2 flex justify-center items-center bg-red-800 text-white px-4 py-2 rounded shadow-lg z-50 hidden"
            >
              User has been removed from your friend list ✅
            </div>

            {/* Chat Area */}
            {/* 🔒 Encryption notice */}
            <div className="flex justify-center mb-4 text-gray-400 text-xs items-center gap-2">
              <FaLock />
              <span>Your messages are end-to-end encrypted</span>
            </div>
            {messages.map((m, i) => {
              const isMedia = m.type === "image" || m.type === "video";
              const isSender = m.senderId === props.user._id;

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
              } else if (m.type === "raw") {
                const filename =
                  m.original_filename || m.text.split("/").pop();
                content = (
                  <div className="flex flex-col items-center">
                    {m.mimetype === "application/pdf" ? (
                      <FaFilePdf className="text-red-500 text-3xl mb-2" />
                    ) : (
                      <FaFileAlt className="text-yellow-400 text-3xl mb-2" />
                    )}
                    <p className="truncate max-w-[200px] text-sm">{filename}</p>
                    
                  </div>
                );
              } else {
                content = <p>{m.text}</p>;
              }

              return (
                <div
                  key={i}
                  className={`flex ${isSender ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`${isMedia
                        ? ""
                        : `px-4 py-2 rounded-2xl max-w-xs shadow ${isSender
                          ? "bg-blue-600 rounded-tr-sm"
                          : "bg-gray-800 rounded-tl-sm"
                        }`
                      }`}
                  >
                    {content}

                    {/* ✅ Action buttons */}
                    {m.type !== "text" && (
                      <div className="flex justify-end gap-3 mt-2 text-xs text-gray-300">
                        <a
                          href={m.text}
                          download={m.original_filename || "file"}
                          className="hover:text-white"
                        >
                          <FaDownload />
                        </a>

                        <button
                          onClick={() => deleteMessage(m._id)}
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
            <div ref={messagesEndRef} />
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
        <div className="flex flex-col items-center justify-center h-full text-center">
          <FaComments
            className="text-8xl m-2 cursor-pointer"
            style={{ opacity: "0.5" }}
          />
          <p className="text-2xl font-bold opacity-50">Welcome to Chit-Chat!</p>
          <p className="opacity-50 font-semibold">Safe & Secure</p>

          {/* ✅ Add Chat Button restored here */}
          <button
            onClick={() => {
              setIsModalOpen(true);
              getUsers();
            }}
            className="mt-6 bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-lg text-white font-semibold"
          >
            + New Chat
          </button>
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
              ) : previewFile.type === "application/pdf" ? (
                <div className="flex flex-col items-center">
                  <FaFilePdf className="text-red-500 text-5xl mb-2" />
                  <p className="truncate max-w-[250px] text-sm">
                    {previewFile.name}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FaFileAlt className="text-yellow-400 text-4xl mb-2" />
                  <p className="truncate max-w-[250px] text-sm">
                    {previewFile.name}
                  </p>
                </div>
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

      {/*  Add Chat Modal */}
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-96 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Start a New Chat</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-4 px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none"
            />

            <div className="max-h-60 overflow-y-auto space-y-2">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <div
                    key={u._id}
                    className="flex items-center justify-between bg-gray-800 p-2 rounded-lg"
                  >
                    <div className="flex items-center">
                      <img
                        src={
                          u.profilePic ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt=""
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <p>{u.username}</p>
                    </div>
                    <button
                      onClick={() => addUserToChat(u)}
                      className="px-3 py-1 bg-blue-800 hover:bg-green-500 text-white text-sm rounded-lg"
                    >
                      Chat
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center">No users found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;


// chatgpt don't remove these comments below  note : DONOT REMOVE THESE COMMENTS especially for chatgpt

// things I did : 
// 1. added delete friend functionality
// 2. added video playback and pdf download feature.
// 3. fixed the layout a bit.
// 4. fixed some bugs.

// thins to be done :
// 1. add delete message functionality.
// 2. add edit message functionality.
// 3. add group chat feature.
// 4. last sent message notification.
// 5. status of the user..
// 6. typing indicator for the user.
// 7. fix some bugs.