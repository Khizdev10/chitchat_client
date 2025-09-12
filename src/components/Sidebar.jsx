import { useState } from "react";
import { FaHome, FaSearch, FaUser, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <sidebar className="bg-gray-900 h-100" style={{ width: "45%", height: "100vh" }}>
      <div className="flex justify-between p-2 items-center relative">
        {/* Profile Section */}
        <div className="flex items-center">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="cursor-pointer"
          >
            {props.user?.profilePic ? (
              <img
                src={props.user.profilePic}
                alt="User"
                className="w-9 h-9 rounded-full object-cover border-2 border-white cursor-pointer"
              />
            ) : (
              <FaUser className="text-lg m-2 cursor-pointer mr-2 w-8 h-8" />
            )}
          </button>

          {/* Dropdown for profile */}
          {profileMenuOpen && (
            <div className="absolute top-14 left-2 w-44 bg-gray-700 text-white rounded-lg shadow-lg py-2 z-50">
              {props.user?.profilePic && (
                <button
                  onClick={() => window.open(props.user.profilePic, "_blank")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800 cursor-pointer"
                >
                  View Image
                </button>
              )}
              <button
                onClick={() => navigate("/addpic")}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800 cursor-pointer"
              >
                Change Profile Pic
              </button>
            </div>
          )}

          <span className="text-md m-2 font-bold">Chit-Chat</span>
          <span className="text-gray">v1.1</span>
        </div>

        {/* Icons (Home, Github, LinkedIn) */}
        <span className="flex">
          <FaHome
            className="text-lg m-2 cursor-pointer mr-2"
            onClick={() => navigate("/")}
          />
          <a href="https://github.com/Khizdev10" target="_blank" rel="noreferrer">
            <FaGithub className="text-lg m-2 cursor-pointer mr-2" />
          </a>
          <a
            href="https://www.linkedin.com/in/khizar-abbasi-856363367/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin className="text-lg m-2 cursor-pointer mr-2" />
          </a>
        </span>
      </div>

      {/* SEARCHBOX FOR SEARCHING USERS */}
      <searchbox className="flex justify-center bg-gray-900">
        <div className="relative" style={{ width: "95%" }}>
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>
      </searchbox>
          {
            // props.user.friends.map((friend)=>{
              
            // })
          }

      <div>
      <button className="btn border-gray-600 mt-2 ml-4 rounded-full bg-transparent hover:border-blue-500" style={{opacity:"0.7"}}>All</button>
      <button className="btn border-gray-600 mt-2 ml-4 rounded-full bg-transparent hover:border-blue-500" style={{opacity:"0.7"}}>Announce</button>
      <button className="btn border-gray-600 mt-2 ml-4 rounded-full bg-transparent hover:border-blue-500" style={{opacity:"0.7"}}>Friends</button>
    </div>
      {/* Example Chat Boxes */}
      
          <div>
            {props.user?.friends? props.user?.friends.map((friend)=>{
              return(
                <div  className="mt-2 flex  items-center justify-between hover:bg-gray-700 cursor-pointer rounded transition m-2 ml-2" onClick={()=>{
                // this will you know set the active chat with the other user so make this function in the app.jsx
                  setActiveChat(friend)
                }}>
                 <div className="p-2 pl-4 flex items-center">
                 <img  className="w-10 h-10 rounded-full mr-2 border-gray-600 border-2 " src={friend.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
                <div>
                <h1 className="font-semibold">{friend.username}</h1>
                <p className="text-sm opacity-70">{friend.email}</p>
                </div>
              </div>
              <div>
          <p className="text-sm pr-2 opacity-70">4:36 pm</p>
          <p className="text-sm pr-4 opacity-70">8/12/2025</p>
        </div>
              </div>
              
              )
            }):"abcdef"}
      
      
      </div>
    
     
    </sidebar>
  );
};

export default Sidebar;
