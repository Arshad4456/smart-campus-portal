// frontend/app/dashboards/admin/components/modals/EditUserModal.js
"use client";
import React, { useEffect, useState } from "react";
import { editUserApi } from "@/app/lib/usersApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function EditUserModal({ open, onClose, selectedUser, onSuccess }) {
  const [editData, setEditData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isStudent = selectedUser?.userType === "student";
  const showAcademic = selectedUser?.userType === "student" || selectedUser?.userType === "faculty";

  useEffect(() => {
    if (!selectedUser) return;

    setEditData({
      _id: selectedUser._id || "",
      userType: selectedUser.userType || "",
      registration_no: selectedUser.registration_no || "",

      name: selectedUser.name || "",
      father_name: selectedUser.father_name || "",

      // ✅ academic fields
      department: selectedUser.department || "",
      program: selectedUser.program ?? selectedUser.field ?? "",
      level: selectedUser.level || "",

      // ✅ student fields
      semester: selectedUser.semester ?? "",
      batchYear: selectedUser.batchYear ?? "",
      section: selectedUser.section || "",
      shift: selectedUser.shift || "",
      status: selectedUser.status || "Active",

      email: selectedUser.email || "",
      password: "",
      contact_no: selectedUser.contact_no || "",
      address: selectedUser.address || "",
    });
  }, [selectedUser]);

  if (!open || !selectedUser) return null;

  const save = async () => {
    try {
      setLoading(true);

      // ✅ clean payload: remove fields you never want to update directly
      const payload = { ...editData };
      delete payload._id;
      delete payload.registration_no;
      delete payload.userType;

      // if password empty -> don't update password
      if (!payload.password) delete payload.password;

      const res = await editUserApi(selectedUser.registration_no, selectedUser.userType, payload);

      if (res.success) {
        alert("Updated!");
        onSuccess?.();
      } else {
        alert(res.message || "Update failed");
      }
    } catch (e) {
      alert(e?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg max-w-xl w-full p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit User — {selectedUser.registration_no}</h3>
          <button onClick={onClose} className="text-gray-600 cursor-pointer">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm">Registration No</label>
            <input
              value={editData.registration_no ?? ""}
              readOnly
              className="border p-2 rounded w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm">User Type</label>
            <input
              value={selectedUser.userType ?? ""}
              readOnly
              className="border p-2 rounded w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm">Name</label>
            <input
              value={editData.name ?? ""}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="text-sm">Father Name</label>
            <input
              value={editData.father_name ?? ""}
              onChange={(e) => setEditData({ ...editData, father_name: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* ✅ Academic fields for Student + Faculty */}
          {showAcademic && (
            <div>
              <label className="text-sm">Department</label>
              <input
                value={editData.department ?? ""}
                onChange={(e) => setEditData({ ...editData, department: e.target.value })}
                className="border p-2 rounded w-full"
                placeholder="e.g. CS & IT"
              />
            </div>
          )}

          {showAcademic && (
            <div>
              <label className="text-sm">Level</label>
              <select
                value={editData.level ?? ""}
                onChange={(e) => setEditData({ ...editData, level: e.target.value })}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Level</option>
                <option value="BS">BS</option>
                <option value="MS">MS</option>
                <option value="MPhil">MPhil</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
          )}

          {showAcademic && (
            <div>
              <label className="text-sm">Program</label>
              <input
                value={editData.program ?? ""}
                onChange={(e) => setEditData({ ...editData, program: e.target.value })}
                className="border p-2 rounded w-full"
                placeholder="e.g. BS Computer Science"
              />
            </div>
          )}

          {/* ✅ Student-only */}
          {isStudent && (
            <div>
              <label className="text-sm">Semester</label>
              <input
                type="number"
                value={editData.semester ?? ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    semester: e.target.value ? Number(e.target.value) : "",
                  })
                }
                className="border p-2 rounded w-full"
              />
            </div>
          )}

          {isStudent && (
            <div>
              <label className="text-sm">Batch Year</label>
              <input
                type="number"
                value={editData.batchYear ?? ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    batchYear: e.target.value ? Number(e.target.value) : "",
                  })
                }
                className="border p-2 rounded w-full"
                placeholder="e.g. 2023"
              />
            </div>
          )}

          {isStudent && (
            <div>
              <label className="text-sm">Section</label>
              <input
                value={editData.section ?? ""}
                onChange={(e) => setEditData({ ...editData, section: e.target.value })}
                className="border p-2 rounded w-full"
                placeholder="e.g. A"
              />
            </div>
          )}

          {isStudent && (
            <div>
              <label className="text-sm">Shift</label>
              <select
                value={editData.shift ?? ""}
                onChange={(e) => setEditData({ ...editData, shift: e.target.value })}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Shift</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
          )}

          {isStudent && (
            <div>
              <label className="text-sm">Status</label>
              <select
                value={editData.status ?? "Active"}
                onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                className="border p-2 rounded w-full"
              >
                <option value="Active">Active</option>
                <option value="Alumni">Alumni</option>
                <option value="Left">Left</option>
              </select>
            </div>
          )}

          <div>
            <label className="text-sm">Email</label>
            <input
              value={editData.email ?? ""}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="relative">
            <label className="text-sm">Password (leave blank to keep)</label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={editData.password ?? ""}
                onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                className="border p-2 rounded w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="ml-2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm">Contact</label>
            <input
              value={editData.contact_no ?? ""}
              onChange={(e) => setEditData({ ...editData, contact_no: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm">Address</label>
            <input
              value={editData.address ?? ""}
              onChange={(e) => setEditData({ ...editData, address: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-50 cursor-pointer">
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={save}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
