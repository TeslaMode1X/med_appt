import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Notification from './Components/Notification/Notification';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import ProfileCard from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';
import HealthBlog from './Components/HealthBlog';
import NotFound from './Components/NotFound';

// Vite injects the Pages sub-path ("/med_appt/") at build time.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

function App() {
  return (
    <BrowserRouter basename={basename}>
      {/* Notification wraps the whole app so the booked-appointment banner is
          visible on every page, not just the booking screens. */}
      <Notification>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/login" element={<Login />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/booking-consultation" element={<BookingConsultation />} />
            <Route path="/reviews" element={<ReviewForm />} />
            <Route path="/profile" element={<ProfileCard />} />
            <Route path="/reports" element={<ReportsLayout />} />
            <Route path="/health-blog" element={<HealthBlog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Notification>
    </BrowserRouter>
  );
}

export default App;
