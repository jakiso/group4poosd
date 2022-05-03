import React from 'react';
import styled from 'styled-components'
import { Buttonc } from './CardButton';
import minus from '../images/minus.png';
import {Website} from './Website';
import { LinkStyled } from './LinkStyled';
import {Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import defaultPic from '../images/LG_globe.png'

const Card = styled.div`
// margin-top: 50px;

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

width: 100%;
height: 300px;
`
const ListButton = styled(Buttonc)`
width: 100%;
height: 50px;
cursor: default;
`
const Description = styled(Buttonc)`
width: 50%;
height: auto;
padding: 10%;
overflow:hidden;
`

export const Cardc = (props) =>{
    console.log(props)
    var res;

//     // Save the place to be put in a folder
//     const SavePlace = async (e) => {

//         e.preventDefault();

//         // Used to set the mode to save a place.
//         props.setSaveToListMode(true);

//         console.log("Saving Place");


//         // Store the place info locally
//         var placeToSave = { 
//                             placeName: props.Name, 
//                             placeAddress: props.Address, 
//                             placePhone: props.PhoneNumber, 
//                             placeRating: props.Rating,
//                             placeWebsite: props.placeWebsite,
//                             placeImg: props.src
//                         };
//         localStorage.setItem('place_data', JSON.stringify(placeToSave));

//         console.log(placeToSave);
//     }


    // Save the place to be put in a folder
    const DeleteFriend = async (e) => {
        // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');

        // The object to be sent to the api, must contain folderId and jwToken field
        var obj = {friendId:props.friendId, jwToken:storage.retrieveToken()};
        var js = JSON.stringify(obj);

        // Path to send the api call
        var bp = require('./Path.js');

        // grabbing folder name to display in window prompt.
        try {
            
            const folder = await fetch(bp.buildPath('deleteFriend'), {method:'POST', body:js, headers:{'Content-Type':'application/json'}});
            res = JSON.parse(await folder.text());

            // if cancel button is clicked on deleting a folder, return out of function and dont delete.
            if (!window.confirm('Confirm deletion of Friend.'))
                return;
        } 
        catch(e) {
            console.log(e.toString());
        }

        try
        {
            // Request folders and JWT
            const response = await fetch(bp.buildPath('deleteFriend'), {method:'POST',body:js,headers:{'Content-Type':'application/json'}});

            // Wait for response and parse json
            res = JSON.parse(await response.text());

            // Check the error field. empty error is good
            if( res.error && res.error.length > 0 )
            {
                console.log(res.error);
            }
            else
            {
                // Store the received refreshed JWT
                storage.storeToken( res.jwToken ); 

                props.setUpdate(true);      
                props.setUpdate(false);                 
                props.setUpdate(true); 
                props.setUpdate(false);                
            }
        }
        catch(e)
        {
            console.log(e.toString());
        }
    }

    function decidePic(){
        if (props.src === undefined)
            return defaultPic;
        else
            return props.src;
    }


    return(                                                     // margin: top right bottom left
        <Card style={{"display":"flex", "gap": "0vh", "overflow":"hidden"}}>            
        <div style={{"display":"flex", "gap": "2vh", "margin":"2%", "width":"100%"}}>    
        <div style={{"height":"200rem","width":"20%", "overflow":"hidden", "margin":"0% 0% 20% 0%"}}>
            <img width={"100rem"} height={"100rem"} src={decidePic()} alt="Event"/><br/><br/>
            <p>Rating {props.Rating}</p><br/>
            <img width={"40rem"} height={"auto"} src={minus} alt="Event" style={{"cursor":"pointer"}} onClick={(e) => DeleteFriend(e)}/>
        </div> 
        <div style={{"display":"grid", "width":"40%", "height":"100%", "overflow":"auto",}}>
            <ListButton button_text={props.Name}/>
            <ListButton button_text={props.Address}/>
            <ListButton button_text={props.PhoneNumber}/>
            <ListButton button_text={props.MoreInfo}/>
            
        </div> 
        <div style={{"width":"40%", "overflow":"hidden", "margin":"auto"}}>
            <Description button_text={props.DescriptionText}/>
        </div>  
        </div></Card>
    )
}