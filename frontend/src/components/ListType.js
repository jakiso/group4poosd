import React, {useState} from 'react';
import '../App.css';
import ListButton from './ListButton';

function ListType(props){
    // console.log(props)
    // try catch is needed for when page intially loads
    try{
    // when editMode==true return a SaveButton, AddButton and ListButtons (with edit_icons)
    return (props.folderType==="food") ? ( 
        <div>
            {
            props.arr_food.folders.map(({ folderId, folderName, folderType }) => (
                <ListButton key={folderId} button_id={folderId} button_text={folderName} edit_icons={props.edit_icons} setThisFolderId={props.setThisFolderId}
                onClick={()=>{props.setSaveToListMode(false);}} setNewFolderName={props.setNewFolderName} update={props.update} setUpdate={props.setUpdate}
                isDisabled={props.isDisabled} setIsDisabled={props.setIsDisabled}/>
            ))
            }
        </div>
    ) : (props.folderType==="activity") ? (     // when editMode is set to false with the SaveButton, only ListButtons (without edit_icons)
        <div> 
            {
            props.arr_activity.folders.map(
            ({ folderId, folderName, folderType }) => (
                <ListButton key={folderId} button_id={folderId} button_text={folderName} edit_icons={props.edit_icons} setThisFolderId={props.setThisFolderId}
                    onClick={()=>{props.setSaveToListMode(false);}} setNewFolderName={props.setNewFolderName} update={props.update} setUpdate={props.setUpdate}
                    isDisabled={props.isDisabled} setIsDisabled={props.setIsDisabled}/>
                // the onClick here is for when a user is attempts to save specific place to this List
                // in the case that placeSaveMode==true (the grey div and pop-up), this onClick can turn placeSaveMode off
            ))
            }
        </div>
    ):("");
    } catch(e){return null;}
}

export default ListType;