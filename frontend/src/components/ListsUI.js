import React, { useState, useEffect } from 'react';
import { Buttonb } from './Button';
import styled from 'styled-components';
import '../App.css';
import EditMode from './EditMode';
import ListButton from './ListButton';
// import { GreyOutCardUI } from './GreyOutCardUI';

const EditButton = styled(Buttonb)`
    width: 100%;
    height: 50px;
    min-width: 200px;
    margin-top:0px;
`
var res, res_food, res_activity;

function delay(milliseconds)
{
    return new Promise(resolve=> 
        {
            setTimeout(resolve, milliseconds);
        });
}

function ListsUI(props)
{
    // console.log(props)
    // Use state for a message if needed
    const [message, setMessage] = useState('');

    // useState for setting the list of folders after its been loaded
    var [foodFolders, setFoodFolders] = useState([]);
    var [activityFolders, setActivityFolders] = useState([]);

    // useState for setting the list of folders after its been loaded
    var [folderType, setFolderType] = useState("activity");

    // useState for any updates to the folders in edit mode.
    var [update, setUpdate] = useState(false)

    // disabling input to folder name.
    var [isDisabled, setIsDisabled] = useState(true)

    // this use effect updates Lists being displayed depending on what tab you are in
    useEffect(() => {
        setFolderType(props.selectTab);
    },[props.selectTab]);

    // Function to retrieve the folders, gets run with useState after page loads
    const RetrieveFolders = async () => {

        // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');
                
        // The user data is stored as text and needs to be turned into an object
        var data = JSON.parse(localStorage.user_data);

        // The object to be sent to the api, must contain userId and jwToken field
        var obj_food = {userId:data.id, folderType:"food", jwToken:storage.retrieveToken()};
        var js_food = JSON.stringify(obj_food);

        // The object to be sent to the api, must contain userId and jwToken field
        var obj_activity = {userId:data.id, folderType:"activity", jwToken:storage.retrieveToken()};
        var js_activity = JSON.stringify(obj_activity);

        // Path to send the api call
        var bp = require('./Path.js');

        try
        {
            await delay(300);

            if(folderType==="food"){

                const response_food = await fetch(bp.buildPath('retrieveFolders'), {method:'POST',body:js_food,headers:{'Content-Type':'application/json'}});

                // Wait for response and parse json
                res_food = JSON.parse(await response_food.text());
                
                // Check the error field. empty error is good
                if( res_food.error && res_food.error.length > 0 )
                {
                    setMessage( "API Error:" + res_food.error);
                }
                else
                {
                    
                    // Store the received refreshed JWT
                    storage.storeToken( res_food.jwToken );
                    // console.log(res_food)

                    // uses the useState to change the value of storedFolders
                    setFoodFolders(res_food.folders.map(({ folderId, folderName, folderType }) => (
                        {folderId: folderId, folderName: folderName, folderType: folderType}
                            ))
                    );

                }
            } else if (folderType==="activity") {
                const response_activity = await fetch(bp.buildPath('retrieveFolders'), {method:'POST',body:js_activity,headers:{'Content-Type':'application/json'}});

                // Wait for response and parse json
                res_activity = JSON.parse(await response_activity.text());

                // Check the error field. empty error is good
                if( res_activity.error && res_activity.error.length > 0 )
                {
                    setMessage( "API Error:" + res_activity.error);
                }
                else
                {
                    // Store the received refreshed JWT
                    storage.storeToken( res_activity.jwToken );

                    // uses the useState to change the value of storedFolders
                    setActivityFolders(res_activity.folders.map(({ folderId, folderName, folderType }) => (
                        {folderId: folderId, folderName: folderName, folderType: folderType}
                            ))
                    );
                }

            }
        }
        catch(e)
        {
            setMessage(e)
        }
        // console.log(foodFolders)
    }

    useEffect(() => {
        RetrieveFolders();
        if (props.editMode === false) setIsDisabled(true)
        
    }, [folderType, props.editMode, update]);

    return(
         <div style={{"display":"grid", "rowGap": "1rem", "top":"0px", "margin":"0% 10% 10% 10%", "alignContent":"center"}}>
             {/* this EditButton triggers editMode==true */}
            <EditButton button_text="Edit" onClick={()=>{
                if(props.selectTab!=="friends"){
                    // this prevents distortion in folder selection colors
                    if(document.getElementById("listUI")){
                        var children = document.getElementById("listUI").children;
                        for (var i = 0; i < children.length; i++) {
                        children[i].style.backgroundColor="#001A5E";
                        }
                    }
                    props.setEditMode(true);
                }
                }}/>
             {/* only if EditButton was clicked does EditMode display*/}
            {/* arr_food={res_food} arr_activity={res_activity}*/}
            <EditMode editMode={props.editMode} setEditMode={props.setEditMode} folderType={folderType} arr_food={foodFolders} isDisabled={isDisabled} setIsDisabled={setIsDisabled}  
                arr_activity={activityFolders} setSaveToListMode={props.setSaveToListMode} saveToListMode={props.saveToListMode} update={update} setUpdate={setUpdate}/>
         </div>        
    );
};

export default ListsUI;