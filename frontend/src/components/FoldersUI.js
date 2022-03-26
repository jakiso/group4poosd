import React from 'react';
import { Buttonb } from './Button';
import styled from 'styled-components';
import '../App.css';


const ListButton = styled(Buttonb)`
width: 100%;
height: 110px;
`

function FoldersUI()
{
    return(
        <div style={{"display":"grid", "row-gap": "1rem", "top":"0px", "margin":"10%", "alignContent":"center"}}>
            <ListButton button_text="Favorites"/>
            <ListButton button_text="List 1"/>
            <ListButton button_text="List 2"/>
            <ListButton button_text="List 3"/>
        </div>
    );
};

export default FoldersUI;