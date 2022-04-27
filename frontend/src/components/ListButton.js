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
// const Input = styled.input`
// width: 80%;
// height: auto;

// filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
// font-family: 'Denk One';
// font-style: normal;
// font-weight: 400;
// font-size: 20px;
// line-height: 30px;
// text-align: left;

// color: #FEFFDC;
// background: #001A5E;
// border-radius: 14px;
// align:right;
// columnGap: 1rem;
// `

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

    // in the case that this is a new list 
    return (props.newListMode===true) ? (
        <div onClick={props.onClick}>
        <List key={props.button_id} type="button" id={props.button_id} className={props.className}>
            <br/>
            <RenameInput id="new_list" placeholder="new list" maxLength="10" disabled={props.isDisabled} 
                onChange={e => props.setNewFolder(e.target.value)} setTempEnableFix={props.setTempEnableFix}/>
            <EditIconsDiv edit_icons={props.edit_icons} folderId={props.button_id} newListMode={props.newListMode} setIsDisabled={props.setIsDisabled}
             setNewListMode={props.setNewListMode} setEditMode={props.setEditMode} update={props.update} setUpdate={props.setUpdate}/> {/* only returns this div within button if props.edit_icon==true */}
        </List>
        </div>
    ) : (props.newListMode===false) ? (
        ""
    ) : (
        <div onClick={props.onClick}>
        <List key={props.button_id} type="button" id={props.button_id} className={props.className}>
            <br/>
            <RenameInput placeholder={props.button_text} maxLength="10" disabled={props.isDisabled} onChange={e => props.setNewFolderName(e.target.value)}/>
            <EditIconsDiv edit_icons={props.edit_icons} folderId={props.button_id} isDisabled={props.isDisabled} setThisFolderId={props.setThisFolderId}
             setIsDisabled={props.setIsDisabled} newFolderName={props.newFolderName} update={props.update} setUpdate={props.setUpdate}/> {/* only returns this div within button if props.edit_icons==true */}
        </List>
        </div>
    );

}

export default ListButton;