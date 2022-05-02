import React from 'react';
import styled from 'styled-components'

const Button = styled.textarea`
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
font-family: 'Denk One';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 1.2em
text-align: center;

color: #001A5E;
background: #20CEF2;
border-radius: 14px;
align:center;
margin:0px;
padding:0px;
border-width:0px;
resize:none;
`

export const Buttonc = ({className, button_id, placeholder, onClick}) =>{
    return(
        // readOnly for true just to get rid of errors in debugging.
        <Button id={button_id} className={className} placeholder = {placeholder}
        onClick={onClick}/>
    )
}