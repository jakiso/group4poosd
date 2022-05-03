import React, { useState, useCallback } from "react";
import '../App.css';
import { Buttonb } from './Button';
import { LinkStyled } from './LinkStyled';
import styled from 'styled-components';
import { isExpired, decodeToken } from "react-jwt";
import { useHistory } from 'react-router-dom';


function CenterDiv()
{
    var loginName;
    var loginPassword;

    const navigate = useHistory();
    const redirectToVerify = useCallback(() => navigate.push('/Verify'), [navigate]);

    const [message,setMessage] = useState('');

    // Login button push
    const DoLogin = async event => 
    {
        event.preventDefault();

        var obj = {username:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        var storage = require('../tokenStorage.js');
        var bp = require('./Path.js');

        try
        {  
            // Retrieves token and error from server
            const response = await fetch(bp.buildPath('login'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            // Convert response to JSON
            var res = JSON.parse(await response.text());

            // Store the JWT in local storage
            storage.storeToken(res);
            
            // Decode the token and store in tokenData
            const tokenData = decodeToken(storage.retrieveToken());
            
            // Check if userId is valid
            if( tokenData.userId <= 0)
            {
                // Let user know error and end
                setMessage(res.error);
                return;
            }

            // The user that is logging in is valid now check for errors
            // Store the user info locally
            var user = {firstName:tokenData.firstName,lastName:tokenData.lastName,id:tokenData.userId};
            localStorage.setItem('user_data', JSON.stringify(user));

            // Checks the error message from server.
            // Lets the user know they must confirm their email before continuing
            if (res.error == 'Please confirm your email before logging in.')
            {
                // Move to /Verify
                setMessage('');

                redirectToVerify();
                // window.location.href = '/Verify'; // does not work in deployed
            }
            else
            {
                // Valid user move to /Main
                setMessage('');
                window.location.href = '/';
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
        <div className="main_pane" style={{"overflow":"hidden"}}>
            <div style={{"display":"grid", "rowGap": "2rem"}}>
            <form onSubmit={DoLogin}>
                <div className="fields" style={{"display": "flex", "display":"grid", "rowGap": "1rem"}}>
                    <input type="text" id="loginName" placeholder="Username" 
                        ref={(c) => loginName = c} /><br /> 
                    <input type="password" id="loginPassword" placeholder="Password" 
                        ref={(c) => loginPassword = c} /><br />
                    <span id="loginResult">{message}</span>
                    <input type="submit" id="loginButton" value = "Login"
                        onClick={DoLogin} style={{"marginTop":"40px", "cursor":"pointer"}}/>
                </div>
            </form>
            <div style={{"display":"grid", "rowGap": "2rem"}}>
                    {/* <input type="submit" id="loginGButton" value = "Login with Google" 
                    style={{"width":"30%"}}/> */}
                    {/* This routes back to login page just to avoid getting an unnecessary error. */}
                    <LinkStyled className="link" link_text="Forgot Password" route="/Reset"/>
                    <LinkStyled className="link" route="/Register" link_text="Create Account"/>
            </div>
            <br/>
            </div>
        </div>
    );
};

export default CenterDiv;