import React, { useState, useEffect } from 'react';
import { Buttonb } from './Button';
import styled from 'styled-components';
import '../App.css';

const ListButton = styled(Buttonb)`
    width: 100%;
    height: 110px;
`

function FoldersUI()
{
    // Use state for a message if needed
    const [message, setMessage] = useState('');

    // useState for setting the list of folders after its been loaded
    var [folderList, setFolders] = useState([]);

    // Function to retrieve the folders, gets run with useState after page loads
    const RetrieveFolders = async () => {

        // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');
                
        // The user data is stored as text and needs to be turned into an object
        var data = JSON.parse(localStorage.user_data);

        // The object to be sent to the api, must contain userId and jwtToken field
        var obj = {userId:data.id, jwtToken:storage.retrieveToken()};
        var js = JSON.stringify(obj);

        // Path to send the api call
        var bp = require('./Path.js');

        try
        {
            // Request folders and JWT
            const response = await fetch(bp.buildPath('retrieveFolders'), {method:'POST',body:js,headers:{'Content-Type':'application/json'}});

            // Wait for response and parse json
            var res = JSON.parse(await response.text());

            // Check the error field. empty error is good
            if( res.error && res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                // Set a message for the user
                // setMessage('Got the folders');
                
                // Store the received refreshed JWT
                storage.storeToken( res.jwtToken );

                // Turns the response field into an array of elements
                // { folderId, name} -> fields of each array object
                // const storedFolders = res.folders.map(({ folderId, name }) => (
                //                     <MarginButton key={folderId} button_text={name} />
                // ));

                // uses the useState to change the value of storedFolders
                setFolders(res.folders.map(({ folderId, folderName }) => (
                            <ListButton key={folderId} button_text={folderName} />
                        ))
                );
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }
    }

    // useEffect runs only once after the page has loaded
    useEffect(() => {
        RetrieveFolders();
    }, []);

    return(
         <div style={{"display":"grid", "row-gap": "1rem", "top":"0px", "margin":"10%", "alignContent":"center"}}>
            {folderList}
            
            {/* <ListButton button_text="Favorites"/>
            <ListButton button_text="List 1"/>
            <ListButton button_text="List 2"/>
            <ListButton button_text="List 3"/> */}
         </div>        
    );
};

export default FoldersUI;