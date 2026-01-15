// frontend/app/lib/csvUsers.js
import Papa from "papaparse";

export function parseCsvFile(file) {
  return new Promise(async (resolve, reject) => {
    try {
      const text = await file.text();
      const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
      resolve(parsed.data || []);
    } catch (e) {
      reject(e);
    }
  });
}

const toNum = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

export function normalizeRow(row) {
  const t = (row.userType || row.usertype || row.type || "").toLowerCase().trim();

  return {
    userType: t || "student",

    registration_no:
      row.registration_no ||
      row.reg ||
      row.Reg ||
      row.RegNo ||
      row.registrationNo ||
      "",

    name: row.name || row.fullname || row.full_name || "",
    father_name: row.father_name || row.father || row.fatherName || "",

    // ✅ academic fields
    department: row.department || row.dept || row.Department || "",
    program: row.program || row.Program || row.field || row.Field || "", // backward support: field -> program
    level: row.level || row.Level || row.degree || row.Degree || "",

    // ✅ student fields
    semester: row.semester !== undefined && row.semester !== "" ? toNum(row.semester) : undefined,
    batchYear: row.batchYear !== undefined && row.batchYear !== "" ? toNum(row.batchYear) : undefined,
    section: row.section || row.Section || "",
    shift: row.shift || row.Shift || "",
    status: row.status || row.Status || "Active",

    email: row.email || "",
    password: row.password || "",
    contact_no: row.contact_no || row.contact || "",
    address: row.address || "",
  };
}

export function groupUsers(rows) {
  const grouped = { admins: [], monitors: [], faculties: [], students: [] };

  rows.forEach((row) => {
    const u = normalizeRow(row);
    const t = u.userType;

    if (t === "admin" || t === "admins") grouped.admins.push(u);
    else if (t === "monitor" || t === "monitors") grouped.monitors.push(u);
    else if (t === "faculty" || t === "faculties") grouped.faculties.push(u);
    else grouped.students.push(u);
  });

  return grouped;
}

/**
 * Remove duplicates by registration_no
 * - existingRegNos: Set() of already-in-db registration numbers
 * - also removes duplicates inside the same CSV file
 */
export function removeDuplicatesGrouped(grouped, existingRegNos = new Set()) {
  const seen = new Set([...existingRegNos]);

  const filterUnique = (arr) =>
    arr.filter((u) => {
      const key = (u.registration_no || "").trim().toLowerCase();
      if (!key) return false;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  return {
    admins: filterUnique(grouped.admins || []),
    monitors: filterUnique(grouped.monitors || []),
    faculties: filterUnique(grouped.faculties || []),
    students: filterUnique(grouped.students || []),
  };
}
