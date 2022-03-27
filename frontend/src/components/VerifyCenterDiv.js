import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function CenterDiv(){

    const [message,setMessage] = useState('');
    const [userData, setUserData] = useState('');
    const [tokenData, setTokenData] = useState('');

    // Function to run one and let the user know to verify their email
    useEffect(() => {
        setMessage('Please verify your email');
        setUserData(localStorage.getItem('user_data'));
        setTokenData(localStorage.getItem('token_data'));
      }, []);

    // Another useEffect to send the verifcation email when page loads
    useEffect(() => {

    }, []);

    // When the verify button is clicked  
    const DoVerify = async event => 
    {
        event.preventDefault();

        // Used to store token
        var storage = require('../tokenStorage.js');
        // Used for patht to send api
        var bp = require('./Path.js');

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

            // Check the error field. empty error is good
            if( res.error && res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                //NOT READY YET
                // All good send to main page
                // window.location.href = '/';
            }
        }
        // JWT not received properly
        catch(e)
        {
            console.log(e.toString());
            return;
        }
    };

    return(
        <div className="main_pane"> <br/><br/><br/><br/>
            <span id="loginResult" style={{"marginTop": "0px"}}>{message}</span><br/><br/><br/>
            <span id="userData" >{userData}</span><br/>
            <span id="tokenData">{tokenData}</span>
            <div className="buttons" style={{"marginTop": "100px"}}>
                <input type="submit" id="verifyButton" className="buttons" value = "Verify"
                    onClick={DoVerify}/>
            </div>
        </div>
    );
}

export default CenterDiv;