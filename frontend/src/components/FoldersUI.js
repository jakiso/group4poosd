import React from 'react';
import { Buttonb } from './Button';
import styled from 'styled-components';
import '../App.css';


const MarginButton = styled(Buttonb)`
width: 100%;
height: 110px;
`

function FoldersUI()
{
    return(
        <div style={{"display":"grid", "row-gap": "1rem", "top":"0px", "margin":"30%"}}>
            <MarginButton button_text="Favorites"/>
            <MarginButton button_text="List 1"/>
            <MarginButton button_text="List 2"/>
            <MarginButton button_text="List 3"/>
        </div>
    );
};

export default FoldersUI;