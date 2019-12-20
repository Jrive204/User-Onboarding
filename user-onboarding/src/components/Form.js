import React, { useState, useEffect } from "react";
import { withFormik, Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Forms = props => {
  const [message, setMessage] = useState([]);
  useEffect((tools) => {
    console.log(`status has changed`, tools.status);
    tools.status && setMessage(m => [...m, tools.status]);
    {
      console.log(tools.status, `hi`);
    }
  }, [tool.status]);

  const SignupSchema = () =>
    Yup.object().shape({
      name: Yup.string().min(3, `Name Too Short!`),
      email: Yup.string()
        .email("Invalid email")
        .required("Email Required"),
      password: Yup.string().required(`Password required`),
      terms: Yup.bool()
        .test(
          "consent",
          "You have to agree with our Terms and Conditions!",
          value => value === true
        )
        .required(`You have to agree with Terms of Service!`)
    });

  const handleSubmit = (values, tools) => {
    
    axios
      .post(` https://reqres.in/api/users`, values)

      .then(res => {
        console.log(res, `success`);
        console.log(values, `stuff`, tools, `yes`);
        tools.setStatus(res.data);
        tools.resetForm();
      })
      .catch(err => console.log(err.response))
      .finally();
      
  };

  return (
    <div>
      <h1>My Form</h1>
      <Formik
        initialValues={{ name: ``, email: "", password: `` }}
        validationSchema={SignupSchema}
        // validate={validate}
        onSubmit={handleSubmit}>
        {props => (
          <Form className='formbody'>
            <Field
              className='formFields'
              name='name'
              type='text'
              placeholder='name'
            />
            <ErrorMessage name='name' component='div' className='red' />
            <Field
              className='formFields'
              name='email'
              type='text'
              placeholder='email'
            />
            <ErrorMessage name='email' component='div' className='red' />
            <Field
              className='formFields'
              name='password'
              type='password'
              placeholder='Password'
            />
            <ErrorMessage name='password' component='div' className='red' />
            <label htmlFor='terms'>
              <Field
                id='terms'
                type='checkbox'
                name='terms'
                checked={props.value}></Field>
              Agree with Terms of Service
            </label>
            &nbsp;
            <input type='submit' />
          </Form>
        )}
      </Formik>
      <div>
        {message.map(e => (
          <div>
            <p>{e.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forms;
