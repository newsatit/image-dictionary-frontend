import React, { useState, useContext } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Redirect, useHistory, useLocation } from "react-router-dom"

import AuthContext from '../../contexts/AuthContext'
import "./Login.css"

const initialValues = {
  username: "",
  password: "",
}

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
})

const Login = () => {
  const authContext = useContext(AuthContext)
  const [loginError, setLoginError] = useState("")

  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: "/" } }

  const onSubmit = (values, { setSubmitting }) => {
    axios
      .post("/api/api-token-auth/", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
          authContext.dispatch({
            type: "LOGIN",
            payload: {
              token: res.data.token,
              userId: res.data.user_id,
            },
          })
          history.replace(from)
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 400)
          setLoginError("username or password is not correct")
        else
          setLoginError("Login error. Please try again later!")
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
          {loginError && (
            <div className="alert alert-danger" role="alert">
              {loginError}
            </div>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default Login
