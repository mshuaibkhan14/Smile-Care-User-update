// ---- Mock auth helpers -----------------------------------------------------
// There's no real backend/auth server here — users are stored as plain
// records in localStorage and fields are compared client-side. That's fine
// for a course project mock, but plaintext passwords and no real sessions
// mean this must NOT be reused as-is against a real production backend.

const STORAGE_KEY = 'smilecare_auth_user';

export function saveLoggedInUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function loadLoggedInUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearLoggedInUser() {
  localStorage.removeItem(STORAGE_KEY);
}

// Patient-facing unique ID, e.g. "SM123456" — shown on the profile page,
// not editable once the account is created.
export function generatePatientUid() {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `SM${digits}`;
}
