const posts = [
  { title: 'Five habits that keep your heart healthy', text: 'Walk 30 minutes a day, cut back on salt, sleep seven hours, manage stress and schedule a yearly check-up.' },
  { title: 'When to see a doctor about a persistent cough', text: 'A cough lasting more than three weeks, fever, or shortness of breath deserves a consultation. Book one instantly on StayHealthy.' },
  { title: 'Staying hydrated in remote areas', text: 'Boil or filter water before drinking, and watch for signs of dehydration such as dizziness and dark urine.' },
];

export default function HealthBlog() {
  return (
    <div className="container" style={{ padding: '1rem 0 3rem' }}>
      <h1 className="page-title">Health Tips &amp; Guidance</h1>
      <div className="doctor-list" style={{ display: 'grid', gap: '1.25rem' }}>
        {posts.map((p) => (
          <article key={p.title} className="card">
            <h3 style={{ color: 'var(--primary-dark)' }}>{p.title}</h3>
            <p className="helper-text">{p.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
