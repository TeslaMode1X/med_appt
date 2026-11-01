import { doctors } from '../../data/doctors';

const REPORT_URL = `${import.meta.env.BASE_URL}patient_report.pdf`;

// Lists the patient's reports; each row can be viewed in a new tab or downloaded.
function ReportsLayout() {
  const reports = doctors.slice(0, 3);
  return (
    <div className="container" style={{ padding: '1rem 0 3rem' }}>
      <h1 className="page-title">Reports</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((d, i) => (
            <tr key={d.id}>
              <td>{i + 1}</td>
              <td>{d.name}</td>
              <td>{d.speciality}</td>
              <td><a className="btn btn-sm" href={REPORT_URL} target="_blank" rel="noreferrer">View Report</a></td>
              <td><a className="btn btn-outline btn-sm" href={REPORT_URL} download="patient_report.pdf">Download Report</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportsLayout;
