
// importing icons 
import { FaGit, FaHome, FaRocket, FaSearch } from "react-icons/fa"
import { FaCog, FaComments, FaCommentDots, FaRegCopyright, FaUser } from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";


const Content = ()=>{
    return(
        //   {/* MAIN CHATING AREA WRITE MSG, SEND MSG */}
          <content className="bg-gray-800 w-100vh" style={{ width: "90%" }}>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FaComments
              className="text-8xl m-2 cursor-pointer"
              style={{ opacity: "0.5" }}
            />
            <p className="text-2xl" style={{ opacity: "0.5", fontWeight: "bold" }}>
              Welcome to Chit-Chat !
            </p>
            <p style={{ opacity: "0.5", fontWeight: "semibold" }} > Safe & Secure</p>
            <button className="btn  bg-blue-900  text-sm mt-2 border-blue-600  flex items-center gap-2 bg-blue-900 text-white text-sm mt-2 px-4 py-2 rounded-full hover:bg-blue-800 transition animate-pulse" style={{ borderRadius: "40px" }}> <FaCommentDots /> New Chat</button>


            {/* COPYRIGHT LINE AT THE END  */}
            <footer className=" text-gray-400 py-3 text-center text-sm absolute bottom-2 text-center">
              <div className="flex items-center justify-center gap-1">
                <FaRegCopyright className="text-gray-400" />
                <span> Chit-Chat. All rights reserved.</span>
              </div>
            </footer>
          </div>
        </content>
    )
}
export default Content