import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import mobile1 from "../media/mobile2.png";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  let navigate = useNavigate();
  return (
    <>
      <div
        className="bg-blue-900 min-h-screen flex flex-col"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 92%, 0 100%)",
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Login Section */}
        <div className="flex flex-1 justify-center items-center px-4 py-10">
          <div
            className="bg-gray-900 rounded-2xl shadow-lg w-full max-w-5xl grid md:grid-cols-2 gap-8 overflow-hidden"
            style={{
              transform: "translateY(-40px)",
            }}
          >
            {/* Left: Image */}
            <div className="flex items-center justify-center bg-gray-800 p-6">
              <img
                src={mobile1}
                alt="App Preview"
                style={{
                  maxWidth: "260px",
                  width: "100%",
                  height: "auto",
                  transform: "rotate(16deg)",
                }}
              />
            </div>

            {/* Right: Form */}
            <div className="p-8 flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-center text-white mb-6">
                Login to Your Account
              </h1>

              <p id="exist" className="text-red-500 text-center mb-6">
                <span id="exist_text"></span>
              </p>

              <form className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Username
                  </label>
                  <div className="flex items-center border border-gray-700 bg-gray-800 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                    <FaEnvelope className="text-gray-400 mr-2" />
                    <input
                      type="username"
                      placeholder="Enter your username"
                      className="flex-1 outline-none bg-transparent text-white"
                      id="username"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="flex items-center border border-gray-700 bg-gray-800 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                    <FaLock className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="flex-1 outline-none bg-transparent text-white"
                      id="password"
                    />
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    const username = document.getElementById("username").value;
                    const password = document.getElementById("password").value;
                    props.login(username, password);
                  }}
                >
                  <FaSignInAlt />
                  Login
                </button>
              </form>

              {/* Don't have account */}
              <p className="text-center text-sm text-gray-400 mt-6">
                Don’t have an account?{" "}
                <a
                  href="/register"
                  className="text-blue-500 font-semibold hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/register");
                  }}
                >
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center font-bold">
        Copyright © 2025 Chit Chat. All rights reserved.
      </div>
    </>
  );
};

export default Login;
