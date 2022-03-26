import React from 'react';
import logo from '../images/LG_logo.png';
import '../App.css';

// This makes Title component reusable
export const Title = ({className}) =>{
    return (
        <div className={className} style={{"height":"100px", "overflowX":"auto"}}>Things 2 Do
            <img className="logo" src={logo} alt="Logo"></img>
        </div>  
    )
}