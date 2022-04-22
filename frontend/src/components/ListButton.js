import React, { useState, useEffect } from 'react';
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
const Input = styled.input`
width: 80%;
height: auto;

filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
font-family: 'Denk One';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 30px;
text-align: left;

color: #FEFFDC;
background: #001A5E;
border-radius: 14px;
align:right;
columnGap: 1rem;
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

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function ListButton(props){
    var [isDisabled, setIsDisabled] = useState(true)
    
    // this is for the new folder.
    var [newFolder, setNewFolder] = useState('');

    // this is for renaming the folder.
    var [newFolderName, setNewFolderName] = useState(props.button_text);

    // console.log(props)

    async function changeName(){
    
        // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');
    
        // The object to be sent to the api, must contain folderId and jwToken field
        var obj = {folderId:props.button_id, jwToken:storage.retrieveToken(), newFolderName: newFolderName};
        var js = JSON.stringify(obj);
    
        // Path to send the api call
        var bp = require('./Path.js');
    
        try
        {
            // Request folders and JWT
            const response = await fetch(bp.buildPath('changeFolderName'), {method:'POST', body:js, headers:{'Content-Type':'application/json'}});
    
            // Wait for response and parse json
            var res = JSON.parse(await response.text());
    
            // Check the error field. empty error is good
            if( res.error && res.error.length > 0 )
            {
                console.log(res.error);
            }
            else
            {
                // Store the received refreshed JWT
                storage.storeToken( res.jwToken );                
            }
        }
        catch(e)
        {
            console.log(e.toString());
        }
    }

    // changes newFolderName on every keystroke. for now, also changes the folder name in the database at every key stroke.
    useEffect(() => {
        if (newFolderName.length !== 0) changeName();
        else newFolderName = props.button_text;
        if (props.button_id === undefined) return;
        
    },[newFolderName])

    // in the case that this is a new list 
    return (props.newListMode===true) ? (
        <div onClick={props.onClick}>
        <List type="button"id={props.button_id} className={props.className}>
            <br/>
            <RenameInput id="new_list" placeholder="new list"/>
            <EditIconsDiv edit_icons={props.edit_icons} folderId={props.button_id} newListMode={props.newListMode} 
             setNewListMode={props.setNewListMode} setEditMode={props.setEditMode} update={props.update} setUpdate={props.setUpdate}/> {/* only returns this div within button if props.edit_icon==true */}
        </List>
        </div>
    ) : (props.newListMode===false) ? (
        ""
    ) : (
        <div onClick={props.onClick}>
        <List type="button"id={props.button_id} className={props.className}>
            <br/>
            <RenameInput placeholder={props.button_text} maxLength="10" disabled={isDisabled} onChange={e => setNewFolderName(e.target.value)}/>
            <EditIconsDiv edit_icons={props.edit_icons} folderId={props.button_id} isDisabled={isDisabled}
             setIsDisabled={setIsDisabled} newFolderName={newFolderName} update={props.update} setUpdate={props.setUpdate}/> {/* only returns this div within button if props.edit_icons==true */}
        </List>
        </div>
    );

}

export default ListButton;