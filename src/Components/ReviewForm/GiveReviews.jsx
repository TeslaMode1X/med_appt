import { useState } from 'react';

// Feedback form for one consultation. After the first successful submission
// the inputs and the submit button are disabled and the review is shown, so a
// patient cannot submit a second review for the same doctor.
function GiveReviews({ doctor, onSubmitted }) {
  const [name, setName] = useState(sessionStorage.getItem('name') || '');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  // reviewData stays null until the form is submitted; once set, the form is
  // disabled and the saved review is rendered instead of the empty state.
  const [reviewData, setReviewData] = useState(null);
  const submitted = reviewData !== null;

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
    // Save the submitted review in state and hand it to the parent list.
    const data = { doctorId: doctor.id, name: name.trim(), review: review.trim(), rating };
    setReviewData(data);
    onSubmitted(data);
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
      {reviewData ? (
        <div className="success-text">
          Thank you, {reviewData.name}! Your {reviewData.rating}-star review has been recorded.
        </div>
      ) : (
        <p className="helper-text" style={{ marginTop: '0.75rem' }}>Your feedback helps other patients choose a doctor.</p>
      )}
    </form>
  );
}

export default GiveReviews;
