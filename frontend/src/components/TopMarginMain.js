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

  let List = useList();

    // Save the place to be put in a folder
    const Surprise = async (e) => {

      e.preventDefault();

      console.log("Surprise!");
      console.log(List);

      if (List.length != 0 && List.length != undefined) 
      {
        const num = Math.floor(Math.random() * List.length);

        console.log(List[num]);
       
        let text = (List[num].props == undefined) 
        ? "You should checkout:\n" + List[num].placeName + "\n" + List[num].placeAddress  + "\n" + List[num].placePhone
        : "You should checkout:\n" + List[num].props.Name + "\n" + List[num].props.Address  + "\n" + List[num].props.PhoneNumber;
        // console.log(text); 

        if (window.confirm(text) == true)
        {
          window.location.href = (List[num].props == undefined) ? List[num].placeWebsite : List[num].props.placeWebsite;
        }
      }
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