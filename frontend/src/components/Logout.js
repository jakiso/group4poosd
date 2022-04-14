import React, {useState, useCallback, useEffect} from 'react';
import { Buttonb } from './Button';
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';

const Button = styled.input`
margin-top: 50px;
width: 163px;
height: 114px;

filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
font-family: 'Denk One';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 30px;
text-align: center;

color: #FEFFDC;
background: #001A5E;
border-radius: 14px;
align:right;
column-gap: 1rem;
`

export const LogoutButton = ({className, button_id, button_text, onClick}) =>{

    const navigate = useHistory();
    const handleOnClick = useCallback(() => navigate.push('/Login'), [navigate]);
    var [loggedInState, setLoggedInState] = useState(false);
  
    function delete_token(){ 
      // document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      localStorage.removeItem('token_data');
      localStorage.removeItem('user_data');
      sessionStorage.removeItem('token_data')
      sessionStorage.removeItem('user_data');
    }

    function checkLoggedIn(){
        if(localStorage.getItem('user_data') !== null){
            setLoggedInState(true);
        } else {
            setLoggedInState(false);
        };
    }

    useEffect(() => {
        checkLoggedIn();
    });

    try{
    return(loggedInState)?(
        <Buttonb button_id="logout"  button_text="Logout" onClick={()=>{delete_token(); handleOnClick();}}/>
    ):(  
        <div>    
        <Buttonb button_id="login"  button_text="Login" onClick={()=>{handleOnClick();}}/>
        {/* {checkLoggedIn()} */}
        </div>  
    );
    }catch(e){}
}