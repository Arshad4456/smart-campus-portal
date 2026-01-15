"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AddUserModal = ({
  open,
  onClose,
  onSubmit,
  newUserType,
  setNewUserType,
  newUser,
  setNewUser,
}) => {
  const [showPasswordAdd, setShowPasswordAdd] = useState(false);

  if (!open) return null;

  const strongPassword = (p) => {
    if (!p || p.length < 8) return false;
    if (!/[A-Za-z]/.test(p)) return false;
    if (!/\d/.test(p)) return false;
    if (!/[^A-Za-z0-9]/.test(p)) return false;
    return true;
  };

  const showAcademic = newUserType === "student" || newUserType === "faculty";
  const isStudent = newUserType === "student";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg max-w-xl w-full p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add New User</h3>
          <button onClick={onClose} className="text-gray-600 cursor-pointer">✕</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm">User Type</label>
            <select
              value={newUserType}
              onChange={(e) => setNewUserType(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="admin">Admin</option>
              <option value="monitor">Monitor</option>
              <option value="faculty">Faculty</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div>
            <label className="text-sm">Registration No</label>
            <input
              value={newUser.registration_no}
              onChange={(e) => setNewUser({ ...newUser, registration_no: e.target.value })}
              className="border p-2 rounded w-full"
              placeholder="e.g. stu001"
            />
          </div>

          <div>
            <label className="text-sm">Name</label>
            <input
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="text-sm">Father Name</label>
            <input
              value={newUser.father_name}
              onChange={(e) => setNewUser({ ...newUser, father_name: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Academic (Student + Faculty) */}
          {showAcademic && (
            <div>
              <label className="text-sm">Department</label>
              <input
                value={newUser.department || ""}
                onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                className="border p-2 rounded w-full"
                placeholder="e.g. CS & IT"
              />
            </div>
          )}

          {showAcademic && (
            <div>
              <label className="text-sm">Level</label>
              <select
                value={newUser.level || ""}
                onChange={(e) => setNewUser({ ...newUser, level: e.target.value })}
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
                value={newUser.program || ""}
                onChange={(e) => setNewUser({ ...newUser, program: e.target.value })}
                className="border p-2 rounded w-full"
                placeholder="e.g. BS Computer Science"
              />
            </div>
          )}

          {/* Student-only */}
          {isStudent && (
            <div>
              <label className="text-sm">Semester</label>
              <input
                type="number"
                value={newUser.semester}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
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
                value={newUser.batchYear || ""}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
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
                value={newUser.section || ""}
                onChange={(e) => setNewUser({ ...newUser, section: e.target.value })}
                className="border p-2 rounded w-full"
                placeholder="e.g. A"
              />
            </div>
          )}

          {isStudent && (
            <div>
              <label className="text-sm">Shift</label>
              <select
                value={newUser.shift || ""}
                onChange={(e) => setNewUser({ ...newUser, shift: e.target.value })}
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
                value={newUser.status || "Active"}
                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
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
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="relative">
            <label className="text-sm">Password</label>
            <div className="flex items-center">
              <input
                type={showPasswordAdd ? "text" : "password"}
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="border p-2 rounded w-full"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPasswordAdd((s) => !s)}
                className="ml-2 text-gray-600"
                title="Show/Hide"
              >
                {showPasswordAdd ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm">Contact</label>
            <input
              value={newUser.contact_no}
              onChange={(e) => setNewUser({ ...newUser, contact_no: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm">Address</label>
            <input
              value={newUser.address}
              onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-50 cursor-pointer">
            Cancel
          </button>
          <button
            onClick={() => {
              if (!strongPassword(newUser.password)) {
                alert("Password must be at least 8 characters and include letters, numbers, and a symbol.");
                return;
              }
              onSubmit();
            }}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
