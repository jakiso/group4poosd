import React, { useState } from 'react';
import '../App.css';
import { Field } from './Field';
import { Buttonb } from './Button';
import { LinkP } from './LinkP';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useJwt } from "react-jwt";


const LoginG = styled(Buttonb)`
  line-height: 33px;
`

function CenterDiv(){


  var loginName;
  var loginPassword;

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


  const doLogin = async event => 
  {
      event.preventDefault();

      var obj = {username:loginName.value,password:loginPassword.value};
      var js = JSON.stringify(obj);

      try
      {  
          var bp = require('./Path.js');
          //connects front-end to backend
          // B fixes this from local to heroku (uses buildPath)
          const response = await fetch(bp.buildPath('login'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
          
          var res = JSON.parse(await response.text());

          if( res.userId <= 0 )
          {
              setMessage('User/Password combination incorrect');
          }
          else
          {
              var user = {firstName:res.firstName,lastName:res.lastName,id:res.userId}
              localStorage.setItem('user_data', JSON.stringify(user));

              setMessage('');
              window.location.href = '/Main';
          }
      }
      catch(e)
      {
          console.log(e.toString());
          return;
      }    
  };


    return(

      <div className="main_pane">

        <form onSubmit={doLogin}>


        <div className="fields" style={{"height": "20vh"}}>
        
        <input type="text" id="loginName" placeholder="Username" 
        ref={(c) => loginName = c} /><br /> 
        <input type="password" id="loginPassword" placeholder="Password" 
        ref={(c) => loginPassword = c} /><br />

        <span id="loginResult">{message}</span>

        </div>

        <div className="buttons"  style={{"height": "30vh"}}>

        <input type="submit" id="loginButton" class="buttons" value = "Login"
          onClick={doLogin} />

        <LoginG className="login_g_button">Login with Google</LoginG>

        <LinkP className="forgot_link">Forgot Password</LinkP>

        <Link id="create_link" to="/Register">Create Account</Link>

        </div>

        </form>

      </div>
    );
};

export default CenterDiv;