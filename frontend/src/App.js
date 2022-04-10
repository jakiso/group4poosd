import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import VerificationPage from './pages/VerificationPage';
import PasswordResetPage from './pages/PasswordResetPage';
import AccountSettingsPage from './pages/AccountSettingsPage';

function App() {
    return (
        <Router >
            <Switch>
                <Route path="/Login" exact>
                    <LoginPage />
                </Route>
                <Route path="/Main" exact>
                    <MainPage />
                </Route>
                <Route path="/Register" exact>
                    <RegisterPage />
                </Route>
                 <Route path="/AccountSettings" exact>
                    <AccountSettingsPage />
                </Route>
                <Route path="/" exact>
                    <MainPage />
                </Route>
                <Route path="/Verify" exact>
                    <VerificationPage />
                </Route>
                <Route path="/Reset" exact>
                    <PasswordResetPage />
                </Route>
                <Redirect to="/" />
            </Switch>  
        </Router>
    );
}

export default App;
