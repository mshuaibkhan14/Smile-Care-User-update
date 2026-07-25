import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Tag, Skeleton, Empty, Divider, List, Alert } from 'antd';
import { IdcardOutlined, CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useGetAppointmentsForUserQuery, useUpdateUserMutation } from '../store/apiSlice';
import { setUser } from '../store/authSlice';
import { formatAppointmentDate } from '../utils/scheduling';
import '../styles/PageHero.css';
import './Profile.css';

export default function Profile() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const [updateUser, { isLoading: saving }] = useUpdateUserMutation();

  const { data: appointments, isLoading: apptsLoading } = useGetAppointmentsForUserQuery(user.id, {
    skip: !user,
  });

  const { upcoming, past } = useMemo(() => {
    const today = dayjs().startOf('day');
    const sorted = [...(appointments || [])].sort((a, b) => a.date.localeCompare(b.date));
    return {
      upcoming: sorted.filter((a) => dayjs(a.date).isSame(today, 'day') || dayjs(a.date).isAfter(today, 'day')),
      past: sorted.filter((a) => dayjs(a.date).isBefore(today, 'day')).reverse(),
    };
  }, [appointments]);

  const startEditing = () => {
    form.setFieldsValue({ name: user.name, email: user.email, phone: user.phone });
    setEditing(true);
  };

  const handleSave = async (values) => {
    const updated = await updateUser({ id: user.id, ...values }).unwrap();
    dispatch(setUser(updated));
    setEditing(false);
  };

  const renderAppointment = (a) => (
    <List.Item key={a.id} className="profile-appt">
      <div className="profile-appt__main">
        <span className="profile-appt__date">
          <CalendarOutlined /> {formatAppointmentDate(a.date, dayjs)}
        </span>
        <span>
          {a.doctorName} — {a.service}
        </span>
        <span className="profile-appt__token">
          <ClockCircleOutlined /> Token #{a.token} · {a.time}
        </span>
      </div>
      <Tag color={a.feePaid ? 'success' : 'warning'} icon={a.feePaid ? <CheckCircleOutlined /> : null}>
        {a.feePaid ? `Fees Paid — Rs. ${a.amount}` : 'Payment Pending'}
      </Tag>
    </List.Item>
  );

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">— My Account</span>
          <h1>
            Your <span className="text-accent">Profile</span>
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container profile-page">
          <div className="profile-card">
            <div className="profile-card__header">
              <h3>Basic Info</h3>
              <Tag icon={<IdcardOutlined />} color="processing">
                UID: {user.uid}
              </Tag>
            </div>

            {!editing ? (
              <>
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <Button onClick={startEditing}>Edit Info</Button>
              </>
            ) : (
              <Form layout="vertical" form={form} onFinish={handleSave}>
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Enter your name' }]}>
                  <Input size="large" />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}>
                  <Input size="large" />
                </Form.Item>
                <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Enter your phone number' }]}>
                  <Input size="large" />
                </Form.Item>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Button type="primary" htmlType="submit" loading={saving}>
                    Save
                  </Button>
                  <Button onClick={() => setEditing(false)}>Cancel</Button>
                </div>
              </Form>
            )}
          </div>

          <Divider />

          <h3>Advance Booking — Upcoming Appointments</h3>
          {apptsLoading && <Skeleton active paragraph={{ rows: 3 }} />}
          {!apptsLoading && upcoming.length === 0 && <Empty description="No upcoming appointments" />}
          {!apptsLoading && upcoming.length > 0 && <List dataSource={upcoming} renderItem={renderAppointment} />}

          <Divider />

          <h3>Visit History</h3>
          {apptsLoading && <Skeleton active paragraph={{ rows: 3 }} />}
          {!apptsLoading && past.length === 0 && <Empty description="No past visits yet" />}
          {!apptsLoading && past.length > 0 && <List dataSource={past} renderItem={renderAppointment} />}

          {!apptsLoading && (upcoming.length > 0 || past.length > 0) && (
            <Alert
              style={{ marginTop: 16 }}
              type="info"
              showIcon
              message="This list is just your booking record — SmileCare doesn't store your medical/treatment notes here."
            />
          )}
        </div>
      </section>
    </>
  );
}
