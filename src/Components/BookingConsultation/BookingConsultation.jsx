import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearch from './FindDoctorSearch';
import DoctorCard from './DoctorCard';
import { doctors } from '../../data/doctors';
import './Consultation.css';

// "Book an Appointment" screen: search by speciality, then book a dated slot.
function BookingConsultation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searched, setSearched] = useState(Boolean(searchParams.get('speciality')));
  const speciality = searchParams.get('speciality') || '';

  const handleSearch = (value) => {
    setSearched(true);
    setSearchParams(value ? { speciality: value } : {});
  };

  const results = speciality
    ? doctors.filter((d) => d.speciality.toLowerCase().includes(speciality.toLowerCase()))
    : doctors;

  return (
    <div className="container consult">
      <FindDoctorSearch onSearch={handleSearch} />
      {searched && (
        <>
          <h2 className="page-title" style={{ fontSize: '1.3rem' }}>
            {results.length} doctor{results.length === 1 ? '' : 's'} available{speciality ? ` for "${speciality}"` : ''}
          </h2>
          <p className="helper-text" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            Book appointments with minimum wait-time &amp; verified doctor details
          </p>
          <div className="doctor-list">
            {results.map((d) => <DoctorCard key={d.id} doctor={d} />)}
          </div>
        </>
      )}
    </div>
  );
}

export default BookingConsultation;
