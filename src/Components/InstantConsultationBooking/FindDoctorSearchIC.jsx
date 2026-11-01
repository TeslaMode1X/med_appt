import FindDoctorSearch from '../BookingConsultation/FindDoctorSearch';

// The instant-consultation search reuses the same search box; only the
// placeholder differs. Kept as its own file so the flow is self-contained.
function FindDoctorSearchIC({ onSearch }) {
  return <FindDoctorSearch onSearch={onSearch} placeholder="Search by speciality for an instant consultation" />;
}

export default FindDoctorSearchIC;
