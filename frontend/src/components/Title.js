import React from 'react';
import logo from '../images/LG_logo.png';
import '../App.css';

// This makes Title component reusable
export const Title = ({className}) =>{
    return (
        <div className={className} style={{"height":"150px", "overflowX":"visible"}} onClick={()=>{window.location.href = '/Main'}}>LetsDoThings
            <img className="logo" src={logo} alt="Logo"></img>
        </div>  
    )
}