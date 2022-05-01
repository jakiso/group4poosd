import React from 'react';
import greyTab from '../images/grey_out_tab.png'
import '../App.css';
import styled from 'styled-components'

const Text = styled.text`
    color:#FEFFDC;
    position: absolute;
    font-family: Denk One;
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    top: 0px;
    padding: 15px;

    // display: flex;
    justify-content: center;
    // letter-spacing: 0.1em;
    // z-index: 4;
`

export const GreyOutTab = (props) =>{
    return (
        <div className="tab" onClick={props.customOnClick}>
        <img className="search_tab" src={greyTab} alt="Lists" style={{"width":"auto", "height":"105%"
        ,"objectFit":"cover", "display":"block","marginLeft": "auto","marginRight":"auto"}}></img>
        <Text className={props.className}>{props.children}</Text>
        </div>  
    )
}
