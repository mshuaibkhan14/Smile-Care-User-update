import { memo } from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import './DoctorCard.css';

const dayLabels = { Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri', Sat: 'Sat', Sun: 'Sun' };

// React.memo — same render-optimization pattern as ServiceCard, useful once
// this grid is driven by real (larger) data from the teammate's admin panel.
function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">
      <div className="doctor-card__photo">
        <img src={doctor.photo} alt={doctor.name} loading="lazy" />
      </div>
      <div className="doctor-card__body">
        <h4>{doctor.name}</h4>
        <p className="doctor-card__specialization">{doctor.specialization}</p>
        <p className="doctor-card__experience">{doctor.experience}</p>

        <div className="doctor-card__schedule">
          <CalendarOutlined />
          {doctor.schedule.map((day) => (
            <span className="doctor-card__day" key={day}>
              {dayLabels[day] || day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(DoctorCard);
