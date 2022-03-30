import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../App.css';
import FolderEditMode from './FolderEditMode';

const Folder = styled.div`
margin-top: 50px;
width: 100%;
height: 140px;

filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
font-family: 'Denk One';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 30px;
text-align: center;

color: #FEFFDC;
background: #001A5E;
border-radius: 14px;
align:right;
column-gap: 1rem;
`

function ListButton({className, button_id, button_text, onClick, trigger_bool}){
    return (
        <div>
        <Folder type="button"id={button_id} className={className}
        onClick={onClick}>
            <br/>
            <p>{button_text}</p>
            <FolderEditMode trigger={trigger_bool}/>
        
        </Folder>
        </div>
    )

}

export default ListButton;