import React, { useContext } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"

import { AuthContext } from "../../App"
import "./Login.css"

const initialValues = {
  username: "",
  password: "",
}

const onSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    console.log("values:", values)
    setSubmitting(false)
  }, 400)
}

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
})

const Login = () => {
  const authContext = useContext(AuthContext)

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <Field
            type="text"
            id="username"
            name="username"
            className={
              "form-control " +
              (errors.username && touched.username ? "is-invalid" : "")
            }
            placeholder="Username"
          />
          <ErrorMessage
            name="username"
            render={(msg) => <div className="invalid-feedback">{msg}</div>}
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <Field
            type="password"
            id="password"
            name="password"
            className={
              "form-control " +
              (errors.password && touched.password ? "is-invalid" : "")
            }
            placeholder="Password"
          />
          <ErrorMessage
            name="password"
            render={(msg) => <div className="invalid-feedback">{msg}</div>}
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
        </Form>
      )}
    </Formik>
  )
}

// <button onClick={() => authContext.dispatch({
//   type: 'LOGIN',
//   payload: {
//     token: 'dummy token',
//     userId: 'dummy userId'
//   }
// })}>

export default Login
