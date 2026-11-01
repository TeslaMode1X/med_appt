import { useEffect, useState } from 'react';
import AppointmentFormIC from './AppointmentFormIC';
import { bookAppointment, cancelAppointment, getAppointmentsForDoctor, subscribeAppointments } from '../../appointments';

function initials(name) {
  return name.replace('Dr. ', '').split(' ').map((p) => p[0]).join('').slice(0, 2);
}

// Doctor card for Instant Consultation: book with just name + phone.
function DoctorCardIC({ doctor }) {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState(getAppointmentsForDoctor(doctor.name));

  useEffect(() => subscribeAppointments(() => setAppointments(getAppointmentsForDoctor(doctor.name))), [doctor.name]);

  const handleBooking = (details) => {
    bookAppointment({ ...details, doctorName: doctor.name, speciality: doctor.speciality, type: 'instant' });
    setShowModal(false);
  };

  return (
    <article className="card doctor-card">
      <div className="doctor-card__head">
        <div className="doctor-card__avatar" aria-hidden="true">{initials(doctor.name)}</div>
        <div>
          <h3 className="doctor-card__name">{doctor.name}</h3>
          <p className="doctor-card__meta">{doctor.speciality}</p>
          <p className="doctor-card__meta">{doctor.experience} years experience</p>
          <p className="doctor-card__meta doctor-card__ratings">Ratings: {'★'.repeat(Math.round(doctor.ratings))} {doctor.ratings}</p>
        </div>
      </div>
      <p className="doctor-card__meta">{doctor.profile}</p>

      {appointments.length > 0 && (
        <div className="appointment-summary booked-note">
          <strong>Appointment booked!</strong>
          {appointments.map((a) => (
            <div key={a.id}>
              <p><strong>Name:</strong> {a.name}</p>
              <p><strong>Phone Number:</strong> {a.phone}</p>
              <button type="button" className="btn btn-danger btn-sm" style={{ width: 'auto', marginTop: '0.4rem' }} onClick={() => cancelAppointment(a.id)}>
                Cancel Appointment
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="doctor-card__footer">
        <button type="button" className="btn" onClick={() => setShowModal(true)}>
          {appointments.length > 0 ? 'Book Another Consultation' : 'Consult Now'}
          <div style={{ fontSize: '0.8rem', fontWeight: 400 }}>No Booking Fee</div>
        </button>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="card modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Instant consultation">
            <div className="modal__head">
              <div className="doctor-card__head">
                <div className="doctor-card__avatar" aria-hidden="true">{initials(doctor.name)}</div>
                <div>
                  <h3 className="doctor-card__name">{doctor.name}</h3>
                  <p className="doctor-card__meta">{doctor.speciality}</p>
                  <p className="doctor-card__meta">{doctor.experience} years experience</p>
                </div>
              </div>
              <button type="button" className="modal__close" aria-label="Close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <AppointmentFormIC doctorName={doctor.name} doctorSpeciality={doctor.speciality} onSubmit={handleBooking} />
          </div>
        </div>
      )}
    </article>
  );
}

export default DoctorCardIC;
