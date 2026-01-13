"use client";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const API_BASE = "http://localhost:5000/api/users";

export default function AccountSettings() {
  const [profile, setProfile] = useState(null);

  // Password UI
  const [showPassCard, setShowPassCard] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRep, setShowRep] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("scp_user");
    if (!raw) return;
    try {
      setProfile(JSON.parse(raw));
    } catch {
      setProfile(null);
    }
  }, []);

  const requireSession = () => {
    const token = localStorage.getItem("scp_token");
    if (!token) {
      alert("No session, please login.");
      window.location.replace("/login");
      return null;
    }
    return token;
  };

  // ✅ convert plural -> singular for backend /edit + /change-password
  const toSingularUserType = (t) => {
    const map = {
      admins: "admin",
      students: "student",
      faculties: "faculty",
      monitors: "monitor",
    };
    return map[t] || t; // if already singular, keep it
  };

  const saveChanges = async () => {
    if (!profile) return;

    const token = requireSession();
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ IMPORTANT
        },
        body: JSON.stringify({
          registration_no: profile.registration_no,
          userType: toSingularUserType(profile.userType),
          updatedData: {
            email: profile.email || "",
            contact_no: profile.contact_no || "",
          },
        }),
      });

      const json = await res.json();
      if (!json.success) return alert(json.message || "Update failed");

      // keep local user updated
      const updatedUser = { ...profile, ...json.user };
      setProfile(updatedUser);
      localStorage.setItem("scp_user", JSON.stringify(updatedUser));

      alert("Account updated successfully!");
    } catch (e) {
      alert("Failed to update account.");
    }
  };

  const strongPassword = (p) => {
    if (p.length < 8) return false;
    if (!/[A-Za-z]/.test(p)) return false;
    if (!/\d/.test(p)) return false;
    if (!/[^A-Za-z0-9]/.test(p)) return false;
    return true;
  };

  const changePassword = async () => {
    if (!profile) return;

    const token = requireSession();
    if (!token) return;

    if (!currentPassword || !newPassword || !repeatPassword) {
      return alert("Please fill all password fields.");
    }
    if (newPassword !== repeatPassword) {
      return alert("New password and repeat password must be same.");
    }
    if (!strongPassword(newPassword)) {
      return alert(
        "Password must be at least 8 characters and include letters, numbers, and a symbol."
      );
    }

    try {
      const res = await fetch(`${API_BASE}/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ IMPORTANT
        },
        body: JSON.stringify({
          registration_no: profile.registration_no,
          userType: toSingularUserType(profile.userType),
          currentPassword,
          newPassword,
        }),
      });

      const json = await res.json();
      if (!json.success) return alert(json.message || "Password change failed");

      alert("Password changed successfully!");
      setShowPassCard(false);
      setCurrentPassword("");
      setNewPassword("");
      setRepeatPassword("");
    } catch (e) {
      alert("Failed to change password.");
    }
  };

  const logout = () => {
    localStorage.removeItem("scp_user");
    localStorage.removeItem("scp_token");
    window.location.replace("/login"); // ✅ prevents going back to dashboard page in history
  };

  if (!profile) return <p>No active user</p>;

  return (
    <div className="p-4 bg-white rounded">
      <h2 className="text-2xl mb-3">Account Settings</h2>

      {/* SHOW ALL INFO (readonly except email/contact) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input className="p-2 border w-full bg-gray-100" value={profile.name || ""} readOnly />
        </div>

        <div>
          <label className="text-sm text-gray-600">Father Name</label>
          <input className="p-2 border w-full bg-gray-100" value={profile.father_name || ""} readOnly />
        </div>

        <div>
          <label className="text-sm text-gray-600">Registration No</label>
          <input className="p-2 border w-full bg-gray-100" value={profile.registration_no || ""} readOnly />
        </div>

        <div>
          <label className="text-sm text-gray-600">User Type</label>
          <input className="p-2 border w-full bg-gray-100" value={profile.userType || ""} readOnly />
        </div>

        <div>
          <label className="text-sm text-gray-600">Semester</label>
          <input className="p-2 border w-full bg-gray-100" value={profile.semester ?? ""} readOnly />
        </div>

        <div>
          <label className="text-sm text-gray-600">Field</label>
          <input className="p-2 border w-full bg-gray-100" value={profile.field || ""} readOnly />
        </div>

        <div>
          <label className="text-sm text-gray-600">Email (editable)</label>
          <input
            className="p-2 border w-full"
            value={profile.email || ""}
            onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Contact No (editable)</label>
          <input
            className="p-2 border w-full"
            value={profile.contact_no || ""}
            onChange={(e) => setProfile((p) => ({ ...p, contact_no: e.target.value }))}
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Address</label>
          <input className="p-2 border w-full bg-gray-100" value={profile.address || ""} readOnly />
        </div>
      </div>

      <div className="flex gap-2 mt-3 flex-wrap">
        <button onClick={saveChanges} className="bg-blue-600 text-white px-3 py-1 rounded">
          Save Changes
        </button>

        <button
          onClick={() => setShowPassCard((v) => !v)}
          className="bg-gray-800 text-white px-3 py-1 rounded"
        >
          Change Password
        </button>

        <button onClick={logout} className="bg-red-600 text-white px-3 py-1 rounded">
          Logout
        </button>
      </div>

      {/* PASSWORD CARD */}
      {showPassCard && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-3">Change Password</h3>

          <div className="grid gap-3">
            <div className="relative">
              <input
                type={showCur ? "text" : "password"}
                className="p-2 border w-full pr-10"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                onClick={() => setShowCur((s) => !s)}
              >
                {showCur ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                className="p-2 border w-full pr-10"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                onClick={() => setShowNew((s) => !s)}
              >
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showRep ? "text" : "password"}
                className="p-2 border w-full pr-10"
                placeholder="Repeat New Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                onClick={() => setShowRep((s) => !s)}
              >
                {showRep ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button onClick={changePassword} className="bg-blue-600 text-white px-3 py-2 rounded">
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
