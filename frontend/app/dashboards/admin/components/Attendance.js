// frontend/app/dashboards/admin/components/Attendance.js
"use client";
import React, { useEffect, useMemo, useState } from "react";

const API_ATT = "http://localhost:5000/api/attendance";
const API_USERS = "http://localhost:5000/api/users";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

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

const daysInMonth = (year, month) => new Date(year, month, 0).getDate(); // month 1..12

export default function Attendance() {
  const [role, setRole] = useState("admin"); // admin/faculty from scp_user
  const [mode, setMode] = useState("student"); // student | faculty (UI buttons)

  // user database (for deriving departments/programs/levels)
  const [allUsers, setAllUsers] = useState([]);

  // flow selections
  const [department, setDepartment] = useState("");
  const [program, setProgram] = useState("");
  const [level, setLevel] = useState("");
  const [semester, setSemester] = useState(null);

  // create sheet
  const now = new Date();
  const [createYear, setCreateYear] = useState(now.getFullYear());
  const [createMonth, setCreateMonth] = useState(now.getMonth() + 1); // 1..12

  // load existing
  const [year, setYear] = useState(now.getFullYear());
  const [existingMonths, setExistingMonths] = useState([]);
  const [month, setMonth] = useState(now.getMonth() + 1);

  // sheet
  const [sheet, setSheet] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loadingSheet, setLoadingSheet] = useState(false);

  // ----------------------------
  // Init role + fetch users
  // ----------------------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem("scp_user");
      if (raw) {
        const u = JSON.parse(raw);
        setRole(u?.userType || "admin");
      }
    } catch {}
  }, []);

  const fetchUsers = async () => {
    const token = getTokenOrRedirect();
    if (!token) return;

    try {
      const res = await fetch(API_USERS, { headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json();
      const payload = json?.data || {};

      const merged = [
        ...(payload.admins?.map((u) => ({ ...u, userType: "admin" })) || []),
        ...(payload.monitors?.map((u) => ({ ...u, userType: "monitor" })) || []),
        ...(payload.faculties?.map((u) => ({ ...u, userType: "faculty" })) || []),
        ...(payload.students?.map((u) => ({ ...u, userType: "student" })) || []),
      ];

      setAllUsers(merged);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ----------------------------
  // Derived lists for hierarchy
  // ----------------------------
  const activeStudents = useMemo(() => {
    return allUsers
      .filter((u) => u.userType === "student")
      .filter((u) => (u.status || "Active").toLowerCase() === "active");
  }, [allUsers]);

  const departments = useMemo(() => {
    const set = new Set();
    activeStudents.forEach((s) => {
      const d = (s.department || "").trim();
      if (d) set.add(d);
    });
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [activeStudents]);

  const programs = useMemo(() => {
    const set = new Set();
    activeStudents
      .filter((s) => !department || (s.department || "").trim().toLowerCase() === department.trim().toLowerCase())
      .forEach((s) => {
        const p = (s.program || "").trim();
        if (p) set.add(p);
      });
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [activeStudents, department]);

  const levels = useMemo(() => {
    const set = new Set();
    activeStudents
      .filter((s) => !department || (s.department || "").trim().toLowerCase() === department.trim().toLowerCase())
      .filter((s) => !program || (s.program || "").trim().toLowerCase() === program.trim().toLowerCase())
      .forEach((s) => {
        const lv = (s.level || "").trim();
        if (lv) set.add(lv);
      });

    const order = ["BS", "MS", "MPhil", "PhD"];
    const arr = [...set];
    arr.sort((a, b) => (order.indexOf(a) === -1 ? 999 : order.indexOf(a)) - (order.indexOf(b) === -1 ? 999 : order.indexOf(b)));
    return arr;
  }, [activeStudents, department, program]);

  const semesterButtons = useMemo(() => {
    if (!level) return [];
    const lv = level.toLowerCase();
    if (lv === "bs") return Array.from({ length: 8 }, (_, i) => i + 1);
    return Array.from({ length: 4 }, (_, i) => i + 1); // MS / MPhil / PhD -> 1..4
  }, [level]);

  // reset cascade
  useEffect(() => {
    setProgram("");
    setLevel("");
    setSemester(null);
    setSheet(null);
  }, [department]);

  useEffect(() => {
    setLevel("");
    setSemester(null);
    setSheet(null);
  }, [program]);

  useEffect(() => {
    setSemester(null);
    setSheet(null);
  }, [level]);

  // ----------------------------
  // Existing months list fetch
  // ----------------------------
  const fetchExistingMonths = async () => {
    const token = getTokenOrRedirect();
    if (!token) return;

    if (!department || !program || !level || !semester) {
      setExistingMonths([]);
      return;
    }

    try {
      const qs = new URLSearchParams({
        userType: "student",
        department,
        program,
        level,
        semester: String(semester),
        year: String(year),
      });

      const res = await fetch(`${API_ATT}/months?${qs.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json();

      if (json.success) setExistingMonths(json.data || []);
      else setExistingMonths([]);
    } catch {
      setExistingMonths([]);
    }
  };

  useEffect(() => {
    fetchExistingMonths();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department, program, level, semester, year]);

  // ----------------------------
  // Load sheet for selected month/year
  // ----------------------------
  const loadSheet = async (m, y) => {
    const token = getTokenOrRedirect();
    if (!token) return;

    if (!department || !program || !level || !semester) return;

    try {
      setLoadingSheet(true);

      const qs = new URLSearchParams({
        userType: "student",
        department,
        program,
        level,
        semester: String(semester),
        month: String(m),
        year: String(y),
      });

      const res = await fetch(`${API_ATT}/month?${qs.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json();

      if (json.success) {
        setSheet(json.data || null);
      } else {
        setSheet(null);
      }
    } catch (e) {
      console.error(e);
      setSheet(null);
    } finally {
      setLoadingSheet(false);
    }
  };

  // ----------------------------
  // Create new sheet
  // ----------------------------
  const createSheet = async () => {
    const token = getTokenOrRedirect();
    if (!token) return;

    if (!department || !program || !level || !semester) {
      alert("Please select Department → Program → Level → Semester first.");
      return;
    }

    try {
      setLoadingSheet(true);

      const res = await fetch(`${API_ATT}/month`, {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify({
          userType: "student",
          department,
          program,
          level,
          semester: Number(semester),
          month: Number(createMonth),
          year: Number(createYear),
        }),
      });

      const json = await res.json();

      if (!json.success) {
        alert(json.message || "Failed to create sheet");
        return;
      }

      alert(json.message || "Created!");
      setYear(Number(createYear));
      setMonth(Number(createMonth));
      await fetchExistingMonths();
      setSheet(json.data);

    } catch (e) {
      alert("Failed to create sheet");
    } finally {
      setLoadingSheet(false);
    }
  };

  // ----------------------------
  // Edit helpers
  // ----------------------------
  const totalDays = useMemo(() => {
    if (!sheet) return 0;
    return daysInMonth(sheet.year, sheet.month);
  }, [sheet]);

  const updateCell = (rowIndex, dayKey, value) => {
    setSheet((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      const recs = [...(copy.records || [])];
      const row = { ...recs[rowIndex] };
      const days = { ...(row.days || {}) };

      days[String(dayKey)] = value;
      row.days = days;
      recs[rowIndex] = row;
      copy.records = recs;
      return copy;
    });
  };

  const saveSheet = async () => {
    const token = getTokenOrRedirect();
    if (!token) return;
    if (!sheet?._id) return;

    try {
      setSaving(true);

      const res = await fetch(`${API_ATT}/month/${sheet._id}`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify({ records: sheet.records || [] }),
      });

      const json = await res.json();
      if (json.success) {
        alert("Attendance saved!");
        setSheet(json.data);
      } else {
        alert(json.message || "Save failed");
      }
    } catch (e) {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  // ✅ PRINT ONLY THE SHEET AREA (fix blank page)
  const printSheet = () => {
    window.print();
  };

  // ✅ Delete whole month sheet
  const deleteMonth = async () => {
    const token = getTokenOrRedirect();
    if (!token) return;
    if (!sheet) return;

    if (!confirm("Delete this whole month attendance record?")) return;

    try {
      const res = await fetch(`${API_ATT}/month`, {
        method: "DELETE",
        headers: authHeaders(token),
        body: JSON.stringify({
          userType: "student",
          department: sheet.department,
          program: sheet.program,
          level: sheet.level,
          semester: sheet.semester,
          month: sheet.month,
          year: sheet.year,
        }),
      });

      const json = await res.json();
      if (!json.success) {
        alert(json.message || "Delete failed");
        return;
      }

      alert(json.message || "Deleted!");
      setSheet(null);
      await fetchExistingMonths();
    } catch (e) {
      alert("Delete failed");
    }
  };

  // UI helper
  const SelectionHeader = ({ title, value, onClear }) => (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-gray-600">{title}:</span>
      <span className="px-2 py-1 bg-gray-100 rounded text-sm">{value || "—"}</span>
      {value ? (
        <button onClick={onClear} className="text-xs px-2 py-1 border rounded hover:bg-gray-50 cursor-pointer">
          Clear
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex items-start md:items-center justify-between gap-3 flex-wrap mb-4">
        <div>
          <h2 className="text-2xl font-semibold">Attendance</h2>
          <p className="text-sm text-gray-600">
            Select Students → Department → Program → Level → Semester → Month Sheet.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              setMode("student");
              setSheet(null);
            }}
            className={`px-4 py-2 rounded cursor-pointer ${
              mode === "student" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Students
          </button>

          <button
            onClick={() => {
              setMode("faculty");
              setSheet(null);
            }}
            className={`px-4 py-2 rounded cursor-pointer ${
              mode === "faculty" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Faculty
          </button>
        </div>
      </div>

      {mode === "faculty" && (
        <div className="p-4 border rounded bg-gray-50">
          <p className="text-gray-700">
            Faculty attendance UI can be added later. (Your requested full flow is for Student attendance first.)
          </p>
        </div>
      )}

      {mode === "student" && (
        <>
          <div className="flex flex-col gap-2 mb-4">
            <SelectionHeader title="Department" value={department} onClear={() => setDepartment("")} />
            <SelectionHeader title="Program" value={program} onClear={() => setProgram("")} />
            <SelectionHeader title="Level" value={level} onClear={() => setLevel("")} />
            <SelectionHeader title="Semester" value={semester ? String(semester) : ""} onClear={() => setSemester(null)} />
          </div>

          {!department && (
            <div>
              <h3 className="font-semibold mb-2">Select Department</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {departments.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDepartment(d)}
                    className="p-4 border rounded-lg hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <div className="font-medium">{d}</div>
                    <div className="text-sm text-gray-500">Click to open programs</div>
                  </button>
                ))}
                {departments.length === 0 && (
                  <div className="p-4 border rounded text-gray-600">
                    No departments found in Active Students.
                  </div>
                )}
              </div>
            </div>
          )}

          {department && !program && (
            <div>
              <h3 className="font-semibold mb-2">Select Program</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {programs.map((p) => (
                  <button
                    key={p}
                    onClick={() => setProgram(p)}
                    className="p-4 border rounded-lg hover:bg-gray-50 text-left cursor-pointer"
                  >
                    <div className="font-medium">{p}</div>
                    <div className="text-sm text-gray-500">Click to select level</div>
                  </button>
                ))}
                {programs.length === 0 && (
                  <div className="p-4 border rounded text-gray-600">
                    No programs found under this department.
                  </div>
                )}
              </div>
            </div>
          )}

          {department && program && !level && (
            <div>
              <h3 className="font-semibold mb-2">Select Level</h3>
              <div className="flex gap-2 flex-wrap">
                {levels.map((lv) => (
                  <button
                    key={lv}
                    onClick={() => setLevel(lv)}
                    className="px-4 py-2 rounded border hover:bg-gray-50 cursor-pointer"
                  >
                    {lv}
                  </button>
                ))}
                {levels.length === 0 && (
                  <div className="p-3 border rounded text-gray-600">
                    No levels found (ensure students have level values like BS/MS/MPhil).
                  </div>
                )}
              </div>
            </div>
          )}

          {department && program && level && !semester && (
            <div className="mt-3">
              <h3 className="font-semibold mb-2">Select Semester</h3>
              <div className="flex gap-2 flex-wrap">
                {semesterButtons.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSemester(s)}
                    className="px-4 py-2 rounded border hover:bg-gray-50 cursor-pointer"
                  >
                    Semester {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {department && program && level && semester && (
            <div className="mt-4">
              <div className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <h3 className="font-semibold">Add Attendance (Create Monthly Sheet)</h3>
                    <p className="text-sm text-gray-600">
                      Choose month/year then create. It will generate a sheet for all Active students.
                    </p>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <select
                      value={createMonth}
                      onChange={(e) => setCreateMonth(Number(e.target.value))}
                      className="border p-2 rounded"
                    >
                      {monthNames.map((mName, idx) => (
                        <option key={mName} value={idx + 1}>
                          {mName}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      value={createYear}
                      onChange={(e) => setCreateYear(Number(e.target.value))}
                      className="border p-2 rounded w-28"
                    />

                    <button
                      onClick={createSheet}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                    >
                      Add Attendance
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                  <div>
                    <h3 className="font-semibold">View / Edit Existing Month</h3>
                    <p className="text-sm text-gray-600">
                      Admin can edit all. Faculty can edit student attendance only.
                    </p>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="border p-2 rounded w-28"
                    />

                    <select
                      value={month}
                      onChange={(e) => setMonth(Number(e.target.value))}
                      className="border p-2 rounded"
                    >
                      {monthNames.map((mName, idx) => (
                        <option key={mName} value={idx + 1}>
                          {mName}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => loadSheet(month, year)}
                      className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black cursor-pointer"
                    >
                      Load
                    </button>
                  </div>
                </div>

                {existingMonths.length > 0 && (
                  <div className="text-sm text-gray-600">
                    Existing months in {year}:{" "}
                    <span className="font-medium">
                      {existingMonths.map((m) => monthNames[m - 1]).join(", ")}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4">
                {loadingSheet && (
                  <div className="p-4 text-gray-600">Loading...</div>
                )}

                {!loadingSheet && !sheet && (
                  <div className="p-4 border rounded text-gray-600">
                    No attendance sheet loaded yet. Create or load one.
                  </div>
                )}

                {!loadingSheet && sheet && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-3 bg-gray-100 flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <div className="font-semibold">
                          {sheet.department} • {sheet.program} • {sheet.level} • Semester {sheet.semester}
                        </div>
                        <div className="text-sm text-gray-600">
                          {monthNames[sheet.month - 1]} {sheet.year}
                        </div>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={printSheet}
                          className="px-4 py-2 rounded border bg-white hover:bg-gray-50 cursor-pointer"
                        >
                          Print
                        </button>

                        <button
                          onClick={deleteMonth}
                          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                        >
                          Delete Month
                        </button>

                        <button
                          onClick={saveSheet}
                          disabled={saving}
                          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 cursor-pointer disabled:opacity-50"
                        >
                          {saving ? "Saving..." : "Save Updates"}
                        </button>
                      </div>
                    </div>

                    {/* ✅ PRINT AREA WRAPPER */}
                    <div className="print-area">
                      <div className="p-3 border-b bg-white">
                        <div className="text-lg font-semibold">
                          Attendance Sheet
                        </div>
                        <div className="text-sm text-gray-700">
                          {sheet.department} • {sheet.program} • {sheet.level} • Semester {sheet.semester} • {monthNames[sheet.month - 1]} {sheet.year}
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="min-w-[900px] w-full border-collapse">
                          <thead className="bg-white sticky top-0 z-10">
                            <tr className="border-b">
                              <th className="p-2 text-left w-16">#</th>
                              <th className="p-2 text-left min-w-[220px]">Student Name</th>
                              <th className="p-2 text-left min-w-[160px]">Registration No</th>

                              {Array.from({ length: totalDays }).map((_, i) => (
                                <th key={i + 1} className="p-2 text-center w-14">
                                  {i + 1}
                                </th>
                              ))}
                            </tr>
                          </thead>

                          <tbody>
                            {(sheet.records || []).map((r, idx) => (
                              <tr key={r.registration_no} className="border-b hover:bg-gray-50">
                                <td className="p-2">{idx + 1}</td>
                                <td className="p-2">{r.name}</td>
                                <td className="p-2">{r.registration_no}</td>

                                {Array.from({ length: totalDays }).map((_, dayIndex) => {
                                  const day = dayIndex + 1;
                                  const val = r.days?.[String(day)] ?? "";

                                  return (
                                    <td key={`${r.registration_no}-${day}`} className="p-1 text-center">
                                      <select
                                        value={val}
                                        onChange={(e) => updateCell(idx, day, e.target.value)}
                                        className="border rounded px-1 py-1 text-sm w-14 bg-white"
                                        title="P=Present, A=Absent, L=Leave"
                                      >
                                        <option value="">—</option>
                                        <option value="P">✓</option>
                                        <option value="A">✗</option>
                                        <option value="L">L</option>
                                      </select>
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}

                            {(sheet.records || []).length === 0 && (
                              <tr>
                                <td colSpan={3 + totalDays} className="p-4 text-center text-gray-600">
                                  No students found for this scope.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      <div className="p-3 bg-gray-50 text-sm text-gray-600 flex flex-wrap gap-4">
                        <span><b>✓</b> Present</span>
                        <span><b>✗</b> Absent</span>
                        <span><b>L</b> Leave</span>
                        <span><b>—</b> Empty</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* ✅ Print styling (fixed) */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area,
          .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 10px;
            background: white;
          }

          /* hide selects and show the values instead */
          select {
            appearance: none;
            border: none !important;
            background: transparent !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
