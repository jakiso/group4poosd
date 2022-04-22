import React, {useState, useEffect} from 'react';
import { Buttonb } from './Button';
import styled from 'styled-components';
import '../App.css';
import ListButton from './ListButton';
import ListType from './ListType';

const SaveButton = styled(Buttonb)`
    width: 100%;
    height: 50px;
    background: #20CEF2;
    margin-top: 20px;
`

const AddButton = styled(Buttonb)`
    width: 100%;
    height: 50px;
    background: limegreen;
    margin-top: 20px;
`

function getUserId() {
    var user;
    var userId;
    try {
        user = localStorage.getItem('user_data')
        userId = user.id
    }
    catch (e) {
        console.log(e.message);
    }

    return user;
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function EditMode(props){
    var [newListMode, setNewListMode] = useState(false);
    // this is for renaming the folder.
    var [newFolderName, setNewFolderName] = useState(props.button_text);
    // for grabbing the folderId from ListButton
    var [thisFolderId, setThisFolderId] = useState();

    // to fix edit enable for new lists
    var [tempEnableFix, setTempEnableFix] = useState(false)

    // console.log(props)

    // this is for the new folder.
    var [newFolder, setNewFolder] = useState('');

    async function changeName(){

        // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');
        
        // The object to be sent to the api, must contain folderId and jwToken field
        var obj = {folderId:thisFolderId, jwToken:storage.retrieveToken(), newFolderName: newFolderName};
        var js = JSON.stringify(obj);        
    
        // Path to send the api call
        var bp = require('./Path.js');
    
        try
        {
            // Request folders and JWT
            const response = await fetch(bp.buildPath('changeFolderName'), {method:'POST', body:js, headers:{'Content-Type':'application/json'}});
    
            // Wait for response and parse json
            var res = JSON.parse(await response.text());
            // console.log(res)
    
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

    // creating a folder. the value is read dont listen to vscode.
    async function createFolder(){

        // prevents new folder from having an empty name.
        if (newFolder === '') return;
        // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');
        var userId = getUserId();
        var jsonId = JSON.parse(userId);
        userId = jsonId.id;
    
        // The object to be sent to the api, must contain folderId and jwToken field
        var obj = {userId: userId, folderType: props.folderType, folderName: newFolder, jwToken:storage.retrieveToken(), newFolderName: newFolder};
        var js = JSON.stringify(obj);
    
        // Path to send the api call
        var bp = require('./Path.js');
    
        try
        {
            // Request folders and JWT
            const response = await fetch(bp.buildPath('createFolder'), {method:'POST', body:js, headers:{'Content-Type':'application/json'}});
    
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

        // setting newFolder back to empty
        setNewFolder('');
    }

    // try catch is needed for when page intially loads
    try{
    // when editMode==true return a SaveButton, AddButton and ListButtons (with edit_icons)
    return (props.editMode) ? ( 
        <div>
        {/* if editMode==true, this SaveButton can turn set editMode back to false */}
        <SaveButton button_text="Save" onClick={()=>{
            createFolder();
            props.setUpdate(!props.update)
            setNewListMode(false);
            changeName();
            // maybe need to wait here before showing the lists again?
            props.setEditMode(false);
        }}/>
        <AddButton button_text="Add" onClick={()=>{setNewListMode(true);}}/>

        <ListButton button_text={"_________"} newListMode={newListMode} setNewListMode={setNewListMode} tempEnableFix={tempEnableFix}
            setTempEnableFix={setTempEnableFix} setThisFolderId={setThisFolderId}
            update={props.update} setUpdate={props.setUpdate} newFolder={newFolder} setNewFolder={setNewFolder} setNewFolderName={setNewFolderName}/>

        <ListType key={props.folderType} edit_icons={true} arr_food={props.arr_food} arr_activity={props.arr_activity} 
        folderType={props.folderType} setSaveToListMode={props.setSaveToListMode} update={props.update} 
            setUpdate={props.setUpdate} setNewFolderName={setNewFolderName} setThisFolderId={setThisFolderId}/>

        </div>
    ) :(     // when editMode is set to false with the SaveButton, only ListButtons (without edit_icons)
        <div> 
        
        <ListType key={props.folderType} edit_icons={false} arr_food={props.arr_food} arr_activity={props.arr_activity} 
        folderType={props.folderType} setThisFolderId={setThisFolderId} setSaveToListMode={props.setSaveToListMode} setNewFolderName={setNewFolderName}/>

        </div>
    );
    } catch(e){return null;}
}

export default EditMode;