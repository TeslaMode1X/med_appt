// Static doctor directory used by the search / booking screens.
export const doctors = [
  { id: 1, name: 'Dr. Jiao Yang', speciality: 'Dentist', experience: 9, ratings: 4.8, profile: 'DDS, Harvard School of Dental Medicine' },
  { id: 2, name: 'Dr. Denis Raj', speciality: 'Dentist', experience: 24, ratings: 4.6, profile: 'MDS, Prosthodontics' },
  { id: 3, name: 'Dr. Aisha Khan', speciality: 'Gynecologist/obstetrician', experience: 14, ratings: 4.9, profile: 'MD, Obstetrics & Gynaecology' },
  { id: 4, name: 'Dr. Mukesh Sharma', speciality: 'General Physician', experience: 18, ratings: 4.7, profile: 'MBBS, MD (Internal Medicine)' },
  { id: 5, name: 'Dr. Lena Fischer', speciality: 'Dermatologist', experience: 11, ratings: 4.5, profile: 'MD, Dermatology & Venereology' },
  { id: 6, name: 'Dr. Samuel Okafor', speciality: 'Ear-nose-throat (ent) Specialist', experience: 16, ratings: 4.6, profile: 'MS, Otorhinolaryngology' },
  { id: 7, name: 'Dr. Priya Nair', speciality: 'Homeopath', experience: 8, ratings: 4.3, profile: 'BHMS, MD (Homeopathy)' },
  { id: 8, name: 'Dr. Carlos Mendes', speciality: 'Ayurveda', experience: 20, ratings: 4.4, profile: 'BAMS, MD (Ayurveda)' },
  { id: 9, name: 'Dr. Emily Carter', speciality: 'Pediatrician', experience: 12, ratings: 4.9, profile: 'MD, Pediatrics' },
  { id: 10, name: 'Dr. Ravi Patel', speciality: 'Cardiologist', experience: 22, ratings: 4.8, profile: 'DM, Cardiology' },
];

export const specialities = [...new Set(doctors.map((d) => d.speciality))];
