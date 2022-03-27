import React from 'react';
import '../App.css';
import { Title } from './Title';
import { Buttonb } from './Button';
import styled from 'styled-components'

// this left-aligns Title
const MainTitle = styled(Title)`
margin-left: 0px;
float:left;
`
const MarginButton = styled(Buttonb)`
width: 163px;
height: 114px;
`

function TopMarginMain() {
  return (
    <div style={{"display":"flex", "gap": "20vh",  "margin-bottom":"40px"}}>
      <MainTitle className="title"/>
      <MarginButton button_id="suprise"  button_text="Suprise Me!"/>
      <MarginButton button_id="logout"  button_text="Logout"/>
    </div>  
  );
}

export default TopMarginMain;