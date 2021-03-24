import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Login from './components/Login';
import Friends from './components/Friends';
import PrivateRoute from './components/PrivateRoute'


function App() {

  return (
    <Router>
      <div className='App'>
        <ul className='navLinks'>
          <li>
            <Link to='/login'>Loggin</Link>
          </li>
          <li>
          </li>
          <li>
            <Link to='/protected'>SSssecret</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute exact path='/protected' component={Friends} />
          <Route path='/login' component={Login} />
          <Route component={Login}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
