import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notiflix from 'notiflix';
import { Button, Form, Input } from 'antd';
import { selectUserContacts } from 'redux/selectors';
import { addContactThunk } from 'redux/contactsServices';
import { FormWrapper } from 'pages/RegisterPage.styled';



export const ContactForm = () => {
  const contacts = useSelector(selectUserContacts);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = values => {
    const { name, number } = values;
    const contactData = {
      name,
      number: number.replace(/[\s()-]+/g, ''),
    };

    const isDuplicateName = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );
    if (isDuplicateName) {
      form.resetFields();
      return Notiflix.Notify.failure(
        `Contact with name ${name} or phone number ${number} is already in contacts!`
      );
    }

    console.log('Success:', contactData);
    dispatch(addContactThunk(contactData));
    form.resetFields();
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <FormWrapper>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          name="wrap"
          labelCol={{
            flex: '110px',
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            name: '',
            number: '',
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            id="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="text"
              name="name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Charles de Batz de Castelmore d'Artagnan"
              placeholder="Enter contact name"
              required
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="number"
            id="number"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="text"
              name="number"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              placeholder="Enter contact phone number"
              required
            />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Add contact
            </Button>
          </Form.Item>
        </Form>
      </FormWrapper>
      ;
    </div>
  );
};
