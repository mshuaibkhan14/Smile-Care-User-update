import { Skeleton, Alert, Empty } from 'antd';
import { useGetDentistsQuery } from '../store/apiSlice';
import DoctorCard from '../components/DoctorCard';
import CtaBanner from '../components/CtaBanner';
import '../styles/PageHero.css';

export default function Doctors() {
  const { data: doctors, isLoading, isError } = useGetDentistsQuery();

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">— Our Team</span>
          <h1>
            Meet Our <span className="text-accent">Doctors</span>
          </h1>
          <p style={{ maxWidth: 560, margin: '0 auto' }}>
            Experienced specialists dedicated to giving you a comfortable, confident smile.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {isLoading && (
            <div className="doctors-grid">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton active avatar key={i} paragraph={{ rows: 3 }} />
              ))}
            </div>
          )}

          {isError && (
            <Alert
              type="warning"
              showIcon
              message="Couldn't load doctors"
              description="Make sure the mock API is running (npm run server) — see README."
            />
          )}

          {!isLoading && !isError && doctors?.length === 0 && (
            <Empty description="No doctors added yet" />
          )}

          {!isLoading && !isError && doctors?.length > 0 && (
            <div className="doctors-grid">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
