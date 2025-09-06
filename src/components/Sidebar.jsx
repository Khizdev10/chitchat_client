
import { FaGit, FaHome, FaRocket, FaSearch } from "react-icons/fa"
import { FaCog, FaComments, FaCommentDots, FaRegCopyright, FaUser } from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

const Sidebar = () => {

const navigate = useNavigate()

  return (


    <sidebar className="bg-gray-900 h-100" style={{ width: "45%", height: "100vh" }}>

      <div className="flex justify-between p-2 items-center">
        <div><span className="  text-md m-2" style={{ fontWeight: "bold" }}>Chit-Chat</span><span className="text-gray">v1.1</span></div>
        <span className="flex"> <FaHome className="text-lg m-2 cursor-pointer mr-2" onClick={() => {
          navigate("/")
        }} />


          {/* <select className="bg-gray-900 text-white" placeholder="btn">
                  <option>
                 <FaUser className="text-lg m-2 cursor-pointer mr-2" />
                 </option>
                
                 <option>
                  <p className="">LogOut</p>
                 </option>
                 </select> */}

          <a href="https://github.com/Khizdev10" target="blank"> <FaGithub className="text-lg m-2 cursor-pointer mr-2" /> </a>
          <a href="https://www.linkedin.com/in/khizar-abbasi-856363367/" target="blank"> <FaLinkedin className="text-lg m-2 cursor-pointer mr-2 " /></a> </span>
      </div>


      {/* SEARCHBOX FOR SEARCHING USERS.... */}
      <searchbox className="flex justify-center   bg-gray-900">
        <div className="relative " style={{ width: "95%" }}>
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>
      </searchbox>



      {/*  CHAT BOX OF USER USERNAME LAST MSG, DATE */}
      <div className="mt-5 flex items-center justify-between hover:bg-gray-700 cursor-pointer rounded transition .1 m-2 ">
        <div className="p-2 pl-4 ">
          <h1 className="font-semibold">Khizar Abbasi</h1>
          <p className="text-sm flex-2" style={{ opacity: "0.7" }}>Where are you man???</p>
        </div>
        <div>


          <p className="text-sm pr-2" style={{ opacity: "0.7" }}>4:36 pm</p>
          <p className="text-sm pr-4" style={{ opacity: "0.7" }}>8/12/2025</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between hover:bg-gray-700 cursor-pointer rounded transition .1 m-2 ">
        <div className="p-2 pl-4 ">
          <h1 className="font-semibold">Atif Khan</h1>
          <p className="text-sm flex-2" style={{ opacity: "0.7" }}>Slay Queen how are u </p>
        </div>
        <div>
          <p className="text-sm pr-2" style={{ opacity: "0.7" }}>8:10 pm</p>
          <p className="text-sm pr-4" style={{ opacity: "0.7" }}>8/12/2025</p>

        </div>
      </div>



    </sidebar >

  )
}
export default Sidebar