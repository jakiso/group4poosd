import React, {useState, useCallback, useEffect} from 'react';
import { Buttonb } from './Button';
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';

export const LogoutButton = (props) =>{

    const navigate = useHistory();
    const handleOnClick = useCallback(() => navigate.push('/Login'), [navigate]);
      
    function delete_token(){ 
      // document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      localStorage.removeItem('token_data');
      localStorage.removeItem('user_data');
      localStorage.removeItem('place_data');
      sessionStorage.removeItem('token_data');
      sessionStorage.removeItem('user_data');
      sessionStorage.removeItem('place_data');
    }

    try{
    return(props.loggedInState)?(
        <Buttonb button_id="logout"  button_text="Logout" onClick={()=>{delete_token(); handleOnClick();}}/>
    ):(  
        <Buttonb button_id="login"  button_text="Login" onClick={()=>{handleOnClick();}}/>  
    );
    }catch(e){}
}