import React from 'react';
import '../App.css';
import { Field } from './Field';
import { Buttonb } from './Button';

function CenterDiv(){
    return(

      <div className="main_pane">

        <div className="fields" style={{"height": "40vh"}}>
        
        <Field className="first_name">&emsp;First Name</Field>

        <Field className="last_name">&emsp;Last Name</Field>
        
        <Field className="user_name">&emsp;Username</Field>

        <Field className="email">&emsp;Email</Field>

        <Field className="password">&emsp;Password</Field>

        <Field className="password_confirm">&emsp;Confirm Password</Field>

        </div>

        <div className="buttons">

        <Buttonb>Sign Up</Buttonb>

        </div>

      </div>
    );
}

export default CenterDiv;