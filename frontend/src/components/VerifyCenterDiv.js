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

    // When the verify button is clicked  
    const DoVerify = async event => 
    {
        event.preventDefault();

        // Check the user if their email has been verified or not
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