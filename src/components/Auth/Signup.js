import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"

import "./Signup.css"

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Email is not valid"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
})

const Signup = () => {
  const [feedback, setFeedback] = useState("")
  const [success, setSuccess] = useState(false)

  const onSubmit = (values, { setSubmitting }) => {
    axios
      .post("/api/users/", {
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then(() => {
        setFeedback("Created account succesfully!")
        setSuccess(true)
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 400)
          setFeedback("Cannot signup with current username or password")
        else setFeedback("Signup error. Please try again later!")
        setSuccess(false)
      })
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form className="form-signin">
          <h1 className="h3 mb-6 font-weight-normal">Sign up here!</h1>
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
          <Field
            type="text"
            id="email"
            name="email"
            className={
              "form-control " +
              (errors.email && touched.email ? "is-invalid" : "")
            }
            placeholder="Email"
          />
          <ErrorMessage
            name="email"
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
          <Field
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={
              "form-control " +
              (errors.confirmPassword && touched.confirmPassword
                ? "is-invalid"
                : "")
            }
            placeholder="Confirm Password"
          />
          <ErrorMessage
            name="confirmPassword"
            render={(msg) => <div className="invalid-feedback">{msg}</div>}
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign up
          </button>
          {feedback && (
            <div
              className={"alert alert-" + (success ? "success" : "danger")}
              role="alert"
            >
              {feedback}
            </div>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default Signup
