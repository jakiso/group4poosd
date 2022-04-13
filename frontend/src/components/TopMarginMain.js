import React, {useCallback} from 'react';
import '../App.css';
import { Title } from './Title';
import { Buttonb } from './Button';
import styled from 'styled-components'
import { LogoutButton } from './Logout';
import { useHistory } from 'react-router-dom';

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

  const navigate = useHistory();
  const AccountSettings = useCallback(() => navigate.push('/AccountSettings'), [navigate]);

  return (
    <div style={{"display":"flex", "gap": "20vh",  "marginBottom":"40px"}}>
      <MainTitle className="title"/>
      <MarginButton button_id="account"  button_text="Account" onClick={AccountSettings}/>
      <MarginButton button_id="suprise"  button_text="Suprise Me!"/>
      {/* <MarginButton button_id="logout"  button_text="Logout" onClick={()=>{delete_token(); handleOnClick();}}/> */}
      <LogoutButton/>
    </div>
  );
}

export default TopMarginMain;