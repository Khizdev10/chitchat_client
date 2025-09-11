import { useState } from "react";
import { FaComments, FaCommentDots, FaRegCopyright, FaTimes } from "react-icons/fa";

// axios import
import axios from 'axios'

const Content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users,setusers] = useState([])
  // Example user list (replace with API later)
  // const users = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"];
  // let users = [];
  const getUsers = async () => {
try{
  const res = await axios.get("http://localhost:3000/users")
 setusers(res.data)
}
catch(e){
  console.log("error fetching the users",e)
}
  }

  console.log("users",users)

  // getUsers()

  // const filteredUsers = []

  // Filtered users
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 w-100vh" style={{ width: "90%" }}>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <FaComments
          className="text-8xl m-2 cursor-pointer"
          style={{ opacity: "0.5" }}
        />
        <p className="text-2xl font-bold opacity-50">Welcome to Chit-Chat!</p>
        <p className="opacity-50 font-semibold">Safe & Secure</p>

        {/* New Chat Button */}
        <button
          className="flex items-center cursor-pointer gap-2 bg-blue-900 text-white text-sm mt-2 px-4 py-2 rounded-full hover:bg-blue-800 transition animate-pulse"
          onClick={() => {
            setIsModalOpen(true)
            getUsers()
          }}
        >
          <FaCommentDots /> New Chat
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-106 p-6 relative border border-gray-700">
              {/* Close button */}
              <button
                className="absolute top-3 right-3 text-gray-300 hover:text-white"
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes size={18} />
              </button>

              <h2 className="text-lg font-bold mb-4">Start a New Chat</h2>

              {/* Search box */}
              <input
                type="text"
                placeholder="Search user..."
                className="w-full px-3 py-2 border border-gray-600 rounded-lg mb-4 
                focus:outline-none focus:ring focus:ring-blue-500 bg-gray-900 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Search results */}
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
                     <img className="w-10 h-10 rounded-full" src={user.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="dont have profile pic" />
                     <span>{user.username}</span>
                     <a className="btn bg-gray-800">Add</a>
                     {/* <FaCommentDots/> */}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No users found</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-gray-400 py-3 text-center text-sm absolute bottom-2 text-center">
          <div className="flex items-center justify-center gap-1">
            <FaRegCopyright className="text-gray-400" />
            <span> Chit-Chat. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Content;
