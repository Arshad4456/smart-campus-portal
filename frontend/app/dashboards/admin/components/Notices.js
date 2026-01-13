"use client";
import React, { useEffect, useState } from "react";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title:"", description:"", postedBy:"Admin", userType:"admin", important:false });

  const load = async ()=> {
    const res = await fetch("http://localhost:5000/api/notices");
    const json = await res.json();
    setNotices(json.data || json);
  };
  useEffect(()=>{ load(); }, []);

  const addNotice = async () => {
    await fetch("http://localhost:5000/api/notices/add", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
    setForm({ title:"", description:"", postedBy:"Admin", userType:"admin", important:false });
    load();
  };

  const deleteNotice = async (id) => {
    if(!confirm("Delete notice?")) return;
    await fetch(`http://localhost:5000/api/notices/${id}`, { method:"DELETE" });
    load();
  };

  return (
    <div className="p-4 bg-white rounded">
      <h2 className="text-2xl mb-3">Notices</h2>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-2">
        <input className="p-2 border rounded" placeholder="Title" value={form.title} onChange={(e)=>setForm(f=>({...f, title:e.target.value}))} />
        <input className="p-2 border rounded" placeholder="Posted By" value={form.postedBy} onChange={(e)=>setForm(f=>({...f, postedBy:e.target.value}))} />
        <select className="p-2 border rounded" value={form.userType} onChange={(e)=>setForm(f=>({...f, userType:e.target.value}))}>
          <option value="admin">Admin</option><option value="faculty">Faculty</option><option value="monitor">Monitor</option>
        </select>
        <textarea className="p-2 border rounded md:col-span-3" placeholder="Description" value={form.description} onChange={(e)=>setForm(f=>({...f, description:e.target.value}))} />
        <div className="flex gap-2">
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.important} onChange={e=>setForm(f=>({...f, important:e.target.checked}))} /> Important</label>
          <button onClick={addNotice} className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
        </div>
      </div>

      <ul className="space-y-2">
        {notices.map(n=>(
          <li key={n._id} className="p-3 border rounded">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{n.title} {n.important && <span className="text-red-500">●</span>}</h3>
                <p className="text-sm text-gray-600">{n.description}</p>
                <small className="text-xs text-gray-400">{n.postedBy} • {new Date(n.date).toLocaleString()}</small>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={()=>deleteNotice(n._id)} className="text-red-600">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}





// import React, { useState } from "react";

// const Notices = () => {
//   const [notices, setNotices] = useState([
//     { title: "Exam Schedule Released", date: "2025-11-10" },
//     { title: "Holiday on Friday", date: "2025-11-12" },
//   ]);

//   return (
//     <div className="p-6 bg-white rounded-lg shadow">
//       <h2 className="text-xl font-semibold mb-4">Recent Notices</h2>
//       <ul className="list-disc pl-5">
//         {notices.map((n, i) => (
//           <li key={i} className="mb-2">
//             <span className="font-semibold">{n.title}</span> — <span className="text-gray-500">{n.date}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notices;
