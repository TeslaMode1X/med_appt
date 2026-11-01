import { Link } from 'react-router-dom';
import './Landing_Page.css';

const services = [
  { icon: '⚡', title: 'Instant Consultation', text: 'Talk to an available doctor right now, no appointment needed.', to: '/instant-consultation' },
  { icon: '📅', title: 'Book an Appointment', text: 'Pick a doctor, a date and a time slot that suits you.', to: '/booking-consultation' },
  { icon: '🩺', title: 'Self Checkup', text: 'Answer a few questions and get guidance on what to do next.', to: '/health-blog' },
  { icon: '💡', title: 'Health Tips & Guidance', text: 'Articles and advice from medical professionals, updated weekly.', to: '/health-blog' },
];

function Landing_Page() {
  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <h1>
              Your Health <br /> <span>Our Responsibility</span>
            </h1>
            <p>
              StayHealthy brings qualified doctors to patients in remote and underserved
              areas. Consult online anytime, from anywhere, and keep every report in one place.
            </p>
            <div className="hero__actions">
              <Link to="/instant-consultation" className="btn">Get Started</Link>
              <Link to="/booking-consultation" className="btn btn-outline">Book an Appointment</Link>
            </div>
          </div>
          <div className="hero__art" aria-hidden="true">
            <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="160" r="140" fill="#e3f3f5" />
              <rect x="110" y="90" width="180" height="150" rx="16" fill="#fff" stroke="#1b7f8d" strokeWidth="4" />
              <path d="M130 165 h35 l15 -35 l25 70 l20 -50 l10 15 h45" fill="none" stroke="#f29b38" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="185" y="240" width="30" height="20" fill="#1b7f8d" />
              <rect x="150" y="260" width="100" height="10" rx="5" fill="#1b7f8d" />
              <circle cx="320" cy="80" r="28" fill="#1b7f8d" />
              <rect x="316" y="66" width="8" height="28" fill="#fff" />
              <rect x="306" y="76" width="28" height="8" fill="#fff" />
            </svg>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <h2>How can we help you today?</h2>
          <div className="services__grid">
            {services.map((s) => (
              <Link key={s.title} to={s.to} className="card service">
                <div className="service__icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        &copy; {new Date().getFullYear()} StayHealthy &middot; A non-profit Go Digital initiative
      </footer>
    </>
  );
}

export default Landing_Page;
