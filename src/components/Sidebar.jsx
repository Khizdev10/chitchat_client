import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Home, LogIn, UserPlus } from "lucide-react";

export default function ResponsiveSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const navItems = [
    { name: "Home", icon: <Home size={20} /> },
    { name: "Login", icon: <LogIn size={20} /> },
    { name: "Signup", icon: <UserPlus size={20} /> },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-20 top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 py-4 md:hidden">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">MyApp</h1>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-700 dark:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white hidden md:block">MyApp</h1>
          <nav className="space-y-3">
            {navItems.map(({ name, icon }) => (
              <a
                key={name}
                href="#"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-500"
              >
                {icon} {name}
              </a>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-4 left-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-yellow-500"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Page Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar for mobile */}
        <div className="md:hidden p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-700 dark:text-white">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
        </div>

        {/* Main content */}
        <div className="p-4 text-gray-800 dark:text-white">
          <h2 className="text-2xl font-bold">Welcome!</h2>
          <p className="mt-2">This is your responsive layout.</p>
        </div>
      </div>
    </div>
  );
}
