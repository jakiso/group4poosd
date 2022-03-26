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

    // display: flex;
    justifyContent: center;
    // letter-spacing: 0.1em;
    // z-index: 4;
`

// This makes Title component reusable
export const SearchTab = ({children, className}) =>{
    return (
        <div className="tab" >
            <img className="search_tab" src={tab_search_dark} alt="Lists" style={{"width":"auto", "height":"100%"
            ,"objectFit":"cover", "display":"block","margin-left": "auto","margin-right":"auto"}}></img>
            <Text className={className}>{children}</Text>
        </div>  
    )
}

