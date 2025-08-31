import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NavbarLayout({ user,setUserOut }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate()

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
    { name: "Logout", 
      onClick:()=>{
        setUserOut()
    } },
    { name: "Profile", href: "/profile" },
    { name: "Dashboard", href: "/Dashboard" },
  ]

  return (
    <div className="bg-transparent text-gray-800 dark:text-white">
      {/* Top Navbar */}
      <header className="w-full fixed top-0 left-0 z-50 bg-transparent backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-bold">Chit Chat</div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
          
          
            { user ? navLinkLogin.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={link.onClick}
                className="hover:text-gray-500 font-bold transition-colors"
              >
                {link.name}
              </a>
            )) : navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-gray-500 font-bold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="hover:text-yellow-500"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
                className="block hover:text-gray-500 font-bold"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 hover:text-yellow-500"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        )}
      </header>
    </div>
  );
}
