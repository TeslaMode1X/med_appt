// Booked appointments live in localStorage so the Notification component
// (rendered once in App.jsx) can show them on every page.
const STORAGE_KEY = 'appointments';
const EVENT = 'appointmentschange';

export function getAppointments() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function persist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVENT));
}

export function bookAppointment(appointment) {
  const entry = { id: Date.now(), ...appointment };
  persist([...getAppointments(), entry]);
  return entry;
}

export function cancelAppointment(id) {
  persist(getAppointments().filter((a) => a.id !== id));
}

export function getAppointmentsForDoctor(doctorName) {
  return getAppointments().filter((a) => a.doctorName === doctorName);
}

export function subscribeAppointments(callback) {
  window.addEventListener(EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}
