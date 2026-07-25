// ---- Doctor token/slot scheduling helpers ---------------------------------
// Each doctor works a fixed set of days (alternate days, e.g. Mon/Wed/Fri)
// within a fixed time window (e.g. 6pm-9pm). This turns that window into a
// numbered list of tokens (slots) a patient can book, and gives the
// DatePicker a way to only allow the doctor's working days.

const DAY_NAME_TO_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const SLOT_LENGTH_MINUTES = 30;

// dayjs date -> is this date one of the doctor's working days?
export function isDoctorWorkingDay(doctor, date) {
  if (!doctor || !date) return false;
  const dayIndex = date.day();
  return doctor.schedule.some((d) => DAY_NAME_TO_INDEX[d] === dayIndex);
}

// disabledDate for antd DatePicker: block past days and any day that isn't
// one of the doctor's working days.
export function disabledDateForDoctor(doctor) {
  return (current) => {
    if (!current) return false;
    const isPast = current.endOf('day').isBefore(Date.now());
    return isPast || !isDoctorWorkingDay(doctor, current);
  };
}

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function minutesToLabel(mins) {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

// Build the full list of tokens for a doctor, independent of what's booked.
// Each token is a fixed 30-minute slot: { token: 1, time: '6:00 PM' }.
export function buildDoctorTokens(doctor) {
  if (!doctor?.startTime || !doctor?.endTime) return [];
  const start = toMinutes(doctor.startTime);
  const end = toMinutes(doctor.endTime);
  const tokens = [];
  let token = 1;
  for (let mins = start; mins < end; mins += SLOT_LENGTH_MINUTES) {
    tokens.push({ token, time: minutesToLabel(mins) });
    token += 1;
  }
  return tokens;
}

// Given the full token list and the appointments already booked for that
// doctor on that date, return tokens with an `isBooked` flag.
export function withAvailability(tokens, bookedAppointments) {
  const bookedTimes = new Set((bookedAppointments || []).map((a) => a.time));
  return tokens.map((t) => ({ ...t, isBooked: bookedTimes.has(t.time) }));
}

// Turns a 'YYYY-MM-DD' appointment date into a friendly label like
// "Today (Mon)", "Tomorrow (Tue)", or "Aug 3 (Mon)" for the profile page.
export function formatAppointmentDate(dateStr, dayjs) {
  if (!dateStr) return '';
  const date = dayjs(dateStr);
  const today = dayjs();
  const dayLabel = date.format('ddd');
  if (date.isSame(today, 'day')) return `Today (${dayLabel})`;
  if (date.isSame(today.add(1, 'day'), 'day')) return `Tomorrow (${dayLabel})`;
  return `${date.format('MMM D, YYYY')} (${dayLabel})`;
}

export function formatDoctorHours(doctor) {
  if (!doctor?.startTime || !doctor?.endTime) return '';
  return `${minutesToLabel(toMinutes(doctor.startTime))} – ${minutesToLabel(toMinutes(doctor.endTime))}`;
}
