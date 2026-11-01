import { useState } from 'react';
import GiveReviews from './GiveReviews';
import { doctors } from '../../data/doctors';
import '../BookingConsultation/Consultation.css';
import './ReviewForm.css';

function loadReviews() {
  try {
    return JSON.parse(localStorage.getItem('reviews')) || {};
  } catch {
    return {};
  }
}

// Reviews page: a table of past consultations. "Click Here" opens the
// GiveReviews form; once a review is given the button is disabled and the
// review text is shown in the last column.
function ReviewForm() {
  const [reviews, setReviews] = useState(loadReviews);
  const [active, setActive] = useState(null);

  const consulted = doctors.slice(0, 5);

  const handleSubmitted = (entry) => {
    const next = { ...reviews, [entry.doctorId]: entry };
    setReviews(next);
    localStorage.setItem('reviews', JSON.stringify(next));
  };

  return (
    <div className="container reviews">
      <h1 className="page-title">Reviews</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {consulted.map((d, i) => {
            const given = reviews[d.id];
            return (
              <tr key={d.id}>
                <td>{i + 1}</td>
                <td>{d.name}</td>
                <td>{d.speciality}</td>
                <td>
                  <button type="button" className="btn btn-sm" disabled={Boolean(given)} onClick={() => setActive(d)}>
                    {given ? 'Feedback given' : 'Click Here'}
                  </button>
                </td>
                <td className="review-given">
                  {given ? `${'★'.repeat(given.rating)} "${given.review}"` : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {active && (
        <div className="modal-backdrop" onClick={() => setActive(null)}>
          <div className="card modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Give your feedback">
            <div className="modal__head" style={{ justifyContent: 'flex-end', marginBottom: 0 }}>
              <button type="button" className="modal__close" aria-label="Close" onClick={() => setActive(null)}>&times;</button>
            </div>
            <GiveReviews doctor={active} onSubmitted={handleSubmitted} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
