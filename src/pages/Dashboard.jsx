import { useState } from "react";

// importing icons 
import { FaGit, FaHome, FaRocket, FaSearch } from "react-icons/fa"
import { FaCog, FaComments, FaCommentDots, FaRegCopyright, FaUser } from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

// importing components 
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'


export default function Dashboard(props) {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate()

  return (
    <main className="overflow-hidden">
      <parents className="flex justify-between">

       <Sidebar  user={props.user} setActiveChat={props.setActiveChat} />
       <Content user={props.user} setUser={props.setUser} selectedUser={props.selectedUser} />
      
      

      </parents>
    </main>
  );
}
