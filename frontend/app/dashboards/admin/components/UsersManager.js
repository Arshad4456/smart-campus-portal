// app/dashboards/admin/components/UsersManager.js
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaPlus, FaDownload, FaEdit, FaTrash, FaFileUpload } from "react-icons/fa";
import Papa from "papaparse";
import axios from "axios";

import AddUserModal from "./modals/AddUserModal";
import EditUserModal from "./modals/EditUserModal";
import BulkUploadModal from "./modals/BulkUploadModal";

const API_BASE = "http://localhost:5000/api/users";

/** -------- helpers (simple + safe) -------- */
const getTokenOrRedirect = () => {
  const token = localStorage.getItem("scp_token");
  const user = localStorage.getItem("scp_user");
  if (!token || !user) {
    window.location.replace("/login");
    return null;
  }
  return token;
};

const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

// If you ever store plural: admins/students -> backend needs singular: admin/student
const toSingular = (t) => {
  const map = {
    admins: "admin",
    students: "student",
    faculties: "faculty",
    monitors: "monitor",
  };
  return map[t] || t; // if already singular, keep it
};

// Optional: convert singular -> plural when needed
const toPlural = (t) => {
  const map = {
    admin: "admins",
    student: "students",
    faculty: "faculties",
    monitor: "monitors",
  };
  return map[t] || t;
};

const UsersManager = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [activeType, setActiveType] = useState("all");

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30;

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openBulk, setOpenBulk] = useState(false);

  const [newUserType, setNewUserType] = useState("admin");
  const [newUser, setNewUser] = useState({
    name: "",
    father_name: "",
    registration_no: "",
    semester: "",
    field: "",
    email: "",
    password: "",
    contact_no: "",
    address: "",
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [editData, setEditData] = useState({});
  const [showPasswordEdit, setShowPasswordEdit] = useState(false);

  // -----------------------
  // FETCH USERS
  // -----------------------
  const fetchUsers = async () => {
    const token = getTokenOrRedirect();
    if (!token) return;

    try {
      const res = await fetch(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        // If backend says unauthorized, session ended
        if (res.status === 401) {
          localStorage.removeItem("scp_token");
          localStorage.removeItem("scp_user");
          window.location.replace("/login");
          return;
        }
        console.error("Fetch users failed:", data);
        return;
      }

      const payload = data?.data || {};

      const merged = [
        ...(payload.admins?.map((u) => ({ ...u, userType: "admin" })) || []),
        ...(payload.monitors?.map((u) => ({ ...u, userType: "monitor" })) || []),
        ...(payload.faculties?.map((u) => ({ ...u, userType: "faculty" })) || []),
        ...(payload.students?.map((u) => ({ ...u, userType: "student" })) || []),
      ];

      setAllUsers(merged);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // -----------------------
  // FILTER + SORT
  // -----------------------
  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();

    const base = allUsers.filter((user) => {
      const typeOk = activeType === "all" || user.userType === activeType;
      if (!typeOk) return false;
      if (!q) return true;

      const name = (user.name || "").toLowerCase();
      const reg = (user.registration_no || "").toLowerCase();
      return name.includes(q) || reg.includes(q);
    });

    const sorted = [...base].sort((a, b) => {
      const valA = (a?.[sortField] ?? "").toString();
      const valB = (b?.[sortField] ?? "").toString();
      return valA.localeCompare(valB);
    });

    return sorted;
  }, [allUsers, activeType, search, sortField]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeType, search]);

  const handleFilter = (type) => {
    setActiveType(type);
    setCurrentPage(1);
  };

  const handleSort = (field) => setSortField(field);



  // COUNTS (based on allUsers, not filteredUsers)
const counts = useMemo(() => {
  const total = allUsers.length;
  const admins = allUsers.filter((u) => u.userType === "admin").length;
  const monitors = allUsers.filter((u) => u.userType === "monitor").length;
  const students = allUsers.filter((u) => u.userType === "student").length;

  return { total, admins, monitors, students };
}, [allUsers]);


  // -----------------------
  // PAGINATION
  // -----------------------
  const indexLast = currentPage * pageSize;
  const indexFirst = indexLast - pageSize;
  const currentUsers = filteredUsers.slice(indexFirst, indexLast);
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));

  // -----------------------
  // EXPORT CSV
  // -----------------------
  const exportCSV = () => {
    const csvRows = [
      ["userType", "registration_no", "name", "father_name", "semester", "field", "email", "password", "contact_no", "address"],
      ...filteredUsers.map((u) => [
        u.userType || "",
        u.registration_no || "",
        u.name || "",
        u.father_name || "",
        u.semester ?? "",
        u.field || "",
        u.email || "",
        "", // never export passwords
        u.contact_no || "",
        u.address || "",
      ]),
    ];

    const csvContent = csvRows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  // -----------------------
  // DELETE USER
  // -----------------------
  const deleteUser = async (registration_no, userType) => {
    const token = getTokenOrRedirect();
    if (!token) return;

    if (!confirm("Delete this user?")) return;

    try {
      const res = await fetch(`${API_BASE}/delete`, {
        method: "DELETE",
        headers: authHeaders(token),
        body: JSON.stringify({
          registration_no,
          userType: toSingular(userType),
        }),
      });

      const json = await res.json();
      if (json.success) {
        alert("Deleted!");
        fetchUsers();
      } else {
        alert(json.message || "Delete failed");
      }
    } catch (e) {
      alert("Delete failed");
    }
  };

  // -----------------------
  // ADD USER
  // -----------------------
  const addUser = async () => {
    const token = getTokenOrRedirect();
    if (!token) return;

    if (!newUser.registration_no || !newUser.password) {
      alert("Registration No and Password are required");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/add`, {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify({
          userType: toSingular(newUserType),
          user: { ...newUser, userType: toSingular(newUserType) },
        }),
      });

      const json = await res.json();
      if (json.success) {
        alert("User Added!");
        setOpenAdd(false);

        setNewUser({
          name: "",
          father_name: "",
          registration_no: "",
          semester: "",
          field: "",
          email: "",
          password: "",
          contact_no: "",
          address: "",
        });

        fetchUsers();
      } else {
        alert(json.message || "Add failed");
      }
    } catch (e) {
      alert("Add failed");
    }
  };

  // -----------------------
  // OPEN EDIT
  // -----------------------
  const openEditModalFor = (user) => {
    setSelectedUser(user);

    setEditData({
      userType: user.userType || "",
      _id: user._id || "",
      name: user.name || "",
      father_name: user.father_name || "",
      registration_no: user.registration_no || "",
      semester: user.semester ?? "",
      field: user.field || "",
      email: user.email || "",
      password: "",
      contact_no: user.contact_no || "",
      address: user.address || "",
    });

    setShowPasswordEdit(false);
    setOpenEdit(true);
  };

  // -----------------------
  // EDIT USER
  // -----------------------
  const editUser = async (registration_no, userType, data) => {
    const token = getTokenOrRedirect();
    if (!token) return;

    try {
      const payload = { ...data };

      // if password empty -> don't update
      if (!payload.password) delete payload.password;

      // remove fields that shouldn't be updated
      delete payload.registration_no;
      delete payload.userType;
      delete payload._id;

      const response = await axios.put(
        `${API_BASE}/edit`,
        {
          registration_no,
          userType: toSingular(userType),
          updatedData: payload,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("User updated successfully!");
        setOpenEdit(false);
        fetchUsers();
      } else {
        alert(response.data.message || "Update failed");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || "Edit failed";
      alert(msg);
    }
  };

  // -----------------------
  // CSV UPLOAD (CLIENT SIDE PARSE ONLY)
  // -----------------------
  const handleCSVUpload = async (file) => {
    const token = getTokenOrRedirect();
    if (!token) return;

    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    try {
      const text = await file.text();
      const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });

      const grouped = { admins: [], monitors: [], faculties: [], students: [] };

      parsed.data.forEach((row) => {
        const tRaw = (row.userType || row.usertype || row.type || "").toLowerCase().trim();
        const t = toSingular(tRaw); // if CSV contains plural or singular, normalize

        const u = {
          registration_no:
            row.registration_no || row.reg || row.Reg || row.RegNo || row.registrationNo || "",
          name: row.name || row.fullname || row.full_name || "",
          father_name: row.father_name || row.father || row.fatherName || "",
          semester: row.semester ? Number(row.semester) : undefined,
          field: row.field || row.department || "",
          email: row.email || "",
          password: row.password || "",
          contact_no: row.contact_no || row.contact || "",
          address: row.address || "",
        };

        if (t === "admin") grouped.admins.push(u);
        else if (t === "monitor") grouped.monitors.push(u);
        else if (t === "faculty") grouped.faculties.push(u);
        else grouped.students.push(u);
      });

      const res = await fetch(`${API_BASE}/add`, {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(grouped),
      });

      const json = await res.json();
      if (json.success) {
        alert("CSV uploaded successfully");
        setOpenBulk(false);
        fetchUsers();
      } else {
        alert("Upload failed: " + (json.message || JSON.stringify(json)));
      }
    } catch (err) {
      console.error("CSV upload error:", err);
      alert("CSV upload error");
    }
  };

  // -----------------------
  // RENDER
  // -----------------------
  return (
    <div className="p-5 bg-white rounded shadow max-w-full">
      <h1 className="text-2xl font-bold mb-4">User Manager</h1>

      {/* Top actions */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <button
          onClick={() => setOpenAdd(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          <FaPlus /> Add User
        </button>

        <button
          onClick={() => setOpenBulk(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          <FaFileUpload /> Add Multiple (CSV)
        </button>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded ml-auto cursor-pointer"
        >
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* FILTER BUTTONS */}
      {/* FILTER BUTTONS (with totals) */}
<div className="flex gap-3 mb-4 flex-wrap">
  <button onClick={() => handleFilter("all")} className={`px-4 py-2 rounded cursor-pointer ${
      activeType === "all" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
    }`}> All Users <span className="ml-2 text-sm opacity-80">({counts.total})</span>
  </button>
  <button onClick={() => handleFilter("admin")} className={`px-4 py-2 rounded cursor-pointer ${ 
    activeType === "admin" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>Admins <span className="ml-2 text-sm opacity-80">({counts.admins})</span>
  </button>
  <button onClick={() => handleFilter("monitor")} className={`px-4 py-2 rounded cursor-pointer ${
      activeType === "monitor" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
    }`}> Monitors <span className="ml-2 text-sm opacity-80">({counts.monitors})</span>
  </button>
  <button onClick={() => handleFilter("student")} className={`px-4 py-2 rounded cursor-pointer ${
      activeType === "student" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
    }`}> Students <span className="ml-2 text-sm opacity-80">({counts.students})</span>
  </button>
</div>

      {/* <div className="flex gap-3 mb-4 flex-wrap">
        {["all", "admin", "monitor", "faculty", "student"].map((type) => (
          <button
            key={type}
            onClick={() => handleFilter(type)}
            className={`px-4 py-2 rounded cursor-pointer ${
              activeType === type ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {type === "all" ? "All Users" : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div> */}

      {/* SEARCH */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center bg-gray-100 px-3 rounded-lg flex-1 min-w-0">
          <FaSearch />
          <input
            type="text"
            placeholder="Search users..."
            className="bg-transparent ml-2 py-2 outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 cursor-pointer hover:bg-gray-300" onClick={() => handleSort("name")}>
                Name
              </th>
              <th className="p-2 cursor-pointer hover:bg-gray-300" onClick={() => handleSort("registration_no")}>
                Reg No
              </th>
              <th className="p-2">Email</th>
              <th className="p-2">Contact</th>
              <th className="p-2">User Type</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((u, index) => (
              <tr key={`${u.registration_no}-${index}`} className="border-b">
                <td className="p-2 text-center">{u.name}</td>
                <td className="p-2 text-center">{u.registration_no}</td>
                <td className="p-2 text-center">{u.email}</td>
                <td className="p-2 text-center">{u.contact_no}</td>
                <td className="p-2 capitalize text-center">{u.userType}</td>
                <td className="p-2 flex gap-3 justify-center items-center">
                  <button
                    title="Edit"
                    onClick={() => openEditModalFor(u)}
                    className="text-blue-600 cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => deleteUser(u.registration_no, u.userType)}
                    className="text-red-600 cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {currentUsers.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={6}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-4 gap-2 flex-wrap">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded cursor-pointer ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* MODALS */}
      <AddUserModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSubmit={addUser}
        newUserType={newUserType}
        setNewUserType={setNewUserType}
        newUser={newUser}
        setNewUser={setNewUser}
      />

      <EditUserModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        selectedUser={selectedUser}
        editData={editData}
        setEditData={setEditData}
        showPasswordEdit={showPasswordEdit}
        setShowPasswordEdit={setShowPasswordEdit}
        onSave={() =>
          selectedUser && editUser(selectedUser.registration_no, selectedUser.userType, editData)
        }
      />

      <BulkUploadModal
        open={openBulk}
        onClose={() => setOpenBulk(false)}
        onUpload={handleCSVUpload}
      />
    </div>
  );
};

export default UsersManager;
