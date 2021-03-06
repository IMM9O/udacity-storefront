import { Form, Input, Button, Spin } from 'antd';

import AppLayout from '../containers/Layout/Layout';
import { useAuth } from '../hooks/useAuth';
import { Status } from '../hooks/useProvideAuth';

import { User } from '../types/User';

export default function Signup() {
  const auth = useAuth();

  const onFinish = (values: User) => {
    console.log('Success:', values);
    auth.signup(values);
  };

  return (
    <AppLayout>
      <h1>Register Form</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[
            {
              required: true,
              message: 'Please input your Last name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={status === Status.FETCH}
          >
            {auth.status === Status.FETCH && <Spin />} Submit
          </Button>
        </Form.Item>
      </Form>
    </AppLayout>
  );
}
