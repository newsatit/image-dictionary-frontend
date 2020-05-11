import React, { useReducer } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  withRouter,
  Redirect
} from "react-router-dom"

import './App.css';
import Home from './components/Search/Home'
import History from './components/History/History'
import Login from './components/Auth/Login'
// import Register from './Auth/Register'

const initialAuthState = {
  token: null,
  userId: null,
  isAuthenticated: false
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { token: action.payload.token, userId: action.payload.userId, isAuthenticated: true }
    case 'LOGOUT':
      return { token: null, userID: null, isAuthenticated: false}
    default:
      throw new Error('Auth reducer error')
  }
}

export const AuthContext = React.createContext()

const App = () => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState)
  //TODO: handhle expired token
  const { token, userId, isAuthenticated } = authState

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
  // TODO: handle logout
  return (
    <AuthContext.Provider value={{ state: authState, dispatch: authDispatch }}>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                { isAuthenticated ? <Link to="/history">History</Link> : <Link to="/login">Login</Link> } 
              </li>
            </ul>
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

export default App;
