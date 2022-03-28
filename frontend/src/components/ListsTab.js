import React from 'react';
import tab_list from '../images/tab_list_light.png'
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
    justify-content: center;
`
// This makes Title component reusable
export const ListsTab = ({children, className}) =>{
    return (
        <div className="tab">
            <img className="lists_tab" src={tab_list} alt="Lists" style={{"width":"auto", "height":"100%"
            ,"object-fit":"cover", "display":"block","margin-left": "auto","margin-right":"auto", "padding-left":"20px", "padding-right":"20px"}}></img>
             <Text className={className}>{children}</Text>
        </div>  
    )
}