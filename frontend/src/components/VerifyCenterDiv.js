import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function CenterDiv(){

    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState('');
    const [tokenData, setTokenData] = useState('');
    const [buttonMessage, setButtonMessage] = useState('');

    // Function to run one and let the user know to verify their email
    useEffect(() => {
        setMessage('Your account must be verified before you can login in.');
        setUserData(localStorage.getItem('user_data'));
        setTokenData(localStorage.getItem('token_data'));
        setButtonMessage('Click Resend if you have not yet received a verification email.');
      }, []);

    // Used to store token
    var storage = require('../tokenStorage.js');
    // Used for patht to send api
    var bp = require('./Path.js');

     // Checks if the user is already confirmed
     const CheckConfirm = async () => 
     {
         console.log("CHECKING CONFIRM");
        // Retrieve userId and token
        var userId = JSON.parse(localStorage.getItem('user_data')).id;
        var token = storage.retrieveToken();

        // Puts in object to be sent for email
        const confirmObj = {userId: userId, jwToken: token};
        
        try
        {
            // Check if user is confirmed
            const checkConfirm = await fetch(bp.buildPath('checkConfirm'), {method:'POST',body:JSON.stringify(confirmObj),headers:{'Content-Type': 'application/json'}});

            // Convert response to JSON
            var res = JSON.parse(await checkConfirm.text());

            // Store the JWT in local storage
            storage.storeToken(res.jwToken);

            // EMIAL IS CONFIRMED
            if (res.error == "Email is Confirmed")
            {
                console.log("EMAIL IS CONFIRMED");
                setMessage( res.error );
                // Email has been confirmed send to main page
                console.log("GO TO MAIN");
                window.location.href = '/';
            }
            // Email NOT Confirmed
            else 
            {
                console.log("EMAIL NOT CONFIRMED");
                DoVerify();
            }
        }
        // JWT not received properly
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    };

    // When the verify button is clicked  
    const DoVerify = async () => 
    {
        console.log("Sending email");
        // event.preventDefault();

        // Retrieve userId and token
        var userId = JSON.parse(localStorage.getItem('user_data')).id;
        var token = localStorage.getItem('token_data');

        // Puts in object to be sent
        const obj = {userId: userId, jwToken: token};

        // Converts to JSON to be sent
        var js = JSON.stringify(obj);

        // API call to sendtestmail
        try
        {  
            // Sends the test mail and gets response
            const response = await fetch(bp.buildPath('sendtestmail'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            // Convert response to JSON
            var res = JSON.parse(await response.text());

            // Store the JWT in local storage
            storage.storeToken(res.jwToken);

            console.log(res);

            // Check the error field. empty error is good
            if( res.error && res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                // All good send to main page
                console.log("EMAIL SENT");
                setMessage("An email has been sent to you");
            }
        }
        // JWT not received properly
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    };

    // useEffect runs only once after the page has loaded
    useEffect(() => {
        CheckConfirm();
        console.log("Going once");
    }, []);

    return(
        <div className="main_pane"> <br/><br/><br/><br/>
            <span id="loginResult" style={{"marginTop": "0px"}}>{message}</span><br/><br/><br/>
            <input type="submit" id="verifyButton" className="buttons" value = "Resend"
                    onClick={() => CheckConfirm()}/>
            {/* <span id="userData" >{userData}</span><br/>
            <span id="tokenData">{tokenData}</span> */}
            <div className="buttons">
                <span id="loginResult">{buttonMessage}</span><br/>
            </div>
        </div>
    );
}

export default CenterDiv;