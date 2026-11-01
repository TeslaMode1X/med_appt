// Small helpers around sessionStorage so every component reads the
// logged-in user the same way. Keys mirror what the API returns.
const KEYS = ['auth-token', 'name', 'email', 'phone', 'role'];

export function saveSession({ authtoken, name, email, phone, role }) {
  sessionStorage.setItem('auth-token', authtoken);
  sessionStorage.setItem('name', name || '');
  sessionStorage.setItem('email', email || '');
  sessionStorage.setItem('phone', phone || '');
  sessionStorage.setItem('role', role || 'Patient');
  window.dispatchEvent(new Event('sessionchange'));
}

export function clearSession() {
  KEYS.forEach((k) => sessionStorage.removeItem(k));
  window.dispatchEvent(new Event('sessionchange'));
}

export function getSession() {
  const authtoken = sessionStorage.getItem('auth-token');
  if (!authtoken) return null;
  return {
    authtoken,
    name: sessionStorage.getItem('name') || '',
    email: sessionStorage.getItem('email') || '',
    phone: sessionStorage.getItem('phone') || '',
    role: sessionStorage.getItem('role') || 'Patient',
  };
}
