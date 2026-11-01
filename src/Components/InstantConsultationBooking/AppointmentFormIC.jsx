import { useState } from 'react';

// Instant consultation form: the doctor is available right now, so the
// patient only needs to give a Name and a Phone Number (no date / time).
function AppointmentFormIC({ doctorName, doctorSpeciality, onSubmit }) {
  const [name, setName] = useState(sessionStorage.getItem('name') || '');
  const [phone, setPhone] = useState(sessionStorage.getItem('phone') || '');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!/^\d{10}$/.test(phone)) next.phone = 'Phone number must be 10 digits';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name: name.trim(), phone });
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit} noValidate>
      <p className="helper-text">{doctorName} &middot; {doctorSpeciality}</p>

      <div className="form-group">
        <label htmlFor="ic-name">Name</label>
        <input id="ic-name" type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        {errors.name && <div className="error-text">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="ic-phone">Phone Number</label>
        <input id="ic-phone" type="tel" className="form-control" value={phone} maxLength={10} onChange={(e) => setPhone(e.target.value)} required />
        {errors.phone && <div className="error-text">{errors.phone}</div>}
      </div>

      <button type="submit" className="btn">Book Now</button>
    </form>
  );
}

export default AppointmentFormIC;
