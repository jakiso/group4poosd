import React from 'react';
import styled from 'styled-components'
import { Buttonc } from './CardButton';
import cross from '../images/cross_add.png';
import {Website} from './Website';
import defaultPic from '../images/LG_globe.png';
import minus from '../images/minus.png';
import { useUpdateList } from './ListContext';
import { useList } from "./ListContext";

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

export const Carda = (props) =>{
    // console.log(props);
    let add = true;

    // Save the place to be put in a folder
    const SavePlace = async (e) => {

        e.preventDefault();

        // Used to set the mode to save a place.
        props.setSaveToListMode(true);

        console.log("Saving Place");


        // Store the place info locally
        var placeToSave = { 
                            placeName: props.Name, 
                            placeAddress: props.Address, 
                            placePhone: props.PhoneNumber, 
                            placeRating: props.Rating,
                            placeWebsite: props.placeWebsite,
                            placeImg: props.src,
                            placeDescription: props.DescriptionText
                        };
        localStorage.setItem('place_data', JSON.stringify(placeToSave));

        console.log(placeToSave);
    }

    // the place picture.
    function decidePic(){
        if (props.src === undefined)
            return defaultPic;
        else
            return props.src;
    }

    async function deletePlace(){
        let ret;

        var bp = require('./Path.js');

        // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');
                
        // The user data is stored as text and needs to be turned into an object
        var data = JSON.parse(localStorage.user_data);

        // The object to be sent to the api, must contain userId and jwToken field
        var theSentPlace = {folderId:props.buttonId, placeName:props.Name, placeAddress:props.Address, jwToken:storage.retrieveToken()};
        var theFormatPlace = JSON.stringify(theSentPlace);

        tempList = List;
        // console.log(tempList);
        // console.log(props);
        // console.log(props.Name);
        // console.log(tempList[1].placeName);

        try {
            const response = await fetch(bp.buildPath('deletePlace'), {method:'POST', body:theFormatPlace, headers:{'Content-Type':'application/json'}});
            ret = JSON.parse(await response.text());


        }catch(e) {
            console.log(ret)
        }
        
        // need to update the list context around here after deleting the place.
        List = tempList.filter(tempList => tempList.placeName !== props.Name);
        
        // console.log(List);
        updateList(List);

    }

    let List = useList();
    let updateList = useUpdateList();
    let tempList = useList();

    // for the minus button.
    function showX() {
        if (props.buttonId === undefined)
        {
            add = true;
            return cross;
        }
            
        else
        {
            add = false;
            return minus;
        }
            
    }

    function showPlus(){
        if (props.buttonId === 0)
            return {"display":"none"};
        else
            return {"cursor":"pointer"};
    }


    return(                                                     // margin: top right bottom left
        <Card style={{"display":"flex", "gap": "0vh", "overflow":"hidden"}}>            
        <div style={{"display":"flex", "gap": "2vh", "margin":"2%", "width":"100%"}}>
        {/* <img src={redX} style={showX()} onClick={() => {deletePlace()}}/> */}
        <div style={{"height":"200rem","width":"20%", "overflow":"hidden", "margin":"0% 0% 20% 0%"}}>
            <img width={"100rem"} height={"100rem"} src={decidePic()} alt="Event"/><br/><br/>
            <p>Rating {props.Rating}</p><br/>
            <img width={"40rem"} height={"auto"} src={showX()} alt="Event" style={showPlus()} onClick={(e) => {
                if (add === true) SavePlace(e)
                else deletePlace()}}/>
        </div> 
        <div style={{"display":"grid", "width":"40%", "height":"100%", "overflow":"auto",}}>
            <ListButton button_text={props.Name}/>
            <ListButton button_text={props.Address}/>
            <ListButton button_text={props.PhoneNumber}/>
            <Website url={props.placeWebsite} button_text='Website'/>
            
        </div> 
        <div style={{"width":"40%", "overflow":"hidden", "margin":"auto"}}>
            <Description button_text={props.DescriptionText}/>
        </div>  
        </div></Card>
    )
}