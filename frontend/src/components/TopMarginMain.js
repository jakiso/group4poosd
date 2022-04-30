import React, {useCallback} from 'react';
import '../App.css';
import { Title } from './Title';
import { Buttonb } from './Button';
import styled from 'styled-components'
import { LogoutButton } from './Logout';
import { useHistory } from 'react-router-dom';
import { useList } from "./ListContext";

// this left-aligns Title
const MainTitle = styled(Title)`
margin-left: 0px;
float:left;
`
const MarginButton = styled(Buttonb)`
width: 163px;
height: 114px;
`

function TopMarginMain(props) {
  const navigate = useHistory();
  const AccountSettings = useCallback(() => navigate.push('/AccountSettings'), [navigate]);

  const List = useList();

    // Save the place to be put in a folder
    const Surprise = async (e) => {

      e.preventDefault();

      // // Used to set the mode to save a place.
      // props.setSaveToListMode(true);

      // console.log("Saving Place");


      // // Store the place info locally
      // var placeToSave = { 
      //                     placeName: props.Name, 
      //                     placeAddress: props.Address, 
      //                     placePhone: props.PhoneNumber, 
      //                     placeRating: props.Rating
      //                 };
      // localStorage.setItem('place_data', JSON.stringify(placeToSave));

      console.log("Surprise!");
      console.log(List);
    }

  return(props.loggedInState)?(
    // <div  style={{ "marginLeft":"auto", "marginRight":"auto"}}>
    <div style={{"display":"flex", "gap": "10vh",  "marginBottom":"40px", "width":"100%"}}>
      <MainTitle className="title"/>
      <MarginButton button_id="account"  button_text="Account" onClick={AccountSettings}/>
      <MarginButton button_id="surprise"  button_text="Surprise Me!" onClick={(e) => Surprise(e)}/>
      {/* <MarginButton button_id="logout"  button_text="Logout" onClick={()=>{delete_token(); handleOnClick();}}/> */}
      <LogoutButton loggedInState={props.loggedInState}/>
    </div>
    // </div>
  ):(
    // <div  style={{ "marginLeft":"auto", "marginRight":"auto"}}>
    <div style={{"display":"flex", "gap": "10vh", "marginBottom":"40px", "width":"100%", "marginLeft":"auto", "marginRight":"auto"}}>
    <MainTitle className="title"/>
    {/* <MarginButton button_id="logout"  button_text="Logout" onClick={()=>{delete_token(); handleOnClick();}}/> */}
    <LogoutButton loggedInState={props.loggedInState}/>
    </div>
    // </div>
  );
}

export default TopMarginMain;