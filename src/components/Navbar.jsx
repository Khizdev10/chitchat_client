import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function NavbarLayout({ user, setUserOut }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Login", href: "/login" },
    { name: "Signup", href: "/register" },
  ];

  const navLinkLogin = [
    { name: "Home", href: "/" },
    {
      name: "Logout",
      onClick: () => {
        setUserOut();
      },
    },
    {
      name: "Dashboard",
      onClick: () => {
        navigate("/Dashboard");
      },
    },
    {
      name: "ProfileIcon",
      type: "icon",
    },
  ];

  return (
    <div className="bg-transparent text-gray-800 dark:text-white ">
      {/* Top Navbar */}
      <header className="w-full fixed top-0 left-0 z-50 bg-transparent backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-bold">Chit Chat</div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {user
              ? navLinkLogin.map((link) =>
                  link.type === "icon" ? (
                    <div key={link.name} className="relative">
                      {/* Profile Button */}
                      <button
                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                        className="hover:text-gray-500 transition-colors cursor-pointer"
                      >
                        {user?.profilePic ? (
                          <img
                            src={user.profilePic}
                            alt="User"
                            className="w-8 h-8 rounded-full object-cover border-2 border-blue-500 cursor-pointer"
                          />
                        ) : (
                          <FaUser className="text-xl cursor-pointer" />
                        )}
                      </button>

                      {/* Dropdown */}
                      {profileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-44 bg-gray-900 text-white rounded-lg shadow-lg py-2">
                          {user?.profilePic && (
                            <button
                              onClick={() =>
                                window.open(user.profilePic, "_blank")
                              }
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer"
                            >
                              View Image
                            </button>
                          )}
                          <button
                            onClick={() => navigate("/addpic")}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer"
                          >
                            Change Profile Pic
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={link.onClick}
                      style={{ cursor: "pointer" }}
                      className="hover:text-gray-500 font-bold transition-colors cursor-pointer"
                    >
                      {link.name}
                    </a>
                  )
                )
              : navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="hover:text-gray-500 font-bold transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="hover:text-yellow-500 cursor-pointer"
            >
              {darkMode ? (
                <Sun size={20} className="cursor-pointer" />
              ) : (
                <Moon size={20} className="cursor-pointer" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="cursor-pointer"
            >
              {mobileOpen ? (
                <X size={24} className="cursor-pointer" />
              ) : (
                <Menu size={24} className="cursor-pointer" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Links */}
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 ">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block hover:text-gray-500 font-bold cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 hover:text-yellow-500 cursor-pointer"
            >
              {darkMode ? (
                <Sun size={20} className="cursor-pointer" />
              ) : (
                <Moon size={20} className="cursor-pointer" />
              )}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        )}
      </header>
    </div>
  );
}
