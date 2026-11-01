import { useEffect, useState } from 'react';
import { getAppointments, subscribeAppointments } from '../../appointments';
import { getSession } from '../../session';
import './Notification.css';

// Renders its children untouched and, when the logged-in user has booked
// appointments, floats an "Appointment Details" card above every page.
function Notification({ children }) {
  const [appointments, setAppointments] = useState(getAppointments());
  const [user, setUser] = useState(getSession());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setAppointments(getAppointments());
      setDismissed(false);
    };
    const syncUser = () => setUser(getSession());
    const unsubscribe = subscribeAppointments(refresh);
    window.addEventListener('sessionchange', syncUser);
    return () => {
      unsubscribe();
      window.removeEventListener('sessionchange', syncUser);
    };
  }, []);

  const visible = user && appointments.length > 0 && !dismissed;

  return (
    <>
      {children}
      {visible && (
        <aside className="card notification" role="status" aria-live="polite">
          <h3>
            Appointment Details
            <button type="button" className="notification__close" aria-label="Dismiss" onClick={() => setDismissed(true)}>&times;</button>
          </h3>
          {appointments.map((a) => (
            <div key={a.id} className="notification__item">
              <p><strong>Doctor:</strong> {a.doctorName}</p>
              <p><strong>Speciality:</strong> {a.speciality}</p>
              <p><strong>Name:</strong> {a.name}</p>
              <p><strong>Phone Number:</strong> {a.phone}</p>
              {a.date && <p><strong>Date of Appointment:</strong> {a.date}</p>}
              {a.time && <p><strong>Time Slot:</strong> {a.time}</p>}
            </div>
          ))}
        </aside>
      )}
    </>
  );
}

export default Notification;
