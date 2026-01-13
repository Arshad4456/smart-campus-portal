"use client";
import React, { useEffect, useState } from "react";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  const load = async () => {
    const res = await fetch("http://localhost:5000/api/attendance");
    const json = await res.json();
    // some routes return {success:true,data:[]}
    setRecords(json.data || json);
  };

  useEffect(()=> { load(); }, []);

  const addSample = async () => {
    const sample = {
      userType: "student",
      registration_no: "stu_new",
      name: "Sample Student",
      department: "CS",
      status: "Present"
    };
    await fetch("http://localhost:5000/api/attendance/add", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(sample) });
    load();
  };

  const deleteRec = async (id) => {
    if(!confirm("Delete record?")) return;
    await fetch(`http://localhost:5000/api/attendance/${id}`, { method: "DELETE" });
    load();
  };

  const filtered = records.filter(r => {
    if(!search) return true;
    const s = search.toLowerCase();
    return (r.name||"").toLowerCase().includes(s) || (r.registration_no||"").toLowerCase().includes(s);
  });

  const downloadCSV = (arr, filename="attendance.csv") => {
    if(!arr.length) return;
    const keys = ["registration_no","name","userType","department","status","date"];
    const csv = [keys.join(","), ...arr.map(r => keys.map(k=>`"${(r[k]??"").toString().replace(/"/g,'""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download=filename; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 bg-white rounded">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl">Attendance</h2>
        <div className="flex gap-2">
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search name/reg" className="p-2 border rounded" />
          <button onClick={()=>downloadCSV(filtered)} className="bg-green-600 text-white px-3 py-1 rounded">Export CSV</button>
          <button onClick={addSample} className="bg-blue-600 text-white px-3 py-1 rounded">Add Sample</button>
        </div>
      </div>

      <table className="w-full">
        <thead className="bg-gray-100">
          <tr><th className="p-2">Name</th><th>Reg</th><th>Type</th><th>Status</th><th>Date</th><th>Action</th></tr>
        </thead>
        <tbody>
          {filtered.map(r=>(
            <tr key={r._id} className="border-b text-center">
              <td className="p-2">{r.name}</td>
              <td>{r.registration_no}</td>
              <td>{r.userType}</td>
              <td>{r.status}</td>
              <td>{new Date(r.date).toLocaleString()}</td>
              <td><button onClick={()=>deleteRec(r._id)} className="text-red-600">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




// "use client";
// import { useState, useEffect } from "react";

// export default function Attendance() {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // GET Attendance
//   const fetchAttendance = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/attendance");
//       const data = await res.json();
//       setRecords(data);
//     } catch (err) {
//       console.error("Error loading attendance:", err);
//     }
//     setLoading(false);
//   };

//   // ADD Attendance
//   const addAttendance = async () => {
//     const sample = {
//       userType: "student",
//       registration_no: "temp001",
//       name: "New Student",
//       department: "IT",
//       status: "Present"
//     };

//     await fetch("http://localhost:5000/api/attendance/add", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(sample)
//     });

//     fetchAttendance();
//   };

//   useEffect(() => {
//     fetchAttendance();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-xl font-bold">Attendance</h1>

//       <button
//         onClick={addAttendance}
//         className="bg-blue-600 px-3 py-1 mt-2 rounded text-white"
//       >
//         Add Sample Attendance
//       </button>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="w-full bg-white mt-4 rounded">
//           <thead>
//             <tr className="bg-gray-200">
//               <th>Name</th>
//               <th>Reg No</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.map((r) => (
//               <tr key={r._id} className="border-b text-center">
//                 <td>{r.name}</td>
//                 <td>{r.registration_no}</td>
//                 <td>{r.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
