import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC';
import { doctors } from '../../data/doctors';
import '../BookingConsultation/Consultation.css';

// "Instant Consultation" screen: search by speciality and consult right away.
function InstantConsultation() {
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
      <FindDoctorSearchIC onSearch={handleSearch} />
      {searched && (
        <>
          <h2 className="page-title" style={{ fontSize: '1.3rem' }}>
            {results.length} doctor{results.length === 1 ? '' : 's'} available{speciality ? ` for "${speciality}"` : ''}
          </h2>
          <p className="helper-text" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            Consult instantly with verified doctors, no appointment needed
          </p>
          <div className="doctor-list">
            {results.map((d) => <DoctorCardIC key={d.id} doctor={d} />)}
          </div>
        </>
      )}
    </div>
  );
}

export default InstantConsultation;
