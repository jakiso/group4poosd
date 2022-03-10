import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (

    <Router >
      <Switch>
        <Route path="/Login" exact>
          <LoginPage />
        </Route>
        <Route path="/Register" exact>
          <RegisterPage />
        </Route>
        <Redirect to="/Login" />
      </Switch>  
    </Router>
    
  );
}

export default App;
