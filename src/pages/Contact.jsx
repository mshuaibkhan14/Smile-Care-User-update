import { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, ClockCircleOutlined } from '@ant-design/icons';
import '../styles/PageHero.css';
import '../components/AboutSplit.css';

export default function Contact() {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  // Controlled form pattern: Ant Design's Form manages values via internal
  // state tied to each Input, validated with declared rules — same concept
  // as the Controlled Form taught in class, just using antd's Form API
  // instead of manual useState per field.
  const onFinish = async (values) => {
    setSubmitting(true);
    // Simulated submit — swap for a real POST to /contact once the backend exists.
    await new Promise((res) => setTimeout(res, 900));
    console.log('Contact form submitted:', values);
    message.success("Thanks! We'll get back to you within one business day.");
    form.resetFields();
    setSubmitting(false);
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">— Get In Touch</span>
          <h1>
            We'd Love to <span className="text-accent">Hear From You</span>
          </h1>
          <p style={{ maxWidth: 560, margin: '0 auto' }}>
            Questions about a treatment, insurance, or just want to say hi? Send us a message.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <Row gutter={[48, 32]}>
            <Col xs={24} md={9}>
              <h3 style={{ marginBottom: 20 }}>Contact Information</h3>
              <div className="about-split__checklist" style={{ margin: 0 }}>
                <li><EnvironmentOutlined /> 123 Smile Avenue, Suite 100, Karachi</li>
                <li><PhoneOutlined /> (021) 3555-1234</li>
                <li><MailOutlined /> hello@smilecare.example</li>
                <li><ClockCircleOutlined /> Mon–Sat: 9am – 7pm</li>
              </div>
            </Col>

            <Col xs={24} md={15}>
              <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Full Name"
                      name="name"
                      rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                      <Input size="large" placeholder="Your name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Phone"
                      name="phone"
                      rules={[{ required: true, message: 'Please enter your phone number' }]}
                    >
                      <Input size="large" placeholder="03xx-xxxxxxx" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Enter a valid email' },
                  ]}
                >
                  <Input size="large" placeholder="you@example.com" />
                </Form.Item>

                <Form.Item
                  label="Message"
                  name="message"
                  rules={[{ required: true, message: 'Please write a short message' }]}
                >
                  <Input.TextArea rows={5} placeholder="How can we help?" />
                </Form.Item>

                <Button type="primary" size="large" htmlType="submit" loading={submitting}>
                  Send Message
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
}
