// ---- Client-side data store (replaces json-server entirely) ---------------
// Services/dentists/testimonials are read-only, so they're just hardcoded
// arrays (see services.js, dentists.js, testimonials.js). Users and
// appointments are created at runtime (signup, booking), so they need
// *some* persistence — localStorage stands in for a database. This means
// data lives only in one browser and resets if the person clears site data,
// but it needs zero backend/server to run or deploy.

const USERS_KEY = 'smilecare_users';
const APPOINTMENTS_KEY = 'smilecare_appointments';

function readList(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

// Simple unique id — good enough for a client-only mock store (no server
// coordinating ids across clients).
export function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export const getUsers = () => readList(USERS_KEY);
export const saveUsers = (list) => writeList(USERS_KEY, list);

export const getAppointments = () => readList(APPOINTMENTS_KEY);
export const saveAppointments = (list) => writeList(APPOINTMENTS_KEY, list);
