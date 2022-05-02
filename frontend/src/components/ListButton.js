import { useUpdateList } from './ListContext';
import { useList } from "./ListContext";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../App.css';
import EditIconsDiv from './EditIconsDiv';

const List = styled.div`
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

const RenameInput = styled.input`
width: 80%;
height: auto;

filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
font-family: 'Denk One';
font-style: normal;
font-weight: 400;
font-size: 25px;
line-height: 30px;
text-align: left;
border: none;
text-align: center;

color: #FEFFDC;
background: #001A5E;
border-radius: 14px;
align:right;
columnGap: 1rem;
`

function ListButton(props){
    
    // console.log(props);
    const [tempList, setTempList] = useState([]);

    const updateList = useUpdateList();
    // updateList(tempList);

    useEffect(() => {

        console.log("list update in button");
        console.log(tempList);

        updateList(tempList);

    }, [tempList]);

    // Retrive List from folder when clicked
    const RetrieveList = async (e) => {

        e.preventDefault();

        // console.log("RetrievingFromList");

        // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');

        // The user data is stored as text and needs to be turned into an object
        var data = JSON.parse(localStorage.user_data);

        // The object to be sent to the api, must contain userId and jwToken field
        var listReq = {userId:data.id, folderId:parseInt(e.target.id), jwToken:storage.retrieveToken()};
        var sendReq = JSON.stringify(listReq);

        // console.log(listReq);

        // Path to send the api call
        var bp = require('./Path.js');

        // document.getElementById(e.target.id).parentElement.children.backgroundColor="black";

        var children = document.getElementById(e.target.id).parentElement.children;
        for (var i = 0; i < children.length; i++) {
        children[i].style.backgroundColor="#001A5E";
        // Do stuff
        }

        document.getElementById(e.target.id).style.backgroundColor='#20CEF2';


        try
        {
            const responseList = await fetch(bp.buildPath('placesFromFolder'), {method:'POST',body:sendReq,headers:{'Content-Type':'application/json'}});

            // console.log("retrieving lists");

            // Wait for response and parse json
            const folderList = JSON.parse(await responseList.text());
            console.log(folderList.message)

            // Check the error field. empty error is good
            if( folderList.error && folderList.error.length > 0 )
            {
                // setMessage( "API Error:" + folderList.error);
                console.log( "API Error:" + folderList.error);
            }
            else
            {
                // Store the received refreshed JWT
                storage.storeToken( folderList.jwToken );

                // Now we have the list of places from each individual folder
                // console.log(folderList.message);
                // console.log(List);

                    setTempList(folderList.message);
            }
        }
        catch(e)
        {
            // setMessage(e.toString());
            console.log(e.toString());
        }
    }

    // Inserting to List from folder when clicked
    const insertList = async (e) => {

        e.preventDefault();

        console.log("InsertingToList");

        // // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');

        // The place data is stored as text and needs to be turned into an object
        var placeData = JSON.parse(localStorage.place_data);
        var imgUrl = '';

        if (placeData.placeImg !== undefined)
        {
            imgUrl = placeData.placeImg;
        }

        // The object to be sent to the api, must contain folderId, jwToken, and place fields
        var savePlaceReq = {
                                folderId: parseInt(e.target.id), 
                                jwToken: storage.retrieveToken(),
                                placeName: placeData.placeName, 
                                placeAddress: placeData.placeAddress, 
                                placePhone: placeData.placePhone, 
                                placeRating: placeData.placeRating,
                                placeWebsite: placeData.placeWebsite,
                                placeDescription: placeData.placeDescription,
                                placeImg: imgUrl
                            };
        var sendReq = JSON.stringify(savePlaceReq);

        // console.log(savePlaceReq);
        // console.log(sendReq);

        // Delete the place_data local storage
        localStorage.removeItem('place_data');
        sessionStorage.removeItem('place_data');

        // Path to send the api call
        var bp = require('./Path.js');

        try
        {
            const responseSave = await fetch(bp.buildPath('savePlace'), {method:'POST',body:sendReq,headers:{'Content-Type':'application/json'}});

            console.log("saving place");

            // Wait for response and parse json
            const saveRes = JSON.parse(await responseSave.text());

            // Check the error field. empty error is good
            if( saveRes.error && saveRes.error.length > 0 )
            {
                // setMessage( "API Error:" + saveRes.error);
                console.log( "API Error:" + saveRes.error);
            }
            else
            {
                // Store the received refreshed JWT
                storage.storeToken( saveRes.jwToken );

                // Now we have the list of places from each individual folder
                // console.log(saveRes);
                // console.log(saveRes.message);
            }
        }
        catch(e)
        {
            // setMessage(e.toString());
            console.log(e.toString());
        }

        props.setSaveToListMode(false);
    }

    // in the case that this is a new list 
    return (props.newListMode===true) ? (

        <List key={props.button_id} type="button" id={props.button_id} className={props.className} onClick={(props.saveToListMode) ? (e) => insertList(e) : (e) => RetrieveList(e)} >
            <br/>
            <RenameInput id="new_list" placeholder="new list" maxLength="10" disabled={props.isDisabled} 
                onChange={e => props.setNewFolder(e.target.value)} setTempEnableFix={props.setTempEnableFix}/>
            <EditIconsDiv edit_icons={props.edit_icons} folderId={props.button_id} newListMode={props.newListMode} setIsDisabled={props.setIsDisabled}
             setNewListMode={props.setNewListMode} setEditMode={props.setEditMode} update={props.update} setUpdate={props.setUpdate}/> {/* only returns this div within button if props.edit_icon==true */}
        </List>

    ) : (props.newListMode===false) ? (
        ""
    ) 

    
    : (

        <List key={props.button_id} type="button" id={props.button_id} className={props.className} onClick={(props.saveToListMode) ? (e) => insertList(e) : (e) => RetrieveList(e)}>
            <br/>
            <RenameInput placeholder={props.button_text} maxLength="10" disabled={props.isDisabled} onChange={e => props.setNewName(e.target.value)}/>
            <EditIconsDiv edit_icons={props.edit_icons} folderId={props.button_id} isDisabled={props.isDisabled} setThisFolderId={props.setThisFolderId}
             setIsDisabled={props.setIsDisabled} newFolderName={props.newFolderName} update={props.update} setUpdate={props.setUpdate}/> {/* only returns this div within button if props.edit_icons==true */}
        </List>

    );

}

export default ListButton;