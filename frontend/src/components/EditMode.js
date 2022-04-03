import React, { useState, useEffect } from 'react';
import { Buttonb } from './Button';
import styled from 'styled-components';
import '../App.css';
import ListButton from './ListButton';


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



function EditMode(props){

    // try catch is needed for when page intially loads
    try{
    return (props.trigger) ? (
        <div>
        <SaveButton button_text="Save" onClick={()=>{
            props.setTrigger(false); 
        }}/>
        <AddButton button_text="Add"/>

        {console.log(props.arr)}

        {
            props.arr.folders.map(({ folderId, folderName }) => (
                <ListButton key={folderId} button_id={folderId} button_text={folderName} trigger_bool={true}/>
            ))
        }
        </div>
    ) :( 
        <div>  
        {
             props.arrn.folders.map(
                 ({ folderId, folderName }) => (
                    <ListButton key={folderId} button_id={folderId} button_text={folderName} trigger_bool={false}/>
                )
             )
        }
        </div>
    );
    } catch(e){return null;}
}

export default EditMode;