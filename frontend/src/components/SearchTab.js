import React from 'react';
import tab_search_dark from '../images/tab_search_dark.png'
import tab_search_light from '../images/tab_search_light.png'
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
    cursor: pointer;    

    // display: flex;
    justify-content: center;
    // letter-spacing: 0.1em;
    // z-index: 4;
`

export const SearchTab = (props) =>{
    return (props.selected) ? (
        // light tab
        <div className="tab" onClick={props.customOnClick}>
            <img className="search_tab" src={tab_search_light} alt="Lists" style={{"width":"auto", "height":"105%"
            ,"objectFit":"cover", "display":"block","marginLeft": "auto","marginRight":"auto"}}></img>
            <Text className={props.className}>{props.children}</Text>
        </div>  
    ):(
        // dark tab
        <div className="tab" onClick={props.customOnClick}>
        <img className="search_tab" src={tab_search_dark} alt="Lists" style={{"width":"auto", "height":"100%"
        ,"objectFit":"cover", "display":"block","marginLeft": "auto","marginRight":"auto"}}></img>
        <Text className={props.className}>{props.children}</Text>
    </div>  
    );
}

