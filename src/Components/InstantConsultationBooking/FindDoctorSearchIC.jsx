import FindDoctorSearch from '../BookingConsultation/FindDoctorSearch';

// The instant-consultation search reuses the same search box, but navigates
// to the instant-consultation results route instead of the booking one.
function FindDoctorSearchIC() {
  return (
    <FindDoctorSearch
      resultsPath="/instant-consultation"
      placeholder="Search by speciality for an instant consultation"
    />
  );
}

export default FindDoctorSearchIC;
