import React from 'react';
import styled from 'styled-components'

const Button = styled.textarea`
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
font-family: 'Denk One';
font-style: normal;
font-weight: 400;
font-size: 24px;
// line-height: 30px;
text-align: center;

color: #001A5E;
background: #20CEF2;
border-radius: 14px;
align:right;
margin:0px;
padding:0px;
border-width:0px;
resize:none;
`

export const Buttonc = ({className, button_id, button_text, onClick}) =>{
    return(
        // readOnly for true just to get rid of errors in debugging.
        <Button id={button_id} className={className} value = {button_text}
        onClick={onClick} readOnly={true}/>
    )
}