import React, { useState } from 'react';
import '../App.css';
import { isExpired, decodeToken } from "react-jwt";
import axios from 'axios';

function CenterDiv(){
    var firstName;
    var lastName;
    var username;
    var email;
    var password;
    var confirmPassword;

    const [message,setMessage] = useState('');

    // RegEx for checking email
    // Valid email must have: (1char)@(2char).(2char)
    const validEmail = new RegExp(
        '(.+)@((.+){2,})\.((.+){2,})'
    );

    const doChangeAccount = async event => 
    {
        event.preventDefault();

        // Creates object for all form fields
        var obj = {NfirstName:firstName.value, NlastName:lastName.value, username:username.value, 
                    email:email.value, password:password.value, confirmPassword:confirmPassword.value};

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
        
        // Check if the email is valid based on RegEx
        if(!validEmail.test(email.value))
        {
            setMessage('Email is not valid');
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
            // Send object to register
            const response = await fetch(bp.buildPath('changeAccount'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            // Response
            var res = JSON.parse(await response.text());

            // Check if error is not empty
            if(res.error != '')
            {
                setMessage(res.error);
                return;
            }

            // Store the JWT and the user_data
            var storage = require('../tokenStorage.js');
            storage.storeToken(res);
            // Decode the token and store in tokenData
            const tokenData = decodeToken(storage.retrieveToken());
            var user = {firstName:tokenData.firstName,lastName:tokenData.lastName,id:tokenData.userId}
            localStorage.setItem('user_data', JSON.stringify(user));

            // Account has been created go to verification page
            setMessage('Your account has been created!');
            window.location.href = '/Verify';
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    };


    return(
        <div className="main_pane">
            <form onSubmit={doChangeAccount}>
                <div className="fields" style={{"display": "flex", "display":"grid"}}>
                    <input type="text" id="firstName" placeholder="New First Name?" 
                        ref={(c) => firstName = c} /> <br /> 
                    <input type="text" id="lastName" placeholder="New Last Name?" 
                        ref={(c) => lastName = c} /> <br /> 
                    <input type="text" id="username" placeholder="New Username?" 
                        ref={(c) => username = c} /> <br /> 
                    <input type="text" id="email" placeholder="New Email?" 
                        ref={(c) => email = c} /> <br /> 
                    <input type="password" id="password" placeholder="New Password?" 
                        ref={(c) => password = c} /> <br /> 
                    <input type="password" id="confirmPassword" placeholder="Confirm New Password" 
                        ref={(c) => confirmPassword = c} /> <br /> 
                    <span id="loginResult" style={{"marginTop": "10px"}}>{message}</span>
                </div>
                <div className="buttons" style={{"display": "flex"}}>
                    <input type="submit" id="submit" className="buttons" value = "Submit"
                        onClick={doChangeAccount} />
                </div>
            </form>
        </div>
    );
}

export default CenterDiv;
