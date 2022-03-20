import React, { useState } from 'react';
import '../App.css';
import { Field } from './Field';
import { Buttonb } from './Button';
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

    const doRegister = async event => 
    {
        event.preventDefault();

        // Creates object for all form fields
        var obj = {firstName:firstName.value, lastName:lastName.value, username:username.value, 
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
            const response = await fetch(bp.buildPath('register'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            // Response
            var res = JSON.parse(await response.text());

            // Check if error is not empty
            if(res.error != '')
            {
                setMessage(res.error);
                return;
            }

            // If not then account creation is complete
            setMessage('Your account has been created!');
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    };


    return(
        <div className="main_pane">
            <form onSubmit={doRegister}>
                <div className="fields" style={{"height": "40vh"}}>
                    <input type="text" id="firstName" placeholder="First Name" 
                        ref={(c) => firstName = c} /> <br /> 
                    <input type="text" id="lastName" placeholder="Last Name" 
                        ref={(c) => lastName = c} /> <br /> 
                    <input type="text" id="username" placeholder="Username" 
                        ref={(c) => username = c} /> <br /> 
                    <input type="text" id="email" placeholder="Email" 
                        ref={(c) => email = c} /> <br /> 
                    <input type="password" id="password" placeholder="Password" 
                        ref={(c) => password = c} /> <br /> 
                    <input type="password" id="confirmPassword" placeholder="Confirm Password" 
                        ref={(c) => confirmPassword = c} /> <br /> 
                    <span id="loginResult" style={{"marginTop": "10px"}}>{message}</span>
                </div>
                <div className="buttons" style={{"marginTop": "100px"}}>
                    <input type="submit" id="signUpButton" className="buttons" value = "Sign Up"
                        onClick={doRegister} />
                </div>
            </form>
        </div>
    );
}

export default CenterDiv;