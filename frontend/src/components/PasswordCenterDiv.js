import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

function CenterDiv(){
    var password;
    var confirmPassword;

    const [message,setMessage] = useState('');

    const doReset = async event => 
    {
        event.preventDefault();

        // Used to store token
        var storage = require('../tokenStorage.js');

        // Retrieve userId and token
        var userId = JSON.parse(localStorage.getItem('user_data')).id;
        var token = localStorage.getItem('token_data');

        // Creates object for all form fields
        var obj = {userId: userId, jwToken: token, password:password.value, confirmPassword:confirmPassword.value};

        // Loop through the object and check to make sure the value are not empty
        for(const [key, value] of Object.entries(obj)) 
        {
            // Use string trim function to remove leading and trailing whitespace
            obj[key] = value.trim();

            // Check if any entry field is empty and stop the submission and let the user know
            if (obj[key] == "") {
                setMessage(`${key} is empty`);
                return;
            }
        }

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

            // Store the JWT in local storage
            storage.storeToken(res.jwToken);

            // Check if error is not empty
            if(res.error != '')
            {
                setMessage(res.error);
                return;
            }

            // Account has been created go to verification page
            setMessage('Your password has been successfully reset!');
            window.location.href = '/Login';
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
                    <input type="submit" id="resetButton" className="buttons" value = "Reset Password"
                        onClick={doReset} />
                </div>
            </form>
        </div>
    );
}

export default CenterDiv;