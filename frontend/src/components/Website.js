import React from 'react';
import styled from 'styled-components'
import '../App.css'

const Button = styled.textarea`
width: 100%;
height: 50px;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
font-family: 'Denk One';
font-style: normal;
font-weight: 400;
font-size: 24px;
// line-height: 30px;
text-align: center;
cursor: pointer;

text-decoration: underline;
color: blue;
background: #20CEF2;
border-radius: 14px;
align:right;
margin:0px;
padding:0px;
border-width:0px;
resize:none;
`

export const Website = (props) => {

    function toWebsite() {
        window.open(props.url)
    }

    return (
        <Button id='link' onClick={toWebsite} placeholder={props.button_text} readOnly={true}/>
    )
}