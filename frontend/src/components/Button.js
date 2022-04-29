import React from 'react';
import styled from 'styled-components'

const Button = styled.input`
margin-top: 50px;
width: 163px;
height: 114px;
cursor: pointer;

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

export const Buttonb = ({className, button_id, button_text, onClick}) =>{
    return(
        <Button type="button"id={button_id} className={className} value = {button_text}
        onClick={onClick} />
    )
}