import { useState } from 'react';
import { specialities } from '../../data/doctors';

// Search box with a suggestions dropdown. Typing filters the list of
// specialities; picking one (or submitting the form) reports it to the parent
// Booking Consultation screen, which then lists the matching doctors.
function FindDoctorSearch({ onSearch, placeholder = 'Search doctors, clinics, hospitals, etc.' }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const matches = specialities.filter((s) =>
    s.toLowerCase().includes(query.trim().toLowerCase())
  );

  const choose = (speciality) => {
    setQuery(speciality);
    setOpen(false);
    onSearch(speciality);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    onSearch(query.trim());
  };

  return (
    <form className="search" onSubmit={handleSubmit} role="search">
      <h2 className="page-title">Find a doctor and consult instantly</h2>
      <div className="search__box">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          aria-label="Search by speciality"
        />
        <button type="submit" className="btn">Search</button>
      </div>
      {open && matches.length > 0 && (
        <ul className="search__results" role="listbox">
          {matches.map((s) => (
            <li key={s} role="option" aria-selected={s === query} onMouseDown={() => choose(s)}>
              {s} <span>SPECIALITY</span>
            </li>
          ))}
        </ul>
      )}
      <p className="search__hint">Try "Dentist", "Cardiologist" or "General Physician".</p>
    </form>
  );
}

export default FindDoctorSearch;
