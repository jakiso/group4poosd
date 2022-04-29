import React, { useState, useCallback } from 'react';

import '../App.css';
import { isExpired, decodeToken } from "react-jwt";
import { useHistory } from 'react-router-dom';

function getUserId() {
    var user;
    var userId;
    try {
        user = localStorage.getItem('user_data')
        userId = user.id
    }
    catch (e) {
        console.log(e.message);
    }

    return user;
}

function CenterDiv(){
    var Newfirstname;
    var Newlastname;
    var Newusername;
    var Newpassword;
    var Newconfirmpassword;
    var userId = getUserId();
    var jsonId = JSON.parse(userId);
    userId = jsonId.id;
    const navigate = useHistory();
    const redirectToMain = useCallback(() => navigate.push('/'), [navigate]);

    const [message,setMessage] = useState('');
    const doChangeAccount = async event => 
    {
        event.preventDefault();
        // retrive userID
        var storage = require('../tokenStorage.js');
        // Creates object for all form fields
        var obj = {userId:userId, NewPassword:Newpassword.value, Newfirstname:Newfirstname.value, Newlastname:Newlastname.value, Newusername:Newusername.value, jwToken:storage.retrieveToken(), Newconfirmpassword:Newconfirmpassword.value};
            console.log(userId.value, Newfirstname.value+"\n\n\n\n\n");
        // Loop through the object and check to make sure the value are not empty
       // for(const [key, value] of Object.entries(obj)) 
       // {
            // Use string trim function to remove leading and trailing whitespace
       //     obj[key] = value.trim();

            // Check if any entry field is empty and stop the submission and let the user know
        //    if (obj[key] == "") {
        //        setMessage(`${key} is empty`);
        //        return;
          //  }
     //   }

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
            // Send object to changeaccount
            const response = await fetch(bp.buildPath('changeUserSettings'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

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
            setMessage('');
            redirectToMain();

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
                    <input type="text" id="NewfirstName" placeholder="New First Name?" 
                        ref={(c) => Newfirstname = c} /> <br /> 
                    <input type="text" id="NewlastName" placeholder="New Last Name?" 
                        ref={(c) => Newlastname = c} /> <br /> 
                    <input type="text" id="Newusername" placeholder="New Username?" 
                        ref={(c) => Newusername = c} /> <br /> 
                    <input type="password" id="Newpassword" placeholder="New Password?" 
                        ref={(c) => Newpassword = c} /> <br /> 
                    <input type="password" id="NewconfirmPassword" placeholder="Confirm New Password" 
                        ref={(c) => Newconfirmpassword = c} /> <br /> 
                </div>
                <div className="buttons" style={{"display": "flex"}}>
                    <input type="submit" id="changeaccount" className="buttons" value = "Submit"
                        onClick={()=>{doChangeAccount();}} />
                </div>
            </form>
        </div>
    );
}

export default CenterDiv;

