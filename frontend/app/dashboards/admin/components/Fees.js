"use client";
import React, { useEffect, useState } from "react";

export default function Fees() {
  const [fees, setFees] = useState([]);
  const [search, setSearch] = useState("");

  const load = async ()=> {
    const res = await fetch("http://localhost:5000/api/fees");
    const json = await res.json();
    setFees(json.data || json);
  };
  useEffect(()=>{ load(); }, []);

  const downloadCSV = arr => {
    if(!arr.length) return;
    const keys = ["registration_no","name","department","semester","total_fee","paid_fee","remaining_fee","status","date"];
    const csv = [keys.join(","), ...arr.map(r => keys.map(k=>`"${(r[k]??"").toString().replace(/"/g,'""')}"`).join(","))].join("\n");
    const blob = new Blob([csv],{type:"text/csv"}); const url = URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="fees.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const del = async (id)=> {
    if(!confirm("Delete fee record?")) return;
    await fetch(`http://localhost:5000/api/fees/${id}`, { method:"DELETE" });
    load();
  };

  const filtered = fees.filter(f=> {
    if(!search) return true;
    const s = search.toLowerCase();
    return (f.name||"").toLowerCase().includes(s) || (f.registration_no||"").toLowerCase().includes(s);
  });

  return (
    <div className="p-4 bg-white rounded">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl">Fees</h2>
        <div className="flex gap-2">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name/reg" className="p-2 border rounded" />
          <button onClick={()=>downloadCSV(filtered)} className="bg-green-600 text-white px-3 py-1 rounded">Export CSV</button>
        </div>
      </div>

      <table className="w-full">
        <thead className="bg-gray-100">
          <tr><th>Name</th><th>Reg</th><th>Total</th><th>Paid</th><th>Remain</th><th>Status</th><th>Action</th></tr>
        </thead>
        <tbody>
          {filtered.map(f=>(
            <tr key={f._id} className="border-b text-center">
              <td className="p-2">{f.name}</td>
              <td>{f.registration_no}</td>
              <td>{f.total_fee}</td>
              <td>{f.paid_fee}</td>
              <td>{f.remaining_fee}</td>
              <td>{f.status}</td>
              <td><button onClick={()=>del(f._id)} className="text-red-600">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




// "use client";
// import { useState, useEffect } from "react";

// export default function Fees() {
//   const [fees, setFees] = useState([]);

//   const loadFees = async () => {
//     const res = await fetch("http://localhost:5000/api/fees");
//     const data = await res.json();
//     setFees(data);
//   };

//   useEffect(() => {
//     loadFees();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-xl font-bold">Fees Records</h1>

//       <table className="w-full bg-white mt-4 rounded">
//         <thead>
//           <tr className="bg-gray-200">
//             <th>Name</th>
//             <th>Reg No</th>
//             <th>Total</th>
//             <th>Paid</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {fees.map((f) => (
//             <tr key={f._id} className="border-b text-center">
//               <td>{f.name}</td>
//               <td>{f.registration_no}</td>
//               <td>{f.total_fee}</td>
//               <td>{f.paid_fee}</td>
//               <td>{f.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
