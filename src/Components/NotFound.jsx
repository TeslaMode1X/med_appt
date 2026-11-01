import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
      <h1>404 - Page not found</h1>
      <p className="helper-text">The page you are looking for does not exist.</p>
      <Link className="btn" to="/">Back to Home</Link>
    </div>
  );
}
