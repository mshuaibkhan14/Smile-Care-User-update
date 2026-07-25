import { useReducer, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Steps, Button, Radio, DatePicker, Form, Input, Skeleton, Alert, Empty, Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useGetServicesQuery, useGetDentistsQuery, useGetAppointmentsForDoctorDateQuery } from '../store/apiSlice';
import { disabledDateForDoctor, buildDoctorTokens, withAvailability, formatDoctorHours } from '../utils/scheduling';
import '../styles/PageHero.css';
import './BookAppointment.css';

// ---- useReducer wizard state ---------------------------------------------
// Mirrors the class's TodoWithUseReducer pattern: a single reducer with
// explicit action types instead of several useState calls, useful once a
// form has multiple interdependent fields across multiple steps.
function makeInitialState(user) {
  return {
    step: 0,
    serviceId: null,
    doctorId: null,
    date: null,
    token: null,
    time: null,
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    notes: '',
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SERVICE':
      return { ...state, serviceId: action.payload };
    case 'SET_DOCTOR':
      // Changing doctor invalidates any date/token already chosen, since
      // each doctor has their own working days and time window.
      return { ...state, doctorId: action.payload, date: null, token: null, time: null };
    case 'SET_DATE':
      // Changing date invalidates whatever token was picked for the old date.
      return { ...state, date: action.payload, token: null, time: null };
    case 'SET_TOKEN':
      return { ...state, ...action.payload };
    case 'SET_CONTACT':
      return { ...state, ...action.payload };
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, 3) };
    case 'PREV_STEP':
      return { ...state, step: Math.max(state.step - 1, 0) };
    default:
      return state;
  }
}

export default function BookAppointment() {
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);
  const [state, dispatch] = useReducer(reducer, user, makeInitialState);

  const { data: services, isLoading: servicesLoading } = useGetServicesQuery();
  const { data: doctors, isLoading: doctorsLoading } = useGetDentistsQuery();

  const selectedService = services?.find((s) => s.id === state.serviceId);
  const selectedDoctor = doctors?.find((d) => d.id === state.doctorId);

  // Only fetch the day's bookings once a doctor + date are both chosen.
  const { data: dayAppointments, isFetching: tokensLoading } = useGetAppointmentsForDoctorDateQuery(
    { doctorCode: state.doctorId, date: state.date },
    { skip: !state.doctorId || !state.date },
  );

  const tokens = useMemo(() => {
    if (!selectedDoctor || !state.date) return [];
    const allTokens = buildDoctorTokens(selectedDoctor);
    return withAvailability(allTokens, dayAppointments);
  }, [selectedDoctor, state.date, dayAppointments]);

  // useRef — focus the name field the moment the contact-info step mounts.
  const nameInputRef = useRef(null);
  useEffect(() => {
    if (state.step === 3) {
      nameInputRef.current?.focus();
    }
  }, [state.step]);

  const canProceed = {
    0: !!state.serviceId,
    1: !!state.doctorId,
    2: !!state.date && !!state.token,
    3: !!state.name && !!state.phone,
  };

  const goToPayment = () => {
    navigate('/payment', {
      state: {
        draft: {
          userId: user.id,
          service: selectedService?.title,
          fee: selectedService?.fee,
          doctorCode: selectedDoctor?.id,
          doctorName: selectedDoctor?.name,
          date: state.date,
          token: state.token,
          time: state.time,
          name: state.name,
          phone: state.phone,
          email: state.email,
          notes: state.notes,
        },
      },
    });
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">— Book an Appointment</span>
          <h1>
            Let's Get You <span className="text-accent">Scheduled</span>
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container booking-steps">
          <Steps
            current={state.step}
            style={{ marginBottom: 40 }}
            items={[{ title: 'Service' }, { title: 'Doctor' }, { title: 'Date & Token' }, { title: 'Your Details' }]}
          />

          {/* Step 0: choose service */}
          {state.step === 0 && (
            <>
              {servicesLoading && <Skeleton active paragraph={{ rows: 5 }} />}
              {!servicesLoading && (
                <Radio.Group
                  style={{ width: '100%' }}
                  value={state.serviceId}
                  onChange={(e) => dispatch({ type: 'SET_SERVICE', payload: e.target.value })}
                >
                  {services.map((s) => (
                    <Radio.Button
                      key={s.id}
                      value={s.id}
                      style={{ display: 'block', height: 'auto', padding: '14px 16px', marginBottom: 12, width: '100%' }}
                    >
                      <strong>{s.title}</strong> — <span style={{ color: 'var(--color-text-secondary)' }}>{s.shortDesc}</span>
                      <span style={{ float: 'right', color: 'var(--color-primary)' }}>Rs. {s.fee}</span>
                    </Radio.Button>
                  ))}
                </Radio.Group>
              )}
            </>
          )}

          {/* Step 1: choose doctor */}
          {state.step === 1 && (
            <>
              {doctorsLoading && <Skeleton active paragraph={{ rows: 5 }} />}
              {!doctorsLoading && (
                <Radio.Group
                  style={{ width: '100%' }}
                  value={state.doctorId}
                  onChange={(e) => dispatch({ type: 'SET_DOCTOR', payload: e.target.value })}
                >
                  {doctors.map((d) => (
                    <Radio.Button
                      key={d.id}
                      value={d.id}
                      style={{ display: 'block', height: 'auto', padding: '14px 16px', marginBottom: 12, width: '100%' }}
                    >
                      <strong>{d.name}</strong> — <span style={{ color: 'var(--color-text-secondary)' }}>{d.specialization}</span>
                      <div style={{ marginTop: 6 }}>
                        {d.schedule.map((day) => (
                          <Tag key={day} style={{ marginBottom: 4 }}>
                            {day}
                          </Tag>
                        ))}
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: 13 }}>
                          {formatDoctorHours(d)}
                        </span>
                      </div>
                    </Radio.Button>
                  ))}
                </Radio.Group>
              )}
            </>
          )}

          {/* Step 2: date + token */}
          {state.step === 2 && selectedDoctor && (
            <Form layout="vertical">
              <Form.Item
                label={`Appointment Date (${selectedDoctor.name} works ${selectedDoctor.schedule.join(', ')})`}
                required
              >
                <DatePicker
                  size="large"
                  style={{ width: '100%' }}
                  disabledDate={disabledDateForDoctor(selectedDoctor)}
                  onChange={(_, dateStr) => dispatch({ type: 'SET_DATE', payload: dateStr || null })}
                />
              </Form.Item>

              {state.date && (
                <Form.Item label={`Available Tokens — ${formatDoctorHours(selectedDoctor)} (30 min each)`} required>
                  {tokensLoading && <Skeleton active paragraph={{ rows: 2 }} />}
                  {!tokensLoading && tokens.length === 0 && <Empty description="No tokens for this doctor" />}
                  {!tokensLoading && tokens.length > 0 && (
                    <div className="token-grid">
                      {tokens.map((t) => (
                        <Button
                          key={t.token}
                          disabled={t.isBooked}
                          type={state.token === t.token ? 'primary' : 'default'}
                          className="token-btn"
                          icon={<ClockCircleOutlined />}
                          onClick={() =>
                            dispatch({ type: 'SET_TOKEN', payload: { token: t.token, time: t.time } })
                          }
                        >
                          #{t.token} · {t.time}
                          {t.isBooked && <span className="token-btn__booked"> (Booked)</span>}
                        </Button>
                      ))}
                    </div>
                  )}
                </Form.Item>
              )}
            </Form>
          )}

          {/* Step 3: contact info */}
          {state.step === 3 && (
            <Form layout="vertical">
              <Form.Item label="Full Name" required>
                <Input
                  ref={nameInputRef}
                  size="large"
                  value={state.name}
                  onChange={(e) => dispatch({ type: 'SET_CONTACT', payload: { name: e.target.value } })}
                  placeholder="Your name"
                />
              </Form.Item>
              <Form.Item label="Phone" required>
                <Input
                  size="large"
                  value={state.phone}
                  onChange={(e) => dispatch({ type: 'SET_CONTACT', payload: { phone: e.target.value } })}
                  placeholder="03xx-xxxxxxx"
                />
              </Form.Item>
              <Form.Item label="Email (optional)">
                <Input
                  size="large"
                  value={state.email}
                  onChange={(e) => dispatch({ type: 'SET_CONTACT', payload: { email: e.target.value } })}
                  placeholder="you@example.com"
                />
              </Form.Item>
              <Form.Item label="Notes (optional)">
                <Input.TextArea
                  rows={3}
                  value={state.notes}
                  onChange={(e) => dispatch({ type: 'SET_CONTACT', payload: { notes: e.target.value } })}
                  placeholder="Anything we should know before your visit?"
                />
              </Form.Item>
            </Form>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
            <Button disabled={state.step === 0} onClick={() => dispatch({ type: 'PREV_STEP' })}>
              Back
            </Button>

            {state.step < 3 && (
              <Button
                type="primary"
                disabled={!canProceed[state.step]}
                onClick={() => dispatch({ type: 'NEXT_STEP' })}
              >
                Continue
              </Button>
            )}

            {state.step === 3 && (
              <Button type="primary" disabled={!canProceed[3]} onClick={goToPayment}>
                Continue to Payment — Rs. {selectedService?.fee}
              </Button>
            )}
          </div>

          {state.step === 3 && !servicesLoading && (
            <Alert
              style={{ marginTop: 24 }}
              type="info"
              showIcon
              message={`Booking: ${selectedService?.title} with ${selectedDoctor?.name} — Token #${state.token} on ${state.date} at ${state.time}`}
            />
          )}
        </div>
      </section>
    </>
  );
}
