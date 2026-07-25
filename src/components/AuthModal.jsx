import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Tabs, Form, Input, Button, Alert, Typography } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { closeAuthModal, openAuthModal, setUser } from '../store/authSlice';
import { useLazyGetUserByEmailQuery, useSignupUserMutation } from '../store/apiSlice';
import { generatePatientUid } from '../utils/auth';

// This is a mock/demo auth flow against a localStorage-backed store —
// there's no real
// backend to hash passwords or issue sessions, so please don't reuse a
// real password here. See src/utils/auth.js for the full caveat.
export default function AuthModal() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((s) => s.auth.isModalOpen);
  const modalTab = useSelector((s) => s.auth.modalTab);

  const [error, setError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginForm] = Form.useForm();
  const [signupForm] = Form.useForm();

  const [triggerGetUserByEmail] = useLazyGetUserByEmailQuery();
  const [signupUser, { isLoading: signupLoading }] = useSignupUserMutation();

  const closeAndReset = () => {
    dispatch(closeAuthModal());
    setError('');
    loginForm.resetFields();
    signupForm.resetFields();
  };

  const handleLogin = async (values) => {
    setError('');
    setLoginLoading(true);
    try {
      const matches = await triggerGetUserByEmail(values.email).unwrap();
      const account = matches?.[0];
      if (!account) {
        setError('No account found with that email. Try signing up instead.');
        return;
      }
      if (account.password !== values.password) {
        setError('Incorrect password.');
        return;
      }
      dispatch(setUser(account));
      closeAndReset();
    } catch {
      setError("Something went wrong saving that — try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async (values) => {
    setError('');
    try {
      const matches = await triggerGetUserByEmail(values.email).unwrap();
      if (matches?.length > 0) {
        setError('An account with that email already exists. Try logging in instead.');
        return;
      }
      const newUser = {
        uid: generatePatientUid(),
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        createdAt: new Date().toISOString(),
      };
      const created = await signupUser(newUser).unwrap();
      dispatch(setUser(created));
      closeAndReset();
    } catch {
      setError("Something went wrong saving that — try again.");
    }
  };

  return (
    <Modal open={isModalOpen} onCancel={closeAndReset} footer={null} title="Welcome to SmileCare" destroyOnHidden>
      <Tabs
        activeKey={modalTab}
        onChange={(key) => {
          setError('');
          dispatch(openAuthModal(key));
        }}
        items={[
          {
            key: 'login',
            label: 'Log In',
            children: (
              <Form layout="vertical" form={loginForm} onFinish={handleLogin}>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}>
                  <Input size="large" prefix={<MailOutlined />} placeholder="you@example.com" />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Enter your password' }]}>
                  <Input.Password size="large" prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>
                {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
                <Button type="primary" htmlType="submit" block size="large" loading={loginLoading}>
                  Log In
                </Button>
              </Form>
            ),
          },
          {
            key: 'signup',
            label: 'Sign Up',
            children: (
              <Form layout="vertical" form={signupForm} onFinish={handleSignup}>
                <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Enter your name' }]}>
                  <Input size="large" prefix={<UserOutlined />} placeholder="Your name" />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}>
                  <Input size="large" prefix={<MailOutlined />} placeholder="you@example.com" />
                </Form.Item>
                <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Enter your phone number' }]}>
                  <Input size="large" prefix={<PhoneOutlined />} placeholder="03xx-xxxxxxx" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, min: 4, message: 'At least 4 characters' }]}
                >
                  <Input.Password size="large" prefix={<LockOutlined />} placeholder="Choose a password" />
                </Form.Item>
                {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
                <Button type="primary" htmlType="submit" block size="large" loading={signupLoading}>
                  Create Account
                </Button>
                <Typography.Paragraph type="secondary" style={{ marginTop: 12, marginBottom: 0, fontSize: 12 }}>
                  Demo project — this is a mock login for the course app, please don't reuse a real password.
                </Typography.Paragraph>
              </Form>
            ),
          },
        ]}
      />
    </Modal>
  );
}
