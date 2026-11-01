import { useState } from 'react';

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

// Booking form used by the "Book an Appointment" flow: the patient picks a
// name, phone number, date and a time slot for a scheduled visit.
function AppointmentForm({ doctorName, doctorSpeciality, onSubmit }) {
  const [name, setName] = useState(sessionStorage.getItem('name') || '');
  const [phone, setPhone] = useState(sessionStorage.getItem('phone') || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!/^\d{10}$/.test(phone)) next.phone = 'Phone number must be 10 digits';
    if (!date) next.date = 'Please choose a date';
    else if (date < today) next.date = 'Date cannot be in the past';
    if (!time) next.time = 'Please choose a time slot';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name: name.trim(), phone, date, time });
    setDate('');
    setTime('');
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit} noValidate>
      <p className="helper-text">{doctorName} &middot; {doctorSpeciality}</p>

      <div className="form-group">
        <label htmlFor="af-name">Name</label>
        <input id="af-name" type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        {errors.name && <div className="error-text">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="af-phone">Phone Number</label>
        <input id="af-phone" type="tel" className="form-control" value={phone} maxLength={10} onChange={(e) => setPhone(e.target.value)} required />
        {errors.phone && <div className="error-text">{errors.phone}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="af-date">Date of Appointment</label>
        <input id="af-date" type="date" className="form-control" value={date} min={today} onChange={(e) => setDate(e.target.value)} required />
        {errors.date && <div className="error-text">{errors.date}</div>}
      </div>

      <div className="form-group">
        <label>Book Time Slot</label>
        <div className="slot-grid" role="radiogroup" aria-label="Time slot">
          {TIME_SLOTS.map((slot) => (
            <button
              type="button"
              key={slot}
              role="radio"
              aria-checked={time === slot}
              className={`slot ${time === slot ? 'selected' : ''}`}
              onClick={() => setTime(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
        {errors.time && <div className="error-text">{errors.time}</div>}
      </div>

      <button type="submit" className="btn">Book Now</button>
    </form>
  );
}

export default AppointmentForm;
