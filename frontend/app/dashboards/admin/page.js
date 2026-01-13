"use client";
import Link from "next/link";
import React, { useState, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { FaExpand, FaUsers, FaHome } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

// Dynamic imports for components
const DashboardHome = dynamic(() => import("./components/DashboardHome"));
const LandingSettings = dynamic(() => import("./components/LandingSettings"));
const UsersManager = dynamic(() => import("./components/UsersManager"));
const Fees = dynamic(() => import("./components/Fees"));
const Attendance = dynamic(() => import("./components/Attendance"));
const Notices = dynamic(() => import("./components/Notices"));
const Chat = dynamic(() => import("./components/Chat"));
const AccountSettings = dynamic(() => import("./components/AccountSettings"));

const Page = () => {
  const [loggedUser, setLoggedUser] = useState({ name: "", roleLabel: "", registration_no: "" });
  const [isOpen, setIsOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({ users: false });
  const [activeContent, setActiveContent] = useState("dashboard");

  // ✅ refs for click-outside
  const languageRef = useRef(null);
  const profileRef = useRef(null);

  // After logout
  const logout = () => {
    localStorage.removeItem("scp_user");
    localStorage.removeItem("scp_token");
    window.location.replace("/login");
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const raw = localStorage.getItem("scp_user");
    if (!raw) return;

    try {
      const u = JSON.parse(raw);

      const roleMap = {
        admins: "Admin",
        students: "Student",
        faculties: "Faculty",
        monitors: "Monitor",
      };

      setLoggedUser({
        name: u?.name || "User",
        roleLabel: roleMap[u?.userType] || "User",
        registration_no: u?.registration_no || "User",
      });
    } catch (e) {
      console.error("Invalid scp_user in localStorage");
    }
  }, []);

  // Dashboard cannot open without session.
  useEffect(() => {
    const token = localStorage.getItem("scp_token");
    const user = localStorage.getItem("scp_user");

    if (!token || !user) {
      window.location.replace("/login");
    }
  }, []);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      document.documentElement.style.setProperty("--navbar-height", `${navbar.offsetHeight}px`);
    }
  }, []);

  const toggleDropdown = (name) => {
    setDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // ✅ Close dropdowns when clicking outside + ESC
  useEffect(() => {
    const onMouseDown = (e) => {
      // close language if click outside language dropdown
      if (languageOpen && languageRef.current && !languageRef.current.contains(e.target)) {
        setLanguageOpen(false);
      }
      // close profile if click outside profile dropdown
      if (profileOpen && profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setLanguageOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [languageOpen, profileOpen]);

  // Render main section dynamically
  const renderContent = () => {
    switch (activeContent) {
      case "landingPage": return <LandingSettings />;
      case "users": return <UsersManager />;
      case "fees": return <Fees />;
      case "attendance": return <Attendance />;
      case "notices": return <Notices />;
      case "chat": return <Chat />;
      case "account": return <AccountSettings />;
      default: return <DashboardHome />;
    }
  };

  return (
    <>
      {/* === NAVBAR === */}
      <nav
        id="navbar"
        className="sticky top-0 w-full bg-gray-800 flex justify-between items-center z-50 px-2 py-1 shadow-md"
      >
        {/* === Left Section === */}
        <div className="m-1 mx-2 flex items-center flex-col justify-center gap-2">
          <div className="logo flex justify-center items-center gap-2">
            <img className="w-10 h-10 rounded-lg" src="/assets/uni_logo.png" alt="Logo" />
            {isOpen && <h1 className="font-medium text-sm md:font-bold text-white">Smart Campus</h1>}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={
              isOpen
                ? "absolute top-2 left-40 md:left-60 text-white focus:outline-none"
                : "absolute left-14 top-2 text-white focus:outline-none"
            }
          >
            <svg className="h-8 w-8 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* === Right Section === */}
        <div className="flex justify-center items-center gap-3 text-white mr-2">
          {/* Fullscreen */}
          <button onClick={toggleFullscreen} className="hover:text-blue-400 transition cursor-pointer" title="Toggle Fullscreen">
            <FaExpand size={22} />
          </button>

          {/* Language Dropdown */}
          <div className="relative" ref={languageRef}>
            <button
              onClick={() => {
                setLanguageOpen((v) => !v);
                setProfileOpen(false); // ✅ optional: close other dropdown
              }}
              className="hover:text-blue-400 transition cursor-pointer"
              title="Change Language"
            >
              <IoLanguage size={22} />
            </button>

            {languageOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white text-black rounded shadow-lg">
                <button className="w-full px-2 py-1 hover:bg-gray-100">🇺🇸 English</button>
                <button className="w-full px-2 py-1 hover:bg-gray-100">🇵🇰 Urdu</button>
                <button className="w-full px-2 py-1 hover:bg-gray-100">🇫🇷 French</button>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setProfileOpen((v) => !v);
                setLanguageOpen(false); // ✅ optional: close other dropdown
              }}
              className="hover:text-blue-400 transition cursor-pointer"
              title="Profile"
            >
              <img src="/assets/profile.png" alt="User" className="w-8 h-8 rounded-full border-2 border-gray-300" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-xl shadow-2xl p-4">
                <div className="flex flex-col items-center border-b pb-3">
                  <img src="/assets/profile.png" alt="Profile" className="w-16 h-16 rounded-full mb-2" />
                  <h2 className="font-semibold text-lg">{loggedUser.name || "..."}</h2>
                  <p className="text-gray-500 text-sm">{loggedUser.roleLabel || "..."}</p>
                  <p className="text-gray-500 text-sm">{loggedUser.registration_no || "..."}</p>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      setActiveContent("account");
                    }}
                    className="text-left hover:bg-gray-100 p-2 rounded cursor-pointer"
                  >
                    ⚙️ Account Settings
                  </button>

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      setActiveContent("account");
                    }}
                    className="text-left hover:bg-gray-100 p-2 rounded cursor-pointer"
                  >
                    🔒 Change Password
                  </button>

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      logout(); // ✅ use your logout function
                    }}
                    className="text-left hover:bg-gray-100 p-2 rounded text-red-600 cursor-pointer"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* === SIDEBAR === */}
      {isOpen ? (
        <div className="fixed left-0 top-[var(--navbar-height)] bg-gray-800 min-w-42 md:min-w-60 flex flex-col items-center gap-6 h-[calc(100vh-var(--navbar-height))] pt-[20px] overflow-y-auto z-40">
          <div className="name flex flex-col items-center justify-center">
            <img className="w-16 h-16 rounded-lg border-2 border-white" src="/assets/uni_logo.png" />
            <h3 className="font-bold text-white">{loggedUser.name || "..."}</h3>
            <p className="font-small text-gray-400">{loggedUser.roleLabel || "..."}</p>
          </div>

          <div className="w-full flex flex-col justify-center pb-6">
            <p className="ml-2 mb-2 text-white">Main</p>

            <div className="links flex flex-col w-full justify-center items-center px-2 gap-3">
              <button onClick={() => setActiveContent("dashboard")} className={`py-2 px-1 w-full text-black rounded flex justify-between items-center cursor-pointer ${activeContent === "dashboard" ? "bg-blue-300" : "bg-gray-100 hover:bg-gray-300"}`}>
                <div className="flex items-center gap-2"><MdDashboard className="text-xl" /><p>Dashboard</p></div>
              </button>

              <button onClick={() => setActiveContent("landingPage")} className={`py-2 px-1 w-full text-black rounded flex justify-between items-center cursor-pointer ${activeContent === "landingPage" ? "bg-blue-300" : "bg-gray-100 hover:bg-gray-300"}`}>
                <div className="flex items-center gap-2"><FaHome className="text-xl" /><p>Landing Page</p></div>
              </button>

              <button onClick={() => { toggleDropdown("users"); setActiveContent("users"); }} className={`py-2 px-1 w-full text-black rounded flex justify-between items-center cursor-pointer ${activeContent === "users" ? "bg-blue-300" : "bg-gray-100 hover:bg-gray-300"}`}>
                <div className="flex items-center gap-2"><FaUsers className="text-xl" /><p>Users</p></div>
              </button>

              <button onClick={() => setActiveContent("attendance")} className={`py-2 px-1 w-full text-black rounded flex justify-between items-center cursor-pointer ${activeContent === "attendance" ? "bg-blue-300" : "bg-gray-100 hover:bg-gray-300"}`}>Attendance</button>
              <button onClick={() => setActiveContent("fees")} className={`py-2 px-1 w-full text-black rounded flex justify-between items-center cursor-pointer ${activeContent === "fees" ? "bg-blue-300" : "bg-gray-100 hover:bg-gray-300"}`}>Fees</button>
              <button onClick={() => setActiveContent("notices")} className={`py-2 px-1 w-full text-black rounded flex justify-between items-center cursor-pointer ${activeContent === "notices" ? "bg-blue-300" : "bg-gray-100 hover:bg-gray-300"}`}>Notices</button>
              <button onClick={() => setActiveContent("chat")} className={`py-2 px-1 w-full text-black rounded flex justify-between items-center cursor-pointer ${activeContent === "chat" ? "bg-blue-300" : "bg-gray-100 hover:bg-gray-300"}`}>Chat</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed left-0 top-var(--navbar-height) bg-gray-800 h-[calc(100vh-var(--navbar-height))] flex flex-col items-center px-2 pt-20px gap-4 overflow-y-auto z-40">
          <div onClick={() => setActiveContent("dashboard")} className={`border rounded-lg p-2 cursor-pointer ${activeContent === "dashboard" ? "bg-blue-300" : "bg-white hover:bg-blue-100"}`}>
            <MdDashboard className="text-xl text-gray-800" title="Dashboard" />
          </div>
          <div onClick={() => setActiveContent("landingPage")} className={`border rounded-lg p-2 cursor-pointer ${activeContent === "landingPage" ? "bg-blue-300" : "bg-white hover:bg-blue-100"}`}>
            <FaHome className="text-xl text-gray-800" title="Landing page Settings" />
          </div>
          <div onClick={() => setActiveContent("users")} className={`border rounded-lg p-2 cursor-pointer ${activeContent === "users" ? "bg-blue-300" : "bg-white hover:bg-blue-100"}`}>
            <FaUsers className="text-xl text-gray-800" title="Users" />
          </div>
          <div onClick={() => setActiveContent("attendance")} className={`border rounded-lg p-2 cursor-pointer ${activeContent === "attendance" ? "bg-blue-300" : "bg-white hover:bg-blue-100"}`} title="Attendance">📝</div>
          <div onClick={() => setActiveContent("notices")} className={`border rounded-lg p-2 cursor-pointer ${activeContent === "notices" ? "bg-blue-300" : "bg-white hover:bg-blue-100"}`} title="Notices">🔔</div>
          <div onClick={() => setActiveContent("chat")} className={`border rounded-lg p-2 cursor-pointer ${activeContent === "chat" ? "bg-blue-300" : "bg-white hover:bg-blue-100"}`} title="Chats">💬</div>
        </div>
      )}

      {/* === MAIN CONTENT === */}
      <div className={isOpen ? "min-h-[calc(100vh-var(--navbar-height))] bg-gray-100 overflow-y-auto ml-13.5 md:ml-60 p-4" : "min-h-[calc(100vh-var(--navbar-height))] bg-gray-100 overflow-y-auto ml-13.5 p-4"}>
        {renderContent()}
      </div>
    </>
  );
};

export default Page;
