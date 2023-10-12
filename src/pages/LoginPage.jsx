import React from 'react';
import { Button, Form, Input } from 'antd';
import { FormContainer, FormTitle, FormWrapper } from './RegisterPage.styled';
import { useDispatch } from 'react-redux';
import { loginUserThunk } from 'redux/authentifServices';


const LoginPage = () => {
  const [form] = Form.useForm();
  const onFinish = values => {
    // console.log('Success:', values);
    dispatch(loginUserThunk(values));
    form.resetFields();
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const dispatch = useDispatch();



  return (
    <FormContainer>
      <FormTitle>Login into your account</FormTitle>
      <FormWrapper>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            email: '',
            password: '',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            label="Email"
            name="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            required
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
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            minLength={7}
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </FormWrapper>
    </FormContainer>
  );
};

export default LoginPage;
