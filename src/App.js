import React, { useReducer } from "react"
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  withRouter,
  Redirect,
} from "react-router-dom"

import "./App.css"
import Home from "./components/Search/Home"
import History from "./components/History/History"
import Login from "./components/Auth/Login"
// import Register from './Auth/Register'
import AuthContext from "./contexts/AuthContext"

const initialAuthState = {
  token: null,
  userId: null,
  isAuthenticated: false,
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.payload.token,
        userId: action.payload.userId,
        isAuthenticated: true,
      }
    case "LOGOUT":
      return { token: null, userID: null, isAuthenticated: false }
    default:
      throw new Error("Auth reducer error")
  }
}

const App = () => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState)
  //TODO: handhle expired token
  const { token, userId, isAuthenticated } = authState

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )

  return (
    <AuthContext.Provider value={{ state: authState, dispatch: authDispatch }}>
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-brand">Image Dictionary</div>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                {isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <Link to="/history" className="nav-link">
                        History
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button
                        onClick={() => authDispatch({ type: "LOGOUT" })}
                        className="nav-link"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
          {/* A <Switch> looks through its children <Route> and
              renders the first one that matches the current URL. */}
          <Switch>
            <PrivateRoute path="/history" component={History} />
            <Route path="/login" component={Login} />
            {/* <Route path="/register" component={Register} /> */}
            <Route path="/search" component={withRouter(Home)} />
            <Route path="/" component={withRouter(Home)} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
