import { useSearchParams } from 'react-router-dom';
import FindDoctorSearch from './FindDoctorSearch';
import DoctorCard from './DoctorCard';
import { doctors } from '../../data/doctors';
import './Consultation.css';

// "Book an Appointment" screen: search by speciality, then book a dated slot.
function BookingConsultation() {
  // FindDoctorSearch navigates to ?speciality=<value>; the list below is
  // derived from that query string, so results survive reloads and sharing.
  const [searchParams] = useSearchParams();
  const searched = searchParams.has('speciality');
  const speciality = searchParams.get('speciality') || '';

  const results = speciality
    ? doctors.filter((d) => d.speciality.toLowerCase().includes(speciality.toLowerCase()))
    : doctors;

  return (
    <div className="container consult">
      <FindDoctorSearch />
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
