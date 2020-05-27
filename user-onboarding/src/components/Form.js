import React, { useState } from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Forms = ({ values, errors, touched, status }) => {
  const [message, setMessage] = useState([]);
  console.log(status, `stat`);

  //Submits ----

  const handleSubmit = (values, { setStatus, resetForm }) => {
    axios
      .post(` https://reqres.in/api/users`, values)

      .then(res => {
        console.log(res.data, `success`);
        setMessage([...message, values]);
        setStatus(res.data);
        console.log(values, `values`, status, `yes`);
        resetForm();
        console.log(status, `testing stuff please work!`);
      })
      .catch(err => console.log(err.response))
      .finally();
  };
  // Checking Validations !! ----
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

  // REturn STARTS HERE  - -------------
  return (
    <div>
      <h1>My Form</h1>
      <Formik
        initialValues={{ name: ``, email: "", password: `` }}
        validationSchema={SignupSchema}
        // validate={validate}
        onSubmit={handleSubmit}>
        {({ values }) => {
          return (
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
                  checked={values.terms}></Field>
                Agree with Terms of Service
              </label>
              &nbsp;
              <input type='submit' />
            </Form>
          );
        }}
      </Formik>

      {/* Map starts here !!!!! */}
      <div>
        {message.map(e => (
          <div>
            <p>{e.name}</p>
            <p>{e.email}</p>
            <p>{e.terms}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forms;
