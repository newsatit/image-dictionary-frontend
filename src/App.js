import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import Home from './Home'
import History from './History/History'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/history">History</Link>
              </li>
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/history" component={History} />
            <Route path="/search" component={withRouter(Home)} />
            <Route path="/" component={withRouter(Home)} />
          </Switch>
        </div>
      </BrowserRouter>
    );    
  }
}

export default App;
