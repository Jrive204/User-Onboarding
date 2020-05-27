import React from "react";
import "./App.css";
import Forms from "./components/Form";
import { Formik } from "formik";

function App() {
  return (
    <div className='App'>
      <Formik component={Forms} />
    </div>
  );
}

export default App;
