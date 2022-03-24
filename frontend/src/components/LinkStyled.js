import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export const LinkStyled = ({className, route, link_text}) =>{
    return(
        <Link className={className} to={route}>{link_text}</Link>    
        )
}