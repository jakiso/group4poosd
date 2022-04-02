import React, { useState, useEffect } from 'react';
import { Buttonb } from './Button';
import styled from 'styled-components';
import '../App.css';
import del from '../images/cross_delete.png';
import rename from '../images/LG_edit_pen.png';



function FolderEditMode(props){
    var res;
    //const [setMessage] = useState('');

    const DeleteFolder = async event => {
        // Storage to access the locally stored JWT
        var storage = require('../tokenStorage.js');

        // The object to be sent to the api, must contain userId and jwtToken field
        var obj = {folderId:props.folderId, jwtToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImZpcnN0TmFtZSI6ImJvYiIsImxhc3ROYW1lIjoic21pdGgiLCJpYXQiOjE2NDg4NjEwMjF9.2qEySf6TkkJe8uuSctETqo20LmRZ3QVZggUiwHFRYaU"};
        var js = JSON.stringify(obj);
        console.log(js);

        // Path to send the api call
        var bp = require('./Path.js');

        try
        {
            // Request folders and JWT
            const response = await fetch(bp.buildPath('deleteFolder'), {method:'POST',body:js,headers:{'Content-Type':'application/json'}});

            // Wait for response and parse json
            res = JSON.parse(await response.text());

            console.log(res);

            // Check the error field. empty error is good
            if( res.error && res.error.length > 0 )
            {
                //setMessage( "API Error:" + res.error );
                console.log('Line 37 FolderEditMode');
                console.log(res.error);
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
                
            }
        }
        catch(e)
        {
            console.log(e.toString());
            //setMessage(e.toString());
        }
    };


    return (props.trigger) ? (
    //this div contains the folder delete cross and edit pen icons (for edit mode)
    <div style={{"display":"flex", "justify-content":"center", "column-gap":"4vh", "margin-top":"1vh", "overflow":"auto"}}>
        <div style={{"height":"40px", "width":"40px", "overflow":"hidden"}}>
        <input type="image" src={del} alt="delete" id="delete" onClick={DeleteFolder}/>
            {/* <img src={del} alt="delete" style={{"width":"100%", "height":"100%"}}></img> */}
        </div>  
        <div style={{"height":"30px", "width":"30px", "overflow":"hidden", "objectFit":"contain", "padding-top":"5px"}}>
            <img src={rename} alt="rename" style={{"width":"100%", "height":"100%"}}></img>
        </div>  
    </div>
    ) : "";

}

export default FolderEditMode;