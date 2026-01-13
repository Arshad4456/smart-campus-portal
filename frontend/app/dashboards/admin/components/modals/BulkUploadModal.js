// frontend/app/dashboards/admin/components/modals/BulkUploadModal.js
"use client";
import React, { useRef, useState } from "react";
import { bulkAddGrouped } from "@/app/lib/usersApi";
import { parseCsvFile, groupUsers, removeDuplicatesGrouped } from "@/app/lib/csvUsers";

export default function BulkUploadModal({ open, onClose, existingUsers = [], onSuccess }) {
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const existingRegNos = new Set(
    existingUsers
      .map((u) => (u.registration_no || "").trim().toLowerCase())
      .filter(Boolean)
  );

  const upload = async (file) => {
    if (!file) return alert("Please pick a CSV file first");

    try {
      setLoading(true);

      const rows = await parseCsvFile(file);
      const grouped = groupUsers(rows);

      // ✅ prevents adding same registration_no again (DB + same file duplicates)
      const cleaned = removeDuplicatesGrouped(grouped, existingRegNos);

      const total =
        cleaned.admins.length + cleaned.monitors.length + cleaned.faculties.length + cleaned.students.length;

      if (total === 0) {
        alert("No new users to upload (all are duplicates or invalid).");
        return;
      }

      const res = await bulkAddGrouped(cleaned);

      if (res.success) {
        alert(`CSV uploaded successfully! Added: ${total}`);
        onClose();
        onSuccess?.();
      } else {
        alert("Upload failed: " + (res.message || JSON.stringify(res)));
      }
    } catch (e) {
      console.error(e);
      alert("CSV upload error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Upload Users via CSV</h3>
          <button onClick={onClose} className="text-gray-600 cursor-pointer">✕</button>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          CSV columns: registration_no, name, father_name, email, password, contact_no, address, userType.
          For students include: semester, field.
        </p>

        <input
          ref={fileRef}
          type="file"
          accept=".csv"
          className="mb-3 bg-gray-200 hover:bg-gray-300 cursor-pointer"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
          }}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded border cursor-pointer hover:bg-gray-50">Cancel</button>
          <button
            disabled={loading}
            onClick={() => upload(fileRef.current?.files?.[0])}
            className="px-4 py-2 rounded bg-green-600 text-white cursor-pointer hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload CSV"}
          </button>
        </div>
      </div>
    </div>
  );
}


// "use client";
// import React, { useRef } from "react";

// const BulkUploadModal = ({ open, onClose, onUpload }) => {
//   const fileInputRef = useRef(null);
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//       <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Upload Users via CSV</h3>
//           <button onClick={onClose} className="text-gray-600 cursor-pointer">✕</button>
//         </div>

//         <p className="text-sm text-gray-600 mb-3">
//           CSV should include columns: registration_no, name, father_name, email, password, contact_no, address, userType
//           (admin/monitor/faculty/student). For students add: semester, field.
//         </p>

//         <input 
//           ref={fileInputRef}
//           type="file"
//           accept=".csv"
//           className="mb-3 bg-gray-200 hover:bg-gray-300 cursor-pointer"
//           onChange={(e) => {
//             const file = e.target.files?.[0];
//             if (file) onUpload(file);
//           }}
//         />

//         <div className="flex justify-end gap-3 mt-4">
//           <button onClick={onClose} className="px-4 py-2 rounded border cursor-pointer hover:bg-gray-50">Cancel</button>
//           <button
//             onClick={() => {
//               const file = fileInputRef.current?.files?.[0];
//               if (!file) return alert("Please pick a CSV file first");
//               onUpload(file);
//             }}
//             className="px-4 py-2 rounded bg-green-600 text-white cursor-pointer hover:bg-green-700"
//           >
//             Upload CSV
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BulkUploadModal;
