// src/components/Sidebar.jsx
import { useState } from "react"
import { FaHome, FaUser, FaCog, FaBars } from "react-icons/fa"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div >
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } h-screen bg-gray-800 text-gray-100 flex flex-col transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {isOpen && <h1 className="text-lg font-bold">MyApp</h1>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded hover:bg-gray-800"
          >
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 mt-4 space-y-2 flex flex-col justify-start">
          
  {/* <hr style={{borderBottom:"1px solid white !important" , borderRadius:"20px"}}></hr> */}
  <SidebarItem icon={<FaHome />} label="Home" isOpen={isOpen} />
  <SidebarItem icon={<FaUser />} label="Profile" isOpen={isOpen} />
  <SidebarItem icon={<FaCog />} label="Settings" isOpen={isOpen} />
</nav>

{/* Menu */}
<nav className="flex-1 mt-auto space-y-2 flex flex-col justify-end">
  {/* <hr style={{borderBottom:"1px solid white !important" , borderRadius:"20px"}}></hr> */}
  <SidebarItem icon={<FaHome />} label="Home" isOpen={isOpen} />
  <SidebarItem icon={<FaUser />} label="Profile" isOpen={isOpen} />
  <SidebarItem icon={<FaCog />} label="Settings" isOpen={isOpen} />
</nav>

      </div>

      {/* Main content */}
     
    </div>
  )
}

// Sub-component for items
function SidebarItem({ icon, label, isOpen }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-gray-100 rounded-md">
      <div className="text-xl">{icon}</div>
      {isOpen && <span className="text-sm">{label}</span>}
    </div>
  )
}
