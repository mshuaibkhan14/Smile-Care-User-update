import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Result, Descriptions, Alert } from 'antd';
import { CheckCircleFilled, CreditCardOutlined, LockOutlined } from '@ant-design/icons';
import { useCreateAppointmentMutation } from '../store/apiSlice';
import '../styles/PageHero.css';
import './Payment.css';

// Mock payment gateway — no real card processing happens here. It just
// simulates a short "processing" delay before creating the appointment
// record with feePaid: true, standing in for a real payment provider
// webhook confirming the charge.
export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const draft = state?.draft;
  const [form] = Form.useForm();
  const [createAppointment, { isLoading: submitting, isSuccess, data: created }] = useCreateAppointmentMutation();
  const [processing, setProcessing] = useState(false);

  if (!draft) {
    return (
      <div className="container section">
        <Result
          status="warning"
          title="No booking to pay for"
          subTitle="Start a new booking from the Book Appointment page."
          extra={
            <Button type="primary" onClick={() => navigate('/book-appointment')}>
              Book an Appointment
            </Button>
          }
        />
      </div>
    );
  }

  const handlePay = async () => {
    setProcessing(true);
    // Simulated gateway processing delay.
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setProcessing(false);
    await createAppointment({
      ...draft,
      feePaid: true,
      amount: draft.fee,
      paidAt: new Date().toISOString(),
    }).unwrap();
  };

  if (isSuccess) {
    return (
      <div className="container section">
        <Result
          icon={<CheckCircleFilled style={{ color: 'var(--color-primary)' }} />}
          status="success"
          title="Payment Successful — Appointment Confirmed!"
          subTitle={`Token #${created.token} with ${created.doctorName} on ${created.date} at ${created.time}. Rs. ${created.amount} paid.`}
          extra={[
            <Button type="primary" key="profile" onClick={() => navigate('/profile')}>
              View My Appointments
            </Button>,
            <Button key="home" onClick={() => navigate('/')}>
              Back to Home
            </Button>,
          ]}
        />
      </div>
    );
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">— Secure Checkout</span>
          <h1>
            Confirm & <span className="text-accent">Pay</span>
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container payment-page">
          <Descriptions title="Booking Summary" bordered column={1} size="middle" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="Service">{draft.service}</Descriptions.Item>
            <Descriptions.Item label="Doctor">{draft.doctorName}</Descriptions.Item>
            <Descriptions.Item label="Date">{draft.date}</Descriptions.Item>
            <Descriptions.Item label="Token">
              #{draft.token} · {draft.time}
            </Descriptions.Item>
            <Descriptions.Item label="Amount Due">
              <strong>Rs. {draft.fee}</strong>
            </Descriptions.Item>
          </Descriptions>

          <Alert
            type="info"
            showIcon
            icon={<LockOutlined />}
            message="This is a mock payment gateway for the course project — no real card is charged."
            style={{ marginBottom: 24 }}
          />

          <Form layout="vertical" form={form} onFinish={handlePay}>
            <Form.Item name="cardName" label="Name on Card" rules={[{ required: true, message: 'Enter the cardholder name' }]}>
              <Input size="large" placeholder="e.g. Shuaib Khan" />
            </Form.Item>
            <Form.Item
              name="cardNumber"
              label="Card Number"
              rules={[
                { required: true, message: 'Enter a card number' },
                { pattern: /^\d{4} ?\d{4} ?\d{4} ?\d{4}$/, message: 'Enter 16 digits' },
              ]}
            >
              <Input size="large" prefix={<CreditCardOutlined />} placeholder="4242 4242 4242 4242" maxLength={19} />
            </Form.Item>
            <div style={{ display: 'flex', gap: 16 }}>
              <Form.Item
                name="expiry"
                label="Expiry (MM/YY)"
                style={{ flex: 1 }}
                rules={[{ required: true, pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'MM/YY' }]}
              >
                <Input size="large" placeholder="08/28" maxLength={5} />
              </Form.Item>
              <Form.Item
                name="cvv"
                label="CVV"
                style={{ flex: 1 }}
                rules={[{ required: true, pattern: /^\d{3,4}$/, message: '3-4 digits' }]}
              >
                <Input.Password size="large" placeholder="123" maxLength={4} />
              </Form.Item>
            </div>

            <Button type="primary" htmlType="submit" size="large" block loading={processing || submitting}>
              Pay Rs. {draft.fee}
            </Button>
          </Form>
        </div>
      </section>
    </>
  );
}
