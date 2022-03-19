import React, { useState } from 'react';
import '../App.css';
import { Field } from './Field';
import { Buttonb } from './Button';

function CenterDiv(){
    var firstName;
    var lastName;
    var username;
    var email;
    var password;
    var confirmPassword;
  
    const [message,setMessage] = useState('');
  
    const app_name = 'letsdothings'
  
    // B added
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }
  
  
    /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - connects to Login API - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  
  
    const doRegister = async event => 
    {
        event.preventDefault();

        if(firstName.value!="" && lastName.value!=""&& username.value!=""&& email.value!=""&& password.value!=""){
        var obj = {firstName:firstName.value, lastName:lastName.value, username:username.value, 
          email:email.value, password:password.value};
        var js = JSON.stringify(obj);
        var ts = 0;
        var bp = require('./Path.js');
  
        try
        {  
            //connects front-end to backend
            // B fixes this from local to heroku (uses buildPath)
            const response = await fetch(bp.buildPath('register'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
  
            var res = JSON.parse(await response.text());

            setMessage('Your account has been created!');
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }    
      }else{
        setMessage('Looks like your missing some information');
      }
    };
    

    return(

      <div className="main_pane">

        <form onSubmit={doRegister}>

        <div className="fields" style={{"height": "40vh"}}>

        <input type="text" id="firstName" placeholder="First Name" 
        ref={(c) => firstName = c} /><br /> 

        <input type="text" id="lastName" placeholder="Last Name" 
        ref={(c) => lastName = c} /><br /> 

        <input type="text" id="username" placeholder="Username" 
        ref={(c) => username = c} /><br /> 

        <input type="text" id="email" placeholder="Email" 
        ref={(c) => email = c} /><br /> 

        <input type="text" id="password" placeholder="Password" 
        ref={(c) => password = c} /><br /> 

        <input type="text" id="confirmPassword" placeholder="Confirm Password" 
        ref={(c) => confirmPassword = c} /><br /> 

        <span id="loginResult" style={{"margin-top": "10px"}}>{message}</span>


        </div>

        <div className="buttons" style={{"margin-top": "50px"}}>
        <input type="submit" id="signUpButton" class="buttons" value = "Sign Up"
          onClick={doRegister} />

        </div>

        </form>

      </div>
    );
}

export default CenterDiv;