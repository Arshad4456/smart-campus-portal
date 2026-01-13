// frontend/app/lib/usersApi.js
import { API_BASE, api, authFetch } from "./apiClient";

// Merge backend grouped payload into flat list
export function mergeUsers(payload) {
  return [
    ...(payload.admins?.map((u) => ({ ...u, userType: "admin" })) || []),
    ...(payload.monitors?.map((u) => ({ ...u, userType: "monitor" })) || []),
    ...(payload.faculties?.map((u) => ({ ...u, userType: "faculty" })) || []),
    ...(payload.students?.map((u) => ({ ...u, userType: "student" })) || []),
  ];
}

export async function fetchAllUsers({ signal } = {}) {
  const res = await authFetch(API_BASE, { signal });
  const json = await res.json();
  const payload = json?.data || json || {};
  return mergeUsers(payload);
}

export async function addSingleUser(userType, user) {
  const res = await authFetch(`${API_BASE}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userType, user: { ...user, userType } }),
  });

  return res.json();
}

export async function deleteUserApi(registration_no, userType) {
  const res = await authFetch(`${API_BASE}/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ registration_no, userType }),
  });

  return res.json();
}

export async function editUserApi(registration_no, userType, updatedData) {
  // remove immutable fields
  const payload = { ...updatedData };
  delete payload.registration_no;
  delete payload.userType;
  delete payload._id;

  // if password empty -> don't update
  if (!payload.password) delete payload.password;

  const res = await api.put(`${API_BASE}/edit`, {
    registration_no,
    userType,
    updatedData: payload,
  });

  return res.data;
}

export async function bulkAddGrouped(grouped) {
  const res = await authFetch(`${API_BASE}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(grouped),
  });

  return res.json();
}
