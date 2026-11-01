import { useEffect, useState } from 'react';
import AppointmentForm from './AppointmentForm';
import { bookAppointment, cancelAppointment, getAppointmentsForDoctor, subscribeAppointments } from '../../appointments';

function initials(name) {
  return name.replace('Dr. ', '').split(' ').map((p) => p[0]).join('').slice(0, 2);
}

// Doctor card for the Booking Consultation flow. Opens a modal with the
// AppointmentForm; once booked, the card shows the appointment and lets the
// patient cancel it, which also removes it from the Notification banner.
function DoctorCard({ doctor }) {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState(getAppointmentsForDoctor(doctor.name));

  useEffect(() => subscribeAppointments(() => setAppointments(getAppointmentsForDoctor(doctor.name))), [doctor.name]);

  const handleBooking = (details) => {
    bookAppointment({
      ...details,
      doctorName: doctor.name,
      speciality: doctor.speciality,
      type: 'booking',
    });
    setShowModal(false);
  };

  // Cancel appointment logic: remove the appointment from storage, which
  // updates this card and the app-wide Notification.
  const handleCancel = (id) => {
    cancelAppointment(id);
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
              <p><strong>Date:</strong> {a.date}</p>
              <p><strong>Time Slot:</strong> {a.time}</p>
              <button type="button" className="btn btn-danger btn-sm" style={{ width: 'auto', marginTop: '0.4rem' }} onClick={() => handleCancel(a.id)}>
                Cancel Appointment
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="doctor-card__footer">
        <button type="button" className="btn" onClick={() => setShowModal(true)}>
          {appointments.length > 0 ? 'Book Another Appointment' : 'Book Appointment'}
          <div style={{ fontSize: '0.8rem', fontWeight: 400 }}>No Booking Fee</div>
        </button>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="card modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Book an appointment">
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
            <AppointmentForm doctorName={doctor.name} doctorSpeciality={doctor.speciality} onSubmit={handleBooking} />
          </div>
        </div>
      )}
    </article>
  );
}

export default DoctorCard;
