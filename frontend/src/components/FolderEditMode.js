import React, { useState, useEffect } from 'react';
import { Buttonb } from './Button';
import styled from 'styled-components';
import '../App.css';
import del from '../images/cross_delete.png';
import rename from '../images/LG_edit_pen.png';



function FolderEditMode(props){
    return (props.trigger) ? (

//this div contains the folder delete cross and edit pen icons (for edit mode)
<div style={{"display":"flex", "justify-content":"center", "column-gap":"4vh", "margin-top":"1vh", "overflow":"auto"}}>
    <div style={{"height":"40px", "width":"40px", "overflow":"auto"}}>
        <img src={del} alt="delete" style={{"width":"100%", "height":"100%"}}></img>
    </div>  
    <div style={{"height":"30px", "width":"30px", "overflow":"auto", "objectFit":"contain", "padding-top":"5px"}}>
        <img src={rename} alt="rename" style={{"width":"100%", "height":"100%"}}></img>
    </div>  
</div>
    ) : "";

}

export default FolderEditMode;