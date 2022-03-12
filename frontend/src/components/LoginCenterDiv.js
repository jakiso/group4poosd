import React from 'react';
import '../App.css';
import { Field } from './Field';
import { Buttonb } from './Button';
import { LinkP } from './LinkP';
import styled from 'styled-components';

const LoginG = styled(Buttonb)`
  line-height: 33px;
`

function CenterDiv(){
    return(

      <div className="main_pane">

        <div className="fields" style={{"height": "20vh"}}>
        
        <Field className="user_name">&emsp;Username</Field>

        <Field className="password">&emsp;Password</Field>

        </div>

        <div className="buttons"  style={{"height": "30vh"}}>

        <Buttonb className="login_button">Login</Buttonb>

        <LoginG className="login_g_button">Login with Google</LoginG>

        <LinkP className="forgot_link">Forgot Password</LinkP>

        <LinkP className="create_link">Create Account</LinkP>

        </div>

      </div>
    );
}

export default CenterDiv;