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

function EditMode(props){
    // console.log(props)
    var [newListMode, setNewListMode] = useState(false);

    // for grabbing the folderId from ListButton
    var [thisFolderId, setThisFolderId] = useState();

    var [newFolder, setNewFolder] = useState('');

    // console.log(props)
    var [newName, setNewName] = useState('');    

    const handleClick = (e) => {
        props.setFolderClick(false)
    }

    async function changeName(){
        if (thisFolderId === undefined || newName === '') return;
        console.log('changing name')

        // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');
        
        // The object to be sent to the api, must contain folderId and jwToken field
        var obj = {folderId:thisFolderId, jwToken:storage.retrieveToken(), newFolderName: newName};
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
        setNewName('');
        let opposite = !(props.update)
        props.setUpdate(opposite)
    }

    async function createFolder(){
        if (newFolder === '') return;

        // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');
        var userId = getUserId();
        var jsonId = JSON.parse(userId);
        userId = jsonId.id;
    
        // The object to be sent to the api, must contain folderId and jwToken field
        var obj = {userId: userId, folderType: props.folderType, folderName: newFolder, jwToken:storage.retrieveToken()};
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
        setNewFolder('')
        let opposite = !(props.update)
        props.setUpdate(opposite)
    }

    // try catch is needed for when page intially loads
    try{
    // when editMode==true return a SaveButton, AddButton and ListButtons (with edit_icons)
    return (props.editMode) ? ( 
        <div>
        {/* if editMode==true, this SaveButton can turn set editMode back to false */}
        <SaveButton button_text="Save" onClick={()=>{
            createFolder(); // goes into function but only executes if new folder to be added.
            changeName();   // same logic as above.
            setNewListMode(false);
            props.setEditMode(false);
        }}/>
        <AddButton button_text="Add" onClick={()=>{setNewListMode(true);}}/>

        <ListButton button_text={"_________"} newListMode={newListMode} setNewListMode={setNewListMode} setThisFolderId={setThisFolderId} isDisabled={props.isDisabled} setIsDisabled={props.setIsDisabled}
            update={props.update} setUpdate={props.setUpdate} setNewFolder={setNewFolder} setNewName={setNewName}/> 
        <ListType key={props.folderType} edit_icons={true} arr_food={props.arr_food} arr_activity={props.arr_activity} setNewName={setNewName}
        folderType={props.folderType} setSaveToListMode={props.setSaveToListMode} saveToListMode={props.saveToListMode} update={props.update} isDisabled={props.isDisabled}
        setUpdate={props.setUpdate} setThisFolderId={setThisFolderId} setIsDisabled={props.setIsDisabled} setNewFolder={setNewFolder}/>

        </div>
    ) :(     // when editMode is set to false with the SaveButton, only ListButtons (without edit_icons)
        <div> 
        <ListType key={props.folderType} edit_icons={false} arr_food={props.arr_food} arr_activity={props.arr_activity} 
        isDisabled={props.isDisabled} setIsDisabled={props.setIsDisabled} setNewName={setNewName} update={props.update} setUpdate={props.setUpdate}
        folderType={props.folderType} setThisFolderId={setThisFolderId} setNewFolder={setNewFolder} setSaveToListMode={props.setSaveToListMode} saveToListMode={props.saveToListMode}/>

        </div>
    );
    } catch(e){return null;}
}

export default EditMode;