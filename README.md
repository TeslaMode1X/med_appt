# Medical Appointment Booking (StayHealthy)

**Project name:** Medical Appointment Booking - front-end of **StayHealthy**, a (fictitious) non-profit healthcare platform whose *Go Digital* initiative connects patients in remote and underserved areas with doctors anytime, from anywhere.

Built for the IBM *Front-End Developer* capstone with **React 18**, **React Router 6** and **Vite**, plus a small **Express** authentication API.

- Live site: https://teslamode1x.github.io/med_appt/
- Repository: https://github.com/TeslaMode1X/med_appt

## Features

| Area | What it does |
| --- | --- |
| Navigation bar | Home, Appointments (Instant Consultation / Book an Appointment), Health Blog, Reviews, Sign Up, Login. After login it greets the user, offers *Your Profile* / *Your Reports* and a **Logout** button. Collapses to a burger menu on phones. |
| Sign Up | Role, Name, Phone, Email and Password with validation. Calls `POST /api/auth/register`, stores the returned token in `sessionStorage`. |
| Login | Email and Password with validation. Calls `POST /api/auth/login`. |
| Instant Consultation | Search doctors by speciality (suggestions dropdown), doctor cards, **AppointmentFormIC** with only Name and Phone Number. |
| Book an Appointment | Same search, **AppointmentForm** with Name, Phone Number, Date and Time slot, and **Cancel Appointment** on the doctor card. |
| Notification | Rendered once in `App.jsx`, so the *Appointment Details* card is visible on every page while an appointment is booked. |
| Reviews | Table of consultations; **GiveReviews** form (name, review, star rating) that is disabled after submission. |
| Profile | **ProfileCard** shows the user's details with an inline edit form backed by `GET`/`PUT /api/auth/user`. |
| Reports | Table of reports with *View Report* and *Download Report* links to `patient_report.pdf`. |
| SEO | Title, description, keywords, canonical, Open Graph and Twitter meta tags in `index.html`. |

## Setup

Requires Node.js 18 or newer.

```bash
git clone https://github.com/TeslaMode1X/med_appt.git
cd med_appt
npm install            # front-end dependencies
npm --prefix server install   # API dependencies
```

Run the API and the front-end in two terminals:

```bash
npm run server         # StayHealthy API on http://localhost:8181
npm run dev            # Vite dev server, usually http://localhost:5173/med_appt/
```

The front-end reads the API base URL from `src/config.js` (`VITE_API_URL`, default `http://localhost:8181`).
Users are stored in `server/data/users.json`, so no database is needed.

### Production build and deployment

```bash
npm run build          # outputs to server/build/ (output saved in the `build` file)
npm run preview        # serve the production build locally
```

The site is deployed to GitHub Pages from the `gh-pages` branch, which contains the `server/build/` folder.
`vite.config.js` sets `base: '/med_appt/'` so assets resolve under the Pages sub-path, and
`404.html` is a copy of `index.html` so deep links work with React Router.

## API

| Method | Endpoint | Body / headers | Response |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | `{ name, email, password, phone, role }` | `{ authtoken, id, name, email, phone, role }` |
| POST | `/api/auth/login` | `{ email, password }` | `{ authtoken, id, name, email, phone, role }` |
| GET | `/api/auth/user` | `Authorization: Bearer <token>` | user details |
| PUT | `/api/auth/user` | `Authorization`, `{ name, phone }` | updated user |

Sample calls and their output are in the `register` and `login` files.

## Project structure

```
med_appt/
├── index.html                 # entry page with SEO meta tags
├── public/patient_report.pdf  # sample patient report served by Reports
├── server/index.js            # Express authentication API (also serves server/build)
├── server/build/              # production build (npm run build)
├── screenshots/               # design and feature screenshots (PNG)
├── build                      # terminal output of the production build
├── register, login            # cURL commands + output for the auth API
└── src/
    ├── App.jsx                # Router + app-wide Notification
    ├── config.js              # API_URL
    ├── session.js             # sessionStorage helpers
    ├── appointments.js        # localStorage store shared by booking + Notification
    ├── data/doctors.js
    └── Components/
        ├── Navbar/Navbar.jsx
        ├── Landing_Page/Landing_Page.jsx
        ├── Sign_Up/Sign_Up.jsx
        ├── Login/Login.jsx
        ├── Notification/Notification.jsx
        ├── InstantConsultationBooking/  InstantConsultation, FindDoctorSearchIC, DoctorCardIC, AppointmentFormIC
        ├── BookingConsultation/         BookingConsultation, FindDoctorSearch, DoctorCard, AppointmentForm
        ├── ReviewForm/                  ReviewForm, GiveReviews
        ├── ProfileCard/ProfileCard.jsx
        └── ReportsLayout/ReportsLayout.jsx
```

## Rubric guide

| Task | Where to look |
| --- | --- |
| Navigation bar design | `screenshots/navbar_design.png`, `src/Components/Navbar/Navbar.jsx` |
| Sign-up form design | `screenshots/signup_form_design.png`, `src/Components/Sign_Up/Sign_Up.jsx` |
| Login form design | `screenshots/login_form_design.png`, `src/Components/Login/Login.jsx` |
| Registration / login API calls | `Sign_Up.jsx`, `Login.jsx` (`fetch` to `API_URL`) |
| Logout | `Navbar.jsx` (`handleLogout`) |
| Doctor search | `src/Components/BookingConsultation/FindDoctorSearch.jsx` (navigates to `/booking-consultation?speciality=...`) |
| App-wide notification | `src/App.jsx` wraps routes in `<Notification>` |
| Instant form (name + phone only) | `src/Components/InstantConsultationBooking/AppointmentFormIC.jsx` |
| Reviews form + disabling | `src/Components/ReviewForm/GiveReviews.jsx` |
| Profile card + edit form | `src/Components/ProfileCard/ProfileCard.jsx` |
| Production build output | `build` |
| SEO meta tags | `index.html` |
| Landing page | `screenshots/launch.png` |
| cURL register / login | `register`, `login` |
| Booking form (name, phone, date, time) | `src/Components/BookingConsultation/AppointmentForm.jsx` |
| Cancel appointment | `src/Components/BookingConsultation/DoctorCard.jsx` |
| Patient report | `public/patient_report.pdf` |
| Screenshots folder | `screenshots/` |
