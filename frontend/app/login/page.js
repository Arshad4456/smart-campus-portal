"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!userType || !registrationNo || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        registration_no: registrationNo,
        password,
        userType,
      });

      if (res.data.success) {
        localStorage.setItem("scp_token", res.data.token);
localStorage.setItem("scp_user", JSON.stringify({ ...res.data.user, userType }));

  // ✅ save logged in user info
  const loggedUser = {
    ...res.data.user,
    name: res.data.user?.name || "User",
    userType: userType, // admins / students / faculties / monitors
    registration_no: res.data.user?.registration_no || "",
  };

  localStorage.setItem("scp_user", JSON.stringify(loggedUser));

  switch (userType) {
    case "admins":
      router.push("/dashboards/admin");
      break;
    case "monitors":
      router.push("/dashboards/monitor");
      break;
    case "faculties":
      router.push("/dashboards/faculty");
      break;
    case "students":
      router.push("/dashboards/student");
      break;
    default:
      router.push("/");
  }

      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-[url(/assets/background-login.jpg)] min-h-screen">
      <div className="grid md:grid-rows-none md:grid-cols-2 my-5 md:my-0 min-h-[120vh] md:min-h-[90vh] w-[90vw] lg:w-[80vw] shadow-cyan-300">
        <div className="bg-[#024d6c] flex flex-col justify-center items-center rounded-tl-4xl rounded-tr-4xl md:rounded-tr-none md:rounded-bl-4xl shadow-left-top-bottom-cyan">
          <form onSubmit={handleLogin} className="flex flex-col justify-center items-center mx-auto w-80">
            <h1 className="text-[#bdbdbd] text-3xl font-medium mb-8">Hello Again!</h1>

            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="focus:outline-white focus:outline-2 rounded-lg bg-[#bdbdbd] text-[#6b6868] font-medium px-4 py-3 my-2 w-full"
            >
              <option value="">Select User Type</option>
              <option value="admins">Admin</option>
              <option value="monitors">Monitor</option>
              <option value="faculties">Faculty Member</option>
              <option value="students">Student</option>
            </select>

            <input
              value={registrationNo}
              onChange={(e) => setRegistrationNo(e.target.value)}
              className="focus:outline-white focus:outline-2 rounded-lg bg-[#bdbdbd] text-[#6b6868] font-medium px-4 py-3 my-2 w-full"
              placeholder="Enter your Registration Number"
            />

            {/* Password field with eye toggle */}
            <div className="relative w-full my-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                className="focus:outline-white focus:outline-2 rounded-lg bg-[#bdbdbd] text-[#6b6868] font-medium px-4 py-3 w-full"
                placeholder="Enter your Password"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>


            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              type="submit"
              className="bg-[#005b96] hover:bg-[#045890] border-2 border-solid border-[#005b96] mt-3 rounded-lg w-full py-3 text-[#bdbdbd] font-medium cursor-pointer"
            >
              Log In
            </button>

            <p className="mt-3 text-[#bdbdbd]">
              <span className="font-bold text-red-500">Note!</span> If you forget password, contact the Administrative Office.
            </p>
          </form>
        </div>

        <div className="bg-[#024d6c] flex justify-center items-center rounded-br-4xl md:rounded-tr-4xl rounded-bl-4xl md:rounded-bl-none shadow-right-top-bottom-cyan">
          <img
            src="/assets/login-2.png"
            alt="scenery"
            className="opacity-70 rounded-md h-90 w-80 md:h-100 md:w-100 lg:h-110 lg:w-110"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
