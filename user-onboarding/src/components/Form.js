import React from "react";
import { withFormik, Form, Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Forms = props => (
  //   <div>
  //     <h1>My Form</h1>
  //     <Formik
  //       initialValues={{ name: ``, email: ``, password: `` }}
  //       onSubmit={(values, actions) => {}}>
  //       {props => (
  //         <form onSubmit={props.handleSubmit}>
  //           <input
  //             type='text'
  //             onChange={props.handleChange}
  //             onBlur={props.handleBlur}
  //             value={props.values.name}
  //             name='name'
  //           />
  //           {props.errors.name && <div id='feedback'>{props.errors.name}</div>}
  //           <button type='submit'>Submit</button>
  //         </form>
  //       )}
  //     </Formik>
  //   </div>
  <div>
    <h1>My Form</h1>
    <Formik
      initialValues={{ name: ``, email: ``, password: `` }}
      onSubmit={things => {
        console.log(things);
      }}>
      {props => (
        <Form>
          <Field name='name' />

          <Field age='age' />

          <Field password='password' />

          <input type='submit' />
          <h1>yes</h1>
        </Form>
      )}
    </Formik>
  </div>
);

export default Forms;
