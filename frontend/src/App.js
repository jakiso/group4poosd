import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import VerificationPage from './pages/VerificationPage';

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
                <Route path="/" exact>
                    <MainPage />
                </Route>
                <Route path="/Verify" exact>
                    <VerificationPage />
                </Route>
                <Redirect to="/" />
            </Switch>  
        </Router>
    );
}

export default App;
