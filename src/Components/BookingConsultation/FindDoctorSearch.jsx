import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { specialities } from '../../data/doctors';

// Search box with a suggestions dropdown. Typing filters the list of
// specialities; picking one (or submitting the form) navigates to the search
// results route (e.g. /booking-consultation?speciality=Dentist), where the
// Booking Consultation screen reads the query string and lists matching doctors.
function FindDoctorSearch({ resultsPath = '/booking-consultation', placeholder = 'Search doctors, clinics, hospitals, etc.' }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const matches = specialities.filter((s) =>
    s.toLowerCase().includes(query.trim().toLowerCase())
  );

  const goToResults = (speciality) => {
    setOpen(false);
    navigate(`${resultsPath}?speciality=${encodeURIComponent(speciality)}`);
  };

  const choose = (speciality) => {
    setQuery(speciality);
    goToResults(speciality);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goToResults(query.trim());
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
