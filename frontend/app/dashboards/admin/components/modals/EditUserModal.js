// frontend/app/dashboards/admin/components/modals/EditUserModal.js
"use client";
import React, { useEffect, useState } from "react";
import { editUserApi } from "@/app/lib/usersApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function EditUserModal({ open, onClose, selectedUser, onSuccess }) {
  const [editData, setEditData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedUser) return;
    setEditData({
      _id: selectedUser._id || "",
      userType: selectedUser.userType || "",
      registration_no: selectedUser.registration_no || "",
      name: selectedUser.name || "",
      father_name: selectedUser.father_name || "",
      semester: selectedUser.semester ?? "",
      field: selectedUser.field || "",
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
      const res = await editUserApi(selectedUser.registration_no, selectedUser.userType, editData);
      if (res.success) {
        alert("Updated!");
        onSuccess?.();
      } else {
        alert(res.message || "Update failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg max-w-xl w-full p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit User — {selectedUser.registration_no}</h3>
          <button onClick={onClose} className="text-gray-600 cursor-pointer">✕</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm">Registration No</label>
            <input value={editData.registration_no ?? ""} readOnly className="border p-2 rounded w-full bg-gray-100" />
          </div>

          <div>
            <label className="text-sm">User Type</label>
            <input value={selectedUser.userType ?? ""} readOnly className="border p-2 rounded w-full bg-gray-100" />
          </div>

          <div>
            <label className="text-sm">Name</label>
            <input value={editData.name ?? ""} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="border p-2 rounded w-full" />
          </div>

          <div>
            <label className="text-sm">Father Name</label>
            <input value={editData.father_name ?? ""} onChange={(e) => setEditData({ ...editData, father_name: e.target.value })} className="border p-2 rounded w-full" />
          </div>

          {selectedUser.userType === "student" && (
            <div>
              <label className="text-sm">Semester</label>
              <input
                type="number"
                value={editData.semester ?? ""}
                onChange={(e) =>
                  setEditData({ ...editData, semester: e.target.value ? Number(e.target.value) : "" })
                }
                className="border p-2 rounded w-full"
              />
            </div>
          )}

          {selectedUser.userType === "student" && (
            <div>
              <label className="text-sm">Field</label>
              <input value={editData.field ?? ""} onChange={(e) => setEditData({ ...editData, field: e.target.value })} className="border p-2 rounded w-full" />
            </div>
          )}

          <div>
            <label className="text-sm">Email</label>
            <input value={editData.email ?? ""} onChange={(e) => setEditData({ ...editData, email: e.target.value })} className="border p-2 rounded w-full" />
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
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="ml-2 text-gray-600">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm">Contact</label>
            <input value={editData.contact_no ?? ""} onChange={(e) => setEditData({ ...editData, contact_no: e.target.value })} className="border p-2 rounded w-full" />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm">Address</label>
            <input value={editData.address ?? ""} onChange={(e) => setEditData({ ...editData, address: e.target.value })} className="border p-2 rounded w-full" />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-50 cursor-pointer">Cancel</button>
          <button disabled={loading} onClick={save} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer disabled:opacity-50">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}


// "use client";
// import React from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const EditUserModal = ({
//   open,
//   onClose,
//   selectedUser,
//   editData,
//   setEditData,
//   onSave,
//   showPasswordEdit,
//   setShowPasswordEdit,
// }) => {
//   if (!open || !selectedUser) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//       <div className="bg-white rounded-lg max-w-xl w-full p-6 shadow-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">
//             Edit User — {selectedUser.registration_no}
//           </h3>
//           <button onClick={onClose} className="text-gray-600 cursor-pointer">✕</button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <div>
//             <label className="text-sm">Registration No</label>
//             <input
//               value={editData.registration_no ?? ""}
//               readOnly
//               className="border p-2 rounded w-full bg-gray-100"
//             />
//           </div>

//           <div>
//             <label className="text-sm">User Type</label>
//             <input
//               value={selectedUser.userType ?? ""}
//               readOnly
//               className="border p-2 rounded w-full bg-gray-100"
//             />
//           </div>

//           <div>
//             <label className="text-sm">Name</label>
//             <input
//               value={editData.name ?? ""}
//               onChange={(e) => setEditData({ ...editData, name: e.target.value })}
//               className="border p-2 rounded w-full"
//             />
//           </div>

//           <div>
//             <label className="text-sm">Father Name</label>
//             <input
//               value={editData.father_name ?? ""}
//               onChange={(e) => setEditData({ ...editData, father_name: e.target.value })}
//               className="border p-2 rounded w-full"
//             />
//           </div>

//           {selectedUser.userType === "student" && (
//             <div>
//               <label className="text-sm">Semester</label>
//               <input
//                 type="number"
//                 value={editData.semester ?? ""}
//                 onChange={(e) =>
//                   setEditData({
//                     ...editData,
//                     semester: e.target.value ? Number(e.target.value) : "",
//                   })
//                 }
//                 className="border p-2 rounded w-full"
//               />
//             </div>
//           )}

//           {selectedUser.userType === "student" && (
//             <div>
//               <label className="text-sm">Field</label>
//               <input
//                 value={editData.field ?? ""}
//                 onChange={(e) => setEditData({ ...editData, field: e.target.value })}
//                 className="border p-2 rounded w-full"
//               />
//             </div>
//           )}

//           <div>
//             <label className="text-sm">Email</label>
//             <input
//               value={editData.email ?? ""}
//               onChange={(e) => setEditData({ ...editData, email: e.target.value })}
//               className="border p-2 rounded w-full"
//             />
//           </div>

//           <div className="relative">
//             <label className="text-sm">Password (leave blank to keep)</label>
//             <div className="flex items-center">
//               <input
//                 type={showPasswordEdit ? "text" : "password"}
//                 value={editData.password ?? ""}
//                 onChange={(e) => setEditData({ ...editData, password: e.target.value })}
//                 className="border p-2 rounded w-full"
//                 placeholder="New password (optional)"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPasswordEdit((s) => !s)}
//                 className="ml-2 text-gray-600"
//               >
//                 {showPasswordEdit ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           <div>
//             <label className="text-sm">Contact</label>
//             <input
//               value={editData.contact_no ?? ""}
//               onChange={(e) => setEditData({ ...editData, contact_no: e.target.value })}
//               className="border p-2 rounded w-full"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="text-sm">Address</label>
//             <input
//               value={editData.address ?? ""}
//               onChange={(e) => setEditData({ ...editData, address: e.target.value })}
//               className="border p-2 rounded w-full"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 mt-4">
//           <button onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-50 cursor-pointer">Cancel</button>
//           <button onClick={onSave} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditUserModal;
