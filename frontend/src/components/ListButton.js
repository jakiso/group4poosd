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
font-size: 30px;
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

function ListButton({className, button_id, button_text, onClick, edit_icons, newListMode, setNewListMode, setEditMode}){
    var [isDisabled, setIsDisabled] = useState(true)
    var [newFolderName, setNewFolderName] = useState(button_text);

    const getInputValue = (event)=>{
        // show the user input value to console
        setNewFolderName(event.target.value);
        console.log(newFolderName);
    };

    // in the case that this is a new list 
    return (newListMode===true) ? (
        <div onClick={onClick}>
        <List type="button"id={button_id} className={className}>
            <br/>
            <Input id="new_list" placeholder="   new list name"/>
            <EditIconsDiv edit_icons={edit_icons} folderId={button_id} newListMode={newListMode}
             setNewListMode={setNewListMode} setEditMode={setEditMode}/> {/* only returns this div within button if edit_icons==true */}
        </List>
        </div>
    ) : (newListMode===false) ? (
        ""
    ) : (
        <div onClick={onClick}>
        <List type="button"id={button_id} className={className}>
            <br/>
            <RenameInput placeholder={button_text} disabled={isDisabled} onChange={getInputValue}/>
            <EditIconsDiv edit_icons={edit_icons} folderId={button_id} isDisabled={isDisabled}
             setIsDisabled={setIsDisabled} newFolderName={newFolderName}/> {/* only returns this div within button if edit_icons==true */}
        </List>
        </div>
    );

}

export default ListButton;