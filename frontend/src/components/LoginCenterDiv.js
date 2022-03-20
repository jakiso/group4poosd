import React, { useState } from "react";
import '../App.css';
import { Field } from './Field';
import { Buttonb } from './Button';
import { LinkP } from './LinkP';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";
import axios from 'axios';


const LoginG = styled(Buttonb)`
  line-height: 33px;
`

function CenterDiv()
{
    var loginName;
    var loginPassword;

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

            // Convert to JSON
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
            else
            {
                // Valid user move to /Main
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.userId}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/Main';
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

        <div className="main_pane">

            <form onSubmit={DoLogin}>

                <div className="fields" style={{"height": "20vh"}}>

                    <input type="text" id="loginName" placeholder="Username" 
                        ref={(c) => loginName = c} /><br /> 
                    <input type="password" id="loginPassword" placeholder="Password" 
                        ref={(c) => loginPassword = c} /><br />

                    <span id="loginResult">{message}</span>

                </div>

                <div className="buttons"  style={{"height": "30vh"}}>

                    <input type="submit" id="loginButton" class="buttons" value = "Login"
                        onClick={DoLogin} />

                    <LoginG className="login_g_button">Login with Google</LoginG>

                    <LinkP className="forgot_link">Forgot Password</LinkP>

                    <Link id="create_link" to="/Register">Create Account</Link>

                </div>

            </form>

        </div>
    );
};

export default CenterDiv;