import React from 'react';
const app_name = 'letsdothings'
import React, {useState} from 'react';

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

function Login()
{

    var username;
    var password;

    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {username:username.value,password:password.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('http://localhost:5000/login',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('Username/password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/login';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return(
      <div id="loginDiv">
        <form onSubmit={doLogin}>
        <span id="inner-title">PLEASE LOG IN</span><br />
        <input type="text" id="loginName" placeholder="Username" 
            ref={(c) => loginName = c} />
        <input type="password" id="loginPassword" placeholder="Password" 
            ref={(c) => loginPassword = c} />
        <input type="submit" id="loginButton" class="buttons" value = "Do It"
          onClick={doLogin} />
        </form>
        <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;
