import React from 'react';
import arc from '../images/arc_tab.png';
import '../App.css';
import styled from 'styled-components'

const Text = styled.text`
    color:#FEFFDC;
    position: absolute;
    font-family: Denk One;
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 160px;

    display: flex;
    justify-content: center;
    letter-spacing: 0.1em;
    z-index: 4;
`

export const LongTab = ({children, className}) =>{
    return(
        <div className="tab">
            <img className="arc" src={arc} alt="Arc" style={{"width":"581px", "height":"100"
            ,"objectFit":"cover", "display":"block","marginLeft": "auto","marginRight":"auto"}}></img>
            <Text className={className}>{children}</Text>
        </div>
    )
}