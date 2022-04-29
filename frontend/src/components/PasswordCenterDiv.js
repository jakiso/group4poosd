import React, { useState, useCallback } from 'react';
import '../App.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";


function CenterDiv(){
    var password;
    var confirmPassword;

    const navigate = useHistory();
    // const redirectToLogin = useCallback(() => navigate.push('/Login'), [navigate]);

    const [message,setMessage] = useState('');

    const doReset = async event => 
    {
        event.preventDefault();

        // Retrieve userId and token
        var token = localStorage.getItem('token_data');
        var decode = jwt_decode(token);

        // Creates object for all form fields
        var obj = {userData:decode, password:password.value, confirmPassword:confirmPassword.value};

        // Check if passwords match
        if(obj.password != obj.confirmPassword)
        {
            setMessage('Passwords do not match');
            return;
        }
        
        // Remove the confirm password from the object
        delete obj.confirmPassword;

        // Turn object into JSON
        var js = JSON.stringify(obj);

        // Build path for website
        var bp = require('./Path.js');

        try
        {  
            // Send object to resetPassword
            const response = await fetch(bp.buildPath('resetPassword'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            // Response
            var res = JSON.parse(await response.text());

            // Check if error is not empty
            if(res.error != '')
            {
                setMessage(res.error);
                return;
            }

            // Account has been reset go to verification page
            setMessage('Your password has been successfully reset!');

            // redirectToLogin();
            // window.location.href = '/Login'; // does not work in deployed
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    };


    return(
        <div className="main_pane">
            <form onSubmit={doReset}>
                <div className="fields" style={{"display": "flex", "display":"grid"}}>
                    <input type="password" id="password" placeholder="Password" 
                        ref={(c) => password = c} /> <br /> 
                    <input type="password" id="confirmPassword" placeholder="Confirm Password" 
                        ref={(c) => confirmPassword = c} /> <br /> 
                    <span id="resetResult" style={{"marginTop": "10px"}}>{message}</span>
                </div>
                <div className="buttons" style={{"display": "flex"}}>
                    <input type="submit" id="resetButton" className="buttons" value = "Confirm"
                        onClick={doReset} />
                </div>
            </form>
        </div>
    );
}

export default CenterDiv;