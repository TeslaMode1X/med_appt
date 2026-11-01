import { useState } from 'react';

// Feedback form for one consultation. After the first successful submission
// the inputs and the submit button are disabled and the review is shown, so a
// patient cannot submit a second review for the same doctor.
function GiveReviews({ doctor, onSubmitted }) {
  const [name, setName] = useState(sessionStorage.getItem('name') || '');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!review.trim()) next.review = 'Please write your review';
    if (rating === 0) next.rating = 'Please select a rating';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitted || !validate()) return;
    setSubmitted(true);
    onSubmitted({ doctorId: doctor.id, name: name.trim(), review: review.trim(), rating });
  };

  return (
    <form className="review-form" onSubmit={handleSubmit} noValidate>
      <h3>Give Your Feedback</h3>
      <p className="helper-text">{doctor.name} &middot; {doctor.speciality}</p>

      <div className="form-group">
        <label htmlFor="rv-name">Name</label>
        <input id="rv-name" type="text" className="form-control" value={name} disabled={submitted}
          onChange={(e) => setName(e.target.value)} required />
        {errors.name && <div className="error-text">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="rv-review">Review</label>
        <textarea id="rv-review" className="form-control" rows={4} value={review} disabled={submitted}
          placeholder="How was your consultation?" onChange={(e) => setReview(e.target.value)} required />
        {errors.review && <div className="error-text">{errors.review}</div>}
      </div>

      <div className="form-group">
        <label>Rating</label>
        <div className="stars" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button type="button" key={n} role="radio" aria-checked={rating === n} aria-label={`${n} star${n > 1 ? 's' : ''}`}
              className={`star ${n <= rating ? 'on' : ''}`} disabled={submitted} onClick={() => setRating(n)}>
              {'★'}
            </button>
          ))}
        </div>
        {errors.rating && <div className="error-text">{errors.rating}</div>}
      </div>

      <button type="submit" className="btn" disabled={submitted}>
        {submitted ? 'Review Submitted' : 'Submit'}
      </button>
      {submitted && <div className="success-text">Thank you! Your feedback has been recorded.</div>}
    </form>
  );
}

export default GiveReviews;
