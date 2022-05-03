import React, { useState, useCallback } from 'react';
import '../App.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function CenterDiv(){
    var email;

    const navigate = useHistory();
    const redirectToLogin = useCallback(() => navigate.push('/Login'), [navigate]);

    const [message,setMessage] = useState('');

    const doSend = async event => 
    {
        event.preventDefault();

        // Used to store token
        var storage = require('../tokenStorage.js');
        localStorage.clear();

        // Creates object for form field
        var obj = {email: email.value};

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
        
        // Turn object into JSON
        var js = JSON.stringify(obj);

        // Build path for website
        var bp = require('./Path.js');

        try
        {  
            // Send object to register
            const response = await fetch(bp.buildPath('sendResetEmail'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            
            // Response
            var res = JSON.parse(await response.text());

            // Check if error is not empty
            if(res.error != '')
            {
                setMessage(res.error);
                return;
            }
            
            // store userId and email in local storage
            storage.storeToken(res.jwToken);

            // Account has been created go to verification page
            // setMessage('An email has been successfully sent to your email address!');
            setMessage(res.response);
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    };


    return(
        <div className="main_pane">
            <form onSubmit={doSend}>
                <div className="fields" style={{"display": "flex", "display":"grid"}}>
                    <input type="text" id="email" placeholder="Email Address" 
                        ref={(c) => email = c} /> <br /> 
                </div>
                <div className="buttons" style={{"display": "flex", "display":"grid"}}>
                    <input type="submit" id="sendButton" className="buttons" value = "Send"
                        onClick={doSend} />
                    <span id="sendResult" style={{"marginTop": "10px"}}>{message}</span>
                </div>
            </form>
        </div>
    );
}

export default CenterDiv;